// components/home-dashboard.tsx
"use client";

import { Badge } from "@/components/ui/badge"; // For opportunity badges
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity, // For no opportunities
  Briefcase, // For Early Retirement
  Calendar, // For New Client Onboarding
  ChevronDown,
  DollarSign, // For Portfolio Performance Review
  Home, // For Estate Planning
  Leaf, // Reused
  Lightbulb, // For Retirement Review (from clients-list.tsx)
  Mail, // For client contact info in opportunities
  Phone,
  Search, // For Down Payment Acceleration
  Shield, // For collapsible
  Target,
  TrendingUp, // For Insurance Needs Assessment
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react"; // Add useEffect, useMemo, useCallback

// Import Shadcn UI Collapsible components
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Import Shadcn UI DropdownMenu for status change
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Avatar for client in opportunities

// Import the Client interface from your modal file for type consistency
import { Client } from "@/components/client-add-modal";

// Define the props for HomeDashboard
interface HomeDashboardProps {
  clientData?: Client; // The currently selected client's data
}

// 1. Define the structure for an opportunity - Copied from clients-list.tsx
interface OpportunityDefinition {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string; // Tailwind CSS class for color (e.g., "text-blue-500")
  logic: (client: Client) => boolean; // Function to determine if a client has this opportunity
  potentialRevenue: number; // ADDED: Potential revenue from this opportunity
}

// Define possible opportunity statuses - Copied from clients-list.tsx
type OpportunityStatus =
  | "Identified"
  | "Approached"
  | "Interested"
  | "Not Interested"
  | "Service Initiated"
  | "Dismissed";

// Status metadata for UI - Copied from clients-list.tsx
const OPPORTUNITY_STATUSES: {
  value: OpportunityStatus;
  label: string;
  badgeClass: string;
  textColor: string;
}[] = [
  {
    value: "Identified",
    label: "Identified",
    badgeClass: "bg-blue-100 text-blue-800",
    textColor: "text-blue-600",
  },
  {
    value: "Approached",
    label: "Approached",
    badgeClass: "bg-yellow-100 text-yellow-800",
    textColor: "text-yellow-600",
  },
  {
    value: "Interested",
    label: "Interested",
    badgeClass: "bg-purple-100 text-purple-800",
    textColor: "text-purple-600",
  },
  {
    value: "Not Interested",
    label: "Not Interested",
    badgeClass: "bg-red-100 text-red-800",
    textColor: "text-red-600",
  },
  {
    value: "Service Initiated",
    label: "Service Initiated",
    badgeClass: "bg-green-100 text-green-800",
    textColor: "text-green-600",
  },
  {
    value: "Dismissed",
    label: "Dismissed",
    badgeClass: "bg-gray-100 text-gray-800",
    textColor: "text-gray-600",
  },
];

// Helper to get status info - Copied from clients-list.tsx
const getStatusInfo = (status: OpportunityStatus) =>
  OPPORTUNITY_STATUSES.find((s) => s.value === status) ||
  OPPORTUNITY_STATUSES[0];

