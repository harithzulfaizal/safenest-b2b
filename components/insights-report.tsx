// components/insights-report.tsx
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle,
  CreditCard,
  Download,
  ExternalLink,
  FlaskConical,
  Lightbulb,
  PiggyBank,
  Share2,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface InsightsReportProps {
  onNavigateToModule?: (module: string) => void;
}

// Define standardized status categories for chips/badges
type FinancialStatus = "Excellent" | "On Track" | "Needs Attention" | "At Risk";

export function InsightsReport({ onNavigateToModule }: InsightsReportProps) {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const clientName = "Ahmad Bin Abdullah"; // Client name for internal data, not displayed

  // --- Mock Data: Significantly Expanded for Planner's View ---
  const clientProfile = {
    name: clientName, // Used internally for mock data, not displayed in UI
    age: 38,
    profession: "Software Engineer",
    riskProfile: "Growth-Oriented (Moderate-High)",
    maritalStatus: "Married, 2 Children",
    financialGoalsSummary:
      "Primary goals include purchasing a family home, building a robust retirement fund, and establishing an education fund for children.",
    lastReportGenerated: "February 28, 2024",
    plannerNotes:
      "Client is highly motivated to optimize finances but occasionally struggles with discretionary spending discipline. Keen on leveraging technology for financial management.",
  };

  const reportData = {
    month: "January 2024",
    overallFinancialPulseScore: 7.2,
    financialPulseStatus: "On Track" as FinancialStatus,
    financialPulseDescription:
      "Client's financial foundation is solid, demonstrating consistent progress in key areas like debt reduction and investment growth. Identified areas for optimization include discretionary spending and credit utilization.",
    keyHighlights: {
      strategicAccomplishments: [
        "Achieved a 12% increase in net savings rate, exceeding the target of 10% for the month.",
        "Reduced high-interest credit card debt by RM 2,450, significantly improving the Debt-to-Income ratio.",
        "Investment portfolio demonstrated resilience, outperforming the FBM KLCI by 1.8% despite market volatility.",
        "Emergency fund now covers 4.2 months of essential expenses, nearing the 6-month optimal threshold.",
      ],
      identifiedAreasForEnhancement: [
        "Discretionary dining out expenses exceeded the allocated budget by RM 380, indicating a potential behavioral pattern.",
        "Credit card utilization (CCU) remains elevated at 65%, impacting credit score potential and incurring unnecessary interest charges.",
        "Opportunity to further optimize tax reliefs; client has unused PRS contribution potential.",
      ],
    },
    comprehensiveSummary: `January 2024 reflects a period of disciplined financial management offset by minor discretionary overspending. Analysis highlights a robust financial trajectory, primarily driven by accelerated debt repayments and consistent, diversified investment contributions. The emergency fund has reached a healthy level, enhancing the client's financial resilience.

        While income streams remain stable and growth-oriented, the primary challenge identified is the 'lifestyle creep' evident in discretionary spending, particularly dining and entertainment. This trend, if unaddressed, could significantly impact the client's long-term savings goals, especially the critical house down payment.

        External economic factors, such as Bank Negara's OPR adjustment, present both a potential increase in variable loan costs and an opportunity for strategic debt refinancing. Focused intervention on spending habits is recommended, coupled with optimizing credit card utilization and re-evaluating investment diversification within the technology sector.

        Overall, the client demonstrates a high capacity for financial discipline and responsiveness to advice, making them well-positioned for continued growth with targeted guidance in consumption habits and portfolio rebalancing.`,
  };

  // Trends & Analytics Data (More detailed)
  const trendsData = {
    overallTrajectory: {
      status: "On Track" as FinancialStatus,
      netWorthChange: { value: 5.2, period: "Q4 2023", benchmark: 3.5 },
      netIncomeChange: { value: 8, period: "YoY", benchmark: 6 },
      savingsRateChange: { value: 12, period: "MoM", benchmark: 5 },
      debtReductionChange: { value: -15, period: "MoM", benchmark: -10 },
      investmentGrowthChange: { value: 23, period: "6-months", benchmark: 18 },
      liquidityPosition: "Excellent (4.2 months of expenses)",
      analysis:
        "The client's overall financial trajectory is notably positive, marked by strong net worth appreciation (+5.2% last quarter, outperforming benchmark) and significant improvements in savings and debt reduction. While investment growth is robust, the subtle increase in discretionary spending (as detailed below) warrants attention to ensure it doesn't decelerate future progress. The liquidity position is healthy, providing a strong buffer against unforeseen events.",
    },
    spendingEvolution: {
      totalSpending: "RM 4,235",
      spendingIncomeRatio: "68%",
      increasingCategories: [
        {
          name: "Food & Dining",
          change: 18,
          amount: "RM 856",
          percentageOfIncome: "14%",
          historicalAverage: "RM 650",
        },
        {
          name: "Entertainment",
          change: 25,
          amount: "RM 342",
          percentageOfIncome: "5.5%",
          historicalAverage: "RM 270",
        },
        {
          name: "Shopping",
          change: 12,
          amount: "RM 426",
          percentageOfIncome: "7%",
          historicalAverage: "RM 380",
        },
      ],
      decreasingCategories: [
        {
          name: "Transportation",
          change: -8,
          amount: "RM 542",
          percentageOfIncome: "9%",
          historicalAverage: "RM 590",
        },
        {
          name: "Utilities",
          change: -5,
          amount: "RM 287",
          percentageOfIncome: "4.5%",
          historicalAverage: "RM 300",
        },
      ],
      lifestyleCreepAlert: {
        amount: 450,
        period: "6 months",
        impact:
          "This consistent increase in discretionary spending could reduce annual savings by RM 5,400, potentially delaying the House Down Payment goal by approximately 3-4 months.",
        behavioralInsight:
          "Analysis suggests these spikes often occur on weekends and are linked to social activities, indicating an emotional spending pattern rather than necessity.",
      },
      comparativeBenchmarking: {
        similarProfiles:
          "Client's dining expenses are 15% higher than peers with similar income and family size.",
        budgetAdherence:
          "78% adherence to overall budget, but only 55% in discretionary categories.",
      },
    },
    incomeStability: {
      primaryIncomeStability: "Excellent",
      incomeStreams: [
        {
          source: "Primary Salary (Tech Sector)",
          percentage: 75,
          amount: "RM 4,500",
          growthPotential: "Moderate-High",
        },
        {
          source: "Side Hustle (Freelance Project Management)",
          percentage: 20,
          amount: "RM 1,200",
          growthPotential: "Variable",
        },
        {
          source: "Investments (Dividends & Rental Income)",
          percentage: 5,
          amount: "RM 300",
          growthPotential: "High",
        },
      ],
      volatilityIndex: 12, // Lower is better
      diversificationScore: 7.8, // Out of 10
      projectedIncomeGrowth:
        "3-5% for primary income over next 12 months (industry average).",
      contingencyPlanning:
        "Emergency fund covers 4.2 months, but for 12% income volatility, 6 months would be optimal.",
    },
    debtMomentum: {
      averageMonthlyReduction: 2450,
      totalOutstandingDebt: "RM 187,450",
      debtComposition: {
        housingLoan: "RM 150,000 (Variable)",
        personalLoan: "RM 25,000 (Fixed)",
        creditCard: "RM 12,450 (High-Interest)",
      },
      projectedDebtFreeDate: "March 2027 (If current payment maintained)",
      interestSavingsPotential: {
        acceleratedPayments:
          "RM 8,700 (over remaining loan term by adding RM 500/month to high-interest debt)",
        refinancing:
          "Estimate RM 12,000 (by refinancing housing loan at 0.5% lower rate)",
      },
      currentMonthlyInterestPaid: 1247,
      momentum: "Excellent",
      debtToIncomeRatio: "28% (Below healthy 30% benchmark)",
      creditCardUtilization: "65% (Above recommended 30%)",
    },
    investmentPerformance: {
      cumulativeGain: 15.8, // over 12 months
      monthlyContribution: 800,
      dollarCostAveragingEffectiveness:
        "Highly Effective - mitigated volatility during Q3 2023.",
      marketVsContribution: {
        contributions: "65% of total portfolio value",
        marketGains: "35% of total portfolio value",
      },
      portfolioVolatility: "Moderate (Beta: 1.15 vs. KLCI)",
      assetAllocation: {
        equities: "60% (45% in Tech, 15% diversified)",
        bonds: "30%",
        alternatives: "10% (REITs, Gold)",
      },
      riskAdjustedReturn: "Sharpe Ratio: 0.85 (Above average for profile)",
      scenarioAnalysis: {
        marketDownturn10Percent:
          "Projected 8% portfolio value decline (due to tech concentration).",
        increasedContribution:
          "Additional RM 200/month could boost long-term returns by 1.5% annually.",
      },
    },
  };

  // Goals Tracking Data (More granular for planner)
  const goalsData = {
    overallProgressPercentage: 68,
    totalGoalsValue: 125000,
    currentProgressValue: 85000,
    activeGoals: [
      {
        id: "emergency-fund",
        name: "Emergency Fund",
        targetAmount: 25000,
        currentAmount: 21000,
        progress: (21000 / 25000) * 100,
        targetDate: "2024-06-30",
        status: "On Track" as FinancialStatus,
        monthlyContribution: 800,
        projectedCompletion: "2024-05-15",
        category: "Safety Net",
        priority: "High (Critical)",
        gapAnalysis:
          "RM 4,000 remaining. On track for target date, but optimal level based on income volatility is RM 27,000 (6 months).",
        aiRecommendation:
          "Maintain current contributions; consider increasing by RM 200 post-debt reduction for optimal coverage.",
      },
      {
        id: "house-deposit",
        name: "House Down Payment",
        targetAmount: 80000,
        currentAmount: 45000,
        progress: (45000 / 80000) * 100,
        targetDate: "2025-12-31",
        status: "Needs Attention" as FinancialStatus,
        monthlyContribution: 1200,
        projectedCompletion: "2026-03-15",
        category: "Major Purchase",
        priority: "High (Primary Aspiration)",
        gapAnalysis:
          "RM 35,000 deficit. Current contributions lead to a 2.5-month delay. Requires an additional RM 350/month contribution or target date extension.",
        aiRecommendation:
          "Increase monthly contribution to RM 1,550 or extend target date to June 2026. Explore potential for one-off bonus contributions.",
      },
      {
        id: "holiday-fund",
        name: "Japan Holiday Fund",
        targetAmount: 8000,
        currentAmount: 6500,
        progress: (6500 / 8000) * 100,
        targetDate: "2024-09-30",
        status: "Excellent" as FinancialStatus,
        monthlyContribution: 300,
        projectedCompletion: "2024-08-15",
        category: "Lifestyle",
        priority: "Medium",
        gapAnalysis:
          "RM 1,500 remaining. Excellent progress, projected to complete 1.5 months early.",
        aiRecommendation:
          "Maintain contributions. Excess funds upon completion could be reallocated to House Down Payment goal.",
      },
      {
        id: "car-fund",
        name: "Car Replacement Fund",
        targetAmount: 35000,
        currentAmount: 12500,
        progress: (12500 / 35000) * 100,
        targetDate: "2025-06-30",
        status: "On Track" as FinancialStatus,
        monthlyContribution: 600,
        projectedCompletion: "2025-06-15",
        category: "Major Purchase",
        priority: "Medium",
        gapAnalysis:
          "RM 22,500 remaining. Steady progress, on track for target.",
        aiRecommendation:
          "Continue current contributions. Review target amount in 6 months for market changes.",
      },
    ],
    recentlyCompleted: [
      {
        name: "PTPTN Loan Payoff",
        amount: 15000,
        completedDate: "2023-12-15",
        category: "Debt Elimination",
        learning:
          "Demonstrated strong commitment to debt reduction, freeing up RM 200/month cash flow.",
      },
      {
        name: "Laptop Upgrade Fund",
        amount: 3500,
        completedDate: "2024-01-08",
        category: "Technology",
        learning:
          "Successful short-term saving, reinforcing client's ability to achieve specific targets.",
      },
    ],
    overallGoalGap:
      "Total deficit of RM 39,000 across all active goals if current contributions are not adjusted.",
  };

  // Module-Specific Insights (Deep Dive for Planner)
  const moduleInsights = [
    // {
    //   id: "cash-flow",
    //   title: "Income & Cash Flow Dynamics",
    //   icon: DollarSign,
    //   score: 8.1,
    //   status: "On Track" as FinancialStatus,
    //   comprehensiveAnalysis: `The client's net cash flow for January was RM 2,847, representing an 8% decrease from December, primarily influenced by anticipated seasonal spending and one-off Chinese New Year expenses. Despite this monthly fluctuation, the underlying income streams from primary employment and a side hustle demonstrate consistent stability. The recent salary increase (effective January) has positively impacted the annual income baseline. System projects a return to positive cash flow growth in February, barring unforeseen expenses.`,
    //   externalContext: `Malaysia's labour market exhibited resilience in Q4 2023 (unemployment at 3.3%), ensuring primary income stability. However, the services sector, where the client's side hustle operates, shows moderate wage growth. This market context underscores the importance of a robust emergency fund and diversified income strategy.`,
    //   strategicRecommendations: [
    //     {
    //       type: "Immediate Action",
    //       text: "Propose setting up an automated transfer of RM 400 to the high-yield savings account immediately post-payday to ensure consistent cash flow optimization.",
    //     },
    //     {
    //       type: "Mid-Term Strategy",
    //       text: "Review and categorize the one-off CNY expenses to differentiate between necessary and discretionary seasonal spending for future budget planning.",
    //     },
    //     {
    //       type: "Long-Term Consideration",
    //       text: "Discuss exploring additional passive income streams aligned with client's skills to further enhance income diversification and hedge against primary income volatility.",
    //     },
    //   ],
    //   behavioralInsights:
    //     "Client tends to spend more aggressively on discretionary items when cash flow is high, suggesting a 'treat yourself' pattern post-income events.",
    //   comparisonBenchmarking:
    //     "Client's income diversification (3 sources) is above average for their age group, contributing to a lower overall income volatility index compared to peers.",
    //   metrics: [
    //     {
    //       label: "Net Cash Flow",
    //       value: "RM 2,847",
    //       change: -8,
    //       period: "MoM",
    //     },
    //     {
    //       label: "Income Stability",
    //       value: "Excellent",
    //       change: 0,
    //       period: "3 diverse streams",
    //     },
    //     {
    //       label: "Emergency Fund",
    //       value: "4.2 months",
    //       change: 5,
    //       period: "of expenses",
    //     },
    //   ],
    //   linkText: "Analyze Cash Flow Projections",
    //   linkModule: "home",
    // },
    // {
    //   id: "spending",
    //   title: "Spending Patterns & Efficiency Analysis",
    //   icon: ShoppingCart,
    //   score: 6.8,
    //   status: "Needs Attention" as FinancialStatus,
    //   comprehensiveAnalysis: `Client's total spending of RM 4,235 represented 68% of income this month, a 12% increase from December. The top expenditure categories were Food & Dining (RM 856), Transportation (RM 542), and Shopping (RM 426). Anomaly detection flagged a significant acceleration in dining out expenses mid-month, particularly on weekends, leading to a RM 380 budget overrun. This indicates a 'lifestyle creep' where comfort spending is increasing disproportionately to income growth.`,
    //   externalContext: `Rising inflation, particularly a 3% increase in RON95 petrol and 5% rise in restaurant costs due to minimum wage adjustments, contributed to higher transport and dining expenses for Malaysian households. While some increases are external, the client's spending velocity in discretionary categories is above market trends.`,
    //   strategicRecommendations: [
    //     {
    //       type: "Immediate Action",
    //       text: "Collaborate with the client to implement a strict weekly spending limit for Food & Dining (e.g., RM 200/week), utilizing transaction alerts.",
    //     },
    //     {
    //       type: "Mid-Term Strategy",
    //       text: "Encourage meal planning and preparing more meals at home to reduce dining out frequency by 2-3 times per week, aiming for a RM 250 monthly saving.",
    //     },
    //     {
    //       type: "Long-Term Consideration",
    //       text: "Conduct a comprehensive review of all recurring subscription services; the system detected RM 127 in potential non-essential monthly charges.",
    //     },
    //   ],
    //   behavioralInsights:
    //     "The system identified a correlation between increased discretionary spending and periods of high work-related stress, suggesting spending as a coping mechanism. This is a key discussion point.",
    //   comparisonBenchmarking:
    //     "Client's discretionary spending as a percentage of income is 10% higher than similar income-level peers who are actively saving for a house down payment.",
    //   metrics: [
    //     {
    //       label: "Total Spending",
    //       value: "RM 4,235",
    //       change: 12,
    //       period: "MoM",
    //     },
    //     {
    //       label: "Budget Adherence",
    //       value: "78%",
    //       change: -15,
    //       period: "of categories on track",
    //     },
    //     {
    //       label: "Lifestyle Creep",
    //       value: "RM 450/month",
    //       change: 0,
    //       period: "over 6 months",
    //     },
    //   ],
    //   linkText: "Deep Dive into Spending Breakdown",
    //   linkModule: "spending",
    // },
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
        {
          label: "Savings Rate",
          value: "22%",
          change: 12,
          period: "of income",
        },
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
    // {
    //   id: "insurance",
    //   title: "Insurance & Risk Protection Audit",
    //   icon: Heart,
    //   score: 8.3,
    //   status: "On Track" as FinancialStatus,
    //   comprehensiveAnalysis: `The client's insurance portfolio is generally comprehensive, covering 4 out of 5 key protection areas (Life, Medical, Accident, Property). Deep analysis confirms adequate life coverage at 8x annual income, which aligns with industry best practices. However, a critical illness coverage gap has been identified, particularly pertinent given the client's family history of cardiovascular issues.`,
    //   externalContext: `Rising healthcare costs in Malaysia (averaging 10% annually) and increased medical inflation post-pandemic make regular review of medical insurance limits critical. The government's MySalam program provides additional coverage, but the client's income bracket may not qualify for maximum benefits, emphasizing private policy importance.`,
    //   strategicRecommendations: [
    //     {
    //       type: "Immediate Action",
    //       text: "Propose a critical illness rider addition to the existing life policy, or a standalone critical illness plan, providing an additional RM 100,000 coverage.",
    //     },
    //     {
    //       type: "Mid-Term Strategy",
    //       text: "Review the medical insurance annual limit (currently RM 150,000) against current healthcare cost trends and family needs, considering an increase to RM 200,000.",
    //     },
    //     {
    //       type: "Long-Term Consideration",
    //       text: "Evaluate home insurance coverage following recent property valuation increase to ensure adequate rebuilding cost coverage and protection against natural disasters.",
    //     },
    //   ],
    //   behavioralInsights:
    //     "Client is receptive to risk mitigation but needs data-driven insights to justify additional premium outlays. Highlighting family history impact is effective.",
    //   comparisonBenchmarking:
    //     "Client's overall protection score is 10% higher than peers who only maintain basic compulsory insurance, but trails those with comprehensive critical illness coverage.",
    //   metrics: [
    //     {
    //       label: "Protection Score",
    //       value: "83%",
    //       change: 5,
    //       period: "coverage adequacy",
    //     },
    //     {
    //       label: "Active Policies",
    //       value: "4 policies",
    //       change: 0,
    //       period: "across key areas",
    //     },
    //     {
    //       label: "Premium Efficiency",
    //       value: "Good",
    //       change: 0,
    //       period: "cost vs coverage",
    //     },
    //   ],
    //   linkText: "Audit Coverage & Premiums",
    //   linkModule: "insurance",
    // },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 7) return "text-blue-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  // Unified function for module/overall status badges
  const getStatusBadge = (status: FinancialStatus) => {
    switch (status) {
      case "Excellent":
        return (
          <Badge
            variant="default"
            className="bg-green-600 text-white text-sm py-1 px-3"
          >
            Excellent
          </Badge>
        );
      case "On Track":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white text-sm py-1 px-3"
          >
            On Track
          </Badge>
        );
      case "Needs Attention":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-300 text-sm py-1 px-3"
          >
            Needs Attention
          </Badge>
        );
      case "At Risk":
        return (
          <Badge variant="destructive" className="text-sm py-1 px-3">
            At Risk
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-sm py-1 px-3">
            Unknown
          </Badge>
        );
    }
  };

  // Specific function for goal status, which uses slightly different wording but maps to the same visual cues
  const getGoalStatusBadge = (status: FinancialStatus) => {
    switch (status) {
      case "Excellent":
        return (
          <Badge
            variant="default"
            className="bg-green-600 text-white text-sm py-1 px-3"
          >
            Ahead of Schedule
          </Badge>
        );
      case "On Track":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white text-sm py-1 px-3"
          >
            On Track
          </Badge>
        );
      case "Needs Attention":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 border-orange-300 text-sm py-1 px-3"
          >
            Behind Schedule
          </Badge>
        );
      case "At Risk": // Goals might not use "At Risk" often, but included for completeness
        return (
          <Badge variant="destructive" className="text-sm py-1 px-3">
            At Risk
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-sm py-1 px-3">
            Unknown
          </Badge>
        );
    }
  };

  const getGoalStatusColor = (status: FinancialStatus) => {
    switch (status) {
      case "Excellent":
        return "text-green-600";
      case "On Track":
        return "text-blue-600";
      case "Needs Attention":
        return "text-orange-600";
      case "At Risk":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Client Financial Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive Financial Analysis for {reportData.month}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Report Generated: {clientProfile.lastReportGenerated}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          {/* A placeholder for client selection in a multi-client scenario */}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01">January 2024</SelectItem>
              <SelectItem value="2023-12">December 2023</SelectItem>
              <SelectItem value="2023-11">November 2023</SelectItem>
              <SelectItem value="2023-10">October 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full md:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share Client Summary
          </Button>
          <Button className="w-full md:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Full Report (PDF)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
          <TabsTrigger
            value="overview"
            className="py-2.5 px-4 text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            Overview
          </TabsTrigger>
          {/* <TabsTrigger
            value="trends"
            className="py-2.5 px-4 text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            Trends & Analytics
          </TabsTrigger> */}
          <TabsTrigger
            value="goals"
            className="py-2.5 px-4 text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            Financial Goals
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="py-2.5 px-4 text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            Module Deep Dive
          </TabsTrigger>
        </TabsList>

        {/* --- Tab 1: Overview --- */}
        <TabsContent value="overview" className="space-y-8">
          {/* Client Overview Card */}
          {/* <Card className="bg-white shadow-sm border-t-4 border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-blue-700">
                <User className="h-6 w-6" />
                <span>Client Overview & Context</span>
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Essential background information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <p>
                  <strong>Age:</strong> {clientProfile.age}
                </p>
                <p>
                  <strong>Profession:</strong> {clientProfile.profession}
                </p>
                <p>
                  <strong>Marital Status:</strong> {clientProfile.maritalStatus}
                </p>
              </div>
              <div className="space-y-2">
                <div>
                  <strong>Risk Profile:</strong>{" "}
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 text-xs py-0.5 px-2"
                  >
                    {clientProfile.riskProfile}
                  </Badge>
                </div>
                <p>
                  <strong>Key Goals Summary:</strong>{" "}
                  {clientProfile.financialGoalsSummary}
                </p>
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
                <h6 className="font-semibold flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" /> Planner Notes:
                </h6>
                <p className="text-gray-700 italic">
                  {clientProfile.plannerNotes}
                </p>
              </div>
            </CardContent>
          </Card> */}

          {/* Overall Financial Health Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-blue-700">
                <FlaskConical className="h-7 w-7 text-blue-600" />
                <span>Overall Financial Pulse: {reportData.month}</span>
              </CardTitle>
              <CardDescription className="text-gray-700 text-base">
                A comprehensive assessment of the client's financial well-being.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-blue-500"
                      style={{
                        background: `conic-gradient(from 0deg, #3b82f6 ${
                          reportData.overallFinancialPulseScore * 36
                        }deg, transparent 0deg)`,
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {reportData.overallFinancialPulseScore.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          / 10.0 Score
                        </div>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(reportData.financialPulseStatus)}
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed text-center">
                    {reportData.financialPulseDescription}
                  </p>
                </div>

                <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
                  <div>
                    <h4 className="font-semibold text-lg text-green-800 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Strategic Accomplishments
                    </h4>
                    <ul className="space-y-2 list-disc pl-5">
                      {reportData.keyHighlights.strategicAccomplishments.map(
                        (win, index) => (
                          <li
                            key={index}
                            className="text-sm text-green-700 leading-relaxed"
                          >
                            {win}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
                  <div>
                    <h4 className="font-semibold text-lg text-orange-800 mb-3 flex items-center">
                      <LightbulbOff className="h-5 w-5 mr-2" />
                      Areas for Enhancement
                    </h4>
                    <ul className="space-y-2 list-disc pl-5">
                      {reportData.keyHighlights.identifiedAreasForEnhancement.map(
                        (concern, index) => (
                          <li
                            key={index}
                            className="text-sm text-orange-700 leading-relaxed"
                          >
                            {concern}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div> */}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-lg mb-4 flex items-center text-blue-700">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Holistic Financial Summary
                </h4>
                <p className="text-sm text-gray-800 leading-loose bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {reportData.comprehensiveSummary}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab 2: Trends & Analytics --- */}
        {/* <TabsContent value="trends" className="space-y-8">
          <Card className="shadow-sm border-t-4 border-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-purple-700">
                <BarChart className="h-6 w-6" />
                <span>Key Financial Trends & Analytics</span>
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                In-depth analysis of historical patterns and projections across
                key financial areas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              Overall Trajectory
              <div className="border p-4 rounded-lg bg-gray-50">
                <h5 className="font-semibold text-lg mb-2 flex items-center text-purple-800">
                  <BarChart3 className="h-4 w-4 mr-2" /> Overall Financial
                  Trajectory:{" "}
                  {getStatusBadge(trendsData.overallTrajectory.status)}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="text-xs text-muted-foreground">
                      Net Worth Growth (
                      {trendsData.overallTrajectory.netWorthChange.period})
                    </div>
                    <div className="font-bold flex items-center text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {trendsData.overallTrajectory.netWorthChange.value}%{" "}
                      <span className="ml-1 text-xs text-gray-500">
                        (vs. Bm:{" "}
                        {trendsData.overallTrajectory.netWorthChange.benchmark}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="text-xs text-muted-foreground">
                      Savings Rate Change (
                      {trendsData.overallTrajectory.savingsRateChange.period})
                    </div>
                    <div className="font-bold flex items-center text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {
                        trendsData.overallTrajectory.savingsRateChange.value
                      }%{" "}
                      <span className="ml-1 text-xs text-gray-500">
                        (vs. Target:{" "}
                        {
                          trendsData.overallTrajectory.savingsRateChange
                            .benchmark
                        }
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="text-xs text-muted-foreground">
                      Debt Reduction Change (
                      {trendsData.overallTrajectory.debtReductionChange.period})
                    </div>
                    <div className="font-bold flex items-center text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {
                        -trendsData.overallTrajectory.debtReductionChange.value
                      }%{" "}
                      <span className="ml-1 text-xs text-gray-500">
                        (vs. Target:{" "}
                        {
                          -trendsData.overallTrajectory.debtReductionChange
                            .benchmark
                        }
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                    <div className="text-xs text-muted-foreground">
                      Investment Growth (
                      {
                        trendsData.overallTrajectory.investmentGrowthChange
                          .period
                      }
                      )
                    </div>
                    <div className="font-bold flex items-center text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {
                        trendsData.overallTrajectory.investmentGrowthChange
                          .value
                      }
                      %{" "}
                      <span className="ml-1 text-xs text-gray-500">
                        (vs. Bm:{" "}
                        {
                          trendsData.overallTrajectory.investmentGrowthChange
                            .benchmark
                        }
                        %)
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {trendsData.overallTrajectory.analysis}
                </p>
              </div>
              Spending Evolution
              <div className="border p-4 rounded-lg bg-gray-50">
                <h5 className="font-semibold text-lg mb-2 flex items-center text-purple-800">
                  <ShoppingCart className="h-4 w-4 mr-2" /> Spending Evolution &
                  Behavioral Insights
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Total Spending:{" "}
                  <span className="font-medium text-gray-800">
                    {trendsData.spendingEvolution.totalSpending}
                  </span>{" "}
                  ({trendsData.spendingEvolution.spendingIncomeRatio} of Income)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-sm mb-2 text-red-700">
                      Increasing Categories:
                    </h6>
                    <ul className="space-y-1 text-sm">
                      {trendsData.spendingEvolution.increasingCategories.map(
                        (cat, i) => (
                          <li
                            key={i}
                            className="flex items-center text-red-600"
                          >
                            <TrendingUp className="h-3 w-3 mr-2" /> {cat.name}:{" "}
                            <span className="font-medium ml-1">
                              {cat.amount} (+{cat.change}%)
                            </span>{" "}
                            <span className="text-xs ml-2 text-gray-500">
                              (Avg: {cat.historicalAverage})
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-sm mb-2 text-green-700">
                      Decreasing Categories:
                    </h6>
                    <ul className="space-y-1 text-sm">
                      {trendsData.spendingEvolution.decreasingCategories.map(
                        (cat, i) => (
                          <li
                            key={i}
                            className="flex items-center text-green-600"
                          >
                            <TrendingDown className="h-3 w-3 mr-2" /> {cat.name}
                            :{" "}
                            <span className="font-medium ml-1">
                              {cat.amount} ({-cat.change}%)
                            </span>{" "}
                            <span className="text-xs ml-2 text-gray-500">
                              (Avg: {cat.historicalAverage})
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <Alert className="mt-4 border-orange-300 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-orange-800">
                    Lifestyle Creep Alert!
                  </AlertTitle>
                  <AlertDescription className="text-sm text-orange-700">
                    A consistent increase of RM{" "}
                    {trendsData.spendingEvolution.lifestyleCreepAlert.amount}
                    /month in discretionary spending was detected over the past{" "}
                    {
                      trendsData.spendingEvolution.lifestyleCreepAlert.period
                    }. {trendsData.spendingEvolution.lifestyleCreepAlert.impact}
                    <br />
                    <strong>Behavioral Insight:</strong>{" "}
                    {
                      trendsData.spendingEvolution.lifestyleCreepAlert
                        .behavioralInsight
                    }
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-gray-700 mt-3">
                  <strong>Comparative Benchmarking:</strong>{" "}
                  {
                    trendsData.spendingEvolution.comparativeBenchmarking
                      .similarProfiles
                  }
                  . Client's budget adherence:{" "}
                  {
                    trendsData.spendingEvolution.comparativeBenchmarking
                      .budgetAdherence
                  }
                  .
                </p>
              </div>
              Income Stability & Diversification
              <div className="border p-4 rounded-lg bg-gray-50">
                <h5 className="font-semibold text-lg mb-2 flex items-center text-purple-800">
                  <DollarSign className="h-4 w-4 mr-2" /> Income Stability &
                  Diversification
                </h5>
                <div className="text-sm text-muted-foreground mb-3">
                  Primary Income Status:{" "}
                  {getStatusBadge(
                    trendsData.incomeStability.primaryIncomeStability
                  )}
                </div>
                <ul className="space-y-2 text-sm">
                  {trendsData.incomeStability.incomeStreams.map((stream, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm border border-gray-100"
                    >
                      <span className="font-medium">{stream.source}</span>
                      <span className="text-muted-foreground">
                        {stream.percentage}% ({stream.amount})
                      </span>
                      <span className="text-xs text-gray-600">
                        Growth Potential: {stream.growthPotential}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm space-y-2">
                  <p>
                    <strong>Volatility Index:</strong>{" "}
                    {trendsData.incomeStability.volatilityIndex}% (Lower is
                    better, indicates need for contingency)
                  </p>
                  <p>
                    <strong>Diversification Score:</strong>{" "}
                    {trendsData.incomeStability.diversificationScore}/10
                    (Suggests good diversification, but over-reliance on primary
                    salary remains a factor)
                  </p>
                  <p>
                    <strong>Projected Income Growth (Primary):</strong>{" "}
                    {trendsData.incomeStability.projectedIncomeGrowth}
                  </p>
                  <p>
                    <strong>Contingency Planning:</strong>{" "}
                    {trendsData.incomeStability.contingencyPlanning}
                  </p>
                </div>
              </div>
              Debt Momentum
              <div className="border p-4 rounded-lg bg-gray-50">
                <h5 className="font-semibold text-lg mb-2 flex items-center text-purple-800">
                  <CreditCard className="h-4 w-4 mr-2" /> Debt Momentum &
                  Optimization
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Total Outstanding Debt:{" "}
                  <span className="font-medium text-gray-800">
                    {trendsData.debtMomentum.totalOutstandingDebt}
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="font-medium text-sm mb-2">
                      Debt Composition:
                    </h6>
                    <ul className="space-y-1">
                      {Object.entries(
                        trendsData.debtMomentum.debtComposition
                      ).map(([type, amount]) => (
                        <li key={type}>
                          {type}: <span className="font-medium">{amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Avg. Monthly Reduction:</strong> RM{" "}
                      {trendsData.debtMomentum.averageMonthlyReduction}
                    </p>
                    <p>
                      <strong>Projected Debt-Free:</strong>{" "}
                      {trendsData.debtMomentum.projectedDebtFreeDate}
                    </p>
                    <p>
                      <strong>Monthly Interest Paid:</strong> RM{" "}
                      {trendsData.debtMomentum.currentMonthlyInterestPaid}
                    </p>
                    <p>
                      <strong>Debt-to-Income Ratio:</strong>{" "}
                      {trendsData.debtMomentum.debtToIncomeRatio}
                    </p>
                    <p>
                      <strong>Credit Card Utilization:</strong>{" "}
                      <span className="text-red-600 font-bold">
                        {trendsData.debtMomentum.creditCardUtilization}
                      </span>
                    </p>
                  </div>
                </div>
                <Alert className="mt-4 border-green-300 bg-green-50">
                  <Zap className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Interest Savings Potential!
                  </AlertTitle>
                  <AlertDescription className="text-sm text-green-700">
                    <strong>Accelerated Payments:</strong> RM{" "}
                    {
                      trendsData.debtMomentum.interestSavingsPotential
                        .acceleratedPayments
                    }{" "}
                    <br />
                    <strong>Refinancing Opportunities:</strong> Estimate RM{" "}
                    {
                      trendsData.debtMomentum.interestSavingsPotential
                        .refinancing
                    }
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-gray-700 mt-3">
                  <strong>Momentum Status:</strong>{" "}
                  {getStatusBadge(trendsData.debtMomentum.momentum)}. Current
                  repayment strategy is highly effective.
                </p>
              </div>
              Investment Performance
              <div className="border p-4 rounded-lg bg-gray-50">
                <h5 className="font-semibold text-lg mb-2 flex items-center text-purple-800">
                  <PiggyBank className="h-4 w-4 mr-2" /> Investment Performance
                  & Allocation
                </h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Cumulative Gain (12 months):{" "}
                  <span className="font-medium text-gray-800">
                    {trendsData.investmentPerformance.cumulativeGain}%
                  </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p>
                      <strong>Monthly Contribution:</strong> RM{" "}
                      {trendsData.investmentPerformance.monthlyContribution}
                    </p>
                    <p>
                      <strong>DCA Effectiveness:</strong>{" "}
                      {
                        trendsData.investmentPerformance
                          .dollarCostAveragingEffectiveness
                      }
                    </p>
                    <p>
                      <strong>Portfolio Volatility:</strong>{" "}
                      {trendsData.investmentPerformance.portfolioVolatility}
                    </p>
                    <p>
                      <strong>Risk-Adjusted Return:</strong>{" "}
                      {trendsData.investmentPerformance.riskAdjustedReturn}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h6 className="font-medium text-sm mb-1">
                      Asset Allocation:
                    </h6>
                    <ul className="list-disc pl-4">
                      <li>
                        Equities:{" "}
                        {
                          trendsData.investmentPerformance.assetAllocation
                            .equities
                        }
                      </li>
                      <li>
                        Bonds:{" "}
                        {trendsData.investmentPerformance.assetAllocation.bonds}
                      </li>
                      <li>
                        Alternatives:{" "}
                        {
                          trendsData.investmentPerformance.assetAllocation
                            .alternatives
                        }
                      </li>
                    </ul>
                    <p className="text-xs text-red-600 mt-1">
                      <strong>Warning:</strong>{" "}
                      {
                        trendsData.investmentPerformance.assetAllocation.equities.split(
                          "("
                        )[1]
                      }
                    </p>
                  </div>
                </div>
                <Alert className="mt-4 border-yellow-300 bg-yellow-50">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">
                    Scenario Analysis Insights
                  </AlertTitle>
                  <AlertDescription className="text-sm text-yellow-700">
                    <strong>Market Downturn (-10%):</strong>{" "}
                    {
                      trendsData.investmentPerformance.scenarioAnalysis
                        .marketDownturn10Percent
                    }{" "}
                    <br />
                    <strong>
                      Increased Contribution (+RM 200/month):
                    </strong>{" "}
                    {
                      trendsData.investmentPerformance.scenarioAnalysis
                        .increasedContribution
                    }
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* --- Tab 3: Financial Goals --- */}
        <TabsContent value="goals" className="space-y-8">
          <Card className="shadow-sm border-t-4 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-green-700">
                <Target className="h-6 w-6" />
                <span>Client Financial Goals Progress & Gap Analysis</span>
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Assessment of goal attainment, potential shortfalls, and
                recommended adjustments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground min-w-[150px]">
                  Overall Goal Progress:
                </div>
                <Progress
                  value={goalsData.overallProgressPercentage}
                  className="w-full h-3"
                />
                <span className="font-bold text-lg text-green-700">
                  {goalsData.overallProgressPercentage}%
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Current progress of RM{" "}
                {goalsData.currentProgressValue.toLocaleString()} towards a
                total goal value of RM{" "}
                {goalsData.totalGoalsValue.toLocaleString()}.
                <span className="font-semibold text-red-600 block mt-1">
                  Overall Goal Gap: {goalsData.overallGoalGap}
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goalsData.activeGoals.map((goal) => (
                  <Card
                    key={goal.id}
                    className="p-4 bg-white shadow-sm border border-gray-100"
                  >
                    <CardTitle className="text-lg flex items-center justify-between mb-2">
                      <span>{goal.name}</span>
                      {getGoalStatusBadge(goal.status)}
                    </CardTitle>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Target:</strong> RM{" "}
                        {goal.targetAmount.toLocaleString()} by{" "}
                        {goal.targetDate}
                      </p>
                      <p>
                        <strong>Current:</strong> RM{" "}
                        {goal.currentAmount.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={goal.progress}
                          className="w-full h-2"
                        />
                        <span className="text-xs font-semibold">
                          {goal.progress.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Monthly Contribution: RM {goal.monthlyContribution}
                      </p>
                      <p className="text-muted-foreground">
                        Projected Completion: {goal.projectedCompletion}
                      </p>
                      <p className="font-semibold text-gray-700 mt-2">
                        Gap Analysis:{" "}
                        <span className={getGoalStatusColor(goal.status)}>
                          {goal.gapAnalysis}
                        </span>
                      </p>
                      <p className="text-blue-700 text-xs mt-1">
                        <strong>Recommendation:</strong> {goal.aiRecommendation}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 border-t pt-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center text-green-700">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Recently Completed Goals
                </h4>
                <ul className="space-y-2 text-sm">
                  {goalsData.recentlyCompleted.map((completedGoal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <span className="font-medium">
                          {completedGoal.name}
                        </span>{" "}
                        (RM {completedGoal.amount.toLocaleString()}) completed
                        on {completedGoal.completedDate} (
                        {completedGoal.category}).
                        <p className="text-xs text-muted-foreground">
                          <strong>Learning:</strong> {completedGoal.learning}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab 4: Module Deep Dive --- */}
        <TabsContent value="modules" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {moduleInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card
                  key={insight.id}
                  className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-blue-400"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2 text-xl text-blue-700">
                        <Icon className="h-6 w-6 text-blue-600" />
                        <span>{insight.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xl font-bold ${getScoreColor(
                            insight.score
                          )}`}
                        >
                          {insight.score.toFixed(1)}
                        </span>
                        {getStatusBadge(insight.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {insight.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="text-center p-3 bg-blue-50 rounded-lg shadow-sm border border-blue-100"
                        >
                          <div className="text-sm font-semibold text-gray-800">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                          {metric.change !== 0 && (
                            <div
                              className={`text-xs flex items-center justify-center mt-1 ${getChangeColor(
                                metric.change
                              )}`}
                            >
                              {getChangeIcon(metric.change)}
                              <span className="ml-1">
                                {metric.change > 0 ? "+" : ""}
                                {metric.change}% {metric.period}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Comprehensive Analysis */}
                    <div>
                      <h5 className="font-semibold text-base mb-2 flex items-center text-blue-700">
                        <FlaskConical className="h-4 w-4 mr-2" />
                        Comprehensive Analysis
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border border-blue-100">
                        {insight.comprehensiveAnalysis}
                      </p>
                    </div>

                    {/* External Context */}
                    <Alert className="border-l-4 border-purple-500 bg-purple-50">
                      <ExternalLink className="h-4 w-4 text-purple-600" />
                      <AlertTitle className="text-purple-800">
                        External Market Context
                      </AlertTitle>
                      <AlertDescription className="text-sm text-purple-700">
                        {insight.externalContext}
                      </AlertDescription>
                    </Alert>

                    {/* Strategic Recommendations */}
                    <div>
                      <h5 className="font-semibold text-base mb-2 flex items-center text-green-700">
                        <Target className="h-4 w-4 mr-2" />
                        Strategic Recommendations for Client
                      </h5>
                      <ul className="space-y-2 list-disc pl-5">
                        {insight.strategicRecommendations.map(
                          (action, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 leading-relaxed"
                            >
                              <span className="font-medium text-blue-600">
                                {action.type}:
                              </span>{" "}
                              {action.text}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Behavioral Nudges & Comparison */}
                    {/* <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-orange-700">
                          Behavioral Insights:
                        </span>{" "}
                        {insight.behavioralInsights}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-purple-700">
                          Comparative Benchmarking:
                        </span>{" "}
                        {insight.comparisonBenchmarking}
                      </p>
                    </div> */}

                    {/* Link to Module */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                      onClick={() => onNavigateToModule?.(insight.linkModule)}
                    >
                      {insight.linkText}
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {/* Immediate Actionables & Discussion Points */}
          <Card className="shadow-sm border-t-4 border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl text-yellow-700">
                <Zap className="h-6 w-6" />
                <span>Immediate Actionables & Client Discussion Points</span>
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Prioritized tasks for your next client meeting to drive
                immediate impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg bg-red-50 border-red-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-bold text-lg text-red-800">
                      High Priority
                    </span>
                  </div>
                  <p className="text-sm text-red-700 leading-relaxed">
                    <strong>Action:</strong> Reduce credit card utilization
                    below 30% by allocating RM 1,200 from cash reserves or next
                    month's surplus.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-red-300 text-red-600 hover:bg-red-100"
                    onClick={() => onNavigateToModule?.("debts")}
                  >
                    Review Debt Strategy <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <span className="font-bold text-lg text-yellow-800">
                      Medium Priority
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    <strong>Action:</strong> Implement weekly spending limits
                    for Food & Dining (RM 200/week) and track adherence via the
                    app.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-yellow-300 text-yellow-600 hover:bg-yellow-100"
                    onClick={() => onNavigateToModule?.("spending")}
                  >
                    Manage Spending Habits{" "}
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>

                <div className="p-4 border rounded-lg bg-green-50 border-green-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-lg text-green-800">
                      Optimization Opportunity
                    </span>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">
                    <strong>Action:</strong> Increase EPF voluntary
                    contributions by RM 200/month and consider opening a PRS
                    account.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full border-green-300 text-green-600 hover:bg-green-100"
                    onClick={() => onNavigateToModule?.("retirement")}
                  >
                    Optimize Retirement Plan{" "}
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
