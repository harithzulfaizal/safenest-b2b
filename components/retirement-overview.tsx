"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  DollarSign,
  Lightbulb,
  PieChart,
  Settings,
  Target,
} from "lucide-react";
import { useState } from "react";

interface RetirementOverviewProps {
  onNavigateToPlanDetails?: () => void;
  onNavigateToLifestyle?: () => void;
}

export function RetirementOverview({
  onNavigateToPlanDetails,
  onNavigateToLifestyle,
}: RetirementOverviewProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const retirementData = {
    currentAge: 32,
    targetRetirementAge: 60,
    readinessScore: 68,
    confidenceLevel: 72,
    totalRetirementSavings: 185650.5,
    projectedRetirementAge: 62,
    yearsOfFunds: 18,
    desiredAnnualIncome: 60000,
    projectedAnnualIncome: 42500,
    annualIncomeGap: -17500,
    requiredMonthlySavings: 850,
    currentMonthlySavings: 650,
  };

  const milestones = [
    {
      age: 55,
      title: "EPF Partial Withdrawal Eligible",
      description: "Can withdraw Account 2 for housing/education",
      status: "upcoming",
      yearsAway: 23,
    },
    {
      age: 60,
      title: "Target Retirement Age",
      description: "Your desired retirement age",
      status: "target",
      yearsAway: 28,
    },
    {
      age: 62,
      title: "Projected Retirement Age",
      description: "Based on current savings trajectory",
      status: "projected",
      yearsAway: 30,
    },
    {
      age: 80,
      title: "Funds Depletion Risk",
      description: "When retirement funds might run out",
      status: "warning",
      yearsAway: 48,
    },
  ];

  const retirementAccounts = [
    {
      name: "EPF Account 1",
      type: "Mandatory Retirement",
      currentValue: 125650.5,
      monthlyContribution: 450,
      projectedValue: 285000,
      icon: "EPF",
    },
    {
      name: "PRS - AmMetLife",
      type: "Private Retirement Scheme",
      currentValue: 35000,
      monthlyContribution: 200,
      projectedValue: 95000,
      icon: "PRS",
    },
    {
      name: "Investment Portfolio",
      type: "Designated Retirement Funds",
      currentValue: 25000,
      monthlyContribution: 0,
      projectedValue: 120000,
      icon: "INV",
    },
  ];

  const quickScenarios = [
    {
      id: "save-200",
      title: "Save RM 200 more per month",
      impact: "+5% readiness score",
      newScore: 73,
      description: "Retire 1 year earlier with 2 more years of funds",
    },
    {
      id: "retire-later",
      title: "Retire 2 years later",
      impact: "+12% readiness score",
      newScore: 80,
      description: "Significantly improve retirement security",
    },
    {
      id: "higher-returns",
      title: "Aim for 1% higher returns",
      impact: "+8% readiness score",
      newScore: 76,
      description: "Could retire at target age with more funds",
    },
  ];

  const actionableNudges = [
    {
      priority: "high",
      title: "Increase EPF Voluntary Contribution",
      description:
        "Add RM 150/month to Account 1 for tax benefits and higher returns",
      impact: "Could improve readiness score by 4%",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
    },
    {
      priority: "medium",
      title: "Review Investment Diversification",
      description:
        "Your retirement portfolio could benefit from higher-growth assets",
      impact: "Potential for 0.5-1% higher annual returns",
      icon: <PieChart className="h-5 w-5 text-blue-600" />,
    },
    {
      priority: "medium",
      title: "Consider Additional PRS Contribution",
      description: "Maximize your RM 3,000 annual PRS tax relief",
      impact: "Save RM 750 in taxes while boosting retirement funds",
      icon: <Target className="h-5 w-5 text-purple-600" />,
    },
  ];

  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getReadinessStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "On Track";
    return "Needs Attention";
  };

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(selectedScenario === scenarioId ? null : scenarioId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Retirement Planning</h1>
          <p className="text-muted-foreground">
            Plan and track your journey to financial independence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            Retirement Calculator
          </Button>
          <Button onClick={onNavigateToPlanDetails}>
            <Settings className="h-4 w-4 mr-2" />
            Adjust Plan
          </Button>
        </div>
      </div>

      {/* Retirement Readiness Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg
                  className="w-32 h-32 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${retirementData.readinessScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getReadinessColor(
                        retirementData.readinessScore
                      )}`}
                    >
                      {retirementData.readinessScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Ready</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Retirement Readiness Score
                </h3>
                <Badge
                  variant={
                    retirementData.readinessScore >= 80
                      ? "default"
                      : "secondary"
                  }
                  className={
                    retirementData.readinessScore >= 80
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  {getReadinessStatus(retirementData.readinessScore)}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {retirementData.confidenceLevel}% chance of reaching your
                  desired retirement lifestyle
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {retirementData.currentAge}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current Age
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {retirementData.targetRetirementAge}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Target Retirement
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold mb-2">
                  RM{" "}
                  {retirementData.totalRetirementSavings.toLocaleString(
                    "en-MY",
                    { minimumFractionDigits: 2 }
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  Total Retirement Savings
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Projected retirement age:</span>
                    <span className="font-medium">
                      {retirementData.projectedRetirementAge} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Years of funds:</span>
                    <span className="font-medium">
                      {retirementData.yearsOfFunds} years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Annual Retirement Income</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">
                  Desired Annual Income
                </span>
                <span className="text-lg font-bold text-green-600">
                  RM{" "}
                  {retirementData.desiredAnnualIncome.toLocaleString("en-MY")}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">
                  Projected Annual Income
                </span>
                <span className="text-lg font-bold text-blue-600">
                  RM{" "}
                  {retirementData.projectedAnnualIncome.toLocaleString("en-MY")}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">Annual Income Gap</span>
                <span className="text-lg font-bold text-red-600">
                  RM{" "}
                  {Math.abs(retirementData.annualIncomeGap).toLocaleString(
                    "en-MY"
                  )}
                </span>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Action Required</span>
                </div>
                <p className="text-sm">
                  You need to save an additional{" "}
                  <span className="font-bold text-red-600">
                    RM{" "}
                    {(
                      retirementData.requiredMonthlySavings -
                      retirementData.currentMonthlySavings
                    ).toLocaleString("en-MY")}
                  </span>{" "}
                  per month to bridge your projected annual income gap.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5" />
              <span>What If I...?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedScenario === scenario.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleScenarioClick(scenario.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{scenario.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scenario.impact}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {scenario.newScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        New Score
                      </div>
                    </div>
                  </div>
                  {selectedScenario === scenario.id && (
                    <div className="mt-3 pt-3 border-t text-sm text-blue-700 bg-blue-100 p-2 rounded">
                      {scenario.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Retirement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Retirement Milestones Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="relative flex items-start space-x-4"
                >
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      milestone.status === "target"
                        ? "bg-blue-500"
                        : milestone.status === "projected"
                        ? "bg-green-500"
                        : milestone.status === "warning"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {milestone.age}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {milestone.yearsAway} years away
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Accounts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Retirement Accounts</CardTitle>
          <Button variant="outline" size="sm">
            <PieChart className="h-4 w-4 mr-2" />
            View All Investments
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {retirementAccounts.map((account, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">
                      {account.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{account.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {account.type}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-lg font-bold">
                      RM{" "}
                      {account.currentValue.toLocaleString("en-MY", {
                        minimumFractionDigits: 0,
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Current Value
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monthly: RM {account.monthlyContribution}</span>
                    <span className="text-green-600">
                      Projected: RM{" "}
                      {account.projectedValue.toLocaleString("en-MY", {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actionable Nudges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Top 3 Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actionableNudges.map((nudge, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-shrink-0">{nudge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{nudge.title}</h4>
                    <Badge
                      variant={
                        nudge.priority === "high" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {nudge.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {nudge.description}
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    {nudge.impact}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center space-y-2"
          onClick={onNavigateToPlanDetails}
        >
          <Settings className="h-6 w-6" />
          <span>Adjust My Retirement Plan</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center space-y-2"
          onClick={onNavigateToLifestyle}
        >
          <Target className="h-6 w-6" />
          <span>Explore Lifestyle Options</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <PieChart className="h-6 w-6" />
          <span>View Retirement Accounts</span>
        </Button>
      </div>
    </div>
  );
}
