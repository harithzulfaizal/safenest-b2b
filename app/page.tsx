// app/page.tsx
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { GlobalHeader } from "@/components/global-header";
import { ModuleTabs } from "@/components/module-tabs";
import { PlannerSidebar } from "@/components/planner-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

// CRM Components
import { AppointmentsCalendar } from "@/components/appointments-calendar";
import { ClientsList } from "@/components/clients-list";
import { PlannerDashboard } from "@/components/planner-dashboard";
import { PortfolioAnalytics } from "@/components/portfolio-analytics"; // Import PortfolioAnalytics
import { ProspectsManagement } from "@/components/prospects-management";
import { ReportsDashboard } from "@/components/reports-dashboard";
import { TasksManagement } from "@/components/tasks-management";

// Client View Components (existing PFM components)
import { AccountDetails } from "@/components/account-details";
import { AccountsOverview } from "@/components/accounts-overview";
import { AddAccount } from "@/components/add-account";
import { AllHoldings } from "@/components/all-holdings";
import { BudgetInsights } from "@/components/budget-insights";
import { BudgetManage } from "@/components/budget-manage";
import { BudgetOverview } from "@/components/budget-overview";
import { CategorizationRules } from "@/components/categorization-rules";
import { DebtOverview } from "@/components/debt-overview";
import { DebtStrategy } from "@/components/debt-strategy";
import { GoalDetails } from "@/components/goal-details";
import { GoalHistory } from "@/components/goal-history";
import { GoalIdeas } from "@/components/goal-ideas";
import { GoalsOverview } from "@/components/goals-overview";
import { HomeDashboardOpportunity } from "@/components/home-dashboard-opportunity"; // <--- Will need to pass clientData here
import { InsightsReport } from "@/components/insights-report";
import { InsuranceNeedsAssessment } from "@/components/insurance-needs-assessment";
import { InsuranceOverview } from "@/components/insurance-overview";
import { InvestmentAccountDetails } from "@/components/investment-account-details";
import { InvestmentOverview } from "@/components/investment-overview";
import { LoanDetails } from "@/components/loan-details";
import { ManageDebts } from "@/components/manage-debts";
import { MyPolicies } from "@/components/my-policies";
import { PolicyDetails } from "@/components/policy-details";
import { RecurringTransactions } from "@/components/recurring-transactions";
import { RetirementLifestyleVisualizer } from "@/components/retirement-lifestyle-visualizer";
import { RetirementOverview } from "@/components/retirement-overview";
import { RetirementPlanDetails } from "@/components/retirement-plan-details";
import { SpendingBreakdown } from "@/components/spending-breakdown";
import { SpendingMerchants } from "@/components/spending-merchants";
import { SpendingOverview } from "@/components/spending-overview";
import { TaxHistory } from "@/components/tax-history";
import { TaxOverview } from "@/components/tax-overview";
import { TaxPreparation } from "@/components/tax-preparation";
import { TaxTransactions } from "@/components/tax-transactions";
import { TransactionDetails } from "@/components/transaction-details";
import { TransactionsFeed } from "@/components/transactions-feed";

// Import ClientAddModal and Client interface from the new file
import { Client, ClientAddModal } from "@/components/client-add-modal";
import { ClientSettings } from "@/components/client-settings";
import { HomeDashboardOverview } from "@/components/home-dashboard-overview";
import AmendOutputPage from "@/components/insights-amend-pdf";
import PromptConfigPage from "@/components/insights-configure-ai";
import { PlannerSettings } from "@/components/planner-settings";
import { Support } from "@/components/support";
import { useClients } from "@/hooks/use-client";

