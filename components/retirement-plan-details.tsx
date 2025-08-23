"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calculator,
  CheckCircle,
  DollarSign,
  Download,
  Save,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface RetirementPlanDetailsProps {
  onBack?: () => void;
}

export function RetirementPlanDetails({ onBack }: RetirementPlanDetailsProps) {
  const [planInputs, setPlanInputs] = useState({
    targetRetirementAge: 60,
    desiredAnnualIncome: 60000,
    lifeExpectancy: 85,
    inflationRate: 3.0,
    postRetirementReturn: 5.0,
    currentAge: 32,
  });

  const [savedScenarios, setSavedScenarios] = useState([
    { id: "conservative", name: "Conservative Plan", readinessScore: 65 },
    { id: "aggressive", name: "Aggressive Plan", readinessScore: 78 },
    { id: "current", name: "Current Plan", readinessScore: 68 },
  ]);

  const [selectedScenario, setSelectedScenario] = useState("current");

  const retirementAssets = [
    {
      name: "EPF Account 1",
      type: "Mandatory",
      currentValue: 125650.5,
      monthlyContribution: 450,
      historicalReturn: 6.2,
      projectedValue: 285000,
      canEdit: false,
    },
    {
      name: "PRS - AmMetLife",
      type: "Private Retirement Scheme",
      currentValue: 35000,
      monthlyContribution: 200,
      historicalReturn: 7.8,
      projectedValue: 95000,
      canEdit: true,
    },
    {
      name: "Investment Portfolio",
      type: "Designated Retirement",
      currentValue: 25000,
      monthlyContribution: 0,
      historicalReturn: 8.5,
      projectedValue: 120000,
      canEdit: true,
    },
  ];

  const projectedIncomeBreakdown = [
    { source: "EPF Withdrawals", annualAmount: 18500, percentage: 43.5 },
    { source: "PRS Withdrawals", annualAmount: 12000, percentage: 28.2 },
    { source: "Investment Withdrawals", annualAmount: 8500, percentage: 20.0 },
    { source: "Rental Income", annualAmount: 3500, percentage: 8.3 },
  ];

  const yearlyProjections = [
    {
      age: 60,
      totalAssets: 500000,
      annualIncome: 42500,
      annualExpenses: 60000,
      remainingAssets: 482500,
    },
    {
      age: 65,
      totalAssets: 450000,
      annualIncome: 42500,
      annualExpenses: 65000,
      remainingAssets: 427500,
    },
    {
      age: 70,
      totalAssets: 380000,
      annualIncome: 42500,
      annualExpenses: 70000,
      remainingAssets: 352500,
    },
    {
      age: 75,
      totalAssets: 290000,
      annualIncome: 42500,
      annualExpenses: 75000,
      remainingAssets: 257500,
    },
    {
      age: 80,
      totalAssets: 180000,
      annualIncome: 42500,
      annualExpenses: 80000,
      remainingAssets: 142500,
    },
  ];

  const calculateReadinessScore = () => {
    // Simplified calculation based on inputs
    const yearsToRetirement =
      planInputs.targetRetirementAge - planInputs.currentAge;
    const totalCurrentAssets = retirementAssets.reduce(
      (sum, asset) => sum + asset.currentValue,
      0
    );
    const totalMonthlyContributions = retirementAssets.reduce(
      (sum, asset) => sum + asset.monthlyContribution,
      0
    );

    // Basic projection calculation
    const projectedTotal =
      totalCurrentAssets *
        Math.pow(1 + planInputs.postRetirementReturn / 100, yearsToRetirement) +
      totalMonthlyContributions * 12 * yearsToRetirement * 1.5;

    const requiredTotal =
      planInputs.desiredAnnualIncome *
      (planInputs.lifeExpectancy - planInputs.targetRetirementAge);

    return Math.min(100, Math.round((projectedTotal / requiredTotal) * 100));
  };

  const currentReadinessScore = calculateReadinessScore();
  const requiredMonthlySavings = 1250; // Calculated based on gap
  const currentMonthlySavings = retirementAssets.reduce(
    (sum, asset) => sum + asset.monthlyContribution,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Retirement Plan Details</h1>
            <p className="text-muted-foreground">
              Customize your retirement strategy and run scenarios
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Current Readiness Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Current Plan Readiness Score
              </h3>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentReadinessScore}%
              </div>
              <p className="text-sm text-muted-foreground">
                Based on your current inputs and projections
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Required Monthly Savings:{" "}
                </span>
                <span className="font-bold text-red-600">
                  RM {requiredMonthlySavings.toLocaleString("en-MY")}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Current Monthly Savings:{" "}
                </span>
                <span className="font-bold text-blue-600">
                  RM {currentMonthlySavings.toLocaleString("en-MY")}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Monthly Gap: </span>
                <span className="font-bold text-red-600">
                  RM{" "}
                  {(
                    requiredMonthlySavings - currentMonthlySavings
                  ).toLocaleString("en-MY")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Retirement Goals</TabsTrigger>
          <TabsTrigger value="assets">Current Assets</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planner</TabsTrigger>
          <TabsTrigger value="projections">Detailed Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Your Retirement Goal Inputs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retirement-age">
                      Target Retirement Age
                    </Label>
                    <div className="mt-2">
                      <Slider
                        id="retirement-age"
                        min={50}
                        max={70}
                        step={1}
                        value={[planInputs.targetRetirementAge]}
                        onValueChange={(value) =>
                          setPlanInputs({
                            ...planInputs,
                            targetRetirementAge: value[0],
                          })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>50</span>
                        <span className="font-medium">
                          {planInputs.targetRetirementAge} years
                        </span>
                        <span>70</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="annual-income">
                      Desired Annual Retirement Income (RM)
                    </Label>
                    <Input
                      id="annual-income"
                      type="number"
                      value={planInputs.desiredAnnualIncome}
                      onChange={(e) =>
                        setPlanInputs({
                          ...planInputs,
                          desiredAnnualIncome:
                            Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      In today's purchasing power
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="life-expectancy">Life Expectancy</Label>
                    <div className="mt-2">
                      <Slider
                        id="life-expectancy"
                        min={75}
                        max={95}
                        step={1}
                        value={[planInputs.lifeExpectancy]}
                        onValueChange={(value) =>
                          setPlanInputs({
                            ...planInputs,
                            lifeExpectancy: value[0],
                          })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>75</span>
                        <span className="font-medium">
                          {planInputs.lifeExpectancy} years
                        </span>
                        <span>95</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inflation-rate">
                      Expected Inflation Rate (%)
                    </Label>
                    <div className="mt-2">
                      <Slider
                        id="inflation-rate"
                        min={1.0}
                        max={6.0}
                        step={0.1}
                        value={[planInputs.inflationRate]}
                        onValueChange={(value) =>
                          setPlanInputs({
                            ...planInputs,
                            inflationRate: value[0],
                          })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1%</span>
                        <span className="font-medium">
                          {planInputs.inflationRate.toFixed(1)}%
                        </span>
                        <span>6%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="post-retirement-return">
                      Post-Retirement Investment Return (%)
                    </Label>
                    <div className="mt-2">
                      <Slider
                        id="post-retirement-return"
                        min={2.0}
                        max={8.0}
                        step={0.1}
                        value={[planInputs.postRetirementReturn]}
                        onValueChange={(value) =>
                          setPlanInputs({
                            ...planInputs,
                            postRetirementReturn: value[0],
                          })
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>2%</span>
                        <span className="font-medium">
                          {planInputs.postRetirementReturn.toFixed(1)}%
                        </span>
                        <span>8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Retirement Duration
                    </h4>
                    <div className="text-2xl font-bold text-blue-600">
                      {planInputs.lifeExpectancy -
                        planInputs.targetRetirementAge}{" "}
                      years
                    </div>
                    <p className="text-sm text-blue-700">
                      From age {planInputs.targetRetirementAge} to{" "}
                      {planInputs.lifeExpectancy}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                        <Label className="text-sm">Monthly Contribution</Label>
                        <div className="mt-1">
                          {asset.canEdit ? (
                            <Input
                              type="number"
                              value={asset.monthlyContribution}
                              onChange={(e) => {
                                // Handle the change - you can implement state management here
                                console.log(
                                  "Monthly contribution changed:",
                                  e.target.value
                                );
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
                          Projected Value at Retirement
                        </Label>
                        <div className="text-sm font-medium text-green-600 mt-1">
                          RM{" "}
                          {asset.projectedValue.toLocaleString("en-MY", {
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

          {/* Projected Income Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Projected Income Sources in Retirement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectedIncomeBreakdown.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: `hsl(${index * 90}, 70%, 50%)`,
                        }}
                      />
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        RM {source.annualAmount.toLocaleString("en-MY")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {source.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg font-semibold">
                  <span>Total Annual Income</span>
                  <span>
                    RM{" "}
                    {projectedIncomeBreakdown
                      .reduce((sum, source) => sum + source.annualAmount, 0)
                      .toLocaleString("en-MY")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Interactive Scenario Modeler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Increase Monthly Savings by (RM)</Label>
                    <Slider
                      min={0}
                      max={1000}
                      step={50}
                      defaultValue={[0]}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Adjust Retirement Age by (years)</Label>
                    <Slider
                      min={-5}
                      max={5}
                      step={1}
                      defaultValue={[0]}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Target Investment Return Adjustment (%)</Label>
                    <Slider
                      min={-2}
                      max={2}
                      step={0.1}
                      defaultValue={[0]}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <h4 className="font-semibold mb-4">Scenario Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>New Readiness Score:</span>
                      <span className="font-bold text-green-600">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected Retirement Age:</span>
                      <span className="font-bold">61 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years of Funds:</span>
                      <span className="font-bold">22 years</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Save This Scenario</Button>
                </div>
              </div>

              {/* Saved Scenarios */}
              <div>
                <h4 className="font-semibold mb-3">Saved Scenarios</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {savedScenarios.map((scenario) => (
                    <Card
                      key={scenario.id}
                      className={`cursor-pointer transition-all ${
                        selectedScenario === scenario.id
                          ? "border-blue-500 bg-blue-50"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedScenario(scenario.id)}
                    >
                      <CardContent className="p-4">
                        <h5 className="font-medium mb-2">{scenario.name}</h5>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {scenario.readinessScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Readiness Score
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Detailed Year-by-Year Projections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Age</th>
                      <th className="text-right p-2">Total Assets</th>
                      <th className="text-right p-2">Annual Income</th>
                      <th className="text-right p-2">Annual Expenses</th>
                      <th className="text-right p-2">Remaining Assets</th>
                      <th className="text-center p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyProjections.map((projection, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{projection.age}</td>
                        <td className="p-2 text-right">
                          RM {projection.totalAssets.toLocaleString("en-MY")}
                        </td>
                        <td className="p-2 text-right text-green-600">
                          RM {projection.annualIncome.toLocaleString("en-MY")}
                        </td>
                        <td className="p-2 text-right text-red-600">
                          RM {projection.annualExpenses.toLocaleString("en-MY")}
                        </td>
                        <td className="p-2 text-right font-medium">
                          RM{" "}
                          {projection.remainingAssets.toLocaleString("en-MY")}
                        </td>
                        <td className="p-2 text-center">
                          {projection.remainingAssets > 100000 ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                          ) : projection.remainingAssets > 0 ? (
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

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Key Insights
                    </h4>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Funds are projected to last until age 78</li>
                      <li>
                        • Annual expenses exceed income starting from age 60
                      </li>
                      <li>
                        • Consider increasing savings or adjusting retirement
                        age
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
