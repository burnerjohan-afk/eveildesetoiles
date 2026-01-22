"use client";

import Link from "next/link";
import { IconInstagram, IconLinkedIn, IconFacebook } from "./SocialIcons";
import { socialConfig } from "@/lib/social.config";

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  variant?: "default" | "compact";
}

interface SocialConfig {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hoverColor: string;
  gradient?: string;
}

// Configuration des réseaux sociaux
const socialNetworks: SocialConfig[] = [
  {
    name: "Instagram",
    url: socialConfig.instagram,
    icon: IconInstagram,
    color: "text-pink-600",
    hoverColor: "hover:text-pink-700",
    gradient: "from-purple-600 via-pink-600 to-orange-500",
  },
  {
    name: "LinkedIn",
    url: socialConfig.linkedin,
    icon: IconLinkedIn,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
  },
  {
    name: "Facebook",
    url: socialConfig.facebook,
    icon: IconFacebook,
    color: "text-blue-700",
    hoverColor: "hover:text-blue-800",
  },
];

export function SocialLinks({ className = "", iconSize = "w-6 h-6", variant = "default" }: SocialLinksProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {socialNetworks.map((social) => {
          const Icon = social.icon;
          const isInstagram = social.name === "Instagram";
          
          return (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`
                ${isInstagram 
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-2 rounded-full text-white" 
                  : `${social.color} ${social.hoverColor}`
                }
                transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                ${isInstagram ? "hover:shadow-lg hover:shadow-pink-500/50" : ""}
              `}
            >
              <Icon className={iconSize} />
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialNetworks.map((social) => {
        const Icon = social.icon;
        const isInstagram = social.name === "Instagram";
        
        return (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`
              group relative p-3 rounded-full transition-all duration-300 
              transform hover:scale-110 hover:-translate-y-1
              ${isInstagram 
                ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:shadow-lg hover:shadow-pink-500/50" 
                : `${social.color === "text-blue-600" ? "bg-blue-600" : "bg-blue-700"} text-white hover:shadow-lg hover:shadow-blue-500/50`
              }
            `}
          >
            <Icon className={iconSize} />
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-300 pointer-events-none">
              {social.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
