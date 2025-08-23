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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Eye,
  EyeOff,
  Minus,
  Plus,
  Repeat,
  Save,
  Split,
  Tag,
  Trash2,
  Upload,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface TransactionDetailsProps {
  transactionId: string;
  onBack?: () => void;
}

export function TransactionDetails({
  transactionId,
  onBack,
}: TransactionDetailsProps) {
  const [showOriginalData, setShowOriginalData] = useState(false);
  const [category, setCategory] = useState("Groceries");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>(["grocery", "weekend"]);
  const [newTag, setNewTag] = useState("");
  const [excludeFromReports, setExcludeFromReports] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [splitTransactions, setSplitTransactions] = useState([
    { category: "Groceries", amount: 85.45, note: "Food items" },
    { category: "Household", amount: 40.0, note: "Cleaning supplies" },
  ]);

  // Mock transaction data
  const transaction = {
    id: transactionId,
    date: "2024-01-15",
    time: "14:30:25",
    merchant: "Tesco KLCC",
    originalDescription: "TESCO STORES 4523 KUALA LUMPUR MY CARD 1234",
    rawData: {
      transactionId: "TXN123456789",
      merchantCode: "5411",
      authCode: "123456",
      cardLast4: "1234",
      processingDate: "2024-01-15T14:30:25Z",
    },
    amount: -125.45,
    account: "Maybank Savings",
    accountIcon: "MB",
    hasReceipt: true,
    receiptUrl: "/placeholder.svg?height=200&width=150",
  };

  const recentCategories = [
    "Groceries",
    "Food & Dining",
    "Shopping",
    "Transportation",
    "Utilities",
  ];
  const suggestedCategory = "Groceries";

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addSplitTransaction = () => {
    setSplitTransactions([
      ...splitTransactions,
      { category: "", amount: 0, note: "" },
    ]);
  };

  const removeSplitTransaction = (index: number) => {
    setSplitTransactions(splitTransactions.filter((_, i) => i !== index));
  };

  const updateSplitTransaction = (index: number, field: string, value: any) => {
    const updated = [...splitTransactions];
    updated[index] = { ...updated[index], [field]: value };
    setSplitTransactions(updated);
  };

  const totalSplitAmount = splitTransactions.reduce(
    (sum, split) => sum + split.amount,
    0
  );
  const remainingAmount = Math.abs(transaction.amount) - totalSplitAmount;

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
            <h1 className="text-2xl font-bold">Transaction Details</h1>
            <p className="text-muted-foreground">
              Edit and manage transaction information
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transaction Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transaction Information</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOriginalData(!showOriginalData)}
                  >
                    {showOriginalData ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {showOriginalData ? "Hide" : "Show"} Raw Data
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReviewed(!isReviewed)}
                  >
                    <CheckCircle
                      className={`h-4 w-4 ${
                        isReviewed ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    {isReviewed ? "Reviewed" : "Mark as Reviewed"}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Date & Time
                  </Label>
                  <div className="font-medium">
                    {transaction.date} at {transaction.time}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Amount
                  </Label>
                  <div
                    className={`text-2xl font-bold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}RM{" "}
                    {Math.abs(transaction.amount).toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">
                  Merchant
                </Label>
                <div className="font-medium">{transaction.merchant}</div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">
                  Description
                </Label>
                <div className="text-sm">{transaction.originalDescription}</div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Account</Label>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">
                      {transaction.accountIcon}
                    </span>
                  </div>
                  <span>{transaction.account}</span>
                </div>
              </div>

              {showOriginalData && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">
                    Raw Bank Data
                  </Label>
                  <div className="space-y-1 text-xs font-mono">
                    <div>
                      Transaction ID: {transaction.rawData.transactionId}
                    </div>
                    <div>Merchant Code: {transaction.rawData.merchantCode}</div>
                    <div>Auth Code: {transaction.rawData.authCode}</div>
                    <div>Card Last 4: {transaction.rawData.cardLast4}</div>
                    <div>
                      Processing Date: {transaction.rawData.processingDate}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Category & Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={suggestedCategory}>
                      🤖 Suggested: {suggestedCategory}
                    </SelectItem>
                    {recentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Create New Category</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      #{tag} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button variant="outline" size="sm" onClick={addTag}>
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add notes about this transaction..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Exclude from Reports & Budget</Label>
                <Switch
                  checked={excludeFromReports}
                  onCheckedChange={setExcludeFromReports}
                />
              </div>
            </CardContent>
          </Card>

          {/* Split Transaction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Split className="h-5 w-5" />
                  <span>Split Transaction</span>
                </div>
                <Switch checked={isSplit} onCheckedChange={setIsSplit} />
              </CardTitle>
            </CardHeader>
            {isSplit && (
              <CardContent className="space-y-4">
                {splitTransactions.map((split, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg"
                  >
                    <Select
                      value={split.category}
                      onValueChange={(value) =>
                        updateSplitTransaction(index, "category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {recentCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={split.amount}
                      onChange={(e) =>
                        updateSplitTransaction(
                          index,
                          "amount",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                    />
                    <Input
                      placeholder="Note"
                      value={split.note}
                      onChange={(e) =>
                        updateSplitTransaction(index, "note", e.target.value)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSplitTransaction(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addSplitTransaction}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Split
                  </Button>
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Total: RM {totalSplitAmount.toFixed(2)}
                    </span>
                    {remainingAmount !== 0 && (
                      <span
                        className={`ml-2 ${
                          remainingAmount > 0
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        (Remaining: RM {remainingAmount.toFixed(2)})
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Receipt */}
          <Card>
            <CardHeader>
              <CardTitle>Receipt</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction.hasReceipt ? (
                <div className="space-y-3">
                  <img
                    src={transaction.receiptUrl || "/placeholder.svg"}
                    alt="Receipt"
                    className="w-full h-48 object-cover rounded border"
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No receipt attached
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Repeat className="h-4 w-4 mr-2" />
                Set as Recurring
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Split className="h-4 w-4 mr-2" />
                Duplicate Transaction
              </Button>
            </CardContent>
          </Card>

          {/* Transaction Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reviewed</span>
                  <CheckCircle
                    className={`h-4 w-4 ${
                      isReviewed ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Categorized</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Receipt Attached</span>
                  <CheckCircle
                    className={`h-4 w-4 ${
                      transaction.hasReceipt
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rule Applied</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
