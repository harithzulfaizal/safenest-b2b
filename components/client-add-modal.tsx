// components/client-add-modal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { CalendarIcon, FileText, Loader2, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

// --- INTERFACES ---

export interface ClientActionItem {
  type:
    | "Meeting"
    | "Email"
    | "Contract Renewal"
    | "Review"
    | "Follow-up"
    | "Other";
  description: string;
  dueDate: string; // ISO string format for date (e.g., "2024-07-31")
  status: "Pending" | "Completed" | "Overdue";
}

interface StaticInsuranceProduct {
  id: string;
  name: string;
  provider: string;
  type: string;
  defaultCoverage?: number;
  defaultPremium?: number;
  defaultMaturityAge?: number;
  notes?: string;
}

interface StaticInvestmentProduct {
  id: string;
  name: string;
  fundManager: string;
  type: string;
  defaultInitialInvestment?: number;
  defaultRiskLevel?: "Low" | "Medium" | "High";
  defaultExpectedReturn?: number;
  notes?: string;
}

export interface ClientInsuranceProduct {
  instanceId: string; // Unique ID for this specific client's product
  staticProductId: string; // Refers to the ID from STATIC_INSURANCE_PRODUCTS
  name: string;
  provider: string;
  type: string;
  coverageAmount: number | ""; // Use string for input, convert to number for final object
  premium: number | ""; // Use string for input, convert to number for final object
  startDate: string | undefined; // ISO string
  maturityDate: string | undefined; // ISO string
  notes: string;
}

export interface ClientInvestmentProduct {
  instanceId: string; // Unique ID for this specific client's product
  staticProductId: string; // Refers to the ID from STATIC_INVESTMENT_PRODUCTS
  name: string;
  fundManager: string;
  type: string;
  initialInvestment: number | ""; // Use string for input, convert to number for final object
  currentValue: number | ""; // Use string for input, convert to number for final object
  startDate: string | undefined; // ISO string
  riskLevel: string; // Should be "Low" | "Medium" | "High"
  expectedReturn: number | ""; // Use string for input, convert to number for final object
  notes: string;
}

interface FinancialGoalType {
  id: string;
  name: string;
  defaultDescription?: string;
}

interface FinancialGoalPriority {
  id: string;
  name: string;
}

export interface ClientFinancialGoal {
  instanceId: string; // Unique ID for this specific client's goal
  goalTypeId: string; // Refers to the ID from FINANCIAL_GOAL_TYPES
  type: string; // The name of the goal type (e.g., "Retirement Planning")
  description: string;
  priorityId: string; // Refers to the ID from FINANCIAL_GOAL_PRIORITIES (e.g., "medium")
  priority: string; // The name of the priority (e.g., "Medium")
  targetAmount: number | ""; // Use string for input, convert to number for final object
  targetDate: string | undefined; // ISO string
  notes: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  portfolioValue: number;
  monthlyReturn: number;
  lastContact: string;
  nextReview: string;
  status: "active" | "needs-attention" | "inactive";
  riskProfile: "Conservative" | "Moderate" | "Aggressive";
  joinDate: string;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dateOfBirth?: string;
  address?: string;
  notes?: string; // This is for internal notes
  investmentPreferences: string[];
  sourceOfLead?: string;
  lifetimeRevenue: number;
  actionItems?: ClientActionItem[];
  // NEW FIELDS
  annualIncome?: number;
  annualExpenses?: number;
  insuranceProducts?: ClientInsuranceProduct[];
  investmentProducts?: ClientInvestmentProduct[];
  tags?: string[];
  financialGoals?: ClientFinancialGoal[];
}

interface ClientAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: (newClient: Client) => void;
}

// NEW: Type for storing pending form data in localStorage
// Note: Dates are stored as ISO strings in localStorage, and converted to Date objects for state.
interface PendingClientFormState {
  tempClientId: string;
  clientName: string; // A display name for the sidebar
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string | undefined;
  address: string;
  selectedTags: string[];
  portfolioValue: string; // Still string for input field
  annualIncome: string; // Still string for input field
  annualExpenses: string; // Still string for input field
  status: Client["status"];
  joinDate: string | undefined;
  notes: string;
  riskProfile: Client["riskProfile"];
  investmentPreferences: string[];
  sourceOfLead: string;
  nextReviewDate: string | undefined;
  currentInsuranceProducts: Omit<
    ClientInsuranceProduct,
    "startDate" | "maturityDate"
  > &
    { startDate: string | undefined; maturityDate: string | undefined }[];
  currentInvestmentProducts: Omit<ClientInvestmentProduct, "startDate"> &
    { startDate: string | undefined }[];
  currentFinancialGoals: Omit<ClientFinancialGoal, "targetDate"> &
    { targetDate: string | undefined }[];
}

// --- STATIC DATA SOURCES (moved outside the component) ---
const STATIC_INSURANCE_PRODUCTS: StaticInsuranceProduct[] = [
  {
    id: "prudential-flexilife",
    name: "FlexiLife",
    provider: "Prudential Assurance Malaysia",
    type: "Whole Life Insurance",
    defaultCoverage: 250000,
    defaultPremium: 3000,
    defaultMaturityAge: 100,
    notes: "A flexible whole life plan with investment components.",
  },
  {
    id: "aia-healthshield",
    name: "HealthShield Gold Max",
    provider: "AIA Bhd.",
    type: "Medical Card",
    defaultCoverage: 500000,
    defaultPremium: 1500,
    notes:
      "Comprehensive medical and hospitalization coverage, high annual limit.",
  },
  {
    id: "etiqa-takaful-incomecare",
    name: "IncomeCare Takaful",
    provider: "Etiqa Takaful Bhd.",
    type: "Critical Illness Takaful",
    defaultCoverage: 150000,
    defaultPremium: 1000,
    notes: "Shariah-compliant critical illness coverage for 36 diseases.",
  },
  {
    id: "hongleong-sureprotect",
    name: "SureProtect Term Life",
    provider: "Hong Leong Assurance Bhd.",
    type: "Term Life Insurance",
    defaultCoverage: 200000,
    defaultPremium: 800,
    notes: "Affordable protection for a fixed term, renewable.",
  },
  {
    id: "generali-wealth-booster",
    name: "Wealth Booster",
    provider: "Generali Malaysia",
    type: "Investment-Linked Insurance",
    defaultCoverage: 100000,
    defaultPremium: 5000,
    notes:
      "Combines protection with investment opportunities in selected funds.",
  },
];

