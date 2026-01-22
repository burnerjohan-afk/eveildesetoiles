import Link from "next/link";
import { config } from "@/lib/config";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-eau-300">Éveil des Étoiles</h3>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm">
              Consultante et formatrice en petite enfance. Accompagnement professionnel pour les structures de petite enfance.
            </p>
            <Link href="/a-propos" className="text-eau-300 hover:text-eau-200 transition-colors text-sm">
              En savoir plus →
            </Link>
            {/* Réseaux sociaux */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Suivez-nous</p>
              <SocialLinks variant="compact" iconSize="w-5 h-5" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-eau-300">Navigation</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/prestations" className="hover:text-eau-300 transition-colors">
                  Prestations
                </Link>
              </li>
              <li>
                <Link href="/accompagnement" className="hover:text-eau-300 transition-colors">
                  Accompagnement
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:text-eau-300 transition-colors">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/ressources" className="hover:text-eau-300 transition-colors">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-eau-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-eau-300">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href={`mailto:${config.contactEmail}`} className="hover:text-eau-300 transition-colors">
                  {config.contactEmail}
                </a>
              </li>
              <li>{config.contactPhonePlaceholder}</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-eau-300">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Recevez nos actualités et ressources directement dans votre boîte mail.
            </p>
            <form action="/api/newsletter" method="POST" className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="px-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-eau-400"
              />
              <button
                type="submit"
                className="bg-eau-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-eau-700 transition-colors"
              >
                S'abonner
              </button>
            </form>
            <p className="text-gray-400 text-xs mt-2">
              En aucun cas, vos coordonnées ne seront communiquées à des tiers.
            </p>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <Link href="/mentions-legales" className="hover:text-eau-300 transition-colors">
                Mentions légales
              </Link>
              <span>•</span>
              <Link href="/politique-confidentialite" className="hover:text-eau-300 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Éveil des Étoiles. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
