import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  MapPin,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  MessageSquare,
  Star,
  Calculator,
  Zap,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Load Marketplace", href: "/loads", icon: Package, badge: "12" },
  { title: "Fleet Management", href: "/fleet", icon: Truck },
  { title: "Real-Time Tracking", href: "/tracking", icon: MapPin },
  { title: "Team Members", href: "/team", icon: Users },
];

const operationsNavItems: NavItem[] = [
  { title: "Documents", href: "/documents", icon: FileText },
  { title: "Payments & Invoicing", href: "/payments", icon: CreditCard },
  { title: "Expenses & IFTA", href: "/expenses", icon: Calculator },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
];

const systemNavItems: NavItem[] = [
  { title: "Messages", href: "/messages", icon: MessageSquare, badge: "3" },
  { title: "Reviews & Trust", href: "/reviews", icon: Star },
  { title: "AI Assistant", href: "/ai-assistant", icon: Zap },
  { title: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    const linkContent = (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:bg-slate-700/50 hover:text-slate-50",
          isActive && "bg-teal-600 text-white hover:bg-teal-700 hover:text-white",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                isActive 
                  ? "bg-white/20 text-white"
                  : "bg-slate-700 text-slate-200"
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2 bg-slate-950 border-slate-700">
            {item.title}
            {item.badge && (
              <span className="bg-slate-700 text-slate-200 text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  const NavSection = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="space-y-1">
      {!collapsed && (
        <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      {items.map((item) => (
        <NavLink key={item.href} item={item} />
      ))}
    </div>
  );

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 text-slate-50",
        collapsed ? "w-[72px]" : "w-64",
        className
      )}
    >
      {/* Logo Section */}
      <div className={cn(
        "flex items-center justify-center h-20 px-4 border-b border-slate-700",
        collapsed ? "justify-center" : "justify-center"
      )}>
        {!collapsed && (
          <img src="/logo.png" alt="Flow logo" className="h-12 w-auto drop-shadow-sm" />
        )}
        {collapsed && (
          <img src="/logo.png" alt="Flow logo" className="h-8 w-auto drop-shadow-sm" />
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4 px-3">
        <nav className="space-y-6">
          <NavSection title="Main" items={mainNavItems} />
          <Separator />
          <NavSection title="Operations" items={operationsNavItems} />
          <Separator />
          <NavSection title="System" items={systemNavItems} />
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full text-red-400 hover:text-red-800 hover:bg-slate-700/50",
            collapsed ? "justify-center" : "justify-start gap-2"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-full text-slate-400 hover:text-teal-400 hover:bg-teal-600/20 transition-colors duration-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