// 2. Centralized definition of all possible opportunities - Copied from clients-list.tsx
const allOpportunities: OpportunityDefinition[] = [
  {
    id: "retirement_review",
    category: "Retirement Planning",
    title: "Retirement Plan Review",
    description:
      "Review current retirement savings and projections for clients nearing retirement.",
    icon: Calendar,
    colorClass: "text-blue-500",
    logic: (client) => {
      const age =
        new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear();
      return (
        client.status === "active" &&
        age >= 50 &&
        age < 65 &&
        client.financialGoals?.toLowerCase().includes("retirement") &&
        client.portfolioValue < 750000
      );
    },
    potentialRevenue: 750, // Example revenue
  },
  {
    id: "early_retirement_planning",
    category: "Retirement Planning",
    title: "Early Retirement Strategy",
    description:
      "Initiate or refine retirement planning for younger clients to maximize long-term growth.",
    icon: Target,
    colorClass: "text-purple-500",
    logic: (client) => {
      const age =
        new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear();
      return (
        client.status === "active" &&
        age >= 30 &&
        age < 50 &&
        !client.financialGoals?.toLowerCase().includes("retirement")
      );
    },
    potentialRevenue: 1200, // Example revenue
  },
  {
    id: "insurance_assessment",
    category: "Protection & Estate",
    title: "Insurance Needs Assessment",
    description:
      "Evaluate life, health, critical illness coverage based on client's net worth and dependents.",
    icon: Shield,
    colorClass: "text-orange-500",
    logic: (client) =>
      client.status === "active" &&
      client.portfolioValue > 150000 &&
      !client.notes?.toLowerCase().includes("insurance in place"),
    potentialRevenue: 600, // Example revenue (e.g., commission or fee)
  },
  {
    id: "estate_planning",
    category: "Protection & Estate",
    title: "Estate Planning",
    description:
      "Assist with wills, trusts, and power of attorney for clients with significant assets.",
    icon: Briefcase,
    colorClass: "text-red-500",
    logic: (client) => {
      const age =
        new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear();
      return (
        client.status === "active" &&
        age >= 45 &&
        client.portfolioValue > 300000 &&
        !client.notes?.toLowerCase().includes("estate plan")
      );
    },
    potentialRevenue: 1500, // Example revenue
  },
  {
    id: "growth_investment_review",
    category: "Investment Optimization",
    title: "Growth Investment Review",
    description:
      "Propose more aggressive investment strategies for conservative clients with long horizons.",
    icon: TrendingUp,
    colorClass: "text-green-500",
    logic: (client) =>
      client.status === "active" &&
      client.riskProfile === "Conservative" &&
      client.portfolioValue < 300000 &&
      new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear() <
        40,
    potentialRevenue: 800, // Example revenue
  },
  {
    id: "esg_investment",
    category: "Investment Optimization",
    title: "ESG Investing Exploration",
    description:
      "Introduce sustainable and ethical investment options for clients with no stated preferences.",
    icon: Leaf,
    colorClass: "text-emerald-500",
    logic: (client) =>
      client.status === "active" && client.investmentPreferences.length === 0,
    potentialRevenue: 950, // Example revenue
  },
  {
    id: "portfolio_performance_review",
    category: "Investment Optimization",
    title: "Portfolio Performance Review",
    description:
      "Conduct a detailed review for clients with recent underperforming portfolios.",
    icon: Activity,
    colorClass: "text-amber-500",
    logic: (client) =>
      client.status === "active" &&
      client.totalGainLossPercent < 5 &&
      client.totalGainLoss < 0,
    potentialRevenue: 700, // Example revenue
  },
  {
    id: "debt_consolidation",
    category: "Debt Management",
    title: "Debt Consolidation Strategy",
    description:
      "Help clients consolidate high-interest debts for better financial health.",
    icon: DollarSign,
    colorClass: "text-indigo-500",
    logic: (client) =>
      client.status === "active" &&
      client.portfolioValue < 200000 &&
      !client.financialGoals?.toLowerCase().includes("debt"),
    potentialRevenue: 500, // Example revenue (e.g., fee for planning)
  },
  {
    id: "new_client_onboarding",
    category: "Client Onboarding",
    title: "Initial Onboarding & Goal Setup",
    description:
      "Ensure new clients are fully onboarded and their initial financial goals are clearly defined.",
    icon: UserPlus,
    colorClass: "text-lime-500",
    logic: (client) => {
      const today = new Date();
      const joinDate = new Date(client.joinDate);
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
      return (
        client.status === "active" &&
        joinDate > threeMonthsAgo &&
        client.portfolioValue < 10000
      );
    },
    potentialRevenue: 300, // Example revenue (e.g., initial setup fee)
  },
  {
    id: "down_payment_acceleration",
    category: "Goals",
    title: "Accelerate Down Payment Savings",
    description:
      "Optimize savings strategies to help clients achieve their home down payment goal faster.",
    icon: Home,
    colorClass: "text-cyan-500",
    logic: (client) =>
      client.status === "active" &&
      client.financialGoals === "Saving for a down payment" &&
      client.portfolioValue < 300000,
    potentialRevenue: 850, // Example revenue
  },
];

