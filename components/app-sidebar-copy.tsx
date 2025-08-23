"use client";

import {
  AlertTriangle,
  ArrowLeftRight,
  Calculator,
  CreditCard,
  HelpCircle,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  PiggyBank,
  Settings,
  Shield,
  ShoppingCart,
  Target,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import type * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Assuming you have a utility for merging class names, like `clsx` or `cn`
import { cn } from "@/lib/utils"; // Make sure this import path is correct for your project

// --- NEW: Define a shared interface for sidebar navigation items ---
interface SidebarNavItem {
  title: string;
  url: string;
  icon: React.ElementType; // Represents a React component, like Lucide icons
  hidden?: boolean; // Optional property to hide the item
}

// --- NEW: Define a group interface ---
interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

// --- NEW: Categorize navigation items into sections ---

const generalItems: SidebarNavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: CreditCard,
  },
  {
    title: "Insights & Analysis",
    url: "/insights",
    icon: TrendingUp,
    // hidden: true, // Example: uncomment to hide this item
  },
  {
    title: "Spending",
    url: "/spending",
    icon: ShoppingCart,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: PiggyBank,
  },
  {
    title: "Client Goals",
    url: "/goals",
    icon: Target,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ArrowLeftRight,
  },
];

const planningItems: SidebarNavItem[] = [
  {
    title: "Debts Management",
    url: "/debts",
    icon: AlertTriangle,
  },
  {
    title: "Investments",
    url: "/investments",
    icon: TrendingDown,
  },
  {
    title: "Retirement Planning",
    url: "/retirement",
    icon: Shield,
  },
  {
    title: "Tax Planning",
    url: "/taxes",
    icon: Calculator,
    // hidden: true, // Example: uncomment to hide this item
  },
  {
    title: "Insurance Planning",
    url: "/insurance",
    icon: Shield,
  },
];

const sidebarSections: SidebarNavGroup[] = [
  {
    title: "General",
    items: generalItems,
  },
  {
    title: "Planning & Advisory",
    items: planningItems,
  },
];

const bottomItems: SidebarNavItem[] = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/support",
    icon: HelpCircle,
    // hidden: true, // Example: uncomment to hide this item
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (path: string) => void;
  currentModule?: string;
}

export function AppSidebar({
  onNavigate,
  currentModule,
  ...props
}: AppSidebarProps) {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar
        {...props}
        // MODIFIED: Added flex flex-col and h-[calc(100vh-4rem)]
        // This ensures the sidebar is a flex container and takes up the
        // full viewport height minus the 4rem (mt-16) for a potential fixed header.
        className={cn(
          "mt-16 flex flex-col",
          props.className,
          "h-[calc(100vh-4rem)]"
        )}
        collapsible="icon"
      >
        <SidebarHeader className="p-4">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Premium Member
                  </span>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="h-8 w-8 p-0"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Collapse sidebar</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="h-8 w-8 p-0"
                  >
                    <PanelLeftOpen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Expand sidebar</TooltipContent>
              </Tooltip>
            </div>
          )}
        </SidebarHeader>

        {/* MODIFIED: Added className to SidebarContent */}
        <SidebarContent className="flex-1 overflow-y-auto">
          {/* Loop through defined sections */}
          {sidebarSections.map((group) => (
            // Use SidebarGroup with the section title
            <SidebarGroup key={group.title} title={group.title}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items
                    // Filter out hidden items before mapping
                    .filter((item) => !item.hidden)
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={
                            // Logic to determine active state:
                            // 1. Exact match for current module (after stripping leading slash)
                            // 2. Special case: if currentModule is "home" and item URL is "/"
                            currentModule === item.url.replace("/", "") ||
                            (currentModule === "home" && item.url === "/")
                          }
                          onClick={() => onNavigate?.(item.url)}
                          tooltip={item.title}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            {bottomItems
              // Filter out hidden items for bottom section too
              .filter((item) => !item.hidden)
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onNavigate?.(item.url)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
