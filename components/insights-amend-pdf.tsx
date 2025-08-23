import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// Import your icons from lucide-react or similar library
import {
  Calculator,
  CreditCard,
  DollarSign,
  ExternalLink,
  FlaskConical,
  Heart,
  Info,
  Lightbulb,
  PiggyBank,
  RotateCcw,
  Save,
  Scale,
  Send,
  Settings,
  Shield,
  ShoppingCart,
  Target,
} from "lucide-react";

// --- Type Definitions (Copy these from your existing codebase if they exist) ---
type FinancialStatus =
  | "On Track"
  | "Needs Attention"
  | "Excellent"
  | "Critical";

interface ModuleInsight {
  id: string;
  title: string;
  icon: React.ElementType;
  score: number;
  status: FinancialStatus;
  comprehensiveAnalysis: string;
  externalContext: string;
  strategicRecommendations: { type: string; text: string }[];
  behavioralInsights: string;
  comparisonBenchmarking: string;
  metrics: { label: string; value: string; change: number; period: string }[];
  linkText: string;
  linkModule: string;
}

// --- Your Provided moduleInsights Data (Copy-paste directly) ---
const moduleInsights: ModuleInsight[] = [
  {
    id: "cash-flow",
    title: "Income & Cash Flow Dynamics",
    icon: DollarSign,
    score: 8.1,
    status: "On Track" as FinancialStatus,
    comprehensiveAnalysis: `The client's net cash flow for January was RM 2,847, representing an 8% decrease from December, primarily influenced by anticipated seasonal spending and one-off Chinese New Year expenses. Despite this monthly fluctuation, the underlying income streams from primary employment and a side hustle demonstrate consistent stability. The recent salary increase (effective January) has positively impacted the annual income baseline. System projects a return to positive cash flow growth in February, barring unforeseen expenses.`,
    externalContext: `Malaysia's labour market exhibited resilience in Q4 2023 (unemployment at 3.3%), ensuring primary income stability. However, the services sector, where the client's side hustle operates, shows moderate wage growth. This market context underscores the importance of a robust emergency fund and diversified income strategy.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Propose setting up an automated transfer of RM 400 to the high-yield savings account immediately post-payday to ensure consistent cash flow optimization.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Review and categorize the one-off CNY expenses to differentiate between necessary and discretionary seasonal spending for future budget planning.",
      },
      {
        type: "Long-Term Consideration",
        text: "Discuss exploring additional passive income streams aligned with client's skills to further enhance income diversification and hedge against primary income volatility.",
      },
    ],
    behavioralInsights:
      "Client tends to spend more aggressively on discretionary items when cash flow is high, suggesting a 'treat yourself' pattern post-income events.",
    comparisonBenchmarking:
      "Client's income diversification (3 sources) is above average for their age group, contributing to a lower overall income volatility index compared to peers.",
    metrics: [
      { label: "Net Cash Flow", value: "RM 2,847", change: -8, period: "MoM" },
      {
        label: "Income Stability",
        value: "Excellent",
        change: 0,
        period: "3 diverse streams",
      },
      {
        label: "Emergency Fund",
        value: "4.2 months",
        change: 5,
        period: "of expenses",
      },
    ],
    linkText: "Analyze Cash Flow Projections",
    linkModule: "home",
  },
  {
    id: "spending",
    title: "Spending Patterns & Efficiency Analysis",
    icon: ShoppingCart,
    score: 6.8,
    status: "Needs Attention" as FinancialStatus,
    comprehensiveAnalysis: `Client's total spending of RM 4,235 represented 68% of income this month, a 12% increase from December. The top expenditure categories were Food & Dining (RM 856), Transportation (RM 542), and Shopping (RM 426). Anomaly detection flagged a significant acceleration in dining out expenses mid-month, particularly on weekends, leading to a RM 380 budget overrun. This indicates a 'lifestyle creep' where comfort spending is increasing disproportionately to income growth.`,
    externalContext: `Rising inflation, particularly a 3% increase in RON95 petrol and 5% rise in restaurant costs due to minimum wage adjustments, contributed to higher transport and dining expenses for Malaysian households. While some increases are external, the client's spending velocity in discretionary categories is above market trends.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Collaborate with the client to implement a strict weekly spending limit for Food & Dining (e.g., RM 200/week), utilizing transaction alerts.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Encourage meal planning and preparing more meals at home to reduce dining out frequency by 2-3 times per week, aiming for a RM 250 monthly saving.",
      },
      {
        type: "Long-Term Consideration",
        text: "Conduct a comprehensive review of all recurring subscription services; the system detected RM 127 in potential non-essential monthly charges.",
      },
    ],
    behavioralInsights:
      "The system identified a correlation between increased discretionary spending and periods of high work-related stress, suggesting spending as a coping mechanism. This is a key discussion point.",
    comparisonBenchmarking:
      "Client's discretionary spending as a percentage of income is 10% higher than similar income-level peers who are actively saving for a house down payment.",
    metrics: [
      { label: "Total Spending", value: "RM 4,235", change: 12, period: "MoM" },
      {
        label: "Budget Adherence",
        value: "78%",
        change: -15,
        period: "of categories on track",
      },
      {
        label: "Lifestyle Creep",
        value: "RM 450/month",
        change: 0,
        period: "over 6 months",
      },
    ],
    linkText: "Deep Dive into Spending Breakdown",
    linkModule: "spending",
  },
  {
    id: "debt",
    title: "Debt Management & Credit Health Optimization",
    icon: CreditCard,
    score: 8.7,
    status: "Excellent" as FinancialStatus,
    comprehensiveAnalysis: `Client demonstrated exceptional progress in debt reduction, successfully reducing total debt by RM 2,450 this month, primarily through accelerated payments on the CIMB credit card. This proactive approach has significantly improved the Debt-to-Income (DTI) ratio to a healthy 28%, well within the recommended 30% threshold. However, the credit card utilization (CCU) remains high at 65%, which, despite consistent payments, can negatively impact the credit score.`,
    externalContext: `Bank Negara's recent 25 basis point OPR increase to 3.00% will impact the client's variable-rate housing loan starting next month, potentially increasing monthly payments. This macroeconomic shift necessitates a review of the current debt strategy to mitigate increased interest costs.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Formulate a concrete plan to reduce credit card utilization below 30% within 2 months by allocating an additional RM 1,200 towards the balance, potentially using surplus from holiday fund completion.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Conduct a detailed analysis on refinancing options for the variable-rate housing loan if prevailing market rates offer a reduction of 0.5% or more, exploring fixed-rate alternatives.",
      },
      {
        type: "Long-Term Consideration",
        text: "Continue the 'debt avalanche' strategy, directing any freed-up cash flow (e.g., from PTPTN payoff) towards the Maybank personal loan, which carries the highest fixed interest rate.",
      },
    ],
    behavioralInsights:
      "Client is highly motivated by tangible debt reduction progress, which can be leveraged for sustained discipline. The challenge lies in consistent credit card management to avoid high utilization.",
    comparisonBenchmarking:
      "Client's debt reduction rate is 20% faster than the average for individuals with similar DTI ratios, showcasing strong financial discipline.",
    metrics: [
      {
        label: "Total Debt",
        value: "RM 187,450",
        change: -1.3,
        period: "MoM reduction",
      },
      {
        label: "Debt-to-Income",
        value: "28%",
        change: -3,
        period: "optimal ratio",
      },
      {
        label: "CC Utilization",
        value: "65%",
        change: 0,
        period: "needs reduction",
      },
    ],
    linkText: "Strategize Debt Repayment",
    linkModule: "debts",
  },
  {
    id: "investments",
    title: "Savings & Investment Portfolio Performance",
    icon: PiggyBank,
    score: 7.9,
    status: "Excellent" as FinancialStatus,
    comprehensiveAnalysis: `The client's savings rate reached an commendable 22% this month, positioning them ahead of schedule for the emergency fund goal. The investment portfolio demonstrated a robust 3.2% gain this month, outperforming the FBM KLCI by 1.8%. However, analysis identifies a notable 45% concentration in technology stocks, which, while beneficial during growth cycles, exposes the portfolio to undue sectoral risk during downturns. Rebalancing is crucial for long-term stability.`,
    externalContext: `Global market volatility, driven by US inflation concerns and China's economic reopening, created mixed signals for ASEAN markets. Malaysian REITs showed resilience, while technology stocks experienced higher volatility. This external environment reinforces the need for strategic diversification away from concentrated positions.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Propose a portfolio rebalancing strategy to reduce technology sector concentration to below 35%, reallocating funds into more diversified sectors or asset classes (e.g., healthcare, consumer staples).",
      },
      {
        type: "Mid-Term Strategy",
        text: "Recommend increasing monthly contributions to the Versa robo-advisor by RM 300 to leverage its automated diversification and exposure to a broader market.",
      },
      {
        type: "Long-Term Consideration",
        text: "Conduct an in-depth review of ASB investment potential; the client's current contributions appear underutilized, missing out on consistent, low-risk returns.",
      },
    ],
    behavioralInsights:
      "Client shows a natural inclination towards high-growth sectors, driven by perceived higher returns. Education on risk-adjusted returns and diversification benefits will be key.",
    comparisonBenchmarking:
      "Client's portfolio return (3.2% MoM) is in the top quartile compared to balanced portfolios within their risk profile. However, tech concentration is 15% higher than recommended benchmarks.",
    metrics: [
      { label: "Savings Rate", value: "22%", change: 12, period: "of income" },
      {
        label: "Portfolio Return",
        value: "+3.2%",
        change: 0,
        period: "this month",
      },
      {
        label: "Tech Concentration",
        value: "45%",
        change: 0,
        period: "needs reduction",
      },
    ],
    linkText: "Optimize Investment Portfolio",
    linkModule: "investments",
  },
  {
    id: "retirement",
    title: "Retirement Planning & Readiness Assessment",
    icon: Shield,
    score: 7.4,
    status: "On Track" as FinancialStatus,
    comprehensiveAnalysis: `Based on current contribution levels and projected income, the client is 74% on track to achieve their desired retirement lifestyle at age 60. The EPF Account 1 balance saw a healthy growth of RM 892 this month (including employer contributions and dividends). The client's self-reported retirement confidence level is 72%, which is commendable, but slight adjustments can significantly enhance long-term security.`,
    externalContext: `EPF's 2023 dividend of 5.5% for conventional savings exceeded expectations, positively impacting retirement balances. The government's continued offering of additional PRS tax relief up to RM 3,000 presents a significant, underutilized opportunity for tax optimization and accelerated retirement savings.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Advise increasing voluntary EPF contribution by RM 200/month to fully leverage tax benefits and compound higher returns, especially if it falls within the current tax relief limits.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Recommend opening and contributing to a Private Retirement Scheme (PRS) account to utilize the full RM 3,000 annual tax relief, diversifying retirement assets beyond EPF.",
      },
      {
        type: "Long-Term Consideration",
        text: "Simulate 'what-if' scenarios with the client: illustrate the profound impact of working until 62 instead of 60 on projected retirement income and financial security, providing data-driven rationale.",
      },
    ],
    behavioralInsights:
      "Client understands the importance of retirement planning but may underestimate the power of early, consistent, and optimized contributions. Visualizing long-term compound growth is effective.",
    comparisonBenchmarking:
      "Client's EPF balance growth rate is consistent with average, but overall retirement readiness score (74%) is 5% below individuals actively utilizing all available tax-advantaged retirement vehicles.",
    metrics: [
      {
        label: "Readiness Score",
        value: "74%",
        change: 2,
        period: "confidence level",
      },
      {
        label: "EPF Balance",
        value: "RM 125,650",
        change: 0.7,
        period: "monthly growth",
      },
      {
        label: "Years to Target",
        value: "28 years",
        change: 0,
        period: "until retirement",
      },
    ],
    linkText: "Refine Retirement Strategy",
    linkModule: "retirement",
  },
  {
    id: "tax",
    title: "Tax Efficiency & Optimization Opportunities",
    icon: Calculator,
    score: 6.5,
    status: "Needs Attention" as FinancialStatus,
    comprehensiveAnalysis: `For the tax year 2023, the client utilized RM 4,200 in tax reliefs, primarily from lifestyle (RM 2,500, max RM 2,500) and medical expenses (RM 1,200). However, the system has identified RM 800 in potential unused lifestyle relief and a complete underutilization of the PRS contribution relief (up to RM 3,000). There's a significant opportunity to reduce tax liability for the upcoming filing.`,
    externalContext: `Budget 2024 introduced enhanced tax relief for electric vehicle purchases and increased medical expense limits to RM 10,000, creating new opportunities. The e-filing deadline of April 30, 2024, is approaching, with penalties for late submission. Staying updated on these changes is crucial for maximizing client benefits.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Alert client to categorize RM 450 in unclassified medical transactions detected in their spending to claim additional medical relief, potentially reducing tax payable.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Discuss strategic purchases (e.g., books, sports equipment) to utilize the remaining RM 800 lifestyle relief before the tax year end.",
      },
      {
        type: "Long-Term Consideration",
        text: "Develop a proactive strategy for PRS contributions, aiming to fully utilize the RM 3,000 deduction annually, potentially through automated monthly transfers.",
      },
    ],
    behavioralInsights:
      "Client demonstrates good record-keeping but may not be fully aware of the breadth of available tax reliefs or the strategic timing of certain expenditures.",
    comparisonBenchmarking:
      "Client's tax relief utilization is 15% below the average for similar income brackets due to underutilization of investment-related and lifestyle reliefs.",
    metrics: [
      {
        label: "Reliefs Used",
        value: "RM 4,200",
        change: 0,
        period: "of available",
      },
      {
        label: "Est. Refund/Payable",
        value: "RM 1,247 Refund",
        change: 15,
        period: "based on current",
      },
      {
        label: "Filing Progress",
        value: "65%",
        change: 0,
        period: "documents ready",
      },
    ],
    linkText: "Optimize Tax Strategy",
    linkModule: "taxes",
  },
  {
    id: "insurance",
    title: "Insurance & Risk Protection Audit",
    icon: Heart,
    score: 8.3,
    status: "On Track" as FinancialStatus,
    comprehensiveAnalysis: `The client's insurance portfolio is generally comprehensive, covering 4 out of 5 key protection areas (Life, Medical, Accident, Property). Deep analysis confirms adequate life coverage at 8x annual income, which aligns with industry best practices. However, a critical illness coverage gap has been identified, particularly pertinent given the client's family history of cardiovascular issues.`,
    externalContext: `Rising healthcare costs in Malaysia (averaging 10% annually) and increased medical inflation post-pandemic make regular review of medical insurance limits critical. The government's MySalam program provides additional coverage, but the client's income bracket may not qualify for maximum benefits, emphasizing private policy importance.`,
    strategicRecommendations: [
      {
        type: "Immediate Action",
        text: "Propose a critical illness rider addition to the existing life policy, or a standalone critical illness plan, providing an additional RM 100,000 coverage.",
      },
      {
        type: "Mid-Term Strategy",
        text: "Review the medical insurance annual limit (currently RM 150,000) against current healthcare cost trends and family needs, considering an increase to RM 200,000.",
      },
      {
        type: "Long-Term Consideration",
        text: "Evaluate home insurance coverage following recent property valuation increase to ensure adequate rebuilding cost coverage and protection against natural disasters.",
      },
    ],
    behavioralInsights:
      "Client is receptive to risk mitigation but needs data-driven insights to justify additional premium outlays. Highlighting family history impact is effective.",
    comparisonBenchmarking:
      "Client's overall protection score is 10% higher than peers who only maintain basic compulsory insurance, but trails those with comprehensive critical illness coverage.",
    metrics: [
      {
        label: "Protection Score",
        value: "83%",
        change: 5,
        period: "coverage adequacy",
      },
      {
        label: "Active Policies",
        value: "4 policies",
        change: 0,
        period: "across key areas",
      },
      {
        label: "Premium Efficiency",
        value: "Good",
        change: 0,
        period: "cost vs coverage",
      },
    ],
    linkText: "Audit Coverage & Premiums",
    linkModule: "insurance",
  },
];
// --- End of Provided moduleInsights Data ---

// Helper function to convert structured recommendations to a display string
const formatStrategicRecommendations = (
  recs: { type: string; text: string }[]
) => {
  return recs.map((rec) => `${rec.type}: ${rec.text}`).join("\n\n");
};

// Helper function to convert structured metrics to a display string
const formatMetrics = (
  metrics: { label: string; value: string; change: number; period: string }[]
) => {
  return metrics
    .map(
      (metric) =>
        `${metric.label}: ${metric.value}${
          metric.change !== 0
            ? ` (${metric.change > 0 ? "+" : ""}${metric.change}%)`
            : ""
        } ${metric.period ? `[${metric.period}]` : ""}`
    )
    .join("\n");
};

// Define an interface for the editable version of insights
// We flatten complex fields like strategicRecommendations and metrics into strings for easy editing
interface EditableModuleInsight
  extends Omit<ModuleInsight, "strategicRecommendations" | "metrics"> {
  strategicRecommendations: string;
  metrics: string;
  // Add a field to track if this specific insight has been "released"
  isReleased: boolean;
}

const AmendOutputPage: React.FC = () => {
  // Store the initial AI-generated insights in a way that can be reset to
  const initialEditableInsightsState: EditableModuleInsight[] =
    moduleInsights.map((insight) => ({
      ...insight,
      strategicRecommendations: formatStrategicRecommendations(
        insight.strategicRecommendations
      ),
      metrics: formatMetrics(insight.metrics),
      isReleased: false, // Default to not released
    }));

  const [editableInsights, setEditableInsights] = useState<
    EditableModuleInsight[]
  >(initialEditableInsightsState);

  const handleChange = (
    moduleId: string,
    field: keyof EditableModuleInsight,
    value: string
  ) => {
    setEditableInsights((prevInsights) =>
      prevInsights.map((insight) =>
        insight.id === moduleId ? { ...insight, [field]: value } : insight
      )
    );
  };

  const handleSave = (moduleId: string) => {
    const insightToSave = editableInsights.find((i) => i.id === moduleId);
    if (insightToSave) {
      console.log(
        `Saving amendments for ${insightToSave.title}:`,
        insightToSave
      );
      // In a real application, you would send this data to your backend API
      // to persist the planner's edits, but not necessarily "release" it yet.
      alert(
        `Amended insights for "${insightToSave.title}" saved successfully!`
      );
    }
  };

  const handleReset = (moduleId: string) => {
    const moduleTitle = moduleInsights.find((m) => m.id === moduleId)?.title;
    const confirmReset = window.confirm(
      `Are you sure you want to revert all changes for "${moduleTitle}" to the original AI output?`
    );
    if (confirmReset) {
      const originalInsight = initialEditableInsightsState.find(
        (i) => i.id === moduleId
      );
      if (originalInsight) {
        setEditableInsights((prevInsights) =>
          prevInsights.map((insight) =>
            insight.id === moduleId
              ? { ...originalInsight, isReleased: false }
              : insight
          )
        );
        console.log(
          `Reverted insights for ${moduleTitle} to original AI output.`
        );
        alert(`Insights for "${moduleTitle}" reverted to original AI output.`);
      }
    }
  };

  const handleRelease = (moduleId: string) => {
    const moduleTitle = moduleInsights.find((m) => m.id === moduleId)?.title;
    const confirmRelease = window.confirm(
      `Are you sure you want to release the amended insights for "${moduleTitle}" to the client? This will make these changes final and visible to them.`
    );
    if (confirmRelease) {
      setEditableInsights((prevInsights) =>
        prevInsights.map((insight) =>
          insight.id === moduleId ? { ...insight, isReleased: true } : insight
        )
      );
      const insightToRelease = editableInsights.find((i) => i.id === moduleId);
      if (insightToRelease) {
        console.log(
          `Releasing amended insights for ${moduleTitle}:`,
          insightToRelease
        );
        // In a real application, you would send insightToRelease to a backend API
        // to mark it as 'released' or update the client-facing version.
        alert(`Amended insights for "${moduleTitle}" released to client!`);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
        <Settings className="h-9 w-9 mr-4 text-blue-600" />
        Amend AI-Generated Client Insights
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl">
        Review and fine-tune the AI-generated insights for your client. You can
        edit any section, save your changes, and then 'release' the updated
        insights to make them visible to the client.
      </p>

      <Alert className="border-l-4 border-blue-500 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Planner's Workflow</AlertTitle>
        <AlertDescription className="text-sm text-blue-700">
          <p className="mb-2">
            After AI generates initial insights, planners can adjust wording,
            add personal touches, or correct minor inaccuracies in any of the
            output sections. Use the "Save Amendments" button to store your
            work, and "Release to Client" to publish the finalized insights. The
            "Reset to AI Output" button will revert the current module's
            insights to their original AI-generated state.
          </p>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {editableInsights.map((insight) => {
          const ModuleIcon = insight.icon; // Get the icon component
          const isReleased = insight.isReleased;

          return (
            <Card
              key={insight.id}
              className={`shadow-lg hover:shadow-xl transition-shadow ${
                isReleased
                  ? "border-t-4 border-green-500"
                  : "border-t-4 border-blue-500"
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-2xl text-blue-700">
                  <ModuleIcon className="h-7 w-7 text-blue-600" />
                  <span>{insight.title} Insights</span>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Edit the AI's generated output for {insight.title}.
                  {isReleased && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                      Released to Client
                    </span>
                  )}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor={`${insight.id}-comprehensiveAnalysis`}
                      className="text-base font-semibold text-blue-800 flex items-center mb-2"
                    >
                      <FlaskConical className="h-4 w-4 mr-2" />
                      Comprehensive Analysis
                    </Label>
                    <Textarea
                      id={`${insight.id}-comprehensiveAnalysis`}
                      value={insight.comprehensiveAnalysis}
                      onChange={(e) =>
                        handleChange(
                          insight.id,
                          "comprehensiveAnalysis",
                          e.target.value
                        )
                      }
                      rows={8}
                      className="min-h-[120px] bg-blue-50 border-blue-200 focus-visible:ring-blue-500"
                      placeholder="Edit the comprehensive analysis here..."
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`${insight.id}-externalContext`}
                      className="text-base font-semibold text-purple-800 flex items-center mb-2"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      External Market Context
                    </Label>
                    <Textarea
                      id={`${insight.id}-externalContext`}
                      value={insight.externalContext}
                      onChange={(e) =>
                        handleChange(
                          insight.id,
                          "externalContext",
                          e.target.value
                        )
                      }
                      rows={6}
                      className="min-h-[100px] bg-purple-50 border-purple-200 focus-visible:ring-purple-500"
                      placeholder="Edit the external context here..."
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`${insight.id}-strategicRecommendations`}
                      className="text-base font-semibold text-green-800 flex items-center mb-2"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Strategic Recommendations
                    </Label>
                    <Textarea
                      id={`${insight.id}-strategicRecommendations`}
                      value={insight.strategicRecommendations}
                      onChange={(e) =>
                        handleChange(
                          insight.id,
                          "strategicRecommendations",
                          e.target.value
                        )
                      }
                      rows={6}
                      className="min-h-[100px] bg-green-50 border-green-200 focus-visible:ring-green-500"
                      placeholder="Edit strategic recommendations. Use line breaks for clarity (e.g., 'Immediate Action: ...\nMid-Term Strategy: ...')"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`${insight.id}-behavioralInsights`}
                      className="text-base font-semibold text-orange-800 flex items-center mb-2"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Behavioral Insights
                    </Label>
                    <Textarea
                      id={`${insight.id}-behavioralInsights`}
                      value={insight.behavioralInsights}
                      onChange={(e) =>
                        handleChange(
                          insight.id,
                          "behavioralInsights",
                          e.target.value
                        )
                      }
                      rows={4}
                      className="min-h-[80px] bg-orange-50 border-orange-200 focus-visible:ring-orange-500"
                      placeholder="Edit behavioral insights here..."
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`${insight.id}-comparisonBenchmarking`}
                      className="text-base font-semibold text-teal-800 flex items-center mb-2"
                    >
                      <Scale className="h-4 w-4 mr-2" />
                      Comparative Benchmarking
                    </Label>
                    <Textarea
                      id={`${insight.id}-comparisonBenchmarking`}
                      value={insight.comparisonBenchmarking}
                      onChange={(e) =>
                        handleChange(
                          insight.id,
                          "comparisonBenchmarking",
                          e.target.value
                        )
                      }
                      rows={4}
                      className="min-h-[80px] bg-teal-50 border-teal-200 focus-visible:ring-teal-500"
                      placeholder="Edit comparative benchmarking analysis here..."
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`${insight.id}-metrics`}
                      className="text-base font-semibold text-gray-800 flex items-center mb-2"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Key Metrics
                    </Label>
                    <Textarea
                      id={`${insight.id}-metrics`}
                      value={insight.metrics}
                      onChange={(e) =>
                        handleChange(insight.id, "metrics", e.target.value)
                      }
                      rows={4}
                      className="min-h-[80px] bg-gray-50 border-gray-200 focus-visible:ring-gray-500"
                      placeholder="Edit key metrics here. Use line breaks for each metric."
                    />
                  </div>
                </div>

                <div className="flex gap-4 flex-col 2xl:flex-row sm:items-center sm:justify-between mt-6 pt-4 border-t border-gray-200">
                  {/* Left action */}
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => handleReset(insight.id)}
                    disabled={isReleased}
                  >
                    <RotateCcw className="h-4 w-4 mr-2 shrink-0" />
                    Reset to AI Output
                  </Button>

                  {/* Right actions */}
                  <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
                    <Button
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleSave(insight.id)}
                      disabled={isReleased}
                    >
                      <Save className="h-4 w-4 mr-2 shrink-0" />
                      Save Amendments
                    </Button>
                    <Button
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleRelease(insight.id)}
                      disabled={isReleased}
                    >
                      <Send className="h-4 w-4 mr-2 shrink-0" />
                      {isReleased ? "Released" : "Release to Client"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AmendOutputPage;
