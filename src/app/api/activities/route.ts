import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";
import { getFirebaseAdminFirestore } from "@/lib/firebase-admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { activity } = await req.json();

    if (!activity) {
      return NextResponse.json({ error: "Activity is required" }, { status: 400 });
    }

    // Define schema for Gemini to return structured JSON
    const responseSchema: Schema = {
      type: SchemaType.OBJECT,
      properties: {
        category: {
          type: SchemaType.STRING,
          description: "One of: Transport, Waste, Energy, Water, Food",
        },
        impact_value: {
          type: SchemaType.NUMBER,
          description: "Estimated impact score / carbon saved (integer between 1 and 100).",
        },
        description: {
          type: SchemaType.STRING,
          description: "A short, positive 1-sentence confirmation of their action.",
        },
        tangible_impact: {
          type: SchemaType.STRING,
          description: "A tangible, real-world equivalence of their impact. e.g. 'This water could water an oak tree for a week' or 'This saves enough energy to power a laptop for 5 hours'. Make it creative and educational.",
        }
      },
      required: ["category", "impact_value", "description", "tangible_impact"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const prompt = `Analyze this sustainable activity: "${activity}". Categorize it strictly as one of: Transport, Waste, Energy, Water, Food. Estimate a realistic 'impact_value' from 1 to 100 representing environmental impact or carbon saved. Provide a short positive description acknowledging the action. Provide a 'tangible_impact' showing a real-world equivalence in nature or energy.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const aiData = JSON.parse(responseText);

    // Ensure valid category
    const validCategories = ["Transport", "Waste", "Energy", "Water", "Food"];
    if (!validCategories.includes(aiData.category)) {
        aiData.category = "Energy"; // Fallback
    }

    const firestore = getFirebaseAdminFirestore();
    
    // We can use the user's email as the document ID in the users collection to find their document.
    // Or we query by email. next-auth firebase-adapter creates documents where email is a field.
    const usersRef = firestore.collection("users");
    const snapshot = await usersRef.where("email", "==", session.user.email).limit(1).get();
    
    let userDoc;
    if (snapshot.empty) {
        // Auto-create the user document if they logged in via a method that doesn't create it (like Credentials)
        const newUserRef = await usersRef.add({
            email: session.user.email,
            name: session.user.name || "Eco Warrior",
            image: session.user.image || "",
            coins: 0,
            streak: 0,
            ecoRank: "Seedling",
        });
        userDoc = await newUserRef.get();
    } else {
        userDoc = snapshot.docs[0];
    }
    
    const userData = userDoc.data() || {};
    let { coins = 0, streak = 0, lastActivityDate = null } = userData;
    
    // Calculate new coins
    coins += aiData.impact_value;

    // Calculate streak
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (lastActivityDate) {
        const lastDate = new Date(lastActivityDate);
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
            // Yesterday, increment streak
            streak += 1;
        } else if (diffDays > 1) {
            // Missed a day, reset streak
            streak = 1;
        }
        // If diffDays === 0, it's the same day, don't increment streak
    } else {
        // First activity
        streak = 1;
    }

    // Calculate rank
    let ecoRank = "Seedling";
    if (coins >= 200 && coins < 600) ecoRank = "Green Pioneer";
    if (coins >= 600) ecoRank = "Eco Warrior";

    // Update user document
    await userDoc.ref.update({
        coins,
        streak,
        ecoRank,
        lastActivityDate: todayStr
    });

    const newActivityRef = await userDoc.ref.collection("activities").add({
        originalText: activity,
        category: aiData.category,
        impactValue: aiData.impact_value,
        description: aiData.description,
        tangibleImpact: aiData.tangible_impact,
        timestamp: new Date().toISOString()
    });

    return NextResponse.json({
        id: newActivityRef.id,
        originalText: activity,
        category: aiData.category,
        impactValue: aiData.impact_value,
        description: aiData.description,
        tangibleImpact: aiData.tangible_impact,
        timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error processing activity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
