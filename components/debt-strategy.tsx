"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calculator,
  ExternalLink,
  Lightbulb,
  Target,
} from "lucide-react";
import { useState } from "react";

interface DebtStrategyProps {
  onBack: () => void;
}

export function DebtStrategy({ onBack }: DebtStrategyProps) {
  const [extraBudget, setExtraBudget] = useState("500");
  const [selectedStrategy, setSelectedStrategy] = useState("avalanche");

  // Mock debt data
  const debts = [
    {
      id: "1",
      name: "CIMB Credit Card",
      balance: 25000,
      minPayment: 450,
      interestRate: 18.0,
      type: "credit",
    },
    {
      id: "2",
      name: "RHB Credit Card",
      balance: 10000,
      minPayment: 200,
      interestRate: 17.5,
      type: "credit",
    },
    {
      id: "3",
      name: "AmBank Personal Loan",
      balance: 15000,
      minPayment: 520,
      interestRate: 8.5,
      type: "personal",
    },
    {
      id: "4",
      name: "PTPTN Education Loan",
      balance: 9980,
      minPayment: 180,
      interestRate: 1.0,
      type: "education",
    },
  ];

  const strategies = {
    avalanche: {
      name: "Debt Avalanche",
      description:
        "Pay minimums on all debts, then put extra money toward the highest interest rate debt first.",
      pros: [
        "Saves the most money in interest",
        "Mathematically optimal",
        "Faster debt elimination",
      ],
      cons: ["May take longer to see progress", "Requires discipline"],
      order: [...debts].sort((a, b) => b.interestRate - a.interestRate),
    },
    snowball: {
      name: "Debt Snowball",
      description:
        "Pay minimums on all debts, then put extra money toward the smallest balance first.",
      pros: [
        "Quick wins build momentum",
        "Psychologically motivating",
        "Simplifies debt management",
      ],
      cons: ["May cost more in interest", "Not mathematically optimal"],
      order: [...debts].sort((a, b) => a.balance - b.balance),
    },
    balanced: {
      name: "Balanced Approach",
      description:
        "Combine elements of both strategies, focusing on high-interest debts while achieving quick wins.",
      pros: [
        "Balance of savings and motivation",
        "Flexible approach",
        "Good for mixed debt types",
      ],
      cons: ["May not be optimal for either goal", "Requires more planning"],
      order: [...debts].sort(
        (a, b) =>
          b.interestRate / Math.sqrt(b.balance) -
          a.interestRate / Math.sqrt(a.balance)
      ),
    },
  };

  const calculatePayoffScenario = (strategy: string, extraAmount: number) => {
    // Simplified calculation for demo
    const totalMinPayments = debts.reduce(
      (sum, debt) => sum + debt.minPayment,
      0
    );
    const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const avgInterestRate =
      debts.reduce((sum, debt) => sum + debt.interestRate * debt.balance, 0) /
      totalBalance;

    const monthlyPayment = totalMinPayments + extraAmount;
    const monthlyRate = avgInterestRate / 100 / 12;

    // Rough estimate using standard loan formula
    const months =
      Math.log(1 + (totalBalance * monthlyRate) / monthlyPayment) /
      Math.log(1 + monthlyRate);
    const totalInterest = monthlyPayment * months - totalBalance;

    return {
      months: Math.ceil(months),
      years: Math.floor(months / 12),
      remainingMonths: Math.ceil(months % 12),
      totalInterest: Math.max(0, totalInterest),
      monthlyPayment,
    };
  };

  const currentScenario = calculatePayoffScenario(selectedStrategy, 0);
  const improvedScenario = calculatePayoffScenario(
    selectedStrategy,
    Number.parseFloat(extraBudget) || 0
  );
  const savings =
    currentScenario.totalInterest - improvedScenario.totalInterest;
  const timeSaved = currentScenario.months - improvedScenario.months;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Debt Strategy & Acceleration</h1>
          <p className="text-muted-foreground">
            Choose the best repayment strategy to accelerate your journey to
            debt freedom
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs
            value={selectedStrategy}
            onValueChange={setSelectedStrategy}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="avalanche">Debt Avalanche</TabsTrigger>
              <TabsTrigger value="snowball">Debt Snowball</TabsTrigger>
              <TabsTrigger value="balanced">Balanced</TabsTrigger>
            </TabsList>

            {Object.entries(strategies).map(([key, strategy]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                {/* Strategy Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {strategy.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {strategy.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">
                          Pros
                        </h4>
                        <ul className="text-sm space-y-1">
                          {strategy.pros.map((pro, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">
                          Cons
                        </h4>
                        <ul className="text-sm space-y-1">
                          {strategy.cons.map((con, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Debt Order */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Payment Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.order.map((debt, index) => (
                        <div
                          key={debt.id}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                        >
                          <Badge
                            variant="outline"
                            className="min-w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            {index + 1}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-medium">{debt.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {debt.interestRate}% APR • RM {debt.minPayment}
                              /month minimum
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              RM {debt.balance.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Balance
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Strategy Simulator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Strategy Simulator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="extra-budget">Extra Monthly Budget (RM)</Label>
                <Input
                  id="extra-budget"
                  type="number"
                  placeholder="Enter extra amount"
                  value={extraBudget}
                  onChange={(e) => setExtraBudget(e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Current Plan
                  </div>
                  <div className="font-medium">
                    {currentScenario.years} years,{" "}
                    {currentScenario.remainingMonths} months
                  </div>
                  <div className="text-sm text-muted-foreground">
                    RM {currentScenario.totalInterest.toLocaleString()} total
                    interest
                  </div>
                </div>

                {Number.parseFloat(extraBudget) > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800 font-medium">
                      With Extra RM {extraBudget}/month:
                    </div>
                    <div className="text-green-700">
                      {improvedScenario.years} years,{" "}
                      {improvedScenario.remainingMonths} months
                    </div>
                    <div className="text-sm text-green-600">
                      Save RM {savings.toLocaleString()} in interest
                    </div>
                    <div className="text-sm text-green-600">
                      Debt-free {timeSaved} months earlier
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full">Commit to This Plan</Button>
            </CardContent>
          </Card>

          {/* Debt Consolidation */}
          <Card>
            <CardHeader>
              <CardTitle>Debt Consolidation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Consider consolidating high-interest debts into a single
                lower-rate loan.
              </p>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">
                  Potential Savings
                </div>
                <div className="text-blue-700">
                  Consolidating credit cards at 8% APR
                </div>
                <div className="text-sm text-blue-600">
                  Could save RM 450/month
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Consolidation Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Tips & Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Tips & Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">
                  Increase Your Debt Payments
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Use windfalls (bonuses, tax refunds)</li>
                  <li>• Reduce discretionary spending</li>
                  <li>• Consider a side income</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Need Help?</h4>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  AKPK Credit Counselling
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
