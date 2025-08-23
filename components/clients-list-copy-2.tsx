// components/clients-list.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useMemo, useState } from "react";

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

import {
  Activity,
  AlertTriangle,
  Briefcase,
  Calendar, // New metric icon
  CheckCircle,
  ChevronDown,
  DollarSign,
  Eye, // Dismissed opportunities
  History,
  Home,
  Leaf,
  Lightbulb,
  Mail,
  Phone,
  Plus,
  Search,
  Shield, // New metric icon
  Target,
  TrendingUp,
  UserPlus, // For collapsible
  Users,
} from "lucide-react";

// Import the Client interface from your modal file
import { Client } from "@/components/client-add-modal";

interface ClientsListProps {
  clients: Client[];
  onNavigateToClient?: (clientId: string) => void;
  onAddClient?: () => void;
}

// 1. Define the structure for an opportunity
interface OpportunityDefinition {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string; // Tailwind CSS class for color (e.g., "text-blue-500")
  logic: (client: Client) => boolean; // Function to determine if a client has this opportunity
}

// Define possible opportunity statuses
type OpportunityStatus =
  | "Identified"
  | "Approached"
  | "Interested"
  | "Not Interested"
  | "Service Initiated"
  | "Dismissed";

// Status metadata for UI
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

// Helper to get status info
const getStatusInfo = (status: OpportunityStatus) =>
  OPPORTUNITY_STATUSES.find((s) => s.value === status) ||
  OPPORTUNITY_STATUSES[0];

// 2. Centralized definition of all possible opportunities
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
  },
];