export default function PlannerCRMApp() {
  // CRM Level State
  const [currentView, setCurrentView] = useState<"crm" | "client">("crm");
  const [currentCRMModule, setCurrentCRMModule] = useState("dashboard");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  // New state for Add Client Modal visibility
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  // Client Level State (existing PFM state)
  const [currentModule, setCurrentModule] = useState("home");
  const [currentTab, setCurrentTab] = useState("overview");
  const [currentAccountView, setCurrentAccountView] = useState<
    "overview" | "details" | "add"
  >("overview");
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [currentTransactionView, setCurrentTransactionView] = useState<
    "feed" | "details" | "recurring" | "rules"
  >("feed");
  const [selectedTransactionId, setSelectedTransactionId] =
    useState<string>("");
  const [currentInvestmentView, setCurrentInvestmentView] = useState<
    "overview" | "account-details" | "all-holdings" | "add-account"
  >("overview");
  const [selectedInvestmentAccountId, setSelectedInvestmentAccountId] =
    useState<string>("");
  const [currentTaxView, setCurrentTaxView] = useState<
    "overview" | "preparation" | "transactions" | "history"
  >("overview");
  const [currentInsuranceView, setCurrentInsuranceView] = useState<
    "overview" | "policies" | "policy-details" | "needs-assessment"
  >("overview");
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>("");
  const [currentDebtView, setCurrentDebtView] = useState<
    "overview" | "manage" | "loan-details" | "strategy" | "add"
  >("overview");
  const [selectedLoanId, setSelectedLoanId] = useState<string>("");
  const [currentGoalView, setCurrentGoalView] = useState<
    "overview" | "details" | "ideas" | "history" | "create"
  >("overview");
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");

  // Mock client data - THIS IS NOW THE SOURCE OF TRUTH FOR CLIENTS
  // This initial state populates the clients list. When a new client is added, this state is updated.
  // HACK static data
  // const [clients, setClients] = useState<Client[]>([
  //   {
  //     id: "client-1",
  //     name: "John Doe",
  //     email: "john.doe@email.com",
  //     phone: "+60 12-345 6789",
  //     portfolioValue: 450000,
  //     monthlyReturn: 2.5,
  //     lastContact: "2 days ago",
  //     nextReview: "2024-02-15",
  //     status: "active",
  //     riskProfile: "Moderate",
  //     joinDate: "2022-03-15",
  //     totalGainLoss: 45000,
  //     totalGainLossPercent: 11.1,
  //     dateOfBirth: "1980-05-10",
  //     address: "123 Main Street, Cityville",
  //     financialGoals: "Retirement planning",
  //     notes: "Very responsive, prefers email.",
  //     investmentPreferences: [], // Added empty array for ESG check
  //     sourceOfLead: "Referral from Jane Doe",
  //     lifetimeRevenue: 15000, // Added lifetime revenue
  //   },
  //   {
  //     id: "client-2",
  //     name: "Sarah Lim",
  //     email: "sarah.lim@email.com",
  //     phone: "+60 12-987 6543",
  //     portfolioValue: 280000,
  //     monthlyReturn: -1.2,
  //     lastContact: "1 week ago",
  //     nextReview: "2024-01-30",
  //     status: "needs-attention",
  //     riskProfile: "Conservative",
  //     joinDate: "2021-08-22",
  //     totalGainLoss: -8000,
  //     totalGainLossPercent: -2.8,
  //     dateOfBirth: "1992-11-20",
  //     address: "456 Oak Avenue, Townsville",
  //     financialGoals: "Saving for a down payment",
  //     notes: "Prefers phone calls, check in often.",
  //     investmentPreferences: ["Income Generation"],
  //     sourceOfLead: "Website signup",
  //     lifetimeRevenue: 8000, // Added lifetime revenue
  //   },
  //   {
  //     id: "client-3",
  //     name: "Ahmad Rahman",
  //     email: "ahmad.rahman@email.com",
  //     phone: "+60 12-555 1234",
  //     portfolioValue: 750000,
  //     monthlyReturn: 3.8,
  //     lastContact: "3 days ago",
  //     nextReview: "2024-03-01",
  //     status: "active",
  //     riskProfile: "Aggressive",
  //     joinDate: "2020-11-10",
  //     totalGainLoss: 125000,
  //     totalGainLossPercent: 20.0,
  //     dateOfBirth: "1975-02-01",
  //     address: "789 Pine Lane, Villageton",
  //     financialGoals: "Maximize growth, risk-tolerant.",
  //     notes: "High net worth, busy executive.",
  //     investmentPreferences: ["High Growth"],
  //     sourceOfLead: "Existing client referral",
  //     lifetimeRevenue: 25000, // Added lifetime revenue
  //   },
  //   {
  //     id: "client-4",
  //     name: "Michelle Wong",
  //     email: "michelle.wong@email.com",
  //     phone: "+60 12-777 8888",
  //     portfolioValue: 320000,
  //     monthlyReturn: 1.8,
  //     lastContact: "5 days ago",
  //     nextReview: "2024-02-20",
  //     status: "active",
  //     riskProfile: "Moderate",
  //     joinDate: "2023-01-05",
  //     totalGainLoss: 28000,
  //     totalGainLossPercent: 9.6,
  //     dateOfBirth: "1988-07-25",
  //     address: "101 Cedar Road, Hamletburg",
  //     financialGoals: "Balanced growth and income",
  //     notes: "New client, requires guidance.",
  //     investmentPreferences: [],
  //     sourceOfLead: "Marketing campaign",
  //     lifetimeRevenue: 7000, // Added lifetime revenue
  //   },
  //   {
  //     id: "client-5",
  //     name: "David Tan",
  //     email: "david.tan@email.com",
  //     phone: "+60 12-999 0000",
  //     portfolioValue: 180000,
  //     monthlyReturn: 0.5,
  //     lastContact: "2 weeks ago",
  //     nextReview: "2024-01-25",
  //     status: "inactive",
  //     riskProfile: "Conservative",
  //     joinDate: "2022-07-18",
  //     totalGainLoss: 5000,
  //     totalGainLossPercent: 2.9,
  //     dateOfBirth: "1965-03-03",
  //     address: "222 Birch Street, Countryside",
  //     financialGoals: "Capital preservation",
  //     notes: "Retiree, very risk averse.",
  //     investmentPreferences: ["Income Generation"],
  //     sourceOfLead: "Walk-in",
  //     lifetimeRevenue: 4000, // Added lifetime revenue
  //   },
  //   // Adding a new client for testing the 'new_client_onboarding' opportunity
  //   {
  //     id: "client-6",
  //     name: "New Client Test",
  //     email: "new.client@email.com",
  //     phone: "+60 12-111 2222",
  //     portfolioValue: 5000, // Low portfolio value
  //     monthlyReturn: 0,
  //     lastContact: "Today",
  //     nextReview: "2024-04-01",
  //     status: "active",
  //     riskProfile: "Moderate",
  //     joinDate: new Date().toISOString().split("T")[0], // Today's date
  //     totalGainLoss: 0,
  //     totalGainLossPercent: 0,
  //     dateOfBirth: "1995-01-01",
  //     address: "100 New St, New City",
  //     financialGoals: "General savings",
  //     notes: "Brand new client, needs initial setup.",
  //     investmentPreferences: [],
  //     sourceOfLead: "Online ad",
  //     lifetimeRevenue: 0, // New client, so 0 lifetime revenue
  //   },
  // ]);

  // Pass the clients array (from this component's state) and the openAddClientModal handler to ClientsList
  const { loadingClients, errorClients, clients } = useClients();
  console.log("CLIENTTTS", clients);
  // Mock planner data - these now reflect the dynamic 'clients' state
  const plannerData = {
    name: "Sarah Chen",
    firm: "Wealth Management Solutions",
    // These metrics are now derived from the 'clients' state
    totalClients: clients.length,
    totalAUM: clients.reduce((sum, client) => sum + client.portfolioValue, 0),
    activeClients: clients.filter((c) => c.status === "active").length,
  };

  // Find the selected client from the `clients` state
  const currentClient = clients.find((c) => c.id === selectedClientId) || null;

  // CRM Navigation
  const handleCRMNavigation = (path: string) => {
    const module = path.replace("/", "") || "dashboard";
    setCurrentCRMModule(module);
  };

  // Client Selection with loading delay
  const handleClientSelection = (clientId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedClientId(clientId);
      setCurrentView("client");
      setCurrentModule("home");
      setCurrentTab("overview");
      // Reset all client-level states
      setCurrentAccountView("overview");
      setCurrentTransactionView("feed");
      setCurrentInvestmentView("overview");
      setCurrentTaxView("overview");
      setCurrentInsuranceView("overview");
      setCurrentDebtView("overview");
      setCurrentGoalView("overview");
      setIsTransitioning(false);
    }, 750);
  };

  // TODO: connect to db to add client
  // Handler for adding a new client from the modal
  const handleAddNewClient = (newClient: Client) => {
    // setClients((prevClients) => [...prevClients, newClient]);
    setShowAddClientModal(false); // Close the modal after adding
    // Optionally, you could immediately navigate to the new client's view:
    // handleClientSelection(newClient.id);
  };

  // Handler for opening the Add Client Modal
  const openAddClientModal = () => {
    setShowAddClientModal(true);
  };

  // Back to CRM with loading delay
  const handleBackToCRM = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("crm");
      setSelectedClientId("");
      setIsTransitioning(false);
    }, 750);
  };

  // Client Navigation (existing PFM logic)
  const handleClientNavigation = (path: string) => {
    const module = path.replace("/", "") || "home";
    setCurrentModule(module);
    setCurrentAccountView("overview");
    setCurrentTransactionView("feed");
    setCurrentInvestmentView("overview");
    setCurrentTaxView("overview");
    setCurrentInsuranceView("overview");
    setCurrentDebtView("overview");
    setCurrentGoalView("overview");

    // Set default tab for each module
    if (module === "home") {
      setCurrentTab("overview");
    } else if (module === "insights") {
      setCurrentTab("report");
    } else if (module === "transactions") {
      setCurrentTab("feed");
    } else if (module === "spending") {
      setCurrentTab("overview");
    } else if (module === "budgets") {
      setCurrentTab("overview");
    } else if (module === "investments") {
      setCurrentTab("overview");
    } else if (module === "retirement") {
      setCurrentTab("overview");
    } else if (module === "debts") {
      setCurrentTab("overview");
    } else if (module === "taxes") {
      setCurrentTab("overview");
    } else if (module === "insurance") {
      setCurrentTab("overview");
    } else if (module === "goals") {
      setCurrentTab("overview");
    } else {
      setCurrentTab("");
    }
  };

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);

    // Reset views when changing tabs
    if (currentModule === "transactions") {
      setCurrentTransactionView(tabId as "feed" | "recurring" | "rules");
    }
    if (currentModule === "taxes") {
      setCurrentTaxView(
        tabId as "overview" | "preparation" | "transactions" | "history"
      );
    }
    if (currentModule === "insurance") {
      setCurrentInsuranceView(
        tabId as "overview" | "policies" | "needs-assessment"
      );
    }
    if (currentModule === "debts") {
      setCurrentDebtView(tabId as "overview" | "manage" | "strategy");
    }
    if (currentModule === "goals") {
      setCurrentGoalView(tabId as "overview" | "ideas" | "history");
    }
  };

  const handleInsightsNavigation = (module: string) => {
    setCurrentModule(module);
    if (module === "spending") {
      setCurrentTab("overview");
    } else if (module === "debts") {
      setCurrentTab("overview");
      setCurrentDebtView("overview");
    } else if (module === "investments") {
      setCurrentTab("overview");
      setCurrentInvestmentView("overview");
    } else if (module === "retirement") {
      setCurrentTab("overview");
    } else if (module === "taxes") {
      setCurrentTab("overview");
      setCurrentTaxView("overview");
    } else if (module === "insurance") {
      setCurrentTab("overview");
      setCurrentInsuranceView("overview");
    } else if (module === "home") {
      setCurrentTab("");
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Loading Component
  const LoadingScreen = () => (
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );

  // CRM Module Configuration
  const crmModuleConfig = {
    dashboard: {
      title: "Dashboard",
      tabs: [],
      rightAction: null,
    },
    clients: {
      title: "Clients",
      tabs: [],
      // Changed the right action to use the new openAddClientModal handler
      rightAction: (
        <Button variant="outline" onClick={openAddClientModal}>
          Add New Client
        </Button>
      ),
    },
    prospects: {
      title: "Prospects",
      tabs: [],
      rightAction: <Button variant="outline">Add Prospect</Button>,
    },
    appointments: {
      title: "Appointments",
      tabs: [],
      rightAction: <Button variant="outline">Schedule Meeting</Button>,
    },
    tasks: {
      title: "Tasks",
      tabs: [],
      rightAction: <Button variant="outline">Add Task</Button>,
    },
    reports: {
      title: "Reports",
      tabs: [],
      rightAction: <Button variant="outline">Generate Report</Button>,
    },
    analytics: {
      title: "Portfolio Analytics",
      tabs: [],
      rightAction: <Button variant="outline">Export Analysis</Button>,
    },
    "goal-tracking": {
      title: "Goal Tracking",
      tabs: [],
      rightAction: <Button variant="outline">Track Goals</Button>,
    },
    reviews: {
      title: "Reviews",
      tabs: [],
      rightAction: <Button variant="outline">Schedule Review</Button>,
    },
  };

  // Client Module Configuration (existing)
  const clientModuleConfig = {
    home: {
      title: "Dashboard", // This title will be overridden by HomeDashboard's internal tab title
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "opportunity",
          label: "Client Gaps",
          isActive: currentTab === "opportunity",
        },
      ], // HomeDashboard now manages its own tabs
      rightAction: null,
    },
    insights: {
      title: "Insights",
      tabs: [
        {
          id: "report",
          label: "Monthly Report",
          isActive: currentTab === "report",
        },
        {
          id: "configure-ai",
          label: "Configure AI",
          isActive: currentTab === "configure-ai",
        },
        {
          id: "amend-output",
          label: "Amend Output",
          isActive: currentTab === "amend-output",
        },
        {
          id: "pdf-viewer",
          label: "PDF Viewer",
          isActive: currentTab === "pdf-viewer",
        },
        //   id: "trends",
        //   label: "Trends & Analytics",
        //   isActive: currentTab === "trends",
        // },
        // {
        //   id: "goals",
        //   label: "Goal Tracking",
        //   isActive: currentTab === "goals",
        // },
      ],
      rightAction: <Button variant="outline">Insights Settings</Button>,
    },
    accounts: {
      title: "Accounts",
      tabs: [],
      rightAction: (
        <Button variant="outline" onClick={() => setCurrentAccountView("add")}>
          Add Account
        </Button>
      ),
    },
    investments: {
      title: "Investments",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "all-holdings",
          label: "All Holdings",
          isActive: currentTab === "all-holdings",
        },
      ],
      rightAction: <Button variant="outline">Investment Settings</Button>,
    },
    transactions: {
      title: "Transactions",
      tabs: [
        {
          id: "feed",
          label: "Transaction Feed",
          isActive: currentTab === "feed",
        },
        {
          id: "recurring",
          label: "Recurring",
          isActive: currentTab === "recurring",
        },
        {
          id: "rules",
          label: "Categorization Rules",
          isActive: currentTab === "rules",
        },
      ],
      rightAction: <Button variant="outline">Transaction Settings</Button>,
    },
    settings: {
      title: "Settings",
      tabs: [],
      rightAction: <Button variant="outline">Spending Settings</Button>,
    },
    spending: {
      title: "Spending",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "breakdown",
          label: "Breakdown & Trends",
          isActive: currentTab === "breakdown",
        },
        {
          id: "merchants",
          label: "Merchants",
          isActive: currentTab === "merchants",
        },
      ],
      rightAction: <Button variant="outline">Spending Settings</Button>,
    },
    debts: {
      title: "Debts",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "manage",
          label: "Manage Debts",
          isActive: currentTab === "manage",
        },
        {
          id: "strategy",
          label: "Strategy & Acceleration",
          isActive: currentTab === "strategy",
        },
      ],
      rightAction: <Button variant="outline">Debt Settings</Button>,
    },
    budgets: {
      title: "Budgets",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "manage",
          label: "Manage Budget",
          isActive: currentTab === "manage",
        },
        {
          id: "insights",
          label: "Insights & Projections",
          isActive: currentTab === "insights",
        },
      ],
      rightAction: <Button variant="outline">Budget Settings</Button>,
    },
    goals: {
      title: "Goals",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        { id: "ideas", label: "Goal Ideas", isActive: currentTab === "ideas" },
        { id: "history", label: "History", isActive: currentTab === "history" },
      ],
      rightAction: <Button variant="outline">Goal Settings</Button>,
    },
    retirement: {
      title: "Retirement",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "plan-details",
          label: "Plan Details",
          isActive: currentTab === "plan-details",
        },
        {
          id: "lifestyle",
          label: "Lifestyle Visualizer",
          isActive: currentTab === "lifestyle",
        },
      ],
      rightAction: <Button variant="outline">Retirement Settings</Button>,
    },
    support: {
      title: "Support",
      tabs: [],
      rightAction: <Button variant="outline">Support Settings</Button>,
    },
    taxes: {
      title: "Taxes",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "preparation",
          label: "Tax Preparation",
          isActive: currentTab === "preparation",
        },
        {
          id: "transactions",
          label: "Tax Transactions",
          isActive: currentTab === "transactions",
        },
        {
          id: "history",
          label: "History & Documents",
          isActive: currentTab === "history",
        },
      ],
      rightAction: <Button variant="outline">Tax Settings</Button>,
    },
    insurance: {
      title: "Insurance",
      tabs: [
        {
          id: "overview",
          label: "Overview",
          isActive: currentTab === "overview",
        },
        {
          id: "policies",
          label: "My Policies",
          isActive: currentTab === "policies",
        },
        {
          id: "needs-assessment",
          label: "Needs Assessment",
          isActive: currentTab === "needs-assessment",
        },
      ],
      rightAction: <Button variant="outline">Insurance Settings</Button>,
    },
  };

  // Render CRM Content
  const renderCRMContent = () => {
    switch (currentCRMModule) {
      case "dashboard":
        return (
          <PlannerDashboard
            // clients={clients} // Pass clients prop here
            onNavigateToClients={() => setCurrentCRMModule("clients")}
            onNavigateToClient={handleClientSelection}
            onNavigateToAppointments={() => setCurrentCRMModule("appointments")}
            onNavigateToTasks={() => setCurrentCRMModule("tasks")}
          />
        );
      case "clients":
        if (loadingClients)
          return (
            <div className="p-6 text-sm text-muted-foreground">
              Loading clients…
            </div>
          );
        if (errorClients)
          return <div className="p-6 text-sm text-red-600">Error: {error}</div>;

        return (
          <ClientsList
            clients={clients}
            onNavigateToClient={handleClientSelection}
            onAddClient={openAddClientModal}
          />
        );
      case "prospects":
        return <ProspectsManagement />;
      case "appointments":
        return <AppointmentsCalendar />;
      case "tasks":
        return <TasksManagement />;
      case "reports":
        return <ReportsDashboard />;
      case "analytics":
        // Pass the clients array here to PortfolioAnalytics
        return <PortfolioAnalytics clients={clients} />;
      case "goal-tracking":
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Goal Tracking</h3>
              <p>Aggregate goal tracking across all clients coming soon...</p>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Client Reviews</h3>
              <p>Client review management system coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return <PlannerSettings />;
      case "support":
        return <Support />;
      default:
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">{currentCRMModule}</h3>
              <p>This CRM module is coming soon...</p>
            </div>
          </div>
        );
    }
  };

  // Render Client Content (existing PFM logic) - This section remains largely unchanged.
  const renderClientContent = () => {
    if (currentModule === "home") {
      if (currentTab === "overview") {
        return (
          <HomeDashboardOverview clientData={currentClient || undefined} />
        ); /* <-- Pass clientData here */
      }
      return (
        <HomeDashboardOpportunity clientData={currentClient || undefined} />
      ); /* <-- Pass clientData here */
    }
    if (currentModule === "settings") {
      return <ClientSettings />; /* <-- Pass clientData here */
    }
    if (currentModule === "support") {
      return <Support />; /* <-- Pass clientData here */
    }
    if (currentModule === "insights") {
      if (currentTab === "report") {
        return <InsightsReport onNavigateToModule={handleInsightsNavigation} />;
      }
      if (currentTab === "configure-ai") {
        return <PromptConfigPage />;
      }
      if (currentTab === "amend-output") {
        return <AmendOutputPage />;
      }
      if (currentTab === "pdf-viewer") {
        return <PromptConfigPage />;
      }
      return (
        <div className="flex items-center justify-center h-96 text-muted-foreground">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">
              {
                clientModuleConfig[
                  currentModule as keyof typeof clientModuleConfig
                ]?.title
              }{" "}
              -{" "}
              {
                clientModuleConfig[
                  currentModule as keyof typeof clientModuleConfig
                ]?.tabs.find((t) => t.id === currentTab)?.label
              }
            </h3>
            <p>Content for this section is coming soon...</p>
          </div>
        </div>
      );
    }

    if (currentModule === "goals") {
      if (currentGoalView === "details") {
        return (
          <GoalDetails
            goalId={selectedGoalId}
            onBack={() => setCurrentGoalView("overview")}
          />
        );
      }
      if (currentGoalView === "ideas") {
        return <GoalIdeas onBack={() => setCurrentGoalView("overview")} />;
      }
      if (currentGoalView === "history") {
        return <GoalHistory onBack={() => setCurrentGoalView("overview")} />;
      }
      if (currentGoalView === "create") {
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Create New Goal</h3>
              <p>Goal creation form coming soon...</p>
              <Button
                onClick={() => setCurrentGoalView("overview")}
                className="mt-4"
              >
                Back to Overview
              </Button>
            </div>
          </div>
        );
      }
      return (
        <GoalsOverview
          onNavigateToGoalDetails={(goalId) => {
            setSelectedGoalId(goalId);
            setCurrentGoalView("details");
          }}
          onNavigateToCreateGoal={() => setCurrentGoalView("create")}
          onNavigateToGoalIdeas={() => setCurrentGoalView("ideas")}
          onNavigateToGoalHistory={() => setCurrentGoalView("history")}
        />
      );
    }

    if (currentModule === "accounts") {
      if (currentAccountView === "details") {
        return (
          <AccountDetails
            accountId={selectedAccountId}
            onBack={() => setCurrentAccountView("overview")}
          />
        );
      }
      if (currentAccountView === "add") {
        return <AddAccount onBack={() => setCurrentAccountView("overview")} />;
      }
      return (
        <AccountsOverview
          onNavigateToAccount={(accountId) => {
            setSelectedAccountId(accountId);
            setCurrentAccountView("details");
          }}
          onNavigateToAddAccount={() => setCurrentAccountView("add")}
        />
      );
    }

    if (currentModule === "investments") {
      if (currentTab === "all-holdings") {
        return <AllHoldings onBack={() => setCurrentTab("overview")} />;
      }
      if (currentInvestmentView === "account-details") {
        return (
          <InvestmentAccountDetails
            accountId={selectedInvestmentAccountId}
            onBack={() => setCurrentInvestmentView("overview")}
          />
        );
      }
      return (
        <InvestmentOverview
          onNavigateToAccount={(accountId) => {
            setSelectedInvestmentAccountId(accountId);
            setCurrentInvestmentView("account-details");
          }}
          onNavigateToAllHoldings={() => setCurrentTab("all-holdings")}
          onNavigateToAddAccount={() => setCurrentInvestmentView("add-account")}
        />
      );
    }

    if (currentModule === "transactions") {
      if (currentTransactionView === "details") {
        return (
          <TransactionDetails
            transactionId={selectedTransactionId}
            onBack={() => setCurrentTransactionView("feed")}
          />
        );
      }
      if (currentTransactionView === "recurring") {
        return (
          <RecurringTransactions
            onBack={() => setCurrentTransactionView("feed")}
          />
        );
      }
      if (currentTransactionView === "rules") {
        return (
          <CategorizationRules
            onBack={() => setCurrentTransactionView("feed")}
          />
        );
      }
      return (
        <TransactionsFeed
          onTransactionClick={(transactionId) => {
            setSelectedTransactionId(transactionId);
            setCurrentTransactionView("details");
          }}
          onAddTransaction={() => {
            console.log("Add transaction");
          }}
        />
      );
    }

    if (currentModule === "spending") {
      if (currentTab === "breakdown") {
        return <SpendingBreakdown onBack={() => setCurrentTab("overview")} />;
      }
      if (currentTab === "merchants") {
        return <SpendingMerchants onBack={() => setCurrentTab("overview")} />;
      }
      return (
        <SpendingOverview
          onNavigateToBreakdown={() => setCurrentTab("breakdown")}
          onNavigateToCategory={(categoryId) => {
            console.log("Navigate to category:", categoryId);
          }}
        />
      );
    }

    if (currentModule === "budgets") {
      if (currentTab === "manage") {
        return <BudgetManage onBack={() => setCurrentTab("overview")} />;
      }
      if (currentTab === "insights") {
        return <BudgetInsights onBack={() => setCurrentTab("overview")} />;
      }
      return (
        <BudgetOverview
          onNavigateToManage={() => setCurrentTab("manage")}
          onNavigateToInsights={() => setCurrentTab("insights")}
        />
      );
    }

    if (currentModule === "debts") {
      if (currentDebtView === "manage") {
        return (
          <ManageDebts
            onBack={() => setCurrentDebtView("overview")}
            onNavigateToLoanDetails={(loanId) => {
              setSelectedLoanId(loanId);
              setCurrentDebtView("loan-details");
            }}
            onNavigateToAddDebt={() => setCurrentDebtView("add")}
          />
        );
      }
      if (currentDebtView === "loan-details") {
        return (
          <LoanDetails
            loanId={selectedLoanId}
            onBack={() => setCurrentDebtView("manage")}
          />
        );
      }
      if (currentDebtView === "strategy") {
        return <DebtStrategy onBack={() => setCurrentDebtView("overview")} />;
      }
      if (currentDebtView === "add") {
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Add New Debt</h3>
              <p>Add debt functionality coming soon...</p>
              <Button
                onClick={() => setCurrentDebtView("overview")}
                className="mt-4"
              >
                Back to Overview
              </Button>
            </div>
          </div>
        );
      }
      return (
        <DebtOverview
          onNavigateToManage={() => setCurrentDebtView("manage")}
          onNavigateToStrategy={() => setCurrentDebtView("strategy")}
          onNavigateToAddDebt={() => setCurrentDebtView("add")}
        />
      );
    }

    if (currentModule === "retirement") {
      if (currentTab === "plan-details") {
        return (
          <RetirementPlanDetails onBack={() => setCurrentTab("overview")} />
        );
      }
      if (currentTab === "lifestyle") {
        return (
          <RetirementLifestyleVisualizer
            onBack={() => setCurrentTab("overview")}
          />
        );
      }
      return (
        <RetirementOverview
          onNavigateToPlanDetails={() => setCurrentTab("plan-details")}
          onNavigateToLifestyle={() => setCurrentTab("lifestyle")}
        />
      );
    }

    if (currentModule === "taxes") {
      if (currentTaxView === "preparation") {
        return <TaxPreparation onBack={() => setCurrentTaxView("overview")} />;
      }
      if (currentTaxView === "transactions") {
        return <TaxTransactions onBack={() => setCurrentTaxView("overview")} />;
      }
      if (currentTaxView === "history") {
        return <TaxHistory onBack={() => setCurrentTaxView("overview")} />;
      }
      return (
        <TaxOverview
          onNavigateToPreparation={() => setCurrentTaxView("preparation")}
          onNavigateToTransactions={() => setCurrentTaxView("transactions")}
          onNavigateToHistory={() => setCurrentTaxView("history")}
        />
      );
    }

    if (currentModule === "insurance") {
      if (currentInsuranceView === "policies") {
        return (
          <MyPolicies
            onBack={() => setCurrentInsuranceView("overview")}
            onNavigateToPolicyDetails={(policyId) => {
              setSelectedPolicyId(policyId);
              setCurrentInsuranceView("policy-details");
            }}
            onNavigateToAddPolicy={() => {
              console.log("Add policy");
            }}
          />
        );
      }
      if (currentInsuranceView === "policy-details") {
        return (
          <PolicyDetails
            policyId={selectedPolicyId}
            onBack={() => setCurrentInsuranceView("policies")}
          />
        );
      }
      if (currentInsuranceView === "needs-assessment") {
        return (
          <InsuranceNeedsAssessment
            onBack={() => setCurrentInsuranceView("overview")}
          />
        );
      }
      return (
        <InsuranceOverview
          onNavigateToPolicies={() => setCurrentInsuranceView("policies")}
          onNavigateToNeedsAssessment={() =>
            setCurrentInsuranceView("needs-assessment")
          }
          onNavigateToAddPolicy={() => {
            console.log("Add policy");
          }}
          onNavigateToPolicyDetails={(policyId) => {
            setSelectedPolicyId(policyId);
            setCurrentInsuranceView("policy-details");
          }}
        />
      );
    }

    // Placeholder content for other modules/tabs
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            {
              clientModuleConfig[
                currentModule as keyof typeof clientModuleConfig
              ]?.title
            }{" "}
            -{" "}
            {
              clientModuleConfig[
                currentModule as keyof typeof clientModuleConfig
              ]?.tabs.find((t) => t.id === currentTab)?.label
            }
          </h3>
          <p>Content for this section is coming soon...</p>
        </div>
      </div>
    );
  };

  // Determine current configuration
  // For 'home' module, the tabs and title are now handled internally by HomeDashboard
  // So, we can keep the outer ModuleTabs logic simple, as HomeDashboard will manage its own internal tabs.
  const currentConfig =
    currentView === "crm"
      ? crmModuleConfig[currentCRMModule as keyof typeof crmModuleConfig] ||
        crmModuleConfig.dashboard
      : clientModuleConfig[currentModule as keyof typeof clientModuleConfig] ||
        clientModuleConfig.home;
  console.log("CURRENTTA", currentTab);

  console.log("CURRENTCONFIG", currentConfig);
  console.log("CURRENTMODULE", currentModule);
  return (
    <div className="min-h-screen">
      <GlobalHeader
        currentView={currentView}
        clientData={currentClient || undefined}
        plannerData={plannerData}
        onBack={handleBackToCRM}
      />

      <div className="pt-16">
        <SidebarProvider>
          {currentView === "crm" ? (
            <PlannerSidebar
              onNavigate={handleCRMNavigation}
              currentModule={currentCRMModule}
            />
          ) : (
            <AppSidebar
              onNavigate={handleClientNavigation}
              currentModule={currentModule}
            />
          )}

          <SidebarInset>
            <header className="flex shrink-0 gap-2 border-b px-4 h-12 items-center">
              <div className="flex items-center justify-between flex-1">
                <div className="flex items-center space-x-6">
                  {/* Changed the title logic. For 'home' module, HomeDashboard itself handles the 'Overview'/'Opportunities' title. */}
                  {currentModule === "home" ? (
                    <h1 className="text-lg font-semibold">
                      {currentClient?.name
                        ? `${currentClient.name}'s Dashboard`
                        : "Client Dashboard"}
                    </h1>
                  ) : (
                    <h1 className="text-lg font-semibold">
                      {currentConfig.title}
                    </h1>
                  )}

                  {/* Removed ModuleTabs for 'home' module as HomeDashboard handles its own tabs */}
                  {/* {currentModule !== "home" && */}
                  {currentConfig.tabs.length > 0 && (
                    <ModuleTabs
                      tabs={currentConfig.tabs}
                      onTabChange={handleTabChange}
                    />
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {currentConfig.rightAction}
                  <div className="text-sm font-medium text-gray-600">
                    {getCurrentDate()}
                  </div>
                </div>
              </div>
            </header>

            {isTransitioning ? (
              <LoadingScreen />
            ) : (
              <main className="flex-1 p-6 pt-6">
                {
                  currentView === "crm"
                    ? renderCRMContent() // Planner
                    : renderClientContent() // Client
                }
              </main>
            )}
          </SidebarInset>
        </SidebarProvider>
      </div>

      {/* Render the ClientAddModal here, controlled by state */}
      <ClientAddModal
        isOpen={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
        onClientAdded={handleAddNewClient}
      />
    </div>
  );
}
