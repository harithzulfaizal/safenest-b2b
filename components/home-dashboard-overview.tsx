// components/home-dashboard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight, // For no opportunities
  Briefcase, // For Early Retirement
  Calendar,
  CreditCard,
  DollarSign, // For Portfolio Performance Review
  Home, // For Estate Planning
  Leaf,
  PiggyBank, // For Down Payment Acceleration
  Shield, // For collapsible
  Target,
  TrendingDown,
  TrendingUp, // For Insurance Needs Assessment
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react"; // Add useEffect, useMemo, useCallback

// Import Shadcn UI Collapsible components

// Import Shadcn UI DropdownMenu for status change

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

export function HomeDashboardOverview({ clientData }: HomeDashboardProps) {
  // Existing mock data
  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Store",
      amount: -85.5,
      date: "Today",
      category: "Food & Dining",
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 3500.0,
      date: "Yesterday",
      category: "Income",
    },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2 days ago",
      category: "Entertainment",
    },
    {
      id: 4,
      description: "Gas Station",
      amount: -45.2,
      date: "3 days ago",
      category: "Transportation",
    },
  ];

  const budgetCategories = [
    { name: "Food & Dining", spent: 450, budget: 600, color: "bg-blue-500" },
    { name: "Transportation", spent: 280, budget: 400, color: "bg-green-500" },
    { name: "Entertainment", spent: 180, budget: 200, color: "bg-yellow-500" },
    { name: "Shopping", spent: 320, budget: 250, color: "bg-red-500" },
  ];

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
    return (
      <>
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RM 45,231.89</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Spending
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RM 2,847.32</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Savings Goal
              </CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-muted-foreground">
                RM 6,800 of RM 10,000
              </div>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Credit Utilization
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <div className="text-xs text-orange-600">
                Above recommended 30%
              </div>
              <Progress value={42} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          transaction.amount > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}RM{" "}
                      {Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Budget Overview</CardTitle>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span>
                        RM {category.spent} / RM {category.budget}
                      </span>
                    </div>
                    <Progress
                      value={(category.spent / category.budget) * 100}
                      className="h-2"
                    />
                    {category.spent > category.budget && (
                      <p className="text-xs text-red-600">
                        Over budget by RM {category.spent - category.budget}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <ArrowUpRight className="h-5 w-5" />
                <span className="text-xs">Transfer Money</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <ArrowDownRight className="h-5 w-5" />
                <span className="text-xs">Pay Bills</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <PiggyBank className="h-5 w-5" />
                <span className="text-xs">Set Savings Goal</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Add Account</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Render content based on selected tab */}
      {renderHomeDashboardContent()}
    </div>
  );
}