const STATIC_INVESTMENT_PRODUCTS: StaticInvestmentProduct[] = [
  {
    id: "kenanga-growth-fund",
    name: "Kenanga Growth Fund",
    fundManager: "Kenanga Investors Berhad",
    type: "Unit Trust",
    defaultInitialInvestment: 5000,
    defaultRiskLevel: "High",
    defaultExpectedReturn: 12,
    notes:
      "Actively managed fund focusing on high-growth equities in Malaysia.",
  },
  {
    id: "cimb-bond-fund",
    name: "CIMB Islamic Enhanced Bond Fund",
    fundManager: "CIMB-Principal Asset Management",
    type: "Unit Trust",
    defaultInitialInvestment: 10000,
    defaultRiskLevel: "Low",
    defaultExpectedReturn: 4,
    notes: "Shariah-compliant fixed income fund investing in sukuk and bonds.",
  },
  {
    id: "myetf-ftse-bursa-malaysia",
    name: "MyETF FTSE Bursa Malaysia Mid 70",
    fundManager: "Amanah Saham Nasional Berhad (ASNB)",
    type: "ETF",
    defaultInitialInvestment: 1000,
    defaultRiskLevel: "Medium",
    defaultExpectedReturn: 7,
    notes:
      "Tracks the performance of the FTSE Bursa Malaysia Mid 70 Index, low expense ratio.",
  },
  {
    id: "global-equity-portfolio",
    name: "Global Equity Portfolio (Sample)",
    fundManager: "Independent / Brokerage",
    type: "Stock Portfolio",
    defaultInitialInvestment: 20000,
    defaultRiskLevel: "High",
    defaultExpectedReturn: 10,
    notes:
      "A diversified portfolio of international stocks, managed by a broker.",
  },
  {
    id: "pru-global-absolute-return",
    name: "Prudential Global Absolute Return Fund",
    fundManager: "Eastspring Investments",
    type: "Unit Trust",
    defaultInitialInvestment: 3000,
    defaultRiskLevel: "Medium",
    defaultExpectedReturn: 6,
    notes: "Aims for positive returns in all market conditions.",
  },
];

const COMMON_CLIENT_TAGS = [
  "High Net Worth (HNW)",
  "Retirement Planning Focused",
  "Young Professional",
  "Family Planning",
  "Business Owner",
  "Debt Management",
  "Estate Planning",
  "Aggressive Investor",
  "Income Seeker",
  "New Client (First Year)",
  "Existing Portfolio Review",
];

const FINANCIAL_GOAL_TYPES: FinancialGoalType[] = [
  {
    id: "retirement",
    name: "Retirement Planning",
    defaultDescription: "Plan for a comfortable retirement.",
  },
  {
    id: "education",
    name: "Child's Education Fund",
    defaultDescription: "Save for future education expenses.",
  },
  {
    id: "home-purchase",
    name: "Home Purchase",
    defaultDescription: "Save for a down payment or property investment.",
  },
  {
    id: "wealth-accumulation",
    name: "Wealth Accumulation",
    defaultDescription: "Grow overall net worth.",
  },
  {
    id: "debt-reduction",
    name: "Debt Reduction",
    defaultDescription: "Strategize to reduce and eliminate debt.",
  },
  {
    id: "investment-property",
    name: "Investment Property",
    defaultDescription: "Acquire real estate for investment purposes.",
  },
  {
    id: "emergency-fund",
    name: "Build Emergency Fund",
    defaultDescription: "Establish a financial safety net.",
  },
  {
    id: "legacy-planning",
    name: "Legacy & Estate Planning",
    defaultDescription: "Plan for wealth transfer and succession.",
  },
  { id: "other", name: "Other", defaultDescription: "" },
];

const FINANCIAL_GOAL_PRIORITIES: FinancialGoalPriority[] = [
  { id: "high", name: "High" },
  { id: "medium", name: "Medium" },
  { id: "low", name: "Low" },
];
// --- END STATIC DATA SOURCES ---

// --- LOCAL STORAGE HELPERS ---
const LOCAL_STORAGE_KEY = "pendingClientForms";

const getPendingForms = (): Record<string, PendingClientFormState> => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to parse pending forms from localStorage:", error);
    return {};
  }
};

const savePendingForms = (forms: Record<string, PendingClientFormState>) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms));
    } catch (error) {
      console.error("Failed to save pending forms to localStorage:", error);
    }
  }
};
// --- END LOCAL_STORAGE HELPERS ---

