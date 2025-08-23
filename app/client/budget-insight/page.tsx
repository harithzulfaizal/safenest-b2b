"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  AlertCircle,
  ArrowLeft,
  Calculator,
  CheckCircle,
  Download,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface BudgetInsightsProps {
  onBack?: () => void;
}

export default function BudgetInsightsPage({ onBack }: BudgetInsightsProps) {
  // TODO: connect with postgres db
  const [selectedScenario, setSelectedScenario] = useState("reduce-dining");
  const [scenarioAmount, setScenarioAmount] = useState([100]);

  const historicalData = [
    { month: "May", budgeted: 3000, actual: 2856, variance: -144 },
    { month: "Jun", budgeted: 3100, actual: 3245, variance: 145 },
    { month: "Jul", budgeted: 3200, actual: 3156, variance: -44 },
    { month: "Aug", budgeted: 3200, actual: 3389, variance: 189 },
    { month: "Sep", budgeted: 3200, actual: 3078, variance: -122 },
    { month: "Oct", budgeted: 3200, actual: 2847, variance: -353 },
  ];

  const categoryPerformance = [
    {
      category: "Food & Dining",
      avgOverage: 50,
      consistency: "Poor",
      trend: "increasing",
      recommendation: "Consider meal planning to reduce dining out expenses",
    },
    {
      category: "Transportation",
      avgOverage: -25,
      consistency: "Good",
      trend: "stable",
      recommendation: "Consistently under budget - consider reallocating funds",
    },
    {
      category: "Shopping",
      avgOverage: 75,
      consistency: "Poor",
      trend: "increasing",
      recommendation: "Set up spending alerts for this category",
    },
    {
      category: "Utilities",
      avgOverage: -15,
      consistency: "Excellent",
      trend: "stable",
      recommendation: "Well managed - no action needed",
    },
  ];

  const futureProjections = [
    { month: "Nov", projected: 3150, confidence: "High" },
    { month: "Dec", projected: 3400, confidence: "Medium" },
    { month: "Jan", projected: 3200, confidence: "Medium" },
    { month: "Feb", projected: 3100, confidence: "Low" },
    { month: "Mar", projected: 3050, confidence: "Low" },
  ];

  const scenarios = {
    "reduce-dining": {
      title: "Reduce Dining Out Budget",
      description: "What if you reduce your dining out budget?",
      currentAmount: 300,
      impact: (amount: number) => ({
        monthlySavings: amount,
        yearlyImpact: amount * 12,
        goalContribution: `${(((amount * 12) / 10000) * 100).toFixed(
          1
        )}% closer to your RM 10,000 emergency fund`,
      }),
    },
    "increase-income": {
      title: "Income Increase",
      description: "What if your income increases?",
      currentAmount: 5500,
      impact: (amount: number) => ({
        monthlySavings: amount * 0.7, // Assume 70% goes to savings
        yearlyImpact: amount * 12,
        goalContribution: `RM ${(amount * 0.7).toFixed(
          2
        )} extra monthly savings capacity`,
      }),
    },
    "loan-payment": {
      title: "Increase Loan Payment",
      description: "What if you increase your loan payment?",
      currentAmount: 500,
      impact: (amount: number) => ({
        monthlySavings: -amount, // This reduces available money
        yearlyImpact: amount * 12,
        goalContribution: `Pay off loan ${Math.round(
          amount / 50
        )} months earlier`,
      }),
    },
  };

  const currentScenario = scenarios[selectedScenario as keyof typeof scenarios];
  const scenarioImpact = currentScenario.impact(scenarioAmount[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Budget Insights & Projections
            </h1>
            <p className="text-muted-foreground">
              Analyze patterns and plan for the future
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Historical Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Budget Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded flex items-end justify-center space-x-4 p-4 overflow-hidden">
              {historicalData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="bg-blue-500 rounded-sm w-8"
                      style={{
                        height: `${
                          (data.budgeted /
                            Math.max(
                              ...historicalData.map((d) =>
                                Math.max(d.budgeted, d.actual)
                              )
                            )) *
                          150
                        }px`,
                        maxHeight: "100%",
                      }}
                    />
                    <div
                      className={`${
                        data.actual > data.budgeted
                          ? "bg-red-500"
                          : "bg-green-500"
                      } rounded-sm w-8`}
                      style={{
                        height: `${
                          (data.actual /
                            Math.max(
                              ...historicalData.map((d) =>
                                Math.max(d.budgeted, d.actual)
                              )
                            )) *
                          150
                        }px`,
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium">{data.month}</span>
                  <div className="text-xs text-center">
                    <div className="text-muted-foreground">
                      B: {data.budgeted}
                    </div>
                    <div
                      className={
                        data.variance > 0 ? "text-red-600" : "text-green-600"
                      }
                    >
                      A: {data.actual}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span>Budgeted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span>Under Budget</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span>Over Budget</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{category.category}</h4>
                    <div className="flex items-center space-x-2">
                      {category.trend === "increasing" ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : category.trend === "decreasing" ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      <Badge
                        variant={
                          category.consistency === "Excellent"
                            ? "default"
                            : category.consistency === "Good"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {category.consistency}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">
                        Avg Variance:{" "}
                      </span>
                      <span
                        className={
                          category.avgOverage > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {category.avgOverage > 0 ? "+" : ""}RM{" "}
                        {category.avgOverage}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trend: </span>
                      <span className="capitalize">{category.trend}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {category.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Future Projections */}
        <Card>
          <CardHeader>
            <CardTitle>Future Budget Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Based on current spending trends and recurring expenses
              </div>
              {futureProjections.map((projection, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="font-medium">{projection.month} 2025</div>
                    <Badge
                      variant={
                        projection.confidence === "High"
                          ? "default"
                          : projection.confidence === "Medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {projection.confidence} Confidence
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">
                    RM {projection.projected.toLocaleString("en-MY")}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-muted-foreground">
                    Projections become less accurate over time. Review monthly
                    for best results.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What-If Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>What-If Scenario Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Select Scenario</Label>
                <Select
                  value={selectedScenario}
                  onValueChange={setSelectedScenario}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(scenarios).map(([key, scenario]) => (
                      <SelectItem key={key} value={key}>
                        {scenario.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{currentScenario.description}</Label>
                <div className="mt-2 space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Current: RM{" "}
                    {currentScenario.currentAmount.toLocaleString("en-MY")}
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Adjustment Amount</span>
                      <span>RM {scenarioAmount[0]}</span>
                    </div>
                    <Slider
                      value={scenarioAmount}
                      onValueChange={setScenarioAmount}
                      max={selectedScenario === "increase-income" ? 1000 : 500}
                      min={0}
                      step={25}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Impact Analysis</h4>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Monthly Impact
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {scenarioImpact.monthlySavings > 0 ? "+" : ""}RM{" "}
                    {scenarioImpact.monthlySavings.toFixed(2)}
                  </div>
                  <div className="text-sm text-blue-700">
                    {scenarioImpact.monthlySavings > 0
                      ? "Additional savings"
                      : "Reduced available funds"}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Annual Impact
                    </span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    RM{" "}
                    {Math.abs(scenarioImpact.yearlyImpact).toLocaleString(
                      "en-MY"
                    )}
                  </div>
                  <div className="text-sm text-green-700">
                    {scenarioImpact.goalContribution}
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    This scenario is{" "}
                    {scenarioImpact.monthlySavings >= 0
                      ? "financially positive"
                      : "manageable with current income"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget vs Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Impact on Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Emergency Fund</span>
              </div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-sm text-muted-foreground">
                RM 6,800 of RM 10,000
              </div>
              <div className="text-xs text-green-600 mt-1">
                On track to complete in 4 months by staying on budget
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Vacation Fund</span>
              </div>
              <div className="text-2xl font-bold">45%</div>
              <div className="text-sm text-muted-foreground">
                RM 2,250 of RM 5,000
              </div>
              <div className="text-xs text-orange-600 mt-1">
                Behind schedule - consider reducing discretionary spending
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-medium">Investment Portfolio</span>
              </div>
              <div className="text-2xl font-bold">12%</div>
              <div className="text-sm text-muted-foreground">
                RM 6,000 of RM 50,000
              </div>
              <div className="text-xs text-blue-600 mt-1">
                Steady progress with current monthly contributions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
