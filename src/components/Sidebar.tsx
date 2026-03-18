"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  brand: string;
  subtitle: string;
  links: { href: string; label: string; icon: React.ReactNode }[];
  footer?: React.ReactNode;
}

export default function Sidebar({ brand, subtitle, links, footer }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-primary text-white flex-col hidden md:flex shrink-0">
      <div className="p-6 border-b border-primary-dark">
        <h1 className="text-xl font-bold tracking-tight">{brand}</h1>
        <p className="text-xs text-blue-200 mt-1 uppercase tracking-widest">{subtitle}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 p-3 rounded-custom font-medium transition-colors ${
                isActive ? "bg-white/10" : "hover:bg-white/5 text-blue-100"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      {footer && <div className="p-6 border-t border-primary-dark">{footer}</div>}
    </aside>
  );
}
