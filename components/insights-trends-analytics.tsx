"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  CreditCard,
  DollarSign,
  Info,
  ShoppingCart,
  Star,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

interface InsightsTrendsAnalyticsProps {
  onNavigateToModule?: (module: string) => void;
}

export function InsightsTrendsAnalytics({
  onNavigateToModule,
}: InsightsTrendsAnalyticsProps) {
  // Trends & Analytics Data
  const trendsData = {
    overallTrajectory: {
      status: "Positive",
      netIncomeChange: 8,
      savingsRateChange: 12,
      debtReductionChange: -15,
      investmentGrowthChange: 23,
      analysis:
        "Your financial trajectory is positive. While your investment growth has been strong at 23% over 6 months, your discretionary spending shows an upward trend that could impact future savings goals.",
    },
    spendingEvolution: {
      increasingCategories: [
        { name: "Food & Dining", change: 18, amount: "RM 856" },
        { name: "Entertainment", change: 25, amount: "RM 342" },
        { name: "Shopping", change: 12, amount: "RM 426" },
      ],
      decreasingCategories: [
        { name: "Transportation", change: -8, amount: "RM 542" },
        { name: "Utilities", change: -5, amount: "RM 287" },
      ],
      lifestyleCreepAlert: {
        amount: 450,
        period: "6 months",
        impact:
          "This increase could reduce your annual savings by RM 5,400 if not addressed.",
      },
    },
    incomeStability: {
      primaryIncomeStability: "Stable",
      incomeStreams: [
        { source: "Primary Salary", percentage: 75, amount: "RM 4,500" },
        { source: "Side Hustle", percentage: 20, amount: "RM 1,200" },
        { source: "Investments", percentage: 5, amount: "RM 300" },
      ],
      volatility: 12,
      diversificationScore: 7.8,
    },
    debtMomentum: {
      averageMonthlyReduction: 2450,
      projectedDebtFreeDate: "March 2027",
      interestSavings: 8,
      totalInterestPaid: 1247,
      momentum: "Strong",
    },
    investmentPerformance: {
      cumulativeGain: 15.8,
      monthlyContribution: 800,
      dollarCostAveraging: "Effective",
      marketVsContribution: {
        contributions: 65,
        marketGains: 35,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trends & Analytics</h1>
          <p className="text-muted-foreground">
            6-month trend analysis across key financial metrics
          </p>
        </div>
        <Button variant="outline">Export Analysis</Button>
      </div>

      {/* Overall Financial Trajectory */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span>Overall Financial Trajectory</span>
          </CardTitle>
          <CardDescription>
            6-month trend analysis across key financial metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium">Net Income</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    +{trendsData.overallTrajectory.netIncomeChange}%
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium">Savings Rate</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    +{trendsData.overallTrajectory.savingsRateChange}%
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-center mb-2">
                    <CreditCard className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-sm font-medium">Debt Reduction</span>
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {trendsData.overallTrajectory.debtReductionChange}%
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="h-4 w-4 text-orange-600 mr-1" />
                    <span className="text-sm font-medium">
                      Investment Growth
                    </span>
                  </div>
                  <div className="text-lg font-bold text-orange-600">
                    +{trendsData.overallTrajectory.investmentGrowthChange}%
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2 text-green-600" />
                AI Trajectory Analysis
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {trendsData.overallTrajectory.analysis}
              </p>
              <Badge variant="default" className="bg-green-100 text-green-800">
                {trendsData.overallTrajectory.status} Trajectory
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Habit Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            <span>Spending Habit Evolution</span>
          </CardTitle>
          <CardDescription>
            3-month spending pattern analysis with lifestyle creep detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-red-700 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Increasing Categories
              </h4>
              <div className="space-y-3">
                {trendsData.spendingEvolution.increasingCategories.map(
                  (category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {category.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {category.amount} this month
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-red-600">
                          +{category.change}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          vs 3-month avg
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-green-700 flex items-center">
                <TrendingDown className="h-4 w-4 mr-2" />
                Decreasing Categories
              </h4>
              <div className="space-y-3">
                {trendsData.spendingEvolution.decreasingCategories.map(
                  (category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {category.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {category.amount} this month
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">
                          {category.change}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          vs 3-month avg
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Lifestyle Creep Alert:</strong> Your discretionary
              spending has increased by RM{" "}
              {trendsData.spendingEvolution.lifestyleCreepAlert.amount} over the
              past {trendsData.spendingEvolution.lifestyleCreepAlert.period}.{" "}
              {trendsData.spendingEvolution.lifestyleCreepAlert.impact}
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => onNavigateToModule?.("spending")}
            >
              Review Spending Trends
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Income Stability & Diversification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Income Stability & Diversification</span>
          </CardTitle>
          <CardDescription>
            Analysis of income sources and stability patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Income Stream Breakdown</h4>
              <div className="space-y-3">
                {trendsData.incomeStability.incomeStreams.map(
                  (stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {stream.source}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {stream.amount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${stream.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stream.percentage}% of total income
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Stability Metrics</h4>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Primary Income Stability
                    </span>
                    <Badge variant="default">
                      {trendsData.incomeStability.primaryIncomeStability}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your main salary has remained consistent with predictable
                    growth
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Income Volatility
                    </span>
                    <span className="text-sm font-bold">
                      {trendsData.incomeStability.volatility}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Month-to-month variation in total income
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Diversification Score
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {trendsData.incomeStability.diversificationScore}/10
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Good diversification across multiple income sources
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Income Insight:</strong> Your side hustle income has grown
              consistently, now representing 20% of your total income. Consider
              strategies to further develop this income stream for enhanced
              financial security.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Debt Repayment Momentum */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            <span>Debt Repayment Momentum</span>
          </CardTitle>
          <CardDescription>
            6-month debt reduction analysis and projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                RM{" "}
                {trendsData.debtMomentum.averageMonthlyReduction.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Average Monthly Reduction
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {trendsData.debtMomentum.projectedDebtFreeDate}
              </div>
              <div className="text-sm text-muted-foreground">
                Projected Debt-Free Date
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {trendsData.debtMomentum.interestSavings}%
              </div>
              <div className="text-sm text-muted-foreground">
                Interest Cost Reduction
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-purple-600" />
              Momentum Analysis
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Repayment Momentum</span>
                <Badge
                  variant="default"
                  className="bg-purple-100 text-purple-800"
                >
                  {trendsData.debtMomentum.momentum}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Your debt repayment has accelerated significantly. While
                reducing principal, your total interest paid on high-interest
                debts has decreased by {trendsData.debtMomentum.interestSavings}
                % this quarter. You paid RM{" "}
                {trendsData.debtMomentum.totalInterestPaid} in interest this
                month.
              </p>
              <p className="text-sm text-blue-700">
                <strong>Opportunity:</strong> Focusing on your highest interest
                rate debt could accelerate interest savings even further.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => onNavigateToModule?.("debts")}
            >
              Optimize Debt Strategy
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investment Performance & Contribution Pace */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <span>Investment Performance & Contribution Pace</span>
          </CardTitle>
          <CardDescription>
            12-month investment growth analysis and dollar-cost averaging
            effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Cumulative Portfolio Gain
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      +{trendsData.investmentPerformance.cumulativeGain}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    12-month total return including dividends
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Monthly Contribution
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      RM {trendsData.investmentPerformance.monthlyContribution}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Consistent automated investing
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Dollar-Cost Averaging
                    </span>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      {trendsData.investmentPerformance.dollarCostAveraging}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strategy effectiveness during market volatility
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Growth Attribution</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Contributions</span>
                    <span className="text-sm font-medium">
                      {
                        trendsData.investmentPerformance.marketVsContribution
                          .contributions
                      }
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${trendsData.investmentPerformance.marketVsContribution.contributions}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Market Appreciation</span>
                    <span className="text-sm font-medium">
                      {
                        trendsData.investmentPerformance.marketVsContribution
                          .marketGains
                      }
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{
                        width: `${trendsData.investmentPerformance.marketVsContribution.marketGains}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Your consistent monthly contributions have been the primary
                driver of portfolio growth, effectively utilizing dollar-cost
                averaging to reduce risk during market fluctuations.
              </p>
            </div>
          </div>

          <Alert className="mt-6">
            <Star className="h-4 w-4" />
            <AlertDescription>
              <strong>Investment Insight:</strong> Your regular contributions
              have effectively utilized dollar-cost averaging, reducing risk
              during market fluctuations. Continue your consistent contributions
              and consider reviewing your asset allocation to ensure it aligns
              with your long-term goals.
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => onNavigateToModule?.("investments")}
            >
              Review Portfolio Allocation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