export function ClientAddModal({
  isOpen,
  onClose,
  onClientAdded,
}: ClientAddModalProps) {
  const [activeTab, setActiveTab] = useState("personal-contact");
  const [isPending, startTransition] = useTransition();

  // State for the currently editing temporary client ID
  const [currentTempClientId, setCurrentTempClientId] = useState<string | null>(
    null
  );
  // State for all pending clients loaded from local storage
  const [pendingClientForms, setPendingClientForms] = useState<
    Record<string, PendingClientFormState>
  >({});

  // Temporary states for "add" dropdowns
  const [selectedAddInsuranceProduct, setSelectedAddInsuranceProduct] =
    useState<string>("");
  const [selectedAddInvestmentProduct, setSelectedAddInvestmentProduct] =
    useState<string>("");
  const [selectedAddFinancialGoal, setSelectedAddFinancialGoal] =
    useState<string>("");

  // Form States (matching PendingClientFormState, but with Date objects for dates)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [portfolioValue, setPortfolioValue] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [annualExpenses, setAnnualExpenses] = useState("");
  const [status, setStatus] = useState<Client["status"]>("active");
  const [joinDate, setJoinDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState(""); // This is for internal notes

  const [riskProfile, setRiskProfile] =
    useState<Client["riskProfile"]>("Moderate");
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>(
    []
  );
  const [sourceOfLead, setSourceOfLead] = useState("");
  const [nextReviewDate, setNextReviewDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() + 3)) // Default to 3 months from now
  );

  // States for nested products/goals (Date objects for dates here)
  const [currentInsuranceProducts, setCurrentInsuranceProducts] = useState<
    (Omit<ClientInsuranceProduct, "startDate" | "maturityDate"> & {
      startDate: Date | undefined;
      maturityDate: Date | undefined;
    })[]
  >([]);
  const [currentInvestmentProducts, setCurrentInvestmentProducts] = useState<
    (Omit<ClientInvestmentProduct, "startDate"> & {
      startDate: Date | undefined;
    })[]
  >([]);
  const [currentFinancialGoals, setCurrentFinancialGoals] = useState<
    (Omit<ClientFinancialGoal, "targetDate"> & {
      targetDate: Date | undefined;
    })[]
  >([]);

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- LOCAL STORAGE EFFECTS & HELPERS ---

  // Helper to clear all form states
  const clearCurrentFormState = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setDateOfBirth(undefined);
    setAddress("");
    setSelectedTags([]);
    setPortfolioValue("");
    setAnnualIncome("");
    setAnnualExpenses("");
    setStatus("active");
    setJoinDate(new Date());
    setNotes("");
    setRiskProfile("Moderate");
    setInvestmentPreferences([]);
    setSourceOfLead("");
    setNextReviewDate(new Date(new Date().setMonth(new Date().getMonth() + 3)));
    setCurrentInsuranceProducts([]);
    setCurrentInvestmentProducts([]);
    setCurrentFinancialGoals([]);
    setErrors({});
    setActiveTab("personal-contact");
    setSelectedAddInsuranceProduct("");
    setSelectedAddInvestmentProduct("");
    setSelectedAddFinancialGoal("");
  }, []);

  // Helper to start a brand new, empty form with a new temp ID
  const startNewForm = useCallback(() => {
    clearCurrentFormState();
    setCurrentTempClientId(`temp-${Date.now()}`);
  }, [clearCurrentFormState]);

  // Load pending forms on component mount/modal open
  useEffect(() => {
    if (isOpen) {
      const forms = getPendingForms();
      setPendingClientForms(forms);
      // If there are no existing pending forms, or no current one is active, start a new form
      if (Object.keys(forms).length === 0 && !currentTempClientId) {
        startNewForm();
      } else if (Object.keys(forms).length > 0 && !currentTempClientId) {
        // If there are pending forms but no form is actively loaded, default to the first one
        // or prompt the user to load/start new. For now, we'll auto-load the first if nothing is active.
        const firstFormId = Object.keys(forms)[0];
        if (firstFormId) {
          loadFormState(forms[firstFormId]);
        } else {
          startNewForm(); // Fallback if for some reason the forms object is weird
        }
      }
    }
  }, [isOpen]); // Only re-run when modal open state changes

  // Loads a selected pending form state into the current form
  const loadFormState = useCallback(
    (formState: PendingClientFormState) => {
      clearCurrentFormState(); // Clear current form before loading new state
      // Set all state variables from the loaded formState
      setName(formState.name);
      setEmail(formState.email);
      setPhone(formState.phone);
      setDateOfBirth(
        formState.dateOfBirth ? parseISO(formState.dateOfBirth) : undefined
      );
      setAddress(formState.address);
      setSelectedTags(formState.selectedTags);
      setPortfolioValue(formState.portfolioValue);
      setAnnualIncome(formState.annualIncome);
      setAnnualExpenses(formState.annualExpenses);
      setStatus(formState.status);
      setJoinDate(
        formState.joinDate ? parseISO(formState.joinDate) : undefined
      );
      setNotes(formState.notes);
      setRiskProfile(formState.riskProfile);
      setInvestmentPreferences(formState.investmentPreferences);
      setSourceOfLead(formState.sourceOfLead);
      setNextReviewDate(
        formState.nextReviewDate
          ? parseISO(formState.nextReviewDate)
          : undefined
      );

      // Convert date strings back to Date objects for nested products/goals
      setCurrentInsuranceProducts(
        formState.currentInsuranceProducts.map((p) => ({
          ...p,
          startDate: p.startDate ? parseISO(p.startDate) : undefined,
          maturityDate: p.maturityDate ? parseISO(p.maturityDate) : undefined,
        }))
      );
      setCurrentInvestmentProducts(
        formState.currentInvestmentProducts.map((p) => ({
          ...p,
          startDate: p.startDate ? parseISO(p.startDate) : undefined,
        }))
      );
      setCurrentFinancialGoals(
        formState.currentFinancialGoals.map((g) => ({
          ...g,
          targetDate: g.targetDate ? parseISO(g.targetDate) : undefined,
        }))
      );

      setCurrentTempClientId(formState.tempClientId); // Crucially, set the active ID to the loaded one
      setErrors({}); // Clear any previous errors
    },
    [clearCurrentFormState]
  );

  // Callback to save current form state to localStorage
  const saveCurrentFormState = useCallback(() => {
    if (!currentTempClientId || !isOpen) return; // Only save if a temp client is active and modal is open

    const formState: PendingClientFormState = {
      tempClientId: currentTempClientId,
      clientName:
        name.trim() || `Untitled Client ${currentTempClientId.substring(5, 9)}`,
      name: name,
      email: email,
      phone: phone,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : undefined,
      address: address,
      selectedTags: selectedTags,
      portfolioValue: portfolioValue,
      annualIncome: annualIncome,
      annualExpenses: annualExpenses,
      status: status,
      joinDate: joinDate ? format(joinDate, "yyyy-MM-dd") : undefined,
      notes: notes,
      riskProfile: riskProfile,
      investmentPreferences: investmentPreferences,
      sourceOfLead: sourceOfLead,
      nextReviewDate: nextReviewDate
        ? format(nextReviewDate, "yyyy-MM-dd")
        : undefined,
      // Convert Date objects to ISO strings for saving
      currentInsuranceProducts: currentInsuranceProducts.map((p) => ({
        ...p,
        startDate: p.startDate ? format(p.startDate, "yyyy-MM-dd") : undefined,
        maturityDate: p.maturityDate
          ? format(p.maturityDate, "yyyy-MM-dd")
          : undefined,
      })),
      currentInvestmentProducts: currentInvestmentProducts.map((p) => ({
        ...p,
        startDate: p.startDate ? format(p.startDate, "yyyy-MM-dd") : undefined,
      })),
      currentFinancialGoals: currentFinancialGoals.map((g) => ({
        ...g,
        targetDate: g.targetDate
          ? format(g.targetDate, "yyyy-MM-dd")
          : undefined,
      })),
    };

    setPendingClientForms((prev) => {
      const updatedForms = { ...prev, [currentTempClientId]: formState };
      savePendingForms(updatedForms);
      return updatedForms;
    });
  }, [
    isOpen,
    currentTempClientId,
    name,
    email,
    phone,
    dateOfBirth,
    address,
    selectedTags,
    portfolioValue,
    annualIncome,
    annualExpenses,
    status,
    joinDate,
    notes,
    riskProfile,
    investmentPreferences,
    sourceOfLead,
    nextReviewDate,
    currentInsuranceProducts,
    currentInvestmentProducts,
    currentFinancialGoals,
  ]);

  // Debounced effect to save current form state to localStorage
  // This triggers when any form field state changes
  useEffect(() => {
    if (currentTempClientId) {
      // Small debounce to avoid saving on every keystroke
      const timeoutId = setTimeout(saveCurrentFormState, 1000);
      return () => clearTimeout(timeoutId); // Cleanup function to clear timeout if state changes before 1s
    }
  }, [
    currentTempClientId,
    name,
    email,
    phone,
    dateOfBirth,
    address,
    selectedTags,
    portfolioValue,
    annualIncome,
    annualExpenses,
    status,
    joinDate,
    notes,
    riskProfile,
    investmentPreferences,
    sourceOfLead,
    nextReviewDate,
    currentInsuranceProducts,
    currentInvestmentProducts,
    currentFinancialGoals,
    saveCurrentFormState, // Also depends on the save function itself, though it's useCallback'd
  ]);

  // Deletes a pending client from localStorage and the pendingForms state
  const deletePendingClient = useCallback(
    (idToDelete: string) => {
      setPendingClientForms((prev) => {
        const updatedForms = { ...prev };
        delete updatedForms[idToDelete];
        savePendingForms(updatedForms);
        return updatedForms;
      });
      // If the client being deleted is the one currently active in the form, clear the form and start a new one.
      if (currentTempClientId === idToDelete) {
        startNewForm(); // Start a fresh form after deleting the active one
      }
    },
    [currentTempClientId, startNewForm]
  );

  // --- END LOCAL STORAGE HELPERS ---

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Personal & Contact Tab Validation
    if (!name.trim()) newErrors.name = "Full Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    // Financial & Service Tab Validation
    if (!portfolioValue.trim()) {
      newErrors.portfolioValue = "Initial Portfolio Value is required.";
    } else if (isNaN(parseFloat(portfolioValue))) {
      newErrors.portfolioValue = "Initial Portfolio Value must be a number.";
    } else if (parseFloat(portfolioValue) < 0) {
      newErrors.portfolioValue = "Portfolio Value cannot be negative.";
    }
    if (annualIncome.trim() && isNaN(parseFloat(annualIncome))) {
      newErrors.annualIncome = "Annual Income must be a number.";
    } else if (annualIncome.trim() && parseFloat(annualIncome) < 0) {
      newErrors.annualIncome = "Annual Income cannot be negative.";
    }
    if (annualExpenses.trim() && isNaN(parseFloat(annualExpenses))) {
      newErrors.annualExpenses = "Annual Expenses must be a number.";
    } else if (annualExpenses.trim() && parseFloat(annualExpenses) < 0) {
      newErrors.annualExpenses = "Annual Expenses cannot be negative.";
    }
    if (!joinDate) newErrors.joinDate = "Join Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInvestmentPreferenceChange = (pref: string, checked: boolean) => {
    setInvestmentPreferences((prev) =>
      checked ? [...prev, pref] : prev.filter((p) => p !== pref)
    );
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tag] : prev.filter((p) => p !== tag)
    );
  };

  // --- Nested Product/Goal Management Functions ---

  const addInsuranceProduct = (staticProductId: string) => {
    const staticProduct = STATIC_INSURANCE_PRODUCTS.find(
      (p) => p.id === staticProductId
    );
    if (staticProduct) {
      setCurrentInsuranceProducts((prev) => [
        ...prev,
        {
          instanceId: `ins-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`, // Unique instance ID
          staticProductId: staticProduct.id,
          name: staticProduct.name,
          provider: staticProduct.provider,
          type: staticProduct.type,
          coverageAmount: staticProduct.defaultCoverage ?? "", // Use '' for empty number input
          premium: staticProduct.defaultPremium ?? "",
          startDate: undefined,
          maturityDate: undefined,
          notes: staticProduct.notes || "",
        },
      ]);
      setSelectedAddInsuranceProduct(""); // Reset the select dropdown
    }
  };

  const updateInsuranceProduct = (
    instanceId: string,
    field: keyof (Omit<ClientInsuranceProduct, "startDate" | "maturityDate"> & {
      startDate: Date | undefined;
      maturityDate: Date | undefined;
    }),
    value: any
  ) => {
    setCurrentInsuranceProducts((prev) =>
      prev.map((p) =>
        p.instanceId === instanceId ? { ...p, [field]: value } : p
      )
    );
  };

  const removeInsuranceProduct = (instanceId: string) => {
    setCurrentInsuranceProducts((prev) =>
      prev.filter((p) => p.instanceId !== instanceId)
    );
  };

  const addInvestmentProduct = (staticProductId: string) => {
    const staticProduct = STATIC_INVESTMENT_PRODUCTS.find(
      (p) => p.id === staticProductId
    );
    if (staticProduct) {
      setCurrentInvestmentProducts((prev) => [
        ...prev,
        {
          instanceId: `inv-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,
          staticProductId: staticProduct.id,
          name: staticProduct.name,
          fundManager: staticProduct.fundManager,
          type: staticProduct.type,
          initialInvestment: staticProduct.defaultInitialInvestment ?? "",
          currentValue: "", // Default to empty string for current value
          startDate: undefined,
          riskLevel: staticProduct.defaultRiskLevel || "Moderate",
          expectedReturn: staticProduct.defaultExpectedReturn ?? "",
          notes: staticProduct.notes || "",
        },
      ]);
      setSelectedAddInvestmentProduct(""); // Reset the select dropdown
    }
  };

  const updateInvestmentProduct = (
    instanceId: string,
    field: keyof (Omit<ClientInvestmentProduct, "startDate"> & {
      startDate: Date | undefined;
    }),
    value: any
  ) => {
    setCurrentInvestmentProducts((prev) =>
      prev.map((p) =>
        p.instanceId === instanceId ? { ...p, [field]: value } : p
      )
    );
  };

  const removeInvestmentProduct = (instanceId: string) => {
    setCurrentInvestmentProducts((prev) =>
      prev.filter((p) => p.instanceId !== instanceId)
    );
  };

  const addFinancialGoal = (goalTypeId: string) => {
    const goalType = FINANCIAL_GOAL_TYPES.find((t) => t.id === goalTypeId);
    if (goalType) {
      setCurrentFinancialGoals((prev) => [
        ...prev,
        {
          instanceId: `goal-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`,
          goalTypeId: goalType.id,
          type: goalType.name,
          description: goalType.defaultDescription || "",
          priorityId: "medium", // Default priority
          priority:
            FINANCIAL_GOAL_PRIORITIES.find((p) => p.id === "medium")?.name ||
            "Medium",
          targetAmount: "", // Default to empty string for target amount
          targetDate: undefined,
          notes: "",
        },
      ]);
      setSelectedAddFinancialGoal(""); // Reset the select dropdown
    }
  };

  const updateFinancialGoal = (
    instanceId: string,
    field: keyof (Omit<ClientFinancialGoal, "targetDate"> & {
      targetDate: Date | undefined;
    }),
    value: any
  ) => {
    setCurrentFinancialGoals((prev) =>
      prev.map((g) => {
        if (g.instanceId === instanceId) {
          if (field === "priorityId") {
            // Also update the 'priority' string when 'priorityId' changes
            const priorityName =
              FINANCIAL_GOAL_PRIORITIES.find((p) => p.id === value)?.name ||
              value;
            return { ...g, priorityId: value, priority: priorityName };
          }
          return { ...g, [field]: value };
        }
        return g;
      })
    );
  };

  const removeFinancialGoal = (instanceId: string) => {
    setCurrentFinancialGoals((prev) =>
      prev.filter((g) => g.instanceId !== instanceId)
    );
  };

  // --- END Nested Product/Goal Management Functions ---

  const handleFormSubmit = () => {
    if (!validateForm()) {
      // If validation fails, navigate to the first tab with an error
      if (errors.name || errors.email) {
        setActiveTab("personal-contact");
      } else if (
        errors.portfolioValue ||
        errors.joinDate ||
        errors.annualIncome ||
        errors.annualExpenses
      ) {
        setActiveTab("financial-service");
      }
      return;
    }

    startTransition(async () => {
      // Simulate API call to save client data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network latency

      const newClient: Client = {
        id: `client-${Date.now()}`, // Unique ID for the new client
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        dateOfBirth: dateOfBirth
          ? format(dateOfBirth, "yyyy-MM-dd")
          : undefined,
        address: address.trim() || undefined,
        portfolioValue: parseFloat(portfolioValue),
        annualIncome: annualIncome.trim()
          ? parseFloat(annualIncome)
          : undefined,
        annualExpenses: annualExpenses.trim()
          ? parseFloat(annualExpenses)
          : undefined,
        status: status,
        joinDate: joinDate
          ? format(joinDate, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"), // Ensure a default if somehow null
        notes: notes.trim() || undefined, // This is for internal notes
        riskProfile: riskProfile,
        investmentPreferences: investmentPreferences,
        sourceOfLead: sourceOfLead.trim() || undefined,
        nextReview: nextReviewDate
          ? format(nextReviewDate, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"), // Ensure a default
        // Default values for fields not collected in this form but required by interface
        monthlyReturn: 0,
        lastContact: "Today", // Or `format(new Date(), "yyyy-MM-dd")`
        totalGainLoss: 0,
        totalGainLossPercent: 0,
        lifetimeRevenue: 0,
        actionItems: [], // Initialize as empty array for new clients
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        // Convert nested product/goal data to match Client interface (strings for dates, numbers for values)
        insuranceProducts:
          currentInsuranceProducts.length > 0
            ? currentInsuranceProducts.map((p) => ({
                ...p,
                coverageAmount:
                  p.coverageAmount === "" ? 0 : Number(p.coverageAmount),
                premium: p.premium === "" ? 0 : Number(p.premium),
                startDate: p.startDate
                  ? format(p.startDate, "yyyy-MM-dd")
                  : undefined,
                maturityDate: p.maturityDate
                  ? format(p.maturityDate, "yyyy-MM-dd")
                  : undefined,
              }))
            : undefined,
        investmentProducts:
          currentInvestmentProducts.length > 0
            ? currentInvestmentProducts.map((p) => ({
                ...p,
                initialInvestment:
                  p.initialInvestment === "" ? 0 : Number(p.initialInvestment),
                currentValue:
                  p.currentValue === "" ? 0 : Number(p.currentValue),
                expectedReturn:
                  p.expectedReturn === "" ? 0 : Number(p.expectedReturn),
                startDate: p.startDate
                  ? format(p.startDate, "yyyy-MM-dd")
                  : undefined,
              }))
            : undefined,
        financialGoals:
          currentFinancialGoals.length > 0
            ? currentFinancialGoals.map((g) => ({
                ...g,
                targetAmount:
                  g.targetAmount === "" ? 0 : Number(g.targetAmount),
                targetDate: g.targetDate
                  ? format(g.targetDate, "yyyy-MM-dd")
                  : undefined,
              }))
            : undefined,
      };

      onClientAdded(newClient);
      // On successful add, clear the current form and delete the pending client from localStorage
      if (currentTempClientId) {
        deletePendingClient(currentTempClientId);
      }
      clearCurrentFormState(); // Ensure form is truly reset
      setCurrentTempClientId(null); // Explicitly clear the active ID after successful submission
      onClose(); // Close modal after successful submission
    });
  };

  // ShadCN's Dialog onOpenChange provides the new open state.
  // If `open` is false (meaning the dialog is closing), then reset the form.
  const handleDialogClose = useCallback(
    (open: boolean) => {
      if (!open) {
        if (currentTempClientId) {
          // Force an immediate save of the current form state before closing
          // This ensures the latest changes are caught when the user closes the modal without submitting.
          const formState: PendingClientFormState = {
            tempClientId: currentTempClientId,
            clientName:
              name.trim() ||
              `Untitled Client ${currentTempClientId.substring(5, 9)}`,
            name: name,
            email: email,
            phone: phone,
            dateOfBirth: dateOfBirth
              ? format(dateOfBirth, "yyyy-MM-dd")
              : undefined,
            address: address,
            selectedTags: selectedTags,
            portfolioValue: portfolioValue,
            annualIncome: annualIncome,
            annualExpenses: annualExpenses,
            status: status,
            joinDate: joinDate ? format(joinDate, "yyyy-MM-dd") : undefined,
            notes: notes,
            riskProfile: riskProfile,
            investmentPreferences: investmentPreferences,
            sourceOfLead: sourceOfLead,
            nextReviewDate: nextReviewDate
              ? format(nextReviewDate, "yyyy-MM-dd")
              : undefined,
            currentInsuranceProducts: currentInsuranceProducts.map((p) => ({
              ...p,
              startDate: p.startDate
                ? format(p.startDate, "yyyy-MM-dd")
                : undefined,
              maturityDate: p.maturityDate
                ? format(p.maturityDate, "yyyy-MM-dd")
                : undefined,
            })),
            currentInvestmentProducts: currentInvestmentProducts.map((p) => ({
              ...p,
              startDate: p.startDate
                ? format(p.startDate, "yyyy-MM-dd")
                : undefined,
            })),
            currentFinancialGoals: currentFinancialGoals.map((g) => ({
              ...g,
              targetDate: g.targetDate
                ? format(g.targetDate, "yyyy-MM-dd")
                : undefined,
            })),
          };
          setPendingClientForms((prev) => {
            const updatedForms = { ...prev, [currentTempClientId]: formState };
            savePendingForms(updatedForms);
            return updatedForms;
          });
        }

        // Always clear the current form fields and active temp client ID after closing
        clearCurrentFormState();
        setCurrentTempClientId(null); // Explicitly clear the active ID
        onClose();
      }
    },
    [
      currentTempClientId,
      name,
      email,
      phone,
      dateOfBirth,
      address,
      selectedTags,
      portfolioValue,
      annualIncome,
      annualExpenses,
      status,
      joinDate,
      notes,
      riskProfile,
      investmentPreferences,
      sourceOfLead,
      nextReviewDate,
      currentInsuranceProducts,
      currentInvestmentProducts,
      currentFinancialGoals,
      clearCurrentFormState,
      onClose, // Dependencies for useCallback
    ]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      {/* Updated className for DialogContent:
         - `w-[1200px]` and `h-[700px]` provide fixed dimensions.
         - `max-w-[90vw]` and `max-h-[90vh]` ensure it scales down on smaller screens, 
           preventing overflow and maintaining accessibility.
        - `overflow-hidden` prevents scrollbars from appearing on the modal itself. */}
      <DialogContent className="flex flex-col w-[1200px] h-[700px] max-w-[90vw] max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the details for the new client. Required fields are marked
            with *.
          </DialogDescription>
        </DialogHeader>

        {/* This div handles the main content area (sidebar + tabs) and takes remaining vertical space */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for Pending Clients: Fixed width, scrollable content, does not shrink */}
          <aside className="w-[280px] p-4 border-r overflow-y-auto flex-shrink-0 bg-gray-50 dark:bg-gray-900">
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-50">
              Pending Clients
            </h4>
            {Object.keys(pendingClientForms).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No pending clients saved.
              </p>
            ) : (
              <div className="space-y-2">
                {Object.values(pendingClientForms).map((formState) => (
                  <div
                    key={formState.tempClientId}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md border",
                      currentTempClientId === formState.tempClientId
                        ? "bg-blue-100 dark:bg-blue-900 border-blue-300"
                        : "bg-white dark:bg-gray-800 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    )}
                  >
                    <span className="text-sm font-medium truncate flex-grow">
                      {formState.clientName ||
                        `Untitled Client ${formState.tempClientId.substring(
                          5,
                          9
                        )}`}
                    </span>
                    <div className="flex items-center space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => loadFormState(formState)}
                        title="Load this client's details"
                        className="h-7 w-7 p-0"
                        disabled={
                          currentTempClientId === formState.tempClientId
                        }
                      >
                        {currentTempClientId === formState.tempClientId ? (
                          <span className="text-blue-600 dark:text-blue-300 text-xs">
                            Active
                          </span>
                        ) : (
                          <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          deletePendingClient(formState.tempClientId)
                        }
                        title="Delete this pending client"
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={startNewForm}
              >
                Start New Client Form
              </Button>
            </div>
          </aside>

          {/* Main Tabs Area: Takes remaining horizontal space, is a flex column */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full h-full flex flex-col"
            >
              {/* TabsList: Fixed height, does not shrink */}
              <TabsList className="grid w-full grid-cols-6 flex-shrink-0">
                <TabsTrigger value="personal-contact">
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="financial-service">Financials</TabsTrigger>
                <TabsTrigger value="risk-assessment">Risk Profile</TabsTrigger>
                <TabsTrigger value="financial-goals">
                  Client Goals
                  {currentFinancialGoals.length > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                      {currentFinancialGoals.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="insurance-products">
                  Insurances
                  {currentInsuranceProducts.length > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                      {currentInsuranceProducts.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="investment-products">
                  Investments
                  {currentInvestmentProducts.length > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                      {currentInvestmentProducts.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* TabsContent for each tab: Takes remaining vertical space, scrollable content */}
              <TabsContent
                value="personal-contact"
                className="p-4 space-y-4 flex-1 overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="e.g. john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateOfBirth && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? (
                            format(dateOfBirth, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Client's full address"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2 mt-6">
                  <Label>Assign Client Tags</Label>
                  <p className="text-sm text-muted-foreground">
                    Categorize your client for better segmentation and CRM.
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                    {COMMON_CLIENT_TAGS.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.replace(/\s+/g, "-").toLowerCase()}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) =>
                            handleTagChange(tag, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`tag-${tag
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Financial & Service Details Tab */}
              <TabsContent
                value="financial-service"
                className="p-4 space-y-4 flex-1 overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="portfolioValue">
                      Initial Portfolio Value (RM) *
                    </Label>
                    <Input
                      id="portfolioValue"
                      type="number"
                      value={portfolioValue}
                      onChange={(e) => {
                        setPortfolioValue(e.target.value);
                        setErrors((prev) => ({ ...prev, portfolioValue: "" }));
                      }}
                      placeholder="e.g. 100000"
                    />
                    {errors.portfolioValue && (
                      <p className="text-red-500 text-sm">
                        {errors.portfolioValue}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="annualIncome">
                      Estimated Annual Income (RM)
                    </Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={annualIncome}
                      onChange={(e) => {
                        setAnnualIncome(e.target.value);
                        setErrors((prev) => ({ ...prev, annualIncome: "" }));
                      }}
                      placeholder="e.g. 80000"
                    />
                    {errors.annualIncome && (
                      <p className="text-red-500 text-sm">
                        {errors.annualIncome}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="annualExpenses">
                      Estimated Annual Expenses (RM)
                    </Label>
                    <Input
                      id="annualExpenses"
                      type="number"
                      value={annualExpenses}
                      onChange={(e) => {
                        setAnnualExpenses(e.target.value);
                        setErrors((prev) => ({ ...prev, annualExpenses: "" }));
                      }}
                      placeholder="e.g. 50000"
                    />
                    {errors.annualExpenses && (
                      <p className="text-red-500 text-sm">
                        {errors.annualExpenses}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Client Status</Label>
                    <Select
                      value={status}
                      onValueChange={(value: Client["status"]) =>
                        setStatus(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="needs-attention">
                          Needs Attention
                        </SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="joinDate">Client Join Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !joinDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {joinDate ? (
                          format(joinDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={joinDate}
                        onSelect={(date) => {
                          setJoinDate(date);
                          setErrors((prev) => ({ ...prev, joinDate: "" }));
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.joinDate && (
                    <p className="text-red-500 text-sm">{errors.joinDate}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any private notes about the client"
                    rows={3}
                  />
                </div>
              </TabsContent>

              {/* Risk Profile & Preferences Tab */}
              <TabsContent
                value="risk-assessment"
                className="p-4 space-y-4 flex-1 overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="riskProfile">Risk Profile</Label>
                    <Select
                      value={riskProfile}
                      onValueChange={(value: Client["riskProfile"]) =>
                        setRiskProfile(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Conservative">
                          Conservative
                        </SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sourceOfLead">Source of Lead</Label>
                    <Input
                      id="sourceOfLead"
                      value={sourceOfLead}
                      onChange={(e) => setSourceOfLead(e.target.value)}
                      placeholder="e.g. Referral, Website, Cold Call"
                    />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="nextReviewDate">Next Review Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !nextReviewDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {nextReviewDate ? (
                            format(nextReviewDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={nextReviewDate}
                          onSelect={setNextReviewDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Investment Preferences</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-ethical"
                        checked={investmentPreferences.includes(
                          "Ethical Investing"
                        )}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "Ethical Investing",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-ethical">Ethical Investing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-high-growth"
                        checked={investmentPreferences.includes("High Growth")}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "High Growth",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-high-growth">High Growth</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-income"
                        checked={investmentPreferences.includes(
                          "Income Generation"
                        )}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "Income Generation",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-income">Income Generation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-short-term"
                        checked={investmentPreferences.includes(
                          "Short-Term Gains"
                        )}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "Short-Term Gains",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-short-term">Short-Term Gains</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-real-estate"
                        checked={investmentPreferences.includes("Real Estate")}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "Real Estate",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-real-estate">Real Estate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pref-cryptocurrency"
                        checked={investmentPreferences.includes(
                          "Cryptocurrency"
                        )}
                        onCheckedChange={(checked) =>
                          handleInvestmentPreferenceChange(
                            "Cryptocurrency",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pref-cryptocurrency">
                        Cryptocurrency
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Financial Goals Tab */}
              <TabsContent
                value="financial-goals"
                className="p-4 space-y-6 flex-1 overflow-y-auto"
              >
                <div className="grid gap-2">
                  <Label htmlFor="add-financial-goal">Add Financial Goal</Label>
                  <Select
                    value={selectedAddFinancialGoal}
                    onValueChange={(value) => {
                      setSelectedAddFinancialGoal(value);
                      addFinancialGoal(value);
                    }}
                  >
                    <SelectTrigger id="add-financial-goal">
                      <SelectValue placeholder="Select a goal type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {FINANCIAL_GOAL_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a goal type to add and customize it for the client.
                  </p>
                </div>

                {currentFinancialGoals.length === 0 && (
                  <p className="text-center text-muted-foreground mt-8">
                    No financial goals added yet.
                  </p>
                )}

                {currentFinancialGoals.map((goal, index) => (
                  <div
                    key={goal.instanceId}
                    className="border p-4 rounded-md shadow-sm space-y-3 relative"
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => removeFinancialGoal(goal.instanceId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <h3 className="font-semibold text-lg pb-2 border-b">
                      Goal #{index + 1} - {goal.type}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`goal-priority-${goal.instanceId}`}>
                          Priority
                        </Label>
                        <Select
                          value={goal.priorityId}
                          onValueChange={(value) =>
                            updateFinancialGoal(
                              goal.instanceId,
                              "priorityId",
                              value
                            )
                          }
                        >
                          <SelectTrigger
                            id={`goal-priority-${goal.instanceId}`}
                          >
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {FINANCIAL_GOAL_PRIORITIES.map((priority) => (
                              <SelectItem key={priority.id} value={priority.id}>
                                {priority.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`goal-target-amount-${goal.instanceId}`}
                        >
                          Target Amount (RM)
                        </Label>
                        <Input
                          id={`goal-target-amount-${goal.instanceId}`}
                          type="number"
                          value={goal.targetAmount}
                          onChange={(e) =>
                            updateFinancialGoal(
                              goal.instanceId,
                              "targetAmount",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                          placeholder="e.g. 500000"
                        />
                      </div>
                      <div className="grid gap-2 col-span-2">
                        <Label htmlFor={`goal-target-date-${goal.instanceId}`}>
                          Target Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !goal.targetDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {goal.targetDate ? (
                                format(goal.targetDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={goal.targetDate}
                              onSelect={(date) =>
                                updateFinancialGoal(
                                  goal.instanceId,
                                  "targetDate",
                                  date
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`goal-description-${goal.instanceId}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`goal-description-${goal.instanceId}`}
                        value={goal.description}
                        onChange={(e) =>
                          updateFinancialGoal(
                            goal.instanceId,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        placeholder="e.g. Accumulate sufficient funds to retire by age 60."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`goal-notes-${goal.instanceId}`}>
                        Planner's Notes for this Goal
                      </Label>
                      <Textarea
                        id={`goal-notes-${goal.instanceId}`}
                        value={goal.notes}
                        onChange={(e) =>
                          updateFinancialGoal(
                            goal.instanceId,
                            "notes",
                            e.target.value
                          )
                        }
                        rows={2}
                        placeholder="e.g. Client expects to receive inheritance in 5 years."
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Insurance Products Tab */}
              <TabsContent
                value="insurance-products"
                className="p-4 space-y-6 flex-1 overflow-y-auto"
              >
                <div className="grid gap-2">
                  <Label htmlFor="add-insurance-product">
                    Add Insurance Product
                  </Label>
                  <Select
                    value={selectedAddInsuranceProduct}
                    onValueChange={(value) => {
                      setSelectedAddInsuranceProduct(value);
                      addInsuranceProduct(value);
                    }}
                  >
                    <SelectTrigger id="add-insurance-product">
                      <SelectValue placeholder="Search and select a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {STATIC_INSURANCE_PRODUCTS.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} ({product.provider})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a product to add its details, then customize them
                    below.
                  </p>
                </div>

                {currentInsuranceProducts.length === 0 && (
                  <p className="text-center text-muted-foreground mt-8">
                    No insurance products added yet.
                  </p>
                )}

                {currentInsuranceProducts.map((product, index) => (
                  <div
                    key={product.instanceId}
                    className="border p-4 rounded-md shadow-sm space-y-3 relative"
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => removeInsuranceProduct(product.instanceId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <h3 className="font-semibold text-lg pb-2 border-b">
                      Insurance Policy #{index + 1} - {product.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`ins-provider-${product.instanceId}`}>
                          Provider
                        </Label>
                        <Input
                          id={`ins-provider-${product.instanceId}`}
                          value={product.provider}
                          onChange={(e) =>
                            updateInsuranceProduct(
                              product.instanceId,
                              "provider",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`ins-type-${product.instanceId}`}>
                          Type
                        </Label>
                        <Input
                          id={`ins-type-${product.instanceId}`}
                          value={product.type}
                          onChange={(e) =>
                            updateInsuranceProduct(
                              product.instanceId,
                              "type",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`ins-coverage-${product.instanceId}`}>
                          Coverage Amount (RM)
                        </Label>
                        <Input
                          id={`ins-coverage-${product.instanceId}`}
                          type="number"
                          value={product.coverageAmount}
                          onChange={(e) =>
                            updateInsuranceProduct(
                              product.instanceId,
                              "coverageAmount",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`ins-premium-${product.instanceId}`}>
                          Annual Premium (RM)
                        </Label>
                        <Input
                          id={`ins-premium-${product.instanceId}`}
                          type="number"
                          value={product.premium}
                          onChange={(e) =>
                            updateInsuranceProduct(
                              product.instanceId,
                              "premium",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`ins-start-date-${product.instanceId}`}>
                          Start Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !product.startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {product.startDate ? (
                                format(product.startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={product.startDate}
                              onSelect={(date) =>
                                updateInsuranceProduct(
                                  product.instanceId,
                                  "startDate",
                                  date
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`ins-maturity-date-${product.instanceId}`}
                        >
                          Maturity Date (if applicable)
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !product.maturityDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {product.maturityDate ? (
                                format(product.maturityDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={product.maturityDate}
                              onSelect={(date) =>
                                updateInsuranceProduct(
                                  product.instanceId,
                                  "maturityDate",
                                  date
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`ins-notes-${product.instanceId}`}>
                        Notes
                      </Label>
                      <Textarea
                        id={`ins-notes-${product.instanceId}`}
                        value={product.notes}
                        onChange={(e) =>
                          updateInsuranceProduct(
                            product.instanceId,
                            "notes",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Investment Products Tab */}
              <TabsContent
                value="investment-products"
                className="p-4 space-y-6 flex-1 overflow-y-auto"
              >
                <div className="grid gap-2">
                  <Label htmlFor="add-investment-product">
                    Add Investment Product
                  </Label>
                  <Select
                    value={selectedAddInvestmentProduct}
                    onValueChange={(value) => {
                      setSelectedAddInvestmentProduct(value);
                      addInvestmentProduct(value);
                    }}
                  >
                    <SelectTrigger id="add-investment-product">
                      <SelectValue placeholder="Search and select a product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {STATIC_INVESTMENT_PRODUCTS.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} ({product.fundManager})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a product to add its details, then customize them
                    below.
                  </p>
                </div>

                {currentInvestmentProducts.length === 0 && (
                  <p className="text-center text-muted-foreground mt-8">
                    No investment products added yet.
                  </p>
                )}

                {currentInvestmentProducts.map((product, index) => (
                  <div
                    key={product.instanceId}
                    className="border p-4 rounded-md shadow-sm space-y-3 relative"
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() =>
                        removeInvestmentProduct(product.instanceId)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <h3 className="font-semibold text-lg pb-2 border-b">
                      Investment Product #{index + 1} - {product.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`inv-fund-manager-${product.instanceId}`}
                        >
                          Fund Manager
                        </Label>
                        <Input
                          id={`inv-fund-manager-${product.instanceId}`}
                          value={product.fundManager}
                          onChange={(e) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "fundManager",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`inv-type-${product.instanceId}`}>
                          Type
                        </Label>
                        <Input
                          id={`inv-type-${product.instanceId}`}
                          value={product.type}
                          onChange={(e) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "type",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`inv-initial-investment-${product.instanceId}`}
                        >
                          Initial Investment (RM)
                        </Label>
                        <Input
                          id={`inv-initial-investment-${product.instanceId}`}
                          type="number"
                          value={product.initialInvestment}
                          onChange={(e) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "initialInvestment",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor={`inv-current-value-${product.instanceId}`}
                        >
                          Current Value (RM)
                        </Label>
                        <Input
                          id={`inv-current-value-${product.instanceId}`}
                          type="number"
                          value={product.currentValue}
                          onChange={(e) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "currentValue",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`inv-start-date-${product.instanceId}`}>
                          Start Date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !product.startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {product.startDate ? (
                                format(product.startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={product.startDate}
                              onSelect={(date) =>
                                updateInvestmentProduct(
                                  product.instanceId,
                                  "startDate",
                                  date
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`inv-risk-level-${product.instanceId}`}>
                          Risk Level
                        </Label>
                        <Select
                          value={product.riskLevel}
                          onValueChange={(value) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "riskLevel",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2 col-span-2">
                        <Label
                          htmlFor={`inv-expected-return-${product.instanceId}`}
                        >
                          Expected Annual Return (%)
                        </Label>
                        <Input
                          id={`inv-expected-return-${product.instanceId}`}
                          type="number"
                          value={product.expectedReturn}
                          onChange={(e) =>
                            updateInvestmentProduct(
                              product.instanceId,
                              "expectedReturn",
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`inv-notes-${product.instanceId}`}>
                        Notes
                      </Label>
                      <Textarea
                        id={`inv-notes-${product.instanceId}`}
                        value={product.notes}
                        onChange={(e) =>
                          updateInvestmentProduct(
                            product.instanceId,
                            "notes",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* DialogFooter: Fixed height, sticks to the bottom */}
        <DialogFooter className="mt-6 flex justify-end gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => handleDialogClose(false)}
            disabled={isPending}
          >
            Save Progress for Later
          </Button>
          <Button variant="outline" onClick={startNewForm} disabled={isPending}>
            Clear Form
          </Button>
          <Button onClick={handleFormSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
