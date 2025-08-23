"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  ArrowLeft,
  Car,
  Copy,
  DollarSign,
  Gamepad2,
  Home,
  Plus,
  Save,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface BudgetManageProps {
  onBack?: () => void;
}

export function BudgetManage({ onBack }: BudgetManageProps) {
  const [budgetPeriod, setBudgetPeriod] = useState("monthly");
  const [expectedIncome, setExpectedIncome] = useState("5500");
  const [actualIncome, setActualIncome] = useState("5500");

  const [categories, setCategories] = useState([
    {
      id: "housing",
      name: "Housing & Rent",
      icon: Home,
      group: "Essential",
      budgeted: 1500,
      spent: 1500,
      type: "Fixed",
      rollover: false,
      recommended: 1650,
    },
    {
      id: "utilities",
      name: "Utilities & Bills",
      icon: Home,
      group: "Essential",
      budgeted: 450,
      spent: 380.25,
      type: "Variable",
      rollover: true,
      recommended: 400,
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: Car,
      group: "Essential",
      budgeted: 600,
      spent: 542.3,
      type: "Variable",
      rollover: false,
      recommended: 550,
    },
    {
      id: "food-groceries",
      name: "Food & Groceries",
      icon: Utensils,
      group: "Food",
      budgeted: 600,
      spent: 456.45,
      type: "Variable",
      rollover: false,
      recommended: 650,
    },
    {
      id: "dining-out",
      name: "Dining Out",
      icon: Utensils,
      group: "Food",
      budgeted: 300,
      spent: 400,
      type: "Variable",
      rollover: false,
      recommended: 350,
    },
    {
      id: "shopping",
      name: "Shopping",
      icon: ShoppingCart,
      group: "Discretionary",
      budgeted: 400,
      spent: 425.8,
      type: "Variable",
      rollover: true,
      recommended: 300,
    },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: Gamepad2,
      group: "Discretionary",
      budgeted: 300,
      spent: 285.6,
      type: "Variable",
      rollover: true,
      recommended: 250,
    },
    {
      id: "savings",
      name: "Savings & Investments",
      icon: TrendingUp,
      group: "Savings",
      budgeted: 1100,
      spent: 1100,
      type: "Fixed",
      rollover: false,
      recommended: 1200,
    },
  ]);

  const groupedCategories = categories.reduce((groups, category) => {
    const group = category.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(category);
    return groups;
  }, {} as Record<string, typeof categories>);

  const totalBudgeted = categories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRecommended = categories.reduce(
    (sum, cat) => sum + cat.recommended,
    0
  );

  const updateCategoryBudget = (id: string, amount: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, budgeted: amount } : cat))
    );
  };

  const toggleRollover = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, rollover: !cat.rollover } : cat
      )
    );
  };

  const addNewCategory = () => {
    const newCategory = {
      id: `custom-${Date.now()}`,
      name: "New Category",
      icon: DollarSign,
      group: "Other",
      budgeted: 0,
      spent: 0,
      type: "Variable" as const,
      rollover: false,
      recommended: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const applyRecommendations = () => {
    setCategories((prev) =>
      prev.map((cat) => ({ ...cat, budgeted: cat.recommended }))
    );
  };

  const uncategorizedTransactions = [
    { description: "Unknown Merchant", amount: 45.6, date: "2 days ago" },
    { description: "ATM Withdrawal", amount: 100, date: "5 days ago" },
  ];

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
            <h1 className="text-2xl font-bold">Manage Budget</h1>
            <p className="text-muted-foreground">
              Set and adjust your spending limits
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy Last Month
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Budget
          </Button>
        </div>
      </div>

      {/* Budget Period & Income */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Period</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={budgetPeriod} onValueChange={setBudgetPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expected Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="number"
                value={expectedIncome}
                onChange={(e) => setExpectedIncome(e.target.value)}
                placeholder="0.00"
              />
              <div className="text-sm text-muted-foreground">
                Actual received: RM{" "}
                {Number.parseFloat(actualIncome).toLocaleString("en-MY")}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Budgeted:</span>
                <span className="font-semibold">
                  RM {totalBudgeted.toLocaleString("en-MY")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span
                  className={`font-semibold ${
                    Number.parseFloat(expectedIncome) - totalBudgeted >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  RM{" "}
                  {(
                    Number.parseFloat(expectedIncome) - totalBudgeted
                  ).toLocaleString("en-MY")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocation Pie Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Budget Allocation</CardTitle>
          <Button variant="outline" size="sm" onClick={applyRecommendations}>
            Apply Recommendations
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {(
                      (totalBudgeted / Number.parseFloat(expectedIncome)) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="text-lg font-medium">of income budgeted</div>
                  <div className="text-sm text-muted-foreground">
                    RM {totalBudgeted.toLocaleString("en-MY")} of RM{" "}
                    {Number.parseFloat(expectedIncome).toLocaleString("en-MY")}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {Object.entries(groupedCategories).map(([group, cats]) => {
                const groupTotal = cats.reduce(
                  (sum, cat) => sum + cat.budgeted,
                  0
                );
                const groupPercentage = (groupTotal / totalBudgeted) * 100;
                return (
                  <div
                    key={group}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm">{group}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {groupPercentage.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Management */}
      <div className="space-y-6">
        {Object.entries(groupedCategories).map(([group, cats]) => (
          <Card key={group}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>{group}</span>
                <Badge variant="secondary">{cats.length} categories</Badge>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={addNewCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cats.map((category) => {
                  const percentage =
                    category.budgeted > 0
                      ? (category.spent / category.budgeted) * 100
                      : 0;
                  const isOverBudget = percentage > 100;
                  return (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                        <div className="lg:col-span-2 flex items-center space-x-3">
                          <category.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {category.type}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Budgeted Amount</Label>
                          <Input
                            type="number"
                            value={category.budgeted}
                            onChange={(e) =>
                              updateCategoryBudget(
                                category.id,
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label className="text-xs">Spent So Far</Label>
                          <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                            RM {category.spent.toFixed(2)}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">Progress</Label>
                          <div className="mt-1 space-y-1">
                            <Progress
                              value={Math.min(percentage, 100)}
                              className="h-2"
                            />
                            <div className="flex justify-between text-xs">
                              <span
                                className={
                                  isOverBudget
                                    ? "text-red-600"
                                    : "text-muted-foreground"
                                }
                              >
                                {percentage.toFixed(0)}%
                              </span>
                              {isOverBudget && (
                                <span className="text-red-600">
                                  Over by RM{" "}
                                  {(category.spent - category.budgeted).toFixed(
                                    2
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={category.rollover}
                                onCheckedChange={() =>
                                  toggleRollover(category.id)
                                }
                              />
                              <Label className="text-xs">Rollover</Label>
                            </div>
                            {category.recommended !== category.budgeted && (
                              <div className="text-xs text-blue-600">
                                Suggested: RM {category.recommended}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCategory(category.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Uncategorized Transactions */}
      {uncategorizedTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Uncategorized Transactions</span>
              <Badge variant="secondary">
                {uncategorizedTransactions.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uncategorizedTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold">
                      RM {transaction.amount.toFixed(2)}
                    </span>
                    <Button variant="outline" size="sm">
                      Categorize
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