export function ClientsList({
  clients,
  onNavigateToClient,
  onAddClient,
}: ClientsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("all-clients");

  // State to track status of each client-opportunity pair
  // Map<clientId, Map<opportunityId, OpportunityStatus>>
  const [clientOpportunityStatuses, setClientOpportunityStatuses] = useState<
    Map<string, Map<string, OpportunityStatus>>
  >(new Map());

  // Initialize clientOpportunityStatuses on first load or when clients change
  useMemo(() => {
    const initialStatuses = new Map<string, Map<string, OpportunityStatus>>();
    clients.forEach((client) => {
      const clientOpps = new Map<string, OpportunityStatus>();
      allOpportunities.forEach((oppDef) => {
        if (oppDef.logic(client)) {
          // If already exists in state, keep existing status, otherwise default to "Identified"
          const existingStatus = clientOpportunityStatuses
            .get(client.id)
            ?.get(oppDef.id);
          clientOpps.set(oppDef.id, existingStatus || "Identified");
        }
      });
      if (clientOpps.size > 0) {
        initialStatuses.set(client.id, clientOpps);
      }
    });
    setClientOpportunityStatuses(initialStatuses);
  }, [clients]); // Re-run if clients array changes (e.g., new client added)

  // Memoized map of opportunityId -> clients[] who qualify and are not dismissed/closed
  const activeOpportunityClientMap = useMemo(() => {
    const map = new Map<string, Client[]>();
    allOpportunities.forEach((oppDef) => {
      clients.forEach((client) => {
        const status = clientOpportunityStatuses.get(client.id)?.get(oppDef.id);
        if (
          oppDef.logic(client) &&
          status !== "Service Initiated" &&
          status !== "Dismissed" &&
          status !== "Not Interested"
        ) {
          if (!map.has(oppDef.id)) {
            map.set(oppDef.id, []);
          }
          map.get(oppDef.id)?.push(client);
        }
      });
    });
    return map;
  }, [clients, clientOpportunityStatuses]);

  // Handler for changing opportunity status for a specific client
  const handleOpportunityStatusChange = useCallback(
    (clientId: string, opportunityId: string, newStatus: OpportunityStatus) => {
      setClientOpportunityStatuses((prevStatuses) => {
        const newPrevStatuses = new Map(prevStatuses);
        const clientOpps = new Map(newPrevStatuses.get(clientId) || new Map());
        clientOpps.set(opportunityId, newStatus);
        newPrevStatuses.set(clientId, clientOpps);
        return newPrevStatuses;
      });
    },
    []
  );

  // --- Metrics for the new Dashboard ---
  const totalOpportunitiesIdentified = useMemo(() => {
    let count = 0;
    clientOpportunityStatuses.forEach((clientOpps) => {
      count += clientOpps.size;
    });
    return count;
  }, [clientOpportunityStatuses]);

  const opportunitiesPursued = useMemo(() => {
    let count = 0;
    clientOpportunityStatuses.forEach((clientOpps) => {
      clientOpps.forEach((status) => {
        if (status === "Approached" || status === "Interested") {
          count++;
        }
      });
    });
    return count;
  }, [clientOpportunityStatuses]);

  const clientsNeedingFollowUp = useMemo(() => {
    const uniqueClientIds = new Set<string>();
    clientOpportunityStatuses.forEach((clientOpps, clientId) => {
      clientOpps.forEach((status) => {
        if (status === "Approached" || status === "Interested") {
          uniqueClientIds.add(clientId);
        }
      });
    });
    return uniqueClientIds.size;
  }, [clientOpportunityStatuses]);

  const opportunitiesClosedThisMonth = useMemo(() => {
    // For a real app, this would involve tracking status change dates.
    // For mock, let's just count 'Service Initiated' or 'Dismissed' for simplicity.
    // In a real scenario, you'd store the date of status change and filter by month.
    let count = 0;
    clientOpportunityStatuses.forEach((clientOpps) => {
      clientOpps.forEach((status) => {
        if (
          status === "Service Initiated" ||
          status === "Dismissed" ||
          status === "Not Interested"
        ) {
          count++;
        }
      });
    });
    return count;
  }, [clientOpportunityStatuses]);
  // --- End Metrics ---

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    const matchesRisk =
      riskFilter === "all" ||
      client.riskProfile.toLowerCase() === riskFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "conservative":
        return "bg-blue-100 text-blue-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "aggressive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPortfolioValue = clients.reduce(
    (sum, client) => sum + client.portfolioValue,
    0
  );
  const activeClientsCount = clients.filter(
    (client) => client.status === "active"
  ).length;
  const needsAttentionClientsCount = clients.filter(
    (client) => client.status === "needs-attention"
  ).length;

  // Content for 'All Clients' tab (mostly unchanged, now wrapped in a function)
  const renderAllClientsContent = () => (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{clients.length}</div>
            <div className="text-sm text-muted-foreground">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeClientsCount}</div>
            <div className="text-sm text-muted-foreground">Active Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {needsAttentionClientsCount}
            </div>
            <div className="text-sm text-muted-foreground">Need Attention</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              RM {(totalPortfolioValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">Total AUM</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="needs-attention">Needs Attention</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Profiles</SelectItem>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={client.name}
                    />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{client.email}</span>
                      </div>
                      {/* Only render phone if it exists on the client object */}
                      {client.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{client.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(client.status)}
                      >
                        {client.status.replace("-", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getRiskColor(client.riskProfile)}
                      >
                        {client.riskProfile}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div>
                    <div className="text-2xl font-bold">
                      RM {client.portfolioValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Portfolio Value
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <div
                      className={`flex items-center text-sm ${
                        client.monthlyReturn > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp
                        className={`h-3 w-3 mr-1 ${
                          client.monthlyReturn < 0 ? "rotate-180" : ""
                        }`}
                      />
                      {client.monthlyReturn > 0 ? "+" : ""}
                      {client.monthlyReturn}%
                    </div>
                    <span className="text-xs text-muted-foreground">
                      this month
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Total Gain/Loss:
                    </span>
                    <div
                      className={`font-medium ${
                        client.totalGainLoss > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {client.totalGainLoss > 0 ? "+" : ""}RM{" "}
                      {client.totalGainLoss.toLocaleString()}(
                      {client.totalGainLoss > 0 ? "+" : ""}
                      {client.totalGainLossPercent}%)
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Contact:</span>
                    <div className="font-medium">{client.lastContact}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Review:</span>
                    <div className="font-medium">{client.nextReview}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Client Since:</span>
                    <div className="font-medium">
                      {new Date(client.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {client.status === "needs-attention" && (
                    <div className="flex items-center text-orange-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>Requires attention</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Schedule
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onNavigateToClient?.(client.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Portfolio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No clients found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );

  // Content for 'Client Opportunities' tab
  const renderClientOpportunitiesContent = () => {
    const uniqueOpportunityCategories = Array.from(
      new Set(allOpportunities.map((opp) => opp.category))
    );

    const anyOpportunitiesExist = totalOpportunitiesIdentified > 0;

    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Identify and prioritize high-impact opportunities across your client
          base to drive growth and enhance service.
        </p>

        {/* Actionable Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-700">
                  Total Opportunities
                </h3>
                <History className="h-6 w-6 text-blue-400 opacity-70" />
              </div>
              <div className="text-3xl font-bold text-blue-800">
                {totalOpportunitiesIdentified}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Identified across all clients
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-700">
                  Opportunities Pursued
                </h3>
                <Target className="h-6 w-6 text-purple-400 opacity-70" />
              </div>
              <div className="text-3xl font-bold text-purple-800">
                {opportunitiesPursued}
              </div>
              <p className="text-xs text-purple-600 mt-1">
                Currently being engaged
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-teal-50">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-700">
                  Clients Needing Follow-up
                </h3>
                <Users className="h-6 w-6 text-green-400 opacity-70" />
              </div>
              <div className="text-3xl font-bold text-green-800">
                {clientsNeedingFollowUp}
              </div>
              <p className="text-xs text-green-600 mt-1">
                Pending action or response
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-orange-700">
                  Opportunities Closed (Mth)
                </h3>
                <CheckCircle className="h-6 w-6 text-orange-400 opacity-70" />
              </div>
              <div className="text-3xl font-bold text-orange-800">
                {opportunitiesClosedThisMonth}
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Service initiated or declined
              </p>
            </CardContent>
          </Card>
        </div>

        {!anyOpportunitiesExist ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  No immediate opportunities identified
                </h3>
                <p>
                  All clients appear to have a comprehensive plan based on
                  current data, or opportunities are dismissed.
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
              const opportunitiesInThisCategory = allOpportunities.filter(
                (oppDef) =>
                  oppDef.category === category &&
                  activeOpportunityClientMap.has(oppDef.id) &&
                  activeOpportunityClientMap.get(oppDef.id)!.length > 0
              );

              if (opportunitiesInThisCategory.length === 0) return null;

              return (
                <div key={category} className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-4">
                    {category} Opportunities
                  </h2>
                  <div className="space-y-2">
                    {opportunitiesInThisCategory.map((oppDef) => {
                      const clientsForThisOpportunity =
                        activeOpportunityClientMap.get(oppDef.id) || [];
                      if (clientsForThisOpportunity.length === 0) return null; // Double check if any clients remain after status filtering

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
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="secondary"
                                className="px-3 py-1 text-sm"
                              >
                                {clientsForThisOpportunity.length} Client
                                {clientsForThisOpportunity.length !== 1
                                  ? "s"
                                  : ""}
                              </Badge>
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t bg-secondary/20 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                            <div className="p-4 space-y-3">
                              {clientsForThisOpportunity.map((client) => {
                                const currentStatus =
                                  clientOpportunityStatuses
                                    .get(client.id)
                                    ?.get(oppDef.id) || "Identified";
                                const statusInfo = getStatusInfo(currentStatus);

                                return (
                                  <div
                                    key={client.id}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between border-b last:border-b-0 py-3 md:py-2 px-2 bg-background rounded-md"
                                  >
                                    <div className="flex items-center space-x-3 w-full md:w-auto mb-2 md:mb-0">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs">
                                          {client.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium text-sm">
                                          {client.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center space-x-2">
                                          <Mail className="h-3 w-3" />{" "}
                                          <span>{client.email}</span>
                                          {client.phone && (
                                            <>
                                              <Phone className="h-3 w-3" />{" "}
                                              <span>{client.phone}</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-end md:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                                      <Badge
                                        className={`${statusInfo.badgeClass} min-w-[100px] text-center`}
                                      >
                                        {statusInfo.label}
                                      </Badge>
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
                                                  client.id,
                                                  oppDef.id,
                                                  s.value
                                                )
                                              }
                                              className={s.textColor}
                                              disabled={
                                                currentStatus === s.value
                                              }
                                            >
                                              {s.label}
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          onNavigateToClient?.(client.id)
                                        }
                                        className="w-full sm:w-auto"
                                      >
                                        View Client
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor your client portfolio
          </p>
        </div>
        <Button onClick={onAddClient}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setCurrentTab("all-clients")}
          className={`px-4 py-2 text-sm font-medium ${
            currentTab === "all-clients"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Clients
        </button>
        <button
          onClick={() => setCurrentTab("client-opportunities")}
          className={`px-4 py-2 text-sm font-medium ${
            currentTab === "client-opportunities"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Client Opportunities
        </button>
      </div>

      {/* Conditionally Render Content based on currentTab */}
      {currentTab === "all-clients"
        ? renderAllClientsContent()
        : renderClientOpportunitiesContent()}
    </div>
  );
}
