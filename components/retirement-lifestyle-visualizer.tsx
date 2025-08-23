"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  Car,
  CheckCircle,
  Heart,
  Home,
  MapPin,
  Plane,
  Save,
  TrendingDown,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";

interface RetirementLifestyleVisualizerProps {
  onBack?: () => void;
}

interface LifestyleItem {
  id: string;
  category: string;
  title: string;
  description: string;
  annualCost: number;
  selected: boolean;
  icon: React.ReactNode;
}

export function RetirementLifestyleVisualizer({
  onBack,
}: RetirementLifestyleVisualizerProps) {
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState(60000);
  const [projectedAnnualIncome] = useState(42500);
  const [selectedRegion, setSelectedRegion] = useState("klang-valley");

  const [lifestyleItems, setLifestyleItems] = useState<LifestyleItem[]>([
    // Housing
    {
      id: "housing-owned",
      category: "Housing",
      title: "Living in own paid-off home",
      description: "Maintenance, utilities, property tax only",
      annualCost: 8000,
      selected: true,
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: "housing-condo",
      category: "Housing",
      title: "Renting small condo in suburban area",
      description: "Monthly rent + utilities",
      annualCost: 18000,
      selected: false,
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: "housing-city",
      category: "Housing",
      title: "Renting large apartment in city center",
      description: "Premium location with amenities",
      annualCost: 36000,
      selected: false,
      icon: <Home className="h-5 w-5" />,
    },

    // Food & Dining
    {
      id: "food-basic",
      category: "Food & Dining",
      title: "Cooking at home, occasional hawker food",
      description: "Groceries + occasional dining out",
      annualCost: 12000,
      selected: true,
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      id: "food-moderate",
      category: "Food & Dining",
      title: "Regular dining at mid-range restaurants",
      description: "Mix of home cooking and dining out",
      annualCost: 24000,
      selected: false,
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      id: "food-premium",
      category: "Food & Dining",
      title: "Frequent fine dining & premium groceries",
      description: "High-end restaurants and organic foods",
      annualCost: 48000,
      selected: false,
      icon: <Utensils className="h-5 w-5" />,
    },

    // Healthcare
    {
      id: "healthcare-basic",
      category: "Healthcare",
      title: "Basic public healthcare only",
      description: "Government hospitals and clinics",
      annualCost: 3000,
      selected: true,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: "healthcare-private",
      category: "Healthcare",
      title: "Private health insurance + some private care",
      description: "Insurance premiums + co-payments",
      annualCost: 8000,
      selected: false,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: "healthcare-comprehensive",
      category: "Healthcare",
      title: "Comprehensive private healthcare",
      description: "Premium insurance + private specialists",
      annualCost: 15000,
      selected: false,
      icon: <Heart className="h-5 w-5" />,
    },

    // Transport
    {
      id: "transport-basic",
      category: "Transport",
      title: "Basic car + occasional Grab/public transport",
      description: "Fuel, maintenance, insurance, parking",
      annualCost: 6000,
      selected: true,
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "transport-premium",
      category: "Transport",
      title: "Premium car + frequent Grab/taxis",
      description: "Higher car costs + regular ride-hailing",
      annualCost: 15000,
      selected: false,
      icon: <Car className="h-5 w-5" />,
    },
    {
      id: "transport-public",
      category: "Transport",
      title: "No car, public transport/Grab only",
      description: "MRT, bus, Grab for daily transport",
      annualCost: 4000,
      selected: false,
      icon: <Car className="h-5 w-5" />,
    },

    // Travel
    {
      id: "travel-domestic",
      category: "Travel",
      title: "Domestic travel only (2-3 times/year)",
      description: "Local destinations within Malaysia",
      annualCost: 5000,
      selected: true,
      icon: <Plane className="h-5 w-5" />,
    },
    {
      id: "travel-regional",
      category: "Travel",
      title: "Annual regional trips (ASEAN)",
      description: "Thailand, Singapore, Indonesia trips",
      annualCost: 12000,
      selected: false,
      icon: <Plane className="h-5 w-5" />,
    },
    {
      id: "travel-international",
      category: "Travel",
      title: "Annual international trips (Europe, Japan)",
      description: "Long-haul international destinations",
      annualCost: 25000,
      selected: false,
      icon: <Plane className="h-5 w-5" />,
    },

    // Family Support
    {
      id: "family-occasional",
      category: "Family Support",
      title: "Occasional assistance for children/grandchildren",
      description: "Gifts, emergency help, celebrations",
      annualCost: 6000,
      selected: true,
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "family-regular",
      category: "Family Support",
      title: "Regular financial support for dependents",
      description: "Monthly allowances for family members",
      annualCost: 18000,
      selected: false,
      icon: <Users className="h-5 w-5" />,
    },
  ]);

  const regions = [
    { id: "klang-valley", name: "Klang Valley", multiplier: 1.0 },
    { id: "penang", name: "Penang", multiplier: 0.85 },
    { id: "johor-bahru", name: "Johor Bahru", multiplier: 0.8 },
    { id: "ipoh", name: "Ipoh", multiplier: 0.7 },
    { id: "kuching", name: "Kuching", multiplier: 0.75 },
    { id: "kota-kinabalu", name: "Kota Kinabalu", multiplier: 0.8 },
  ];

  const selectedRegionData =
    regions.find((r) => r.id === selectedRegion) || regions[0];

  const toggleLifestyleItem = (itemId: string) => {
    setLifestyleItems((items) => {
      const clickedItem = items.find((item) => item.id === itemId);
      if (!clickedItem) return items;

      return items.map((item) => {
        // If this is the clicked item, toggle it
        if (item.id === itemId) {
          return { ...item, selected: !item.selected };
        }
        // If this is in the same category as the clicked item and the clicked item is being selected, deselect this one
        if (item.category === clickedItem.category && !clickedItem.selected) {
          return { ...item, selected: false };
        }
        // Otherwise, keep the item as is
        return item;
      });
    });
  };

  const calculateTotalCost = () => {
    return lifestyleItems
      .filter((item) => item.selected)
      .reduce(
        (total, item) =>
          total + item.annualCost * selectedRegionData.multiplier,
        0
      );
  };

  const totalLifestyleCost = calculateTotalCost();
  const surplus = projectedAnnualIncome - totalLifestyleCost;
  const isAffordable = surplus >= 0;

  const groupedItems = lifestyleItems.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, LifestyleItem[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Housing":
        return <Home className="h-5 w-5" />;
      case "Food & Dining":
        return <Utensils className="h-5 w-5" />;
      case "Healthcare":
        return <Heart className="h-5 w-5" />;
      case "Transport":
        return <Car className="h-5 w-5" />;
      case "Travel":
        return <Plane className="h-5 w-5" />;
      case "Family Support":
        return <Users className="h-5 w-5" />;
      default:
        return <Calculator className="h-5 w-5" />;
    }
  };

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
            <h1 className="text-2xl font-bold">
              Retirement Lifestyle Visualizer
            </h1>
            <p className="text-muted-foreground">
              Design your ideal retirement lifestyle and see what it costs
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save This Lifestyle
          </Button>
          <Button>
            <Calculator className="h-4 w-4 mr-2" />
            Go Back to Plan
          </Button>
        </div>
      </div>

      {/* Income Target & Region Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Desired Annual Retirement Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="income-target">Annual Income Target (RM)</Label>
                <Input
                  id="income-target"
                  type="number"
                  value={desiredAnnualIncome}
                  onChange={(e) =>
                    setDesiredAnnualIncome(Number.parseInt(e.target.value) || 0)
                  }
                  className="mt-2"
                />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  Your projected annual income
                </div>
                <div className="text-xl font-bold text-blue-600">
                  RM {projectedAnnualIncome.toLocaleString("en-MY")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Retirement Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="region">Select Region</Label>
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  Cost adjustment for {selectedRegionData.name}
                </div>
                <div className="text-xl font-bold text-green-600">
                  {selectedRegionData.multiplier === 1.0
                    ? "Baseline"
                    : `${(selectedRegionData.multiplier * 100).toFixed(
                        0
                      )}% of Klang Valley costs`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lifestyle Cost Summary */}
      <Card
        className={`${
          isAffordable
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                RM{" "}
                {totalLifestyleCost.toLocaleString("en-MY", {
                  minimumFractionDigits: 0,
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Annual Lifestyle Cost
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                in {selectedRegionData.name}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                RM {projectedAnnualIncome.toLocaleString("en-MY")}
              </div>
              <div className="text-sm text-muted-foreground">
                Projected Annual Income
              </div>
            </div>

            <div className="text-center">
              <div
                className={`text-3xl font-bold mb-2 ${
                  isAffordable ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAffordable ? (
                  <>
                    <TrendingUp className="h-6 w-6 inline mr-2" />
                    +RM {surplus.toLocaleString("en-MY")}
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-6 w-6 inline mr-2" />
                    -RM {Math.abs(surplus).toLocaleString("en-MY")}
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {isAffordable ? "Annual Surplus" : "Annual Shortfall"}
              </div>
            </div>
          </div>

          {!isAffordable && (
            <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">
                    Lifestyle Adjustment Needed
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    To afford this lifestyle, you'll need to save an extra{" "}
                    <span className="font-bold">
                      RM{" "}
                      {Math.ceil(Math.abs(surplus) / 12).toLocaleString(
                        "en-MY"
                      )}
                    </span>{" "}
                    per month or consider adjusting your retirement timeline.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isAffordable && (
            <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">
                    Great! Your lifestyle is affordable
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    You have a comfortable surplus that can provide additional
                    security or allow for lifestyle upgrades.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lifestyle Categories */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getCategoryIcon(category)}
                <span>{category}</span>
                <Badge variant="outline">
                  RM{" "}
                  {items
                    .filter((item) => item.selected)
                    .reduce(
                      (sum, item) =>
                        sum + item.annualCost * selectedRegionData.multiplier,
                      0
                    )
                    .toLocaleString("en-MY", { minimumFractionDigits: 0 })}{" "}
                  / year
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all ${
                      item.selected
                        ? "border-blue-500 bg-blue-50"
                        : "hover:shadow-md hover:border-gray-300"
                    }`}
                    onClick={() => toggleLifestyleItem(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            item.selected ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          <div className="text-lg font-bold text-blue-600">
                            RM{" "}
                            {(
                              item.annualCost * selectedRegionData.multiplier
                            ).toLocaleString("en-MY", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            per year
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Educational Insights */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Retirement Planning Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Healthcare Cost Reality
                </h4>
                <p className="text-sm text-blue-800">
                  Healthcare costs typically increase by 6-8% annually after age
                  65. Consider comprehensive coverage early.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">
                  Regional Cost Savings
                </h4>
                <p className="text-sm text-green-800">
                  A moderate lifestyle costs RM{" "}
                  {(45000 * selectedRegionData.multiplier).toLocaleString(
                    "en-MY"
                  )}{" "}
                  in {selectedRegionData.name}, compared to RM 45,000 in Klang
                  Valley.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">
                  Inflation Impact
                </h4>
                <p className="text-sm text-purple-800">
                  Your RM {totalLifestyleCost.toLocaleString("en-MY")} lifestyle
                  today will cost approximately RM{" "}
                  {(totalLifestyleCost * 1.6).toLocaleString("en-MY")} in 15
                  years at 3% inflation.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">
                  Expense Reduction Tips
                </h4>
                <p className="text-sm text-orange-800">
                  Consider downsizing housing, relocating to lower-cost areas,
                  or optimizing transport choices to reduce expenses.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
