import { Building2, CreditCard, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function BottomNavigation() {
  const navItems = [
    {
      id: "resorts",
      label: "Hotel",
      icon: Building2,
      href: "/huesped/resorts",
    },
    {
      id: "reservacion",
      label: "Reservación",
      icon: CreditCard,
      href: "/huesped/reservacion",
    },
    {
      id: "recomendaciones",
      label: "Recomendaciones",
      icon: Sparkles,
      href: "/huesped/recomendaciones",
    },
    { id: "account", label: "Cuenta", icon: User, href: "/huesped/account" },
  ];

  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();

  return (
    <div className="fixed bottom-0 z-50 w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      <div className="bg-hotel-surface-elevated/95 backdrop-blur-lg border-t border-border/50 shadow-lg">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center py-2 px-3 min-w-0 rounded-lg transition-all duration-200",
                  "hover:bg-accent/50 active:scale-95",
                  isActive
                    ? "text-hotel-accent bg-hotel-accent/10"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-1 transition-transform duration-200",
                    isActive && "scale-110",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium truncate transition-colors duration-200",
                    isActive && "font-semibold",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
