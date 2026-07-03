"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center focus:outline-none hover:scale-105 transition-transform"
      >
        {user.image ? (
          <Image 
            src={user.image} 
            alt="Profile" 
            width={36} 
            height={36} 
            className="rounded-full border-2 border-charcoal shadow-[2px_2px_0px_#2B2B2B]"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-charcoal bg-olive font-bold text-paper shadow-[2px_2px_0px_#2B2B2B]">
            {user.name?.charAt(0) || "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-charcoal rounded-xl shadow-[4px_4px_0px_#2B2B2B] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b-2 border-charcoal/10 bg-warm/20">
            <p className="text-sm font-bold text-charcoal truncate">{user.name}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-sm font-bold text-charcoal hover:bg-olive hover:text-white transition-colors"
          >
            Switch Account
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white transition-colors border-t border-charcoal/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