export function HomeDashboardOpportunity({ clientData }: HomeDashboardProps) {
  // State to track status of opportunities for this specific client
  // Map<opportunityId, OpportunityStatus>
  const [clientOpportunityStatuses, setClientOpportunityStatuses] = useState<
    Map<string, OpportunityStatus>
  >(new Map());

  // Effect to initialize/update opportunities when clientData changes
  useEffect(() => {
    if (!clientData) {
      setClientOpportunityStatuses(new Map()); // Clear if no client selected
      return;
    }

    setClientOpportunityStatuses((prevStatuses) => {
      const newClientOpps = new Map<string, OpportunityStatus>();
      allOpportunities.forEach((oppDef) => {
        if (oppDef.logic(clientData)) {
          // If already exists in state, keep existing status, otherwise default to "Identified"
          const existingStatus = prevStatuses.get(oppDef.id);
          newClientOpps.set(oppDef.id, existingStatus || "Identified");
        }
      });
      return newClientOpps;
    });
  }, [clientData]); // Re-run when clientData changes

  // Memoized list of active opportunities for the current client
  const activeOpportunitiesForClient = useMemo(() => {
    if (!clientData) return [];
    return allOpportunities.filter((oppDef) => {
      const status = clientOpportunityStatuses.get(oppDef.id);
      return (
        oppDef.logic(clientData) &&
        status !== "Service Initiated" &&
        status !== "Dismissed" &&
        status !== "Not Interested"
      );
    });
  }, [clientData, clientOpportunityStatuses]);

  // Handler for changing opportunity status for a specific opportunity
  const handleOpportunityStatusChange = useCallback(
    (opportunityId: string, newStatus: OpportunityStatus) => {
      setClientOpportunityStatuses((prevStatuses) => {
        const newPrevStatuses = new Map(prevStatuses);
        newPrevStatuses.set(opportunityId, newStatus);
        return newPrevStatuses;
      });
    },
    []
  );

  // Render content based on currentHomeTab
  const renderHomeDashboardContent = () => {
    if (!clientData) {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No client selected</h3>
              <p>Please select a client to view their gaps.</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const uniqueOpportunityCategories = Array.from(
      new Set(activeOpportunitiesForClient.map((opp) => opp.category))
    );
    const anyOpportunitiesExist = activeOpportunitiesForClient.length > 0;

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          View and manage specific financial opportunities tailored for{" "}
          {clientData.name}.
        </p>

        {!anyOpportunitiesExist ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  No immediate opportunities identified for {clientData.name}
                </h3>
                <p>
                  This client appears to have a comprehensive plan based on
                  current data, or all identified opportunities have been
                  addressed/dismissed.
                </p>
                <p className="mt-2 text-xs">
                  This is based on simplified inference rules. Consider a manual
                  review for deeper insights.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {uniqueOpportunityCategories.map((category) => {
              const opportunitiesInThisCategory =
                activeOpportunitiesForClient.filter(
                  (oppDef) => oppDef.category === category
                );

              if (opportunitiesInThisCategory.length === 0) return null;

              return (
                <div key={category} className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-4">
                    {category} Gaps
                  </h2>
                  <div className="space-y-2">
                    {opportunitiesInThisCategory.map((oppDef) => {
                      const currentStatus =
                        clientOpportunityStatuses.get(oppDef.id) ||
                        "Identified";
                      const statusInfo = getStatusInfo(currentStatus);

                      return (
                        <Collapsible
                          key={oppDef.id}
                          className="border rounded-lg bg-card"
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent transition-colors">
                            <div className="flex items-center space-x-3">
                              <oppDef.icon
                                className={`h-6 w-6 ${oppDef.colorClass}`}
                              />
                              <div>
                                <h3 className="text-base font-semibold">
                                  {oppDef.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {oppDef.description}
                                </p>
                                {/* ADDED: Potential Revenue Display */}
                                <p className="text-sm text-primary font-medium mt-1">
                                  Potential Revenue: RM{" "}
                                  {oppDef.potentialRevenue.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`${statusInfo.badgeClass} min-w-[100px] text-center`}
                              >
                                {statusInfo.label}
                              </Badge>
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t bg-secondary/20 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                            <div className="p-4 space-y-3">
                              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b last:border-b-0 py-3 md:py-2 px-2 bg-background rounded-md">
                                <div className="flex items-center space-x-3 w-full md:w-auto mb-2 md:mb-0">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {clientData.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">
                                      {clientData.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center space-x-2">
                                      <Mail className="h-3 w-3" />{" "}
                                      <span>{clientData.email}</span>
                                      {clientData.phone && (
                                        <>
                                          <Phone className="h-3 w-3" />{" "}
                                          <span>{clientData.phone}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-end md:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full sm:w-auto"
                                      >
                                        Update Status{" "}
                                        <ChevronDown className="ml-2 h-3 w-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      {OPPORTUNITY_STATUSES.map((s) => (
                                        <DropdownMenuItem
                                          key={s.value}
                                          onClick={() =>
                                            handleOpportunityStatusChange(
                                              oppDef.id,
                                              s.value
                                            )
                                          }
                                          className={s.textColor}
                                          disabled={currentStatus === s.value}
                                        >
                                          {s.label}
                                        </DropdownMenuItem>
                                      ))}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  {/* Optionally, add buttons to navigate to relevant sections of the client's PFM view */}
                                  {/* Example: if (oppDef.category === "Retirement Planning") show a button to navigate to Retirement */}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                      console.log(
                                        `Navigate to relevant section for ${oppDef.id}`
                                      )
                                    }
                                    className="w-full sm:w-auto"
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Render content based on selected tab */}
      {renderHomeDashboardContent()}
    </div>
  );
}
