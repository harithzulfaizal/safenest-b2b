"use client";

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
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  CheckCircle,
  Edit,
  GripVertical,
  Lightbulb,
  Pause,
  Play,
  Plus,
  TestTube,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface CategorizationRulesProps {
  onBack?: () => void;
}

export function CategorizationRules({ onBack }: CategorizationRulesProps) {
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "contains",
    value: "",
    category: "",
    account: "all",
    applyToPast: false,
  });

  const existingRules = [
    {
      id: "1",
      name: "Tesco Groceries",
      description: "Transactions from 'Tesco' are 'Groceries'",
      condition: "Merchant contains 'Tesco'",
      action: "Set Category to 'Groceries'",
      appliedCount: 24,
      status: "active",
      account: "All Accounts",
      priority: 1,
    },
    {
      id: "2",
      name: "GrabFood Delivery",
      description: "Transactions from 'GrabFood' are 'Food Delivery'",
      condition: "Merchant contains 'Grab'",
      action: "Set Category to 'Food Delivery'",
      appliedCount: 18,
      status: "active",
      account: "All Accounts",
      priority: 2,
    },
    {
      id: "3",
      name: "Shell Fuel",
      description: "Transactions from 'Shell' are 'Fuel'",
      condition: "Merchant contains 'Shell'",
      action: "Set Category to 'Fuel'",
      appliedCount: 12,
      status: "active",
      account: "Maybank Savings",
      priority: 3,
    },
    {
      id: "4",
      name: "Netflix Subscription",
      description: "Transactions from 'Netflix' are 'Entertainment'",
      condition: "Merchant equals 'Netflix'",
      action: "Set Category to 'Entertainment'",
      appliedCount: 6,
      status: "paused",
      account: "AmEx Business",
      priority: 4,
    },
  ];

  const suggestedRules = [
    {
      id: "suggest-1",
      merchant: "Starbucks",
      category: "Coffee",
      frequency: 8,
      confidence: "High",
      description: "You frequently categorize 'Starbucks' as 'Coffee'",
    },
    {
      id: "suggest-2",
      merchant: "Shopee",
      category: "Online Shopping",
      frequency: 5,
      confidence: "Medium",
      description: "You frequently categorize 'Shopee' as 'Online Shopping'",
    },
    {
      id: "suggest-3",
      merchant: "Maxis",
      category: "Utilities",
      frequency: 12,
      confidence: "High",
      description: "You frequently categorize 'Maxis' as 'Utilities'",
    },
  ];

  const testExamples = [
    {
      description: "TESCO STORES 4523 KUALA LUMPUR MY",
      amount: -125.45,
      wouldMatch: true,
    },
    {
      description: "TESCO EXPRESS PETALING JAYA MY",
      amount: -45.6,
      wouldMatch: true,
    },
    {
      description: "TESLA SUPERCHARGER STATION",
      amount: -25.0,
      wouldMatch: false,
    },
  ];

  const handleCreateRule = () => {
    // Logic to create new rule
    console.log("Creating rule:", newRule);
    setShowCreateRule(false);
    setNewRule({
      name: "",
      condition: "contains",
      value: "",
      category: "",
      account: "all",
      applyToPast: false,
    });
  };

  const handleTestRule = () => {
    // Logic to test rule against historical transactions
    console.log("Testing rule:", newRule);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Transactions
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Categorization Rules</h1>
            <p className="text-muted-foreground">
              Automate transaction categorization with smart rules
            </p>
          </div>
        </div>
        <Button onClick={() => setShowCreateRule(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Create Rule Form */}
      {showCreateRule && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Create New Categorization Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Rule Name</Label>
                <Input
                  placeholder="e.g., Tesco Groceries"
                  value={newRule.name}
                  onChange={(e) =>
                    setNewRule({ ...newRule, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={newRule.category}
                  onValueChange={(value) =>
                    setNewRule({ ...newRule, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="food-delivery">Food Delivery</SelectItem>
                    <SelectItem value="fuel">Fuel</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Condition</Label>
                <Select
                  value={newRule.condition}
                  onValueChange={(value) =>
                    setNewRule({ ...newRule, condition: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="starts-with">Starts with</SelectItem>
                    <SelectItem value="ends-with">Ends with</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  placeholder="e.g., Tesco"
                  value={newRule.value}
                  onChange={(e) =>
                    setNewRule({ ...newRule, value: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Apply to Account</Label>
                <Select
                  value={newRule.account}
                  onValueChange={(value) =>
                    setNewRule({ ...newRule, account: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="maybank">Maybank Savings</SelectItem>
                    <SelectItem value="cimb">CIMB Current</SelectItem>
                    <SelectItem value="amex">AmEx Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newRule.applyToPast}
                  onCheckedChange={(checked) =>
                    setNewRule({ ...newRule, applyToPast: checked })
                  }
                />
                <Label>Apply to past transactions</Label>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleTestRule}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Rule
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateRule(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateRule}>Create Rule</Button>
              </div>
            </div>

            {/* Test Results */}
            {newRule.value && (
              <div className="mt-4 p-4 bg-white border rounded-lg">
                <h4 className="font-medium mb-3">
                  Test Results (Sample Transactions)
                </h4>
                <div className="space-y-2">
                  {testExamples.map((example, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded ${
                        example.wouldMatch
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {example.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          RM {Math.abs(example.amount).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {example.wouldMatch ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="text-xs font-medium">
                          {example.wouldMatch ? "Would Match" : "No Match"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Suggested Rules */}
      {suggestedRules.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Suggested Rules</span>
              <Badge variant="secondary">{suggestedRules.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedRules.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-3 bg-white border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <div>
                      <div className="font-medium">
                        Create rule for "{suggestion.merchant}" →{" "}
                        {suggestion.category}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {suggestion.description} ({suggestion.frequency} times)
                        • {suggestion.confidence} confidence
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Rule
                    </Button>
                    <Button variant="ghost" size="sm">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Active Rules</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Run All Rules
              </Button>
              <span className="text-sm text-muted-foreground">
                Drag to reorder priority
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingRules.map((rule, index) => (
              <Card
                key={rule.id}
                className={`${
                  rule.status === "active"
                    ? "border-l-4 border-l-green-500"
                    : "border-l-4 border-l-gray-400"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <Badge variant="outline" className="text-xs">
                          #{rule.priority}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold">{rule.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {rule.description}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Applied {rule.appliedCount} times</span>
                          <span>Account: {rule.account}</span>
                          <Badge
                            variant={
                              rule.status === "active" ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {rule.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <TestTube className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {rule.status === "active" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Condition:</span>{" "}
                        {rule.condition}
                      </div>
                      <div>
                        <span className="font-medium">Action:</span>{" "}
                        {rule.action}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
