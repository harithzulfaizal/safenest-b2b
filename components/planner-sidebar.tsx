"use client";

import {
  Calendar,
  CheckSquare,
  FileText,
  HelpCircle,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  TrendingUp,
  User,
  UserPlus,
  Users,
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
// Make sure this import path is correct for your project
import { cn } from "@/lib/utils";

// --- Define shared interfaces for sidebar navigation items ---
interface SidebarNavItem {
  title: string;
  url: string;
  icon: React.ElementType; // Represents a React component, like Lucide icons
  hidden?: boolean; // Optional property to hide the item
}

// --- Define a group interface ---
interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}

// --- Categorize navigation items into sections ---

const coreNavigationItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Prospects",
    url: "/prospects",
    icon: UserPlus,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: CheckSquare,
    // hidden: true, // Example: uncomment to hide this item
  },
];

const reportingAndPlanningItems: SidebarNavItem[] = [
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: TrendingUp,
  },
  // {
  //   title: "Goal Tracking",
  //   url: "/goal-tracking",
  //   icon: Target,
  // },
  // {
  //   title: "Reviews",
  //   url: "/reviews",
  //   icon: ClipboardList,
  //   // hidden: true, // Example: uncomment to hide this item
  // },
];

const sidebarSections: SidebarNavGroup[] = [
  {
    title: "Main Navigation", // Or "Client Management" / "Daily Operations"
    items: coreNavigationItems,
  },
  {
    title: "Reporting & Planning", // Or "Performance & Insights"
    items: reportingAndPlanningItems,
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

interface PlannerSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (path: string) => void;
  currentModule?: string;
}

export function PlannerSidebar({
  onNavigate,
  currentModule,
  ...props
}: PlannerSidebarProps) {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar
        {...props}
        // MODIFIED: Added flex flex-col and h-[calc(100vh-4rem)] for proper layout and scrolling
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
                    alt="Planner"
                  />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sarah Chen</span>
                  <span className="text-xs text-muted-foreground">
                    Financial Planner
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
                  alt="Planner"
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

        {/* MODIFIED: Added className to SidebarContent for scrolling */}
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
                            // 2. Special case: if currentModule is "dashboard" and item URL is "/"
                            currentModule === item.url.replace("/", "") ||
                            (currentModule === "dashboard" && item.url === "/")
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
