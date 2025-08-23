"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calculator,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Receipt,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";

interface TaxPreparationProps {
  onBack?: () => void;
}

export function TaxPreparation({ onBack }: TaxPreparationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    // Personal Information
    maritalStatus: "",
    dependents: 0,
    spouseName: "",

    // Employment Income
    employmentIncome: 85000,
    pcbWithheld: 12500,
    bonuses: 8000,

    // Other Income
    rentalIncome: 12000,
    dividendIncome: 2500,
    freelanceIncome: 0,

    // Reliefs
    lifestyle: 2800,
    medical: 1200,
    education: 4500,
    sports: 300,
    books: 800,
    prs: 0,
    epf: 0,

    // Zakat
    zakatAmount: 0,
  });

  const [reliefTransactions] = useState({
    lifestyle: [
      {
        date: "2024-01-15",
        merchant: "Popular Bookstore",
        amount: 45,
        category: "Books",
      },
      {
        date: "2024-02-20",
        merchant: "Fitness First",
        amount: 150,
        category: "Gym Membership",
      },
      {
        date: "2024-03-10",
        merchant: "Guardian Pharmacy",
        amount: 85,
        category: "Health Products",
      },
    ],
    medical: [
      {
        date: "2024-01-25",
        merchant: "Gleneagles Hospital",
        amount: 450,
        category: "Medical Treatment",
      },
      {
        date: "2024-02-15",
        merchant: "Pharmacy",
        amount: 120,
        category: "Prescription",
      },
    ],
    education: [
      {
        date: "2024-01-05",
        merchant: "University Malaya",
        amount: 2500,
        category: "Tuition Fees",
      },
      {
        date: "2024-02-01",
        merchant: "Coursera",
        amount: 200,
        category: "Online Course",
      },
    ],
  });

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Employment Income", icon: Briefcase },
    { id: 3, title: "Other Income", icon: DollarSign },
    { id: 4, title: "Reliefs & Deductions", icon: Receipt },
    { id: 5, title: "Zakat & Others", icon: FileText },
    { id: 6, title: "Review & Summary", icon: Calculator },
  ];

  const reliefLimits = {
    lifestyle: 2500,
    medical: 8000,
    education: 7000,
    sports: 300,
    books: 1000,
    prs: 3000,
    epf: 4000,
  };

  const calculateTax = () => {
    const totalIncome =
      formData.employmentIncome +
      formData.bonuses +
      formData.rentalIncome +
      formData.dividendIncome +
      formData.freelanceIncome;
    const totalReliefs =
      Math.min(formData.lifestyle, reliefLimits.lifestyle) +
      Math.min(formData.medical, reliefLimits.medical) +
      Math.min(formData.education, reliefLimits.education) +
      Math.min(formData.sports, reliefLimits.sports) +
      Math.min(formData.books, reliefLimits.books) +
      Math.min(formData.prs, reliefLimits.prs) +
      Math.min(formData.epf, reliefLimits.epf);

    const chargeableIncome = Math.max(0, totalIncome - totalReliefs - 9000); // Personal relief RM 9,000

    // Simplified tax calculation (actual rates are more complex)
    let tax = 0;
    if (chargeableIncome > 0) {
      if (chargeableIncome <= 5000) tax = 0;
      else if (chargeableIncome <= 20000)
        tax = (chargeableIncome - 5000) * 0.01;
      else if (chargeableIncome <= 35000)
        tax = 150 + (chargeableIncome - 20000) * 0.03;
      else if (chargeableIncome <= 50000)
        tax = 600 + (chargeableIncome - 35000) * 0.08;
      else if (chargeableIncome <= 70000)
        tax = 1800 + (chargeableIncome - 50000) * 0.13;
      else if (chargeableIncome <= 100000)
        tax = 4400 + (chargeableIncome - 70000) * 0.21;
      else tax = 10700 + (chargeableIncome - 100000) * 0.24;
    }

    const zakatRebate = Math.min(formData.zakatAmount, tax);
    const finalTax = Math.max(0, tax - zakatRebate);

    return {
      totalIncome,
      totalReliefs,
      chargeableIncome,
      tax: finalTax,
      zakatRebate,
      refund: Math.max(0, formData.pcbWithheld - finalTax),
      payable: Math.max(0, finalTax - formData.pcbWithheld),
    };
  };

  const taxCalculation = calculateTax();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, maritalStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependents">Number of Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  value={formData.dependents}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dependents: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            {formData.maritalStatus === "married" && (
              <div className="space-y-2">
                <Label htmlFor="spouseName">Spouse Name</Label>
                <Input
                  id="spouseName"
                  value={formData.spouseName}
                  onChange={(e) =>
                    setFormData({ ...formData, spouseName: e.target.value })
                  }
                />
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">
                    Dependent Details Detected
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    We detected {formData.dependents} children. Confirm their
                    eligibility for tax relief.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentIncome">Employment Income (RM)</Label>
                <Input
                  id="employmentIncome"
                  type="number"
                  value={formData.employmentIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employmentIncome: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Auto-populated from payroll data
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pcbWithheld">PCB Withheld (RM)</Label>
                <Input
                  id="pcbWithheld"
                  type="number"
                  value={formData.pcbWithheld}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pcbWithheld: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bonuses">Bonuses & Allowances (RM)</Label>
              <Input
                id="bonuses"
                type="number"
                value={formData.bonuses}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bonuses: Number.parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <Card className="bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Total Employment Income</h4>
                    <p className="text-sm text-muted-foreground">
                      Including bonuses and allowances
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      RM{" "}
                      {(
                        formData.employmentIncome + formData.bonuses
                      ).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PCB: RM {formData.pcbWithheld.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentalIncome">Rental Income (RM)</Label>
                <Input
                  id="rentalIncome"
                  type="number"
                  value={formData.rentalIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rentalIncome: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dividendIncome">Dividend Income (RM)</Label>
                <Input
                  id="dividendIncome"
                  type="number"
                  value={formData.dividendIncome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dividendIncome: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="freelanceIncome">
                Freelance/Business Income (RM)
              </Label>
              <Input
                id="freelanceIncome"
                type="number"
                value={formData.freelanceIncome}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    freelanceIncome: Number.parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            {formData.rentalIncome > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">
                      Rental Income Transactions
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Review your 'Rental Income' transactions – total RM{" "}
                      {formData.rentalIncome.toLocaleString()}. Any missing?
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(reliefLimits).map(([key, limit]) => (
                <Card key={key}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()} Relief
                    </CardTitle>
                    <CardDescription>
                      Maximum: RM {limit.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={key}>Amount (RM)</Label>
                        <Input
                          id={key}
                          type="number"
                          value={
                            formData[key as keyof typeof formData] as number
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [key]: Number.parseFloat(e.target.value) || 0,
                            })
                          }
                        />
                      </div>

                      <Progress
                        value={Math.min(
                          ((formData[key as keyof typeof formData] as number) /
                            limit) *
                            100,
                          100
                        )}
                        className="h-2"
                      />

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Used: RM{" "}
                          {Math.min(
                            formData[key as keyof typeof formData] as number,
                            limit
                          ).toLocaleString()}
                        </span>
                        <span>
                          Available: RM{" "}
                          {Math.max(
                            0,
                            limit -
                              (formData[key as keyof typeof formData] as number)
                          ).toLocaleString()}
                        </span>
                      </div>

                      {reliefTransactions[
                        key as keyof typeof reliefTransactions
                      ] && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Receipt className="h-3 w-3 mr-1" />
                            View{" "}
                            {
                              reliefTransactions[
                                key as keyof typeof reliefTransactions
                              ].length
                            }{" "}
                            Transactions
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-orange-50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">
                      Maximize Your Reliefs
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      You're RM 50 short of maximizing your lifestyle relief.
                      Consider a qualifying purchase!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zakatAmount">Zakat Payment (RM)</Label>
                <Input
                  id="zakatAmount"
                  type="number"
                  value={formData.zakatAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      zakatAmount: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Eligible for tax rebate (dollar-for-dollar reduction)
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Upload Supporting Documents
                </CardTitle>
                <CardDescription>
                  Attach receipts and documents for your reliefs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Medical Receipts
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Education Receipts
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Other Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Summary</CardTitle>
                <CardDescription>
                  Review your tax calculation for {new Date().getFullYear()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Income
                      </p>
                      <p className="font-medium">
                        RM {taxCalculation.totalIncome.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Reliefs
                      </p>
                      <p className="font-medium">
                        RM {taxCalculation.totalReliefs.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Chargeable Income
                      </p>
                      <p className="font-medium">
                        RM {taxCalculation.chargeableIncome.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tax Before Rebate
                      </p>
                      <p className="font-medium">
                        RM{" "}
                        {(
                          taxCalculation.tax + taxCalculation.zakatRebate
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Zakat Rebate
                      </p>
                      <p className="font-medium">
                        RM {taxCalculation.zakatRebate.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Final Tax</p>
                      <p className="font-medium">
                        RM {taxCalculation.tax.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">PCB Withheld</h4>
                        <p className="text-sm text-muted-foreground">
                          Tax already paid
                        </p>
                      </div>
                      <p className="text-lg font-bold">
                        RM {formData.pcbWithheld.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      taxCalculation.refund > 0 ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          {taxCalculation.refund > 0
                            ? "Expected Refund"
                            : "Additional Tax Payable"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {taxCalculation.refund > 0
                            ? "You will receive a refund"
                            : "You need to pay additional tax"}
                        </p>
                      </div>
                      <p
                        className={`text-xl font-bold ${
                          taxCalculation.refund > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        RM{" "}
                        {(taxCalculation.refund > 0
                          ? taxCalculation.refund
                          : taxCalculation.payable
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Final Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dependents-check" />
                    <Label htmlFor="dependents-check" className="text-sm">
                      Are you sure you've included all your dependents?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="income-check" />
                    <Label htmlFor="income-check" className="text-sm">
                      Have you included all sources of income?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="receipts-check" />
                    <Label htmlFor="receipts-check" className="text-sm">
                      Have you uploaded all supporting receipts?
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Generate LHDN Summary Report
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

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
            <h2 className="text-xl font-bold">Tax Preparation</h2>
            <p className="text-sm text-muted-foreground">
              Step-by-step tax filing preparation
            </p>
          </div>
        </div>
        <Badge variant="outline">Tax Year 2024</Badge>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />

          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center space-y-2"
              >
                <div
                  className={`p-2 rounded-full ${
                    currentStep >= step.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center max-w-16">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "h-5 w-5",
            })}
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
