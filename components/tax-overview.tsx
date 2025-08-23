"use client";

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
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Receipt,
  Target,
} from "lucide-react";
import { useState } from "react";

interface TaxOverviewProps {
  onNavigateToPreparation?: () => void;
  onNavigateToTransactions?: () => void;
  onNavigateToHistory?: () => void;
}

export function TaxOverview({
  onNavigateToPreparation,
  onNavigateToTransactions,
  onNavigateToHistory,
}: TaxOverviewProps) {
  const [currentTaxYear] = useState("2024");
  const [estimatedTax] = useState({
    amount: 8450,
    type: "payable", // "payable" or "refund"
    comparison: { amount: 1200, direction: "up" }, // vs last year
  });

  const [taxDeadlines] = useState([
    {
      type: "Non-Business E-filing",
      date: "April 30, 2024",
      daysLeft: 89,
      progress: 75,
    },
    {
      type: "Business E-filing",
      date: "June 30, 2024",
      daysLeft: 150,
      progress: 45,
    },
  ]);

  const [reliefCategories] = useState([
    { name: "Lifestyle Relief", used: 2800, max: 2500, category: "lifestyle" },
    { name: "Medical Expenses", used: 1200, max: 8000, category: "medical" },
    { name: "Education Fees", used: 4500, max: 7000, category: "education" },
    { name: "Sports Equipment", used: 300, max: 300, category: "sports" },
    { name: "Books & Journals", used: 800, max: 1000, category: "books" },
  ]);

  const [pcbInfo] = useState({
    totalWithheld: 12500,
    estimatedTax: 8450,
    projectedRefund: 4050,
  });

  const [taxHealthScore] = useState({
    score: 85,
    status: "Good",
    insights: [
      "You're on track to maximize your lifestyle relief",
      "Consider topping up your PRS to utilize the RM 3,000 deduction",
      "Review medical expenses - you may have missed some deductions",
    ],
  });

  const [potentialDeductions] = useState([
    {
      category: "Medical Expenses",
      amount: 450,
      reason: "Based on pharmacy transactions",
    },
    {
      category: "Education",
      amount: 200,
      reason: "Online course payments detected",
    },
  ]);

  const totalReliefUsed = reliefCategories.reduce(
    (sum, relief) => sum + Math.min(relief.used, relief.max),
    0
  );
  const totalReliefAvailable = reliefCategories.reduce(
    (sum, relief) => sum + relief.max,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tax Year {currentTaxYear}</h2>
          <p className="text-muted-foreground">
            Your tax overview and preparation status
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Assessment Year {Number.parseInt(currentTaxYear) + 1}
        </Badge>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estimated Tax */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Estimated Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-2xl font-bold ${
                    estimatedTax.type === "payable"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  RM {estimatedTax.amount.toLocaleString()}
                </span>
                {estimatedTax.type === "payable" ? (
                  <Badge variant="destructive" className="text-xs">
                    Payable
                  </Badge>
                ) : (
                  <Badge
                    variant="default"
                    className="text-xs bg-green-100 text-green-800"
                  >
                    Refund
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                {estimatedTax.comparison.direction === "up" ? (
                  <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
                )}
                <span>
                  RM {estimatedTax.comparison.amount.toLocaleString()} vs 2023
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on current income & deductions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PCB Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">PCB Withheld</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                RM {pcbInfo.totalWithheld.toLocaleString()}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax:</span>
                  <span>RM {pcbInfo.estimatedTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Projected:</span>
                  <span className="text-green-600">
                    RM {pcbInfo.projectedRefund.toLocaleString()} refund
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Health Score */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Tax Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">
                  {taxHealthScore.score}
                </span>
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  {taxHealthScore.status}
                </Badge>
              </div>
              <Progress value={taxHealthScore.score} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Tax preparedness rating
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Tax Deadlines & Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxDeadlines.map((deadline, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{deadline.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {deadline.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">
                        {deadline.daysLeft} days left
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {deadline.progress}% prepared
                    </p>
                  </div>
                </div>
                <Progress value={deadline.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relief Categories Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Tax Reliefs & Deductions</span>
            </CardTitle>
            <CardDescription>
              You've utilized RM {totalReliefUsed.toLocaleString()} of RM{" "}
              {totalReliefAvailable.toLocaleString()} available reliefs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reliefCategories.map((relief, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{relief.name}</span>
                    <span className="text-sm">
                      RM {Math.min(relief.used, relief.max).toLocaleString()} /
                      RM {relief.max.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={
                      (Math.min(relief.used, relief.max) / relief.max) * 100
                    }
                    className="h-2"
                  />
                  {relief.used > relief.max && (
                    <p className="text-xs text-orange-600">
                      Exceeds limit by RM{" "}
                      {(relief.used - relief.max).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Potential Missing Deductions</span>
            </CardTitle>
            <CardDescription>Based on your spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {potentialDeductions.map((deduction, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">
                      {deduction.category}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {deduction.reason}
                    </p>
                    <p className="text-sm font-medium text-orange-600 mt-1">
                      Potential deduction: RM {deduction.amount}
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Tax Health Insights</h4>
                {taxHealthScore.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1" />
                    <p className="text-xs text-muted-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={onNavigateToPreparation} className="h-12">
          <FileText className="h-4 w-4 mr-2" />
          Prepare My Tax Filing
        </Button>
        <Button
          variant="outline"
          onClick={onNavigateToTransactions}
          className="h-12"
        >
          <Receipt className="h-4 w-4 mr-2" />
          View Tax Transactions
        </Button>
        <Button
          variant="outline"
          onClick={onNavigateToHistory}
          className="h-12"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Tax History & Documents
        </Button>
      </div>
    </div>
  );
}
