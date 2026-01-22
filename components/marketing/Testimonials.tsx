"use client";

import { useEffect, useState } from "react";
import { IconComment } from "@/components/ui/Icons";
import { FloatingStars, Star } from "@/components/ui/Stars";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-eau-50/30 to-white relative overflow-hidden">
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-etoile-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-eau-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size="lg" color="etoile" animated={true} />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            <Star size="lg" color="eau" animated={true} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                group relative
                ${mounted ? 'animate-fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Carte principale avec effet glassmorphism */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden">
                {/* Gradient de fond animé */}
                <div className="absolute inset-0 bg-gradient-to-br from-etoile-50/0 via-eau-50/0 to-orange-50/0 group-hover:from-etoile-50/30 group-hover:via-eau-50/20 group-hover:to-orange-50/30 transition-all duration-500"></div>
                
                {/* Étoile décorative en haut à droite */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <Star size="sm" color="etoile" animated={true} />
                </div>
                
                {/* Guillemets décoratifs */}
                <div className="absolute top-6 left-6 text-6xl font-serif text-eau-200/30 leading-none select-none">
                  "
                </div>
                
                <div className="relative z-10">
                  {/* Contenu du témoignage */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 group-hover:text-gray-900 transition-colors duration-300">
                    {testimonial.content}
                  </p>
                  
                  {/* Séparateur élégant */}
                  <div className="h-px bg-gradient-to-r from-transparent via-eau-200 to-transparent mb-6 group-hover:via-eau-300 transition-colors"></div>
                  
                  {/* Informations auteur */}
                  <div className="flex items-center gap-4">
                    {/* Avatar avec initiale */}
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-eau-500 via-etoile-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {testimonial.name.charAt(0)}
                      </div>
                      {/* Badge de vérification */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Nom et rôle */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-lg mb-1 group-hover:text-eau-700 transition-colors">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bordure animée au hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-eau-200/50 transition-colors duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
