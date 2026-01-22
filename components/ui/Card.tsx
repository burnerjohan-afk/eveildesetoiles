"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  animated?: boolean;
  index?: number;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", title, animated = false, index = 0, style }: CardProps) {
  const isFlex = className.includes('flex flex-col');
  
  return (
    <div 
      className={`
        relative bg-white border-2 border-eau-100 rounded-xl shadow-sm p-6
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-eau-200/50 hover:border-eau-300
        transform hover:-translate-y-2 hover:scale-[1.02]
        card-shine
        ${animated ? 'opacity-0 animate-fade-in-up' : ''}
        ${className}
      `}
      style={style || (animated ? { animationDelay: `${index * 0.1}s` } : {})}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-900 relative z-10">
          {title}
        </h3>
      )}
      <div className={`relative z-10 ${isFlex ? 'flex flex-col h-full' : ''}`}>{children}</div>
    </div>
  );
}
