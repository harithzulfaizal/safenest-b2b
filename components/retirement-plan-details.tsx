// component/retirement-plan-details.tsx v1
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle, // Not used but kept for completeness
  DollarSign,
  Download, // Renamed to avoid conflict with Recharts LineChart
  Edit,
  LineChart as LineChartIcon,
  Plus, // Not used but kept for completeness
  Save,
  Trash2,
  User,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

// Import Recharts components
import {
  CartesianGrid,
  Legend, // This is the Recharts component
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- Interfaces (Potentially moved to a types file) ---
interface Asset {
  name: string;
  type: string;
  currentValue: number;
  monthlyContribution: number;
  historicalReturn: number; // Annual return percentage
  canEdit: boolean;
}

interface YearlyProjection {
  age: number;
  totalAssets: number;
  annualIncome: number; // Income drawn from assets
  annualExpenses: number; // Desired expenses (inflated)
  status: "ok" | "warning" | "critical";
}

interface PlanInputs {
  targetRetirementAge: number;
  desiredAnnualIncome: number; // Initial annual income desired in retirement
  lifeExpectancy: number;
  inflationRate: number; // Annual inflation percentage
  postRetirementReturn: number; // Annual return percentage post-retirement
  currentAge: number;
}

interface LumpSumEvent {
  id: string;
  year: number; // Absolute age at which the event occurs
  amount: number;
  type: "deposit" | "withdrawal" | "sell_asset";
  description?: string;
}

interface ScenarioInputs {
  additionalMonthlySavings: number;
  investmentReturnAdjustment: number; // % points change from base postRetirementReturn (and pre-retirement average)
  lumpSumEvents: LumpSumEvent[];
}

interface SavedScenario {
  id: string;
  name: string;
  planInputs: PlanInputs; // Base parameters for this scenario
  scenarioInputs: ScenarioInputs; // Interactive changes on top of base
  readinessScore: number;
  plannerNotes: string;
}

interface RetirementPlanDetailsProps {
  onBack?: () => void;
  clientName?: string;
}

// --- Helper Functions ---
const calculateProjectionData = (
  basePlan: PlanInputs,
  scenario: ScenarioInputs,
  baseAssets: Asset[]
): YearlyProjection[] => {
  const projections: YearlyProjection[] = [];
  let currentAssetsValue = baseAssets.reduce(
    (sum, a) => sum + a.currentValue,
    0
  );
  // Total monthly contributions include base assets' contributions plus additional savings
  let currentMonthlyContribution =
    baseAssets.reduce((sum, a) => sum + a.monthlyContribution, 0) +
    scenario.additionalMonthlySavings;

  // Initial desired annual income (will inflate later)
  let annualDesiredIncomeAdjusted = basePlan.desiredAnnualIncome;

  // Determine the effective return rate based on base and scenario adjustment
  // For simplicity, pre-retirement return is an average of asset historical returns
  const averagePreRetirementReturn =
    baseAssets.length > 0
      ? baseAssets.reduce((sum, a) => sum + a.historicalReturn, 0) /
        baseAssets.length
      : basePlan.postRetirementReturn; // Fallback if no assets
  const effectivePreRetirementReturnDecimal =
    (averagePreRetirementReturn + scenario.investmentReturnAdjustment) / 100;
  const effectivePostRetirementReturnDecimal =
    (basePlan.postRetirementReturn + scenario.investmentReturnAdjustment) / 100;
  const inflationRateDecimal = basePlan.inflationRate / 100;

  // Project until maxAgeToProject or until assets are completely depleted after retirement age
  // Project a reasonable buffer after life expectancy to see full depletion
  const maxAgeToProject = Math.max(
    basePlan.lifeExpectancy + 5,
    basePlan.targetRetirementAge + 20
  );

  let assetsDepletedPermanently = false; // Flag to stop projecting if assets stay at 0

  for (let age = basePlan.currentAge; age <= maxAgeToProject; age++) {
    let annualExpenses = 0;
    let annualIncomeFromSources = 0;

    // Apply lump sum events at the *beginning* of the year
    scenario.lumpSumEvents
      .filter((e) => e.year === age)
      .forEach((event) => {
        currentAssetsValue +=
          event.type === "deposit" ? event.amount : -event.amount;
      });

    if (age < basePlan.targetRetirementAge) {
      // Accumulation phase
      currentAssetsValue += currentMonthlyContribution * 12; // Add annual contributions
      currentAssetsValue *= 1 + effectivePreRetirementReturnDecimal; // Apply growth
      annualExpenses = 0; // No retirement spending yet
      annualIncomeFromSources = 0; // No retirement income yet
    } else {
      // Retirement drawdown phase
      if (age > basePlan.targetRetirementAge) {
        // Inflate desired income for future years *after* the first retirement year
        annualDesiredIncomeAdjusted *= 1 + inflationRateDecimal;
      }
      annualExpenses = annualDesiredIncomeAdjusted; // Assuming expenses match desired income
      annualIncomeFromSources = annualDesiredIncomeAdjusted; // Simplified: assets provide this income

      currentAssetsValue -= annualExpenses; // Withdraw annual income
      currentAssetsValue *= 1 + effectivePostRetirementReturnDecimal; // Apply post-withdrawal growth
    }

    // Ensure assets don't go negative for display and subsequent calculations
    currentAssetsValue = Math.max(0, currentAssetsValue);

    // Determine status
    let status: "ok" | "warning" | "critical" = "ok";
    if (age >= basePlan.targetRetirementAge) {
      // Only check status if in or past retirement
      if (currentAssetsValue <= 0) {
        status = "critical";
        assetsDepletedPermanently = true; // Mark for potential early exit
      } else if (currentAssetsValue < annualExpenses * 2) {
        // Less than 2 years of income remaining
        status = "warning";
      }
    }

    projections.push({
      age: age,
      totalAssets: currentAssetsValue,
      annualIncome: annualIncomeFromSources,
      annualExpenses: annualExpenses,
      status: status,
    });

    // Optimization: Stop projecting if assets are depleted and we are significantly past retirement age,
    // or if we've gone significantly beyond life expectancy
    if (
      assetsDepletedPermanently &&
      age > basePlan.targetRetirementAge + 5 &&
      age > basePlan.lifeExpectancy
    ) {
      break;
    }
  }

  return projections;
};

const calculateReadinessScore = (
  yearlyProjections: YearlyProjection[],
  desiredLifeExpectancy: number
) => {
  if (yearlyProjections.length === 0) return 0;

  const firstProjectionAge = yearlyProjections[0].age;
  const retirementAgeEntry = yearlyProjections.find((p) => p.annualIncome > 0);
  const retirementAge = retirementAgeEntry
    ? retirementAgeEntry.age
    : firstProjectionAge; // If no income yet, use first age

  // Find the last age where assets were positive
  const fundsEndAge =
    yearlyProjections.findLast((p) => p.totalAssets > 0)?.age || 0;

  // Scenario 1: Funds last until or beyond desired life expectancy
  if (fundsEndAge >= desiredLifeExpectancy) {
    return 100;
  }

  // Scenario 2: Funds never really accumulated or ran out immediately
  if (fundsEndAge < retirementAge) {
    return 0; // Funds don't even last till retirement or are depleted pre-retirement
  }

  // Scenario 3: Funds last for a portion of retirement
  const requiredRetirementDuration = desiredLifeExpectancy - retirementAge;
  const coveredRetirementDuration = fundsEndAge - retirementAge;

  if (requiredRetirementDuration <= 0) {
    // If retirement age is already at or past desired life expectancy, consider it 100% funded
    return 100;
  }

  const coverageRatio = coveredRetirementDuration / requiredRetirementDuration;
  return Math.min(100, Math.round(coverageRatio * 100));
};

// --- Main Component ---
export function RetirementPlanDetails({
  onBack,
  clientName = "John Doe",
}: RetirementPlanDetailsProps) {
  // --- Initial Data (can be loaded from backend) ---
  const initialPlanInputs: PlanInputs = {
    targetRetirementAge: 60,
    desiredAnnualIncome: 60000,
    lifeExpectancy: 85,
    inflationRate: 3.0,
    postRetirementReturn: 5.0,
    currentAge: 32,
  };

  const initialAssets: Asset[] = [
    {
      name: "EPF Account 1",
      type: "Mandatory",
      currentValue: 125650.5,
      monthlyContribution: 450,
      historicalReturn: 6.2,
      canEdit: false,
    },
    {
      name: "PRS - AmMetLife",
      type: "Private Retirement Scheme",
      currentValue: 35000,
      monthlyContribution: 200,
      historicalReturn: 7.8,
      canEdit: true,
    },
    {
      name: "Investment Portfolio",
      type: "Designated Retirement",
      currentValue: 25000,
      monthlyContribution: 0,
      historicalReturn: 8.5,
      canEdit: true,
    },
  ];

  // Use a stable ID for the "Current Working Plan"
  const CURRENT_WORKING_PLAN_ID = "current-working-plan";

  // --- State Management ---
  const [currentClientPlan, setCurrentClientPlan] =
    useState<PlanInputs>(initialPlanInputs);
  const [currentScenarioInputs, setCurrentScenarioInputs] =
    useState<ScenarioInputs>({
      additionalMonthlySavings: 0,
      investmentReturnAdjustment: 0.0,
      lumpSumEvents: [],
    });
  const [currentPlannerNotes, setCurrentPlannerNotes] = useState<string>("");
  const [retirementAssets, setRetirementAssets] =
    useState<Asset[]>(initialAssets);

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(() => {
    // Initialize current-working-plan with calculated score on first render
    const initialProjections = calculateProjectionData(
      initialPlanInputs,
      {
        additionalMonthlySavings: 0,
        investmentReturnAdjustment: 0,
        lumpSumEvents: [],
      },
      initialAssets
    );
    const initialScore = calculateReadinessScore(
      initialProjections,
      initialPlanInputs.lifeExpectancy
    );

    return [
      {
        id: "conservative-plan-1",
        name: "Retire at 60, low inflation",
        planInputs: {
          ...initialPlanInputs,
          postRetirementReturn: 4.0,
          desiredAnnualIncome: 50000,
        },
        scenarioInputs: {
          additionalMonthlySavings: 0,
          investmentReturnAdjustment: 0,
          lumpSumEvents: [],
        },
        readinessScore: 65,
        plannerNotes:
          "This is a conservative scenario with lower returns and income.",
      },
      {
        id: "aggressive-plan-2",
        name: "Retire early, rent housing",
        planInputs: {
          ...initialPlanInputs,
          targetRetirementAge: 58,
          postRetirementReturn: 6.5,
        },
        scenarioInputs: {
          additionalMonthlySavings: 0,
          investmentReturnAdjustment: 0,
          lumpSumEvents: [],
        },
        readinessScore: 78,
        plannerNotes:
          "This scenario assumes early retirement and higher market returns.",
      },
      {
        id: CURRENT_WORKING_PLAN_ID,
        name: "Retire 63, no debt",
        planInputs: initialPlanInputs,
        scenarioInputs: {
          additionalMonthlySavings: 0,
          investmentReturnAdjustment: 0,
          lumpSumEvents: [],
        },
        readinessScore: initialScore,
        plannerNotes:
          "This is the current plan being worked on for the client. Adjust parameters and save.",
      },
    ];
  });

  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    CURRENT_WORKING_PLAN_ID
  );
  const [editingScenarioName, setEditingScenarioName] =
    useState<boolean>(false);

  // Memoized calculations for performance
  const yearlyProjections = useMemo(() => {
    return calculateProjectionData(
      currentClientPlan,
      currentScenarioInputs,
      retirementAssets
    );
  }, [currentClientPlan, currentScenarioInputs, retirementAssets]);

  const currentReadinessScore = useMemo(() => {
    return calculateReadinessScore(
      yearlyProjections,
      currentClientPlan.lifeExpectancy
    );
  }, [yearlyProjections, currentClientPlan.lifeExpectancy]);

  const totalCurrentAssets = useMemo(() => {
    return retirementAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  }, [retirementAssets]);

  const currentMonthlyContributions = useMemo(() => {
    return (
      retirementAssets.reduce(
        (sum, asset) => sum + asset.monthlyContribution,
        0
      ) + currentScenarioInputs.additionalMonthlySavings
    );
  }, [retirementAssets, currentScenarioInputs.additionalMonthlySavings]);

  const projectedFundsEndAge = useMemo(() => {
    // Find the last projection where totalAssets is greater than 0
    return yearlyProjections.findLast((p) => p.totalAssets > 0)?.age || "N/A";
  }, [yearlyProjections]);

  // --- Scenario Management Actions ---
  const loadScenario = useCallback((scenario: SavedScenario) => {
    setCurrentClientPlan(scenario.planInputs);
    setCurrentScenarioInputs(scenario.scenarioInputs);
    setCurrentPlannerNotes(scenario.plannerNotes);
    setActiveScenarioId(scenario.id);
  }, []); // No dependencies needed for this useCallback since `scenario` is passed as an argument

  const saveCurrentScenario = useCallback(() => {
    setSavedScenarios((prevScenarios) => {
      const activeScenarioIndex = prevScenarios.findIndex(
        (s) => s.id === activeScenarioId
      );
      const scenarioToSave: SavedScenario = {
        id: activeScenarioId,
        // If scenario is not found (e.g., initial state), use a default name
        name:
          prevScenarios[activeScenarioIndex]?.name ||
          `Unnamed Scenario ${Date.now()}`,
        planInputs: { ...currentClientPlan },
        scenarioInputs: { ...currentScenarioInputs },
        readinessScore: currentReadinessScore, // Save the current calculated score
        plannerNotes: currentPlannerNotes,
      };

      const updatedScenarios = [...prevScenarios];
      if (activeScenarioIndex > -1) {
        updatedScenarios[activeScenarioIndex] = scenarioToSave;
      } else {
        // This case should ideally not happen if activeScenarioId is always set correctly,
        // but it's a fallback to ensure the scenario is added.
        updatedScenarios.push(scenarioToSave);
      }
      return updatedScenarios;
    });
  }, [
    activeScenarioId,
    currentClientPlan,
    currentScenarioInputs,
    currentReadinessScore,
    currentPlannerNotes,
  ]);

  const createNewScenario = useCallback(() => {
    const newId = `new-scenario-${Date.now()}`;
    const newScenario: SavedScenario = {
      id: newId,
      name: "New Custom Scenario",
      planInputs: { ...initialPlanInputs }, // Start with a fresh base for the new scenario
      scenarioInputs: {
        additionalMonthlySavings: 0,
        investmentReturnAdjustment: 0,
        lumpSumEvents: [],
      },
      readinessScore: 0, // Will be calculated when loaded/active
      plannerNotes: "",
    };
    setSavedScenarios((prev) => [...prev, newScenario]);
    // Calculate score immediately for the new scenario and load it
    const newScenarioProjections = calculateProjectionData(
      newScenario.planInputs,
      newScenario.scenarioInputs,
      retirementAssets
    );
    newScenario.readinessScore = calculateReadinessScore(
      newScenarioProjections,
      newScenario.planInputs.lifeExpectancy
    );
    loadScenario(newScenario); // Automatically load the new scenario
    setActiveScenarioId(newId);
  }, [initialPlanInputs, loadScenario, retirementAssets]); // Added retirementAssets as it's used in calculateProjectionData

  const deleteScenario = useCallback(
    (id: string) => {
      // Prevent deleting the very last scenario
      if (savedScenarios.length > 1) {
        setSavedScenarios((prev) => {
          const remainingScenarios = prev.filter((s) => s.id !== id);
          // If the deleted scenario was active, switch to the "Current Working Plan" or the first available one
          if (activeScenarioId === id) {
            const newActiveScenario =
              remainingScenarios.find(
                (s) => s.id === CURRENT_WORKING_PLAN_ID
              ) || remainingScenarios[0];
            if (newActiveScenario) {
              loadScenario(newActiveScenario);
            }
          }
          return remainingScenarios;
        });
      } else {
        alert("Cannot delete the last scenario.");
      }
    },
    [activeScenarioId, savedScenarios, loadScenario]
  ); // Dependencies are correct

  const renameActiveScenario = useCallback(
    (newName: string) => {
      setSavedScenarios((prev) =>
        prev.map((s) =>
          s.id === activeScenarioId ? { ...s, name: newName } : s
        )
      );
    },
    [activeScenarioId]
  ); // Dependency is correct

  // --- Lump Sum Event Management ---
  const addLumpSumEvent = useCallback(() => {
    setCurrentScenarioInputs((prev) => ({
      ...prev,
      lumpSumEvents: [
        ...prev.lumpSumEvents,
        {
          id: `ls-${Date.now()}`,
          year: currentClientPlan.currentAge, // Default to current age
          amount: 10000,
          type: "deposit",
          description: "",
        },
      ],
    }));
  }, [currentClientPlan.currentAge]); // Dependency is correct

  const updateLumpSumEvent = useCallback(
    (id: string, field: keyof LumpSumEvent, value: any) => {
      setCurrentScenarioInputs((prev) => ({
        ...prev,
        lumpSumEvents: prev.lumpSumEvents.map((event) =>
          event.id === id ? { ...event, [field]: value } : event
        ),
      }));
    },
    []
  ); // No dependencies needed as it only uses its arguments and 'prev' state

  const removeLumpSumEvent = useCallback((id: string) => {
    setCurrentScenarioInputs((prev) => ({
      ...prev,
      lumpSumEvents: prev.lumpSumEvents.filter((event) => event.id !== id),
    }));
  }, []); // No dependencies needed as it only uses its arguments and 'prev' state

  // --- Export Functionality (Placeholder) ---
  const exportPlan = () => {
    const planData = {
      client: clientName,
      activeScenario: savedScenarios.find((s) => s.id === activeScenarioId),
      yearlyProjections: yearlyProjections,
      plannerNotes: currentPlannerNotes,
    };
    const json = JSON.stringify(planData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const scenarioNameForFile =
      savedScenarios
        .find((s) => s.id === activeScenarioId)
        ?.name.replace(/\s/g, "-") || "Current-Plan";
    a.download = `${clientName.replace(
      /\s/g,
      "-"
    )}-RetirementPlan-${scenarioNameForFile}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for Scenario Management */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col shadow-lg">
        {" "}
        {/* Added shadow-lg for better visual separation */}
        <div className="mb-6">
          {/*<Button variant="outline" className="w-full justify-start mb-4" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Client List
          </Button>*/}
          <div className="flex items-center text-lg font-bold text-gray-800">
            <User className="h-5 w-5 mr-2" />
            {clientName}
          </div>
          <p className="text-sm text-muted-foreground">
            Manage retirement scenarios
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Scenarios
          </h3>
          <Button
            onClick={createNewScenario}
            className="w-full mb-2"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" /> Create New Scenario
          </Button>
          <Button onClick={saveCurrentScenario} className="w-full mb-4">
            <Save className="h-4 w-4 mr-2" /> Save Active Scenario
          </Button>
        </div>
        <ScrollArea className="flex-grow pr-4 -mr-4">
          {" "}
          {/* Add negative margin to offset padding */}
          <div className="space-y-3">
            {savedScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all border ${
                  activeScenarioId === scenario.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:shadow-sm"
                }`}
                onClick={() => loadScenario(scenario)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    {activeScenarioId === scenario.id && editingScenarioName ? (
                      <Input
                        value={scenario.name}
                        onChange={(e) => renameActiveScenario(e.target.value)}
                        onBlur={() => setEditingScenarioName(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingScenarioName(false);
                        }}
                        autoFocus
                        className="p-1 h-auto text-sm font-medium"
                      />
                    ) : (
                      <h5 className="font-medium text-sm flex items-center">
                        {scenario.name}
                        {activeScenarioId === scenario.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingScenarioName(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                      </h5>
                    )}
                    {/* Only allow deleting if not the active scenario and not the current working plan */}
                    {activeScenarioId !== scenario.id &&
                      scenario.id !== CURRENT_WORKING_PLAN_ID && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteScenario(scenario.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                  </div>
                  <div className="text-xl font-bold text-blue-600 mb-1">
                    {/* Display the stored readiness score, or re-calculate for new scenarios */}
                    {scenario.readinessScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Readiness Score
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">Retirement Plan Details</h1>
            <p className="text-muted-foreground">
              Adjust parameters, run simulations, and analyze projections for{" "}
              <span className="font-semibold text-gray-800">{clientName}</span>.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={exportPlan}>
              <Download className="h-4 w-4 mr-2" />
              Export Plan (JSON)
            </Button>
            <Button onClick={saveCurrentScenario}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Overview & Readiness Score */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Current Plan Readiness Score
              </h3>
              <div className="text-5xl font-bold text-green-700 mb-2">
                {currentReadinessScore}%
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your current inputs and projections.
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Projected Fund Exhaustion:{" "}
                </span>
                <span
                  className={`font-bold ${
                    currentReadinessScore < 100
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Age {projectedFundsEndAge}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Total Current Assets:{" "}
                </span>
                <span className="font-bold">
                  RM{" "}
                  {totalCurrentAssets.toLocaleString("en-MY", {
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Total Monthly Savings:{" "}
                </span>
                <span className="font-bold">
                  RM{" "}
                  {currentMonthlyContributions.toLocaleString("en-MY", {
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Planner & Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChartIcon className="h-5 w-5" /> {/* Use the renamed icon */}
              <span>Interactive Retirement Modeler</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Controls */}
            <div className="space-y-6 lg:col-span-1">
              <h4 className="font-semibold text-lg border-b pb-2">
                Plan Parameters
              </h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="retirement-age">Target Retirement Age</Label>
                  <Slider
                    id="retirement-age"
                    min={50}
                    max={70}
                    step={1}
                    value={[currentClientPlan.targetRetirementAge]}
                    onValueChange={(value) =>
                      setCurrentClientPlan({
                        ...currentClientPlan,
                        targetRetirementAge: value[0],
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>50</span>
                    <span className="font-medium">
                      {currentClientPlan.targetRetirementAge} years
                    </span>
                    <span>70</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="desired-income">
                    Desired Annual Retirement Income (RM)
                  </Label>
                  <Input
                    id="desired-income"
                    type="number"
                    value={currentClientPlan.desiredAnnualIncome}
                    onChange={(e) =>
                      setCurrentClientPlan({
                        ...currentClientPlan,
                        desiredAnnualIncome: Number(e.target.value) || 0,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="life-expectancy">Life Expectancy</Label>
                  <Slider
                    id="life-expectancy"
                    min={75}
                    max={95}
                    step={1}
                    value={[currentClientPlan.lifeExpectancy]}
                    onValueChange={(value) =>
                      setCurrentClientPlan({
                        ...currentClientPlan,
                        lifeExpectancy: value[0],
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>75</span>
                    <span className="font-medium">
                      {currentClientPlan.lifeExpectancy} years
                    </span>
                    <span>95</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="inflation-rate">
                    Expected Inflation Rate (%)
                  </Label>
                  <Slider
                    id="inflation-rate"
                    min={0.0}
                    max={6.0}
                    step={0.1}
                    value={[currentClientPlan.inflationRate]}
                    onValueChange={(value) =>
                      setCurrentClientPlan({
                        ...currentClientPlan,
                        inflationRate: value[0],
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0%</span>
                    <span className="font-medium">
                      {currentClientPlan.inflationRate.toFixed(1)}%
                    </span>
                    <span>6%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="post-retirement-return">
                    Base Post-Retirement Return (%)
                  </Label>
                  <Slider
                    id="post-retirement-return"
                    min={2.0}
                    max={8.0}
                    step={0.1}
                    value={[currentClientPlan.postRetirementReturn]}
                    onValueChange={(value) =>
                      setCurrentClientPlan({
                        ...currentClientPlan,
                        postRetirementReturn: value[0],
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>2%</span>
                    <span className="font-medium">
                      {currentClientPlan.postRetirementReturn.toFixed(1)}%
                    </span>
                    <span>8%</span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-lg border-b pb-2 pt-4">
                Scenario Adjustments
              </h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="additional-savings">
                    Additional Monthly Savings (RM)
                  </Label>
                  <Input
                    id="additional-savings"
                    type="number"
                    value={currentScenarioInputs.additionalMonthlySavings}
                    onChange={(e) =>
                      setCurrentScenarioInputs({
                        ...currentScenarioInputs,
                        additionalMonthlySavings: Number(e.target.value) || 0,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="investment-return-adjustment">
                    Investment Return Adjustment (±%)
                  </Label>
                  <Slider
                    id="investment-return-adjustment"
                    min={-3.0}
                    max={3.0}
                    step={0.1}
                    value={[currentScenarioInputs.investmentReturnAdjustment]}
                    onValueChange={(value) =>
                      setCurrentScenarioInputs({
                        ...currentScenarioInputs,
                        investmentReturnAdjustment: value[0],
                      })
                    }
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>-3%</span>
                    <span className="font-medium">
                      {currentScenarioInputs.investmentReturnAdjustment.toFixed(
                        1
                      )}
                      %
                    </span>
                    <span>+3%</span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-lg border-b pb-2 pt-4 flex justify-between items-center">
                Lump Sum Events
                <Button variant="outline" size="sm" onClick={addLumpSumEvent}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </h4>
              <div className="space-y-3">
                {currentScenarioInputs.lumpSumEvents.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No lump sum events added yet.
                  </p>
                )}
                {currentScenarioInputs.lumpSumEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border p-3 rounded-md bg-gray-50 flex flex-col gap-2 relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 text-red-500"
                      onClick={() => removeLumpSumEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label
                          htmlFor={`event-type-${event.id}`}
                          className="text-xs"
                        >
                          Type
                        </Label>
                        <select
                          id={`event-type-${event.id}`}
                          value={event.type}
                          onChange={(e) =>
                            updateLumpSumEvent(
                              event.id,
                              "type",
                              e.target.value as
                                | "deposit"
                                | "withdrawal"
                                | "sell_asset"
                            )
                          }
                          className="w-full p-1 border rounded text-sm"
                        >
                          <option value="deposit">Deposit</option>
                          <option value="withdrawal">Withdrawal</option>
                          <option value="sell_asset">Sell Asset</option>
                        </select>
                      </div>
                      <div>
                        <Label
                          htmlFor={`event-year-${event.id}`}
                          className="text-xs"
                        >
                          Age
                        </Label>
                        <Input
                          id={`event-year-${event.id}`}
                          type="number"
                          value={event.year}
                          onChange={(e) =>
                            updateLumpSumEvent(
                              event.id,
                              "year",
                              Number(e.target.value) || 0
                            )
                          }
                          className="h-8 text-sm"
                          min={currentClientPlan.currentAge}
                          max={currentClientPlan.lifeExpectancy + 20}
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor={`event-amount-${event.id}`}
                        className="text-xs"
                      >
                        Amount (RM)
                      </Label>
                      <Input
                        id={`event-amount-${event.id}`}
                        type="number"
                        value={event.amount}
                        onChange={(e) =>
                          updateLumpSumEvent(
                            event.id,
                            "amount",
                            Number(e.target.value) || 0
                          )
                        }
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`event-desc-${event.id}`}
                        className="text-xs"
                      >
                        Description (Optional)
                      </Label>
                      <Input
                        id={`event-desc-${event.id}`}
                        type="text"
                        value={event.description || ""}
                        onChange={(e) =>
                          updateLumpSumEvent(
                            event.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="h-8 text-sm"
                        placeholder="e.g., House downpayment, car purchase"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Visualization */}
            {/* Removed items-center and justify-center from parent div for better stretching */}
            <div className="lg:col-span-2 flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-lg mb-4 text-center">
                Projected Asset Value Over Time
              </h4>{" "}
              {/* Centered title */}
              {/* Increased height to h-[450px] to prevent chopping */}
              <div className="w-full h-[450px] bg-white border border-gray-300 rounded-md">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={yearlyProjections}
                    // Increased top and right margin for labels and tooltips
                    margin={{ top: 40, right: 40, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="age"
                      type="number"
                      domain={["dataMin", "dataMax"]}
                      allowDuplicatedCategory={false}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `RM ${value.toLocaleString("en-MY", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        `RM ${value.toLocaleString("en-MY", {
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalAssets"
                      stroke="#8884d8"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Total Assets"
                    />
                    {/* Reference Line for Target Retirement Age */}
                    {yearlyProjections.some(
                      (p) => p.age === currentClientPlan.targetRetirementAge
                    ) && (
                      <ReferenceLine
                        x={currentClientPlan.targetRetirementAge}
                        stroke="#22C55E" // Green
                        strokeDasharray="3 3"
                        // Removed dx to prevent labels being cut off and let position: 'top' center it
                        label={{
                          value: `Retirement Age ${currentClientPlan.targetRetirementAge}`,
                          position: "top",
                          fill: "#22C55E",
                          fontSize: 12,
                        }}
                      />
                    )}
                    {/* Reference Line for Life Expectancy */}
                    {yearlyProjections.some(
                      (p) => p.age === currentClientPlan.lifeExpectancy
                    ) && (
                      <ReferenceLine
                        x={currentClientPlan.lifeExpectancy}
                        stroke="#EF4444" // Red
                        strokeDasharray="3 3"
                        // Removed dx
                        label={{
                          value: `Life Expectancy ${currentClientPlan.lifeExpectancy}`,
                          position: "top",
                          fill: "#EF4444",
                          fontSize: 12,
                        }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 w-full text-sm text-center text-muted-foreground">
                <p>
                  Funds projected to last until age{" "}
                  <span className="font-bold">{projectedFundsEndAge}</span>.
                </p>
                {currentReadinessScore < 100 && (
                  <p className="text-red-600 font-semibold">
                    <AlertTriangle className="h-4 w-4 inline mr-1" />
                    Warning: Funds are projected to be exhausted before desired
                    life expectancy.
                  </p>
                )}
                {currentReadinessScore === 100 && (
                  <p className="text-green-600 font-semibold">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Great! Funds are projected to last beyond your desired life
                    expectancy.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Assets, Projections, and Planner Notes */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assets">Client Assets</TabsTrigger>
            <TabsTrigger value="projections">Detailed Projections</TabsTrigger>
            <TabsTrigger value="notes">Planner Notes & Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Current Retirement Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {retirementAssets.map((asset, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{asset.name}</h4>
                          <Badge variant="outline">{asset.type}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            RM{" "}
                            {asset.currentValue.toLocaleString("en-MY", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Current Value
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">
                            Monthly Contribution
                          </Label>
                          <div className="mt-1">
                            {/* Only monthlyContribution is editable based on canEdit prop */}
                            {asset.canEdit ? (
                              <Input
                                type="number"
                                value={asset.monthlyContribution}
                                onChange={(e) => {
                                  const updatedAssets = [...retirementAssets];
                                  updatedAssets[index] = {
                                    ...updatedAssets[index],
                                    monthlyContribution:
                                      Number(e.target.value) || 0,
                                  };
                                  setRetirementAssets(updatedAssets);
                                }}
                                className="h-8"
                              />
                            ) : (
                              <div className="text-sm font-medium">
                                RM {asset.monthlyContribution}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Historical Return</Label>
                          <div className="text-sm font-medium mt-1">
                            {asset.historicalReturn}% p.a.
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">
                            Projected Value at Retirement (Estimate)
                          </Label>
                          <div className="text-sm font-medium text-green-600 mt-1">
                            {/* Simple projection for display here, full projection is handled by calculateProjectionData */}
                            RM{" "}
                            {(
                              asset.currentValue *
                              Math.pow(
                                1 + asset.historicalReturn / 100,
                                Math.max(
                                  0,
                                  currentClientPlan.targetRetirementAge -
                                    currentClientPlan.currentAge
                                )
                              )
                            ).toLocaleString("en-MY", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold">Total Current Assets</span>
                    <span className="text-xl font-bold">
                      RM{" "}
                      {retirementAssets
                        .reduce((sum, asset) => sum + asset.currentValue, 0)
                        .toLocaleString("en-MY")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>
                    Detailed Year-by-Year Projections (Active Scenario)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b sticky top-0 bg-white">
                          <th className="text-left p-2">Age</th>
                          <th className="text-right p-2">Total Assets</th>
                          <th className="text-right p-2">Annual Income</th>
                          <th className="text-right p-2">Annual Expenses</th>
                          <th className="text-center p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyProjections.map((projection, index) => (
                          <tr
                            key={index}
                            className={`border-b hover:bg-gray-50 ${
                              projection.age ===
                              currentClientPlan.targetRetirementAge
                                ? "font-bold bg-blue-50"
                                : ""
                            }`}
                          >
                            <td className="p-2 font-medium">
                              {projection.age}
                            </td>
                            <td className="p-2 text-right">
                              RM{" "}
                              {projection.totalAssets.toLocaleString("en-MY", {
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-2 text-right text-green-600">
                              RM{" "}
                              {projection.annualIncome.toLocaleString("en-MY", {
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-2 text-right text-red-600">
                              RM{" "}
                              {projection.annualExpenses.toLocaleString(
                                "en-MY",
                                { minimumFractionDigits: 0 }
                              )}
                            </td>
                            <td className="p-2 text-center">
                              {projection.status === "ok" ? (
                                <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                              ) : projection.status === "warning" ? (
                                <AlertTriangle className="h-4 w-4 text-yellow-600 mx-auto" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-600 mx-auto" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">
                        Key Insights (from current scenario)
                      </h4>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Funds are projected to last until age{" "}
                          <span className="font-bold">
                            {projectedFundsEndAge}
                          </span>
                          .
                        </li>
                        {currentReadinessScore < 100 && (
                          <li>
                            Consider increasing savings, adjusting retirement
                            age, or reviewing desired annual income to match
                            desired life expectancy.
                          </li>
                        )}
                        {currentReadinessScore === 100 && (
                          <li>
                            This plan appears robust and is projected to meet
                            your client's retirement income goals.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="h-5 w-5" />
                  <span>Planner Notes & Action Items for Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={currentPlannerNotes}
                  onChange={(e) => setCurrentPlannerNotes(e.target.value)}
                  placeholder="Add personalized notes, recommendations, and actionable steps for your client here. These notes will be saved with the scenario and can be exported."
                  rows={10}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  These notes are specific to the active scenario and can be
                  included in the exported plan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
