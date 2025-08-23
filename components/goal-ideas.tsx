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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  GraduationCap,
  Heart,
  Home,
  Plane,
  Plus,
  Search,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
} from "lucide-react";

interface GoalIdeasProps {
  onBack?: () => void;
  onCreateFromTemplate?: (template: any) => void;
}

export function GoalIdeas({ onBack, onCreateFromTemplate }: GoalIdeasProps) {
  const goalTemplates = {
    shortTerm: [
      {
        id: "emergency-fund",
        name: "Emergency Fund",
        icon: Shield,
        description: "Build a safety net for unexpected expenses",
        suggestedAmount: "15,000 - 30,000",
        duration: "6-12 months",
        malaysianContext: "3-6 months of living expenses (Average: RM 20,000)",
        priority: "High",
        category: "Safety",
        tips: [
          "Start with RM 1,000 as your initial target",
          "Aim for 3-6 months of essential expenses",
          "Keep in high-yield savings account for easy access",
        ],
      },
      {
        id: "vacation-fund",
        name: "Dream Holiday",
        icon: Plane,
        description: "Save for your next adventure",
        suggestedAmount: "5,000 - 15,000",
        duration: "6-18 months",
        malaysianContext: "Japan trip: RM 8,000, Europe: RM 12,000",
        priority: "Medium",
        category: "Travel",
        tips: [
          "Research destination costs early",
          "Book flights and accommodation in advance",
          "Consider travel insurance costs",
        ],
      },
      {
        id: "gadget-upgrade",
        name: "Tech Upgrade Fund",
        icon: Smartphone,
        description: "Save for the latest gadgets and technology",
        suggestedAmount: "2,000 - 8,000",
        duration: "3-12 months",
        malaysianContext: "iPhone: RM 4,000, MacBook: RM 6,000",
        priority: "Low",
        category: "Technology",
        tips: [
          "Wait for sales and promotions",
          "Consider refurbished options",
          "Trade in old devices for better value",
        ],
      },
    ],
    mediumTerm: [
      {
        id: "house-deposit",
        name: "First Home Down Payment",
        icon: Home,
        description: "Save for your dream home down payment",
        suggestedAmount: "50,000 - 150,000",
        duration: "2-5 years",
        malaysianContext: "KL condo: RM 80,000, Landed property: RM 120,000",
        priority: "High",
        category: "Housing",
        tips: [
          "Research different areas and property types",
          "Factor in legal fees and stamp duty",
          "Consider government schemes like PR1MA",
        ],
      },
      {
        id: "car-fund",
        name: "Car Purchase Fund",
        icon: Car,
        description: "Save for a new or used vehicle",
        suggestedAmount: "30,000 - 100,000",
        duration: "1-3 years",
        malaysianContext: "Used car: RM 40,000, New Myvi: RM 55,000",
        priority: "Medium",
        category: "Transportation",
        tips: [
          "Consider total cost of ownership",
          "Factor in insurance and maintenance",
          "Explore hire purchase options",
        ],
      },
      {
        id: "wedding-fund",
        name: "Wedding Fund",
        icon: Heart,
        description: "Plan and save for your special day",
        suggestedAmount: "20,000 - 80,000",
        duration: "1-3 years",
        malaysianContext: "Simple wedding: RM 30,000, Grand wedding: RM 60,000",
        priority: "High",
        category: "Life Events",
        tips: [
          "Set priorities for must-haves vs nice-to-haves",
          "Book venues early for better rates",
          "Consider off-peak dates for savings",
        ],
      },
    ],
    longTerm: [
      {
        id: "child-education",
        name: "Child's Education Fund",
        icon: GraduationCap,
        description: "Secure your child's educational future",
        suggestedAmount: "100,000 - 300,000",
        duration: "10-18 years",
        malaysianContext: "Local university: RM 150,000, Overseas: RM 250,000",
        priority: "High",
        category: "Education",
        tips: [
          "Start early to benefit from compound growth",
          "Consider education insurance plans",
          "Look into government education savings schemes",
        ],
      },
      {
        id: "retirement-fund",
        name: "Early Retirement Fund",
        icon: Shield,
        description: "Build wealth for financial independence",
        suggestedAmount: "500,000 - 2,000,000",
        duration: "15-30 years",
        malaysianContext: "Comfortable retirement: RM 1,000,000+",
        priority: "High",
        category: "Retirement",
        tips: [
          "Maximize EPF contributions",
          "Consider PRS for tax benefits",
          "Diversify with investments and properties",
        ],
      },
      {
        id: "business-fund",
        name: "Business Startup Fund",
        icon: TrendingUp,
        description: "Capital for starting your own business",
        suggestedAmount: "50,000 - 500,000",
        duration: "2-10 years",
        malaysianContext: "Small business: RM 100,000, Franchise: RM 200,000",
        priority: "Medium",
        category: "Business",
        tips: [
          "Research your industry thoroughly",
          "Create a detailed business plan",
          "Consider government grants and loans",
        ],
      },
    ],
  };

  const popularGoals = [
    { name: "Emergency Fund", count: "89% of users", trend: "up" },
    { name: "House Down Payment", count: "67% of users", trend: "up" },
    { name: "Holiday Fund", count: "54% of users", trend: "stable" },
    { name: "Car Fund", count: "43% of users", trend: "up" },
    { name: "Wedding Fund", count: "32% of users", trend: "stable" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "outline";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const renderGoalTemplate = (template: any) => {
    const Icon = template.icon;
    return (
      <Card key={template.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-xs">
                  {template.category}
                </CardDescription>
              </div>
            </div>
            <Badge variant={getPriorityColor(template.priority) as any}>
              {template.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">{template.description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-sm font-semibold">
                RM {template.suggestedAmount}
              </div>
              <div className="text-xs text-muted-foreground">
                Suggested Amount
              </div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-sm font-semibold">{template.duration}</div>
              <div className="text-xs text-muted-foreground">
                Typical Duration
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-sm mb-1 text-blue-800">
              Malaysian Context
            </h5>
            <p className="text-xs text-blue-700">{template.malaysianContext}</p>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2">Tips for Success</h5>
            <ul className="space-y-1">
              {template.tips.slice(0, 2).map((tip: string, index: number) => (
                <li
                  key={index}
                  className="text-xs text-gray-600 flex items-start"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full"
            size="sm"
            onClick={() => onCreateFromTemplate?.(template)}
          >
            <Plus className="h-3 w-3 mr-2" />
            Create This Goal
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">Goal Ideas & Templates</h1>
            <p className="text-muted-foreground">
              Get inspired and start your financial journey
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Goal
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search goal ideas..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Popular Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-600" />
            <span>Popular Goals Among Malaysian Users</span>
          </CardTitle>
          <CardDescription>
            See what goals others are working towards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularGoals.map((goal, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{goal.name}</span>
                  <div className="flex items-center space-x-1">
                    {goal.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <div className="w-3 h-3" />
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {goal.count}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goal Templates by Category */}
      <Tabs defaultValue="shortTerm" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shortTerm">Short-Term (0-2 years)</TabsTrigger>
          <TabsTrigger value="mediumTerm">Medium-Term (2-5 years)</TabsTrigger>
          <TabsTrigger value="longTerm">Long-Term (5+ years)</TabsTrigger>
        </TabsList>

        <TabsContent value="shortTerm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalTemplates.shortTerm.map(renderGoalTemplate)}
          </div>
        </TabsContent>

        <TabsContent value="mediumTerm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalTemplates.mediumTerm.map(renderGoalTemplate)}
          </div>
        </TabsContent>

        <TabsContent value="longTerm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalTemplates.longTerm.map(renderGoalTemplate)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <span>Goal Setting Resources</span>
          </CardTitle>
          <CardDescription>
            Learn how to set and achieve your financial goals effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                How Much Emergency Fund Do I Need?
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Learn the Malaysian context for emergency funds and how to
                calculate the right amount for your situation.
              </p>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                House Buying Guide for First-Time Buyers
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Complete guide to buying your first home in Malaysia, including
                down payment requirements and costs.
              </p>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                Smart Ways to Save for Your Goals
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Discover effective saving strategies and investment options to
                reach your goals faster.
              </p>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Goal Setting Psychology</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Understand the psychology behind successful goal achievement and
                how to stay motivated.
              </p>
              <Button variant="outline" size="sm">
                Read Article
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
