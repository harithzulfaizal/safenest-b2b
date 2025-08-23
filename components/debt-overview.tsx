"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Banknote,
  Car,
  CreditCard,
  GraduationCap,
  Home,
  Target,
  TrendingDown,
} from "lucide-react";

interface DebtOverviewProps {
  onNavigateToManage: () => void;
  onNavigateToStrategy: () => void;
  onNavigateToAddDebt: () => void;
}

export function DebtOverview({
  onNavigateToManage,
  onNavigateToStrategy,
  onNavigateToAddDebt,
}: DebtOverviewProps) {
  // Mock data - in real app this would come from API/state
  const totalDebt = 289980;
  const monthlyChange = -2500;
  const debtToIncomeRatio = 47;
  const debtFreeProgress = 32;
  const projectedDebtFreeDate = "March 2029";

  const upcomingPayments = [
    {
      id: "1",
      name: "Maybank Housing Loan",
      amount: 2850,
      dueDate: "Feb 15, 2025",
      account: "Maybank Savings",
      type: "housing",
    },
    {
      id: "2",
      name: "CIMB Credit Card",
      amount: 450,
      dueDate: "Feb 18, 2025",
      account: "CIMB Current",
      type: "credit",
    },
    {
      id: "3",
      name: "Honda Car Loan",
      amount: 680,
      dueDate: "Feb 20, 2025",
      account: "Public Bank Savings",
      type: "car",
    },
  ];

  const debtBreakdown = [
    {
      type: "Housing Loan",
      amount: 185000,
      percentage: 64,
      color: "bg-blue-500",
      icon: Home,
    },
    {
      type: "Car Loan",
      amount: 45000,
      percentage: 15,
      color: "bg-green-500",
      icon: Car,
    },
    {
      type: "Credit Cards",
      amount: 35000,
      percentage: 12,
      color: "bg-red-500",
      icon: CreditCard,
    },
    {
      type: "Personal Loan",
      amount: 15000,
      percentage: 5,
      color: "bg-purple-500",
      icon: Banknote,
    },
    {
      type: "PTPTN",
      amount: 9980,
      percentage: 4,
      color: "bg-orange-500",
      icon: GraduationCap,
    },
  ];

  const actionableInsights = [
    {
      title: "High Credit Card Interest",
      description:
        "Your credit card interest charges last month were RM 890. Prioritize paying down high-interest debt.",
      priority: "high",
      action: "Pay Extra on Credit Cards",
    },
    {
      title: "Snowball Opportunity",
      description:
        "Consider the 'Snowball Method' to accelerate your PTPTN loan (smallest debt).",
      priority: "medium",
      action: "Explore Strategies",
    },
    {
      title: "Minimum Payment Alert",
      description:
        "You're making minimum payments on Personal Loan. Increasing by RM 200 could save you RM 3,200 in interest.",
      priority: "medium",
      action: "Calculate Savings",
    },
  ];

  const totalUpcoming7Days = upcomingPayments
    .filter((payment) => {
      const dueDate = new Date(payment.dueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

  const getTypeIcon = (type: string) => {
    const icons = {
      housing: Home,
      credit: CreditCard,
      car: Car,
      personal: Banknote,
      education: GraduationCap,
    };
    return icons[type as keyof typeof icons] || Banknote;
  };

  const getPriorityColor = (priority: string) => {
    return priority === "high"
      ? "bg-red-50 border-red-200"
      : "bg-yellow-50 border-yellow-200";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Debt Overview</h1>
        <p className="text-muted-foreground">
          Track your debt repayment progress and get personalized insights to
          accelerate your journey to debt freedom.
        </p>
      </div>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Outstanding Debt */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Outstanding Debt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                RM {totalDebt.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    RM {Math.abs(monthlyChange).toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  from last month
                </span>
              </div>
              {/* Trend sparkline placeholder */}
              <div className="h-8 bg-gradient-to-r from-green-100 to-green-50 rounded flex items-end justify-end px-2">
                <div className="text-xs text-green-600">↓ 6 month trend</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debt-to-Income Ratio */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Debt-to-Income Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold">{debtToIncomeRatio}%</div>
              <Progress value={debtToIncomeRatio} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Aim for below 40% for better financial health
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debt Freedom Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Debt Freedom Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold">{debtFreeProgress}%</div>
              <Progress value={debtFreeProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Projected debt-free by {projectedDebtFreeDate}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Payments</CardTitle>
                {totalUpcoming7Days > 0 && (
                  <Badge variant="outline" className="bg-blue-50">
                    RM {totalUpcoming7Days.toLocaleString()} due in 7 days
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.slice(0, 3).map((payment) => {
                  const IconComponent = getTypeIcon(payment.type);
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{payment.name}</div>
                          <div className="text-sm text-muted-foreground">
                            From {payment.account}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          RM {payment.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.dueDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actionable Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Top Actionable Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actionableInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${getPriorityColor(
                      insight.priority
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{insight.title}</h4>
                          {insight.priority === "high" && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Debt Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Debt Breakdown by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {debtBreakdown.map((debt, index) => {
                  const IconComponent = debt.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {debt.type}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            RM {debt.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {debt.percentage}%
                          </div>
                        </div>
                      </div>
                      <Progress value={debt.percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Key Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onNavigateToManage} className="w-full" size="lg">
                Manage My Debts
              </Button>
              <Button
                onClick={onNavigateToStrategy}
                variant="outline"
                className="w-full"
              >
                Explore Repayment Strategies
              </Button>
              <Button
                onClick={onNavigateToAddDebt}
                variant="outline"
                className="w-full"
              >
                Add New Loan/Debt
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
