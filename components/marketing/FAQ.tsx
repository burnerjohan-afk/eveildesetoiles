"use client";

import { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-eau-200 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white border-2 border-gray-200 rounded-xl overflow-hidden 
                shadow-sm hover:shadow-xl hover:shadow-eau-200/30 hover:border-eau-300
                transition-all duration-500 ease-out
                transform hover:-translate-y-1
                card-shine
                ${mounted ? 'opacity-0 animate-fade-in-up' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-eau-50 hover:to-transparent transition-all duration-300 group"
              >
                <span className="font-semibold text-gray-900 group-hover:text-eau-700 transition-colors">
                  {item.question}
                </span>
                <span className={`
                  text-eau-600 text-2xl font-light transition-all duration-300
                  transform ${openIndex === index ? 'rotate-180 scale-110' : 'rotate-0'}
                  group-hover:scale-110
                `}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div className={`
                overflow-hidden transition-all duration-500 ease-out
                ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="px-6 py-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
