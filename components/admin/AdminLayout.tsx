"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Star } from "@/components/ui/Stars";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Tableau de bord" },
    { href: "/admin/organisations", label: "Organisations" },
    { href: "/admin/catalog-formations", label: "Catalogue formations" },
    { href: "/admin/missions", label: "Formations" },
    { href: "/admin/documents", label: "Documents" },
    { href: "/admin/settings", label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Star size="sm" color="etoile" animated={false} />
              <span className="text-xl font-bold text-eau-600">Éveil des Étoiles</span>
              <span className="text-sm text-gray-500 ml-2">- Administration</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                Site public
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] py-6">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-eau-50 text-eau-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 py-6 px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
