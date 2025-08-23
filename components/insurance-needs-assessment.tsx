"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Car,
  Heart,
  Home,
  Info,
  Lightbulb,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface InsuranceNeedsAssessmentProps {
  onBack?: () => void;
}

export function InsuranceNeedsAssessment({
  onBack,
}: InsuranceNeedsAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    lifeStage: "",
    dependents: 0,
    elderlyParents: 0,
    annualIncome: 0,
    monthlyExpenses: 0,
    outstandingDebts: 0,
    currentSavings: 0,
    healthStatus: "",
    lifestyle: "",
    carValue: 0,
    homeValue: 0,
    travelFrequency: "",
    riskTolerance: "",
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate insurance needs based on form data
  const calculateNeeds = () => {
    const lifeInsuranceNeed =
      formData.annualIncome * 10 +
      formData.outstandingDebts +
      formData.dependents * 100000;
    const criticalIllnessNeed = formData.annualIncome * 3;
    const medicalInsuranceNeed = Math.max(150000, formData.annualIncome * 0.5);
    const personalAccidentNeed = formData.annualIncome * 5;

    return {
      lifeInsurance: lifeInsuranceNeed,
      criticalIllness: criticalIllnessNeed,
      medicalInsurance: medicalInsuranceNeed,
      personalAccident: personalAccidentNeed,
      motor: formData.carValue,
      home: formData.homeValue,
      travel: formData.travelFrequency === "frequent" ? 200000 : 100000,
    };
  };

  const currentCoverage = {
    lifeInsurance: 500000,
    criticalIllness: 200000,
    medicalInsurance: 150000,
    personalAccident: 0,
    motor: 80000,
    home: 0,
    travel: 100000,
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Life Stage & Family Situation</CardTitle>
              <CardDescription>
                Tell us about your current life stage and family
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">
                  What's your current life stage?
                </Label>
                <RadioGroup
                  value={formData.lifeStage}
                  onValueChange={(value) =>
                    handleInputChange("lifeStage", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">Married (no children)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married-kids" id="married-kids" />
                    <Label htmlFor="married-kids">Married with children</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single-parent" id="single-parent" />
                    <Label htmlFor="single-parent">Single parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retirement" id="retirement" />
                    <Label htmlFor="retirement">Nearing retirement</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">
                  Number of financial dependents (children)
                </Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.dependents]}
                    onValueChange={(value) =>
                      handleInputChange("dependents", value[0])
                    }
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">{formData.dependents}</span>
                    <span>5+</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">
                  Do you support elderly parents?
                </Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.elderlyParents]}
                    onValueChange={(value) =>
                      handleInputChange("elderlyParents", value[0])
                    }
                    max={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>0</span>
                    <span className="font-medium">
                      {formData.elderlyParents}
                    </span>
                    <span>4+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>
                Help us understand your financial situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="annual-income"
                  className="text-base font-medium"
                >
                  Annual Income (RM)
                </Label>
                <Input
                  id="annual-income"
                  type="number"
                  placeholder="e.g., 120000"
                  value={formData.annualIncome || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "annualIncome",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="monthly-expenses"
                  className="text-base font-medium"
                >
                  Monthly Expenses (RM)
                </Label>
                <Input
                  id="monthly-expenses"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.monthlyExpenses || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "monthlyExpenses",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="outstanding-debts"
                  className="text-base font-medium"
                >
                  Outstanding Debts (RM)
                </Label>
                <Input
                  id="outstanding-debts"
                  type="number"
                  placeholder="e.g., 300000 (housing loan, car loan, etc.)"
                  value={formData.outstandingDebts || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "outstandingDebts",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="current-savings"
                  className="text-base font-medium"
                >
                  Current Savings & Investments (RM)
                </Label>
                <Input
                  id="current-savings"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.currentSavings || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "currentSavings",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Health & Lifestyle</CardTitle>
              <CardDescription>
                Tell us about your health status and lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">
                  How would you describe your current health status?
                </Label>
                <RadioGroup
                  value={formData.healthStatus}
                  onValueChange={(value) =>
                    handleInputChange("healthStatus", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent">
                      Excellent - No health issues
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good">Good - Minor health issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="fair" />
                    <Label htmlFor="fair">Fair - Some chronic conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor">
                      Poor - Significant health issues
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">
                  What's your lifestyle like?
                </Label>
                <RadioGroup
                  value={formData.lifestyle}
                  onValueChange={(value) =>
                    handleInputChange("lifestyle", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary">
                      Sedentary - Office work, minimal physical activity
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">
                      Moderate - Regular exercise, balanced lifestyle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active">
                      Active - Sports, outdoor activities
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high-risk" id="high-risk" />
                    <Label htmlFor="high-risk">
                      High-risk - Extreme sports, dangerous hobbies
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Assets & Property</CardTitle>
              <CardDescription>
                Information about your major assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="car-value" className="text-base font-medium">
                  Current Car Value (RM)
                </Label>
                <Input
                  id="car-value"
                  type="number"
                  placeholder="e.g., 80000"
                  value={formData.carValue || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "carValue",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter 0 if you don't own a car
                </p>
              </div>

              <div>
                <Label htmlFor="home-value" className="text-base font-medium">
                  Home/Property Value (RM)
                </Label>
                <Input
                  id="home-value"
                  type="number"
                  placeholder="e.g., 500000"
                  value={formData.homeValue || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "homeValue",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter 0 if you don't own property or are renting
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Travel & Risk Preferences</CardTitle>
              <CardDescription>
                Your travel habits and risk tolerance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">
                  How often do you travel?
                </Label>
                <RadioGroup
                  value={formData.travelFrequency}
                  onValueChange={(value) =>
                    handleInputChange("travelFrequency", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rarely" id="rarely" />
                    <Label htmlFor="rarely">
                      Rarely - Less than once a year
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="occasional" />
                    <Label htmlFor="occasional">
                      Occasional - 1-2 times a year
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="frequent" />
                    <Label htmlFor="frequent">Frequent - 3+ times a year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">
                      Business travel - Monthly or more
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">
                  What's your risk tolerance for insurance?
                </Label>
                <RadioGroup
                  value={formData.riskTolerance}
                  onValueChange={(value) =>
                    handleInputChange("riskTolerance", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <Label htmlFor="conservative">
                      Conservative - Maximum coverage, higher premiums
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate-risk" />
                    <Label htmlFor="moderate-risk">
                      Moderate - Balanced coverage and cost
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <Label htmlFor="aggressive">
                      Aggressive - Basic coverage, lower premiums
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Information</CardTitle>
              <CardDescription>
                Please review your information before we calculate your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Life Stage:</span>
                    <span className="font-medium">{formData.lifeStage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dependents:</span>
                    <span className="font-medium">{formData.dependents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Annual Income:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(formData.annualIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Outstanding Debts:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(formData.outstandingDebts)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Health Status:
                    </span>
                    <span className="font-medium">{formData.healthStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Car Value:</span>
                    <span className="font-medium">
                      {formatCurrency(formData.carValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Value:</span>
                    <span className="font-medium">
                      {formatCurrency(formData.homeValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Travel Frequency:
                    </span>
                    <span className="font-medium">
                      {formData.travelFrequency}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    const needs = calculateNeeds();

    const coverageAnalysis = [
      {
        type: "Life Insurance",
        icon: Shield,
        current: currentCoverage.lifeInsurance,
        recommended: needs.lifeInsurance,
        gap: needs.lifeInsurance - currentCoverage.lifeInsurance,
        color:
          needs.lifeInsurance > currentCoverage.lifeInsurance
            ? "text-red-600"
            : "text-green-600",
      },
      {
        type: "Critical Illness",
        icon: Heart,
        current: currentCoverage.criticalIllness,
        recommended: needs.criticalIllness,
        gap: needs.criticalIllness - currentCoverage.criticalIllness,
        color:
          needs.criticalIllness > currentCoverage.criticalIllness
            ? "text-red-600"
            : "text-green-600",
      },
      {
        type: "Medical Insurance",
        icon: Heart,
        current: currentCoverage.medicalInsurance,
        recommended: needs.medicalInsurance,
        gap: needs.medicalInsurance - currentCoverage.medicalInsurance,
        color:
          needs.medicalInsurance > currentCoverage.medicalInsurance
            ? "text-red-600"
            : "text-green-600",
      },
      {
        type: "Personal Accident",
        icon: Shield,
        current: currentCoverage.personalAccident,
        recommended: needs.personalAccident,
        gap: needs.personalAccident - currentCoverage.personalAccident,
        color:
          needs.personalAccident > currentCoverage.personalAccident
            ? "text-red-600"
            : "text-green-600",
      },
      {
        type: "Motor Insurance",
        icon: Car,
        current: currentCoverage.motor,
        recommended: needs.motor,
        gap: needs.motor - currentCoverage.motor,
        color:
          needs.motor > currentCoverage.motor
            ? "text-red-600"
            : "text-green-600",
      },
      {
        type: "Home Insurance",
        icon: Home,
        current: currentCoverage.home,
        recommended: needs.home,
        gap: needs.home - currentCoverage.home,
        color:
          needs.home > currentCoverage.home ? "text-red-600" : "text-green-600",
      },
    ];

    const totalGap = coverageAnalysis.reduce(
      (sum, item) => sum + Math.max(0, item.gap),
      0
    );
    const adequateCoverage = coverageAnalysis.filter(
      (item) => item.gap <= 0
    ).length;
    const totalCategories = coverageAnalysis.length;

    return (
      <div className="space-y-6">
        {/* Overall Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Your Insurance Needs Assessment
            </CardTitle>
            <CardDescription>
              Based on your financial situation and lifestyle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round((adequateCoverage / totalCategories) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Coverage Adequacy
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {formatCurrency(totalGap)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Coverage Gap
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {adequateCoverage}
                </div>
                <div className="text-sm text-muted-foreground">
                  Adequate Categories
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage Gap Analysis</CardTitle>
            <CardDescription>
              Comparison of your current coverage vs. recommended coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coverageAnalysis.map((item, index) => {
                const Icon = item.icon;
                const coveragePercentage =
                  item.recommended > 0
                    ? (item.current / item.recommended) * 100
                    : 100;

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className={`font-bold ${item.color}`}>
                        {item.gap > 0
                          ? `+${formatCurrency(item.gap)}`
                          : item.gap < 0
                          ? `${formatCurrency(item.gap)}`
                          : "Adequate"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium">
                          {formatCurrency(item.current)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Recommended:{" "}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(item.recommended)}
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={Math.min(coveragePercentage, 100)}
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coverageAnalysis
                .filter((item) => item.gap > 0)
                .map((item, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{item.type}:</strong> Consider increasing your
                      coverage by {formatCurrency(item.gap)}
                      {item.type === "Life Insurance" &&
                        " to ensure your family's financial security."}
                      {item.type === "Critical Illness" &&
                        " to cover potential medical expenses and income replacement."}
                      {item.type === "Medical Insurance" &&
                        " for better healthcare coverage."}
                      {item.type === "Personal Accident" &&
                        " to protect against unexpected accidents."}
                      {item.type === "Home Insurance" &&
                        " to protect your property investment."}
                    </AlertDescription>
                  </Alert>
                ))}

              {formData.lifestyle === "high-risk" && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Given your active lifestyle with high-risk activities,
                    consider specialized personal accident coverage that
                    includes extreme sports and adventure activities.
                  </AlertDescription>
                </Alert>
              )}

              {formData.travelFrequency === "frequent" && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    As a frequent traveler, consider an annual travel insurance
                    policy instead of per-trip coverage for better value and
                    convenience.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                Explore Insurance Quotes
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Shield className="h-6 w-6 mb-2" />
                Learn More About Coverage
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calculator className="h-6 w-6 mb-2" />
                Save Assessment Results
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Info className="h-6 w-6 mb-2" />
                Consult with Agent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowResults(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold">
                Insurance Needs Assessment Results
              </h2>
              <p className="text-muted-foreground">
                Your personalized insurance recommendations
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Overview
          </Button>
        </div>
        {renderResults()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Insurance Needs Assessment</h2>
            <p className="text-muted-foreground">
              Help us understand your needs to provide personalized
              recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={nextStep}>
          {currentStep === totalSteps ? "Calculate My Needs" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
