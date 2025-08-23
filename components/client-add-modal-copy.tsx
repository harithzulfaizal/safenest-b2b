// components/client-add-modal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Assuming you have this ShadCN component
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have this ShadCN component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // For Calendar
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils"; // Assuming you have this utility function for class management
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

// Define the shape of a Client object, mirroring your existing data structure
// Export this interface so other files (like app/page.tsx) can use it.
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  portfolioValue: number;
  monthlyReturn: number; // Will default to 0 for new clients
  lastContact: string; // Will default to "N/A" or "Today"
  nextReview: string;
  status: "active" | "needs-attention" | "inactive";
  riskProfile: "Conservative" | "Moderate" | "Aggressive";
  joinDate: string;
  totalGainLoss: number; // Will default to 0 for new clients
  totalGainLossPercent: number; // Will default to 0 for new clients
  dateOfBirth?: string; // Added for new fields
  address?: string; // Added for new fields
  financialGoals?: string; // Added for new fields
  notes?: string; // Added for new fields
  investmentPreferences: string[]; // Added for new fields
  sourceOfLead?: string; // Added for new fields
}

interface ClientAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: (newClient: Client) => void;
}

export function ClientAddModal({
  isOpen,
  onClose,
  onClientAdded,
}: ClientAddModalProps) {
  const [activeTab, setActiveTab] = useState("personal-contact");
  const [isPending, startTransition] = useTransition(); // For simulating loading state

  // Form States for Personal & Contact Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState("");

  // Form States for Financial & Service Details
  const [portfolioValue, setPortfolioValue] = useState("");
  const [status, setStatus] = useState<Client["status"]>("active");
  const [joinDate, setJoinDate] = useState<Date | undefined>(new Date());
  const [financialGoals, setFinancialGoals] = useState("");
  const [notes, setNotes] = useState("");

  // Form States for Risk Profile & Preferences
  const [riskProfile, setRiskProfile] =
    useState<Client["riskProfile"]>("Moderate");
  const [investmentPreferences, setInvestmentPreferences] = useState<string[]>(
    []
  );
  const [sourceOfLead, setSourceOfLead] = useState("");
  const [nextReviewDate, setNextReviewDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() + 3)) // Default to 3 months from now
  );

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    // Personal & Contact Tab Validation
    if (!name.trim()) newErrors.name = "Full Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    // Financial & Service Tab Validation
    if (!portfolioValue.trim()) {
      // Check for empty string
      newErrors.portfolioValue = "Initial Portfolio Value is required.";
    } else if (isNaN(parseFloat(portfolioValue))) {
      // Check if it's a valid number
      newErrors.portfolioValue = "Initial Portfolio Value must be a number.";
    } else if (parseFloat(portfolioValue) < 0) {
      newErrors.portfolioValue = "Portfolio Value cannot be negative.";
    }
    if (!joinDate) newErrors.joinDate = "Join Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInvestmentPreferenceChange = (pref: string, checked: boolean) => {
    if (checked) {
      setInvestmentPreferences((prev) => [...prev, pref]);
    } else {
      setInvestmentPreferences((prev) => prev.filter((p) => p !== pref));
    }
  };

  const handleFormSubmit = () => {
    if (!validateForm()) {
      // If validation fails, navigate to the first tab with an error
      if (errors.name || errors.email) {
        setActiveTab("personal-contact");
      } else if (errors.portfolioValue || errors.joinDate) {
        setActiveTab("financial-service");
      }
      return;
    }

    startTransition(async () => {
      // Simulate API call to save client data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network latency

      const newClient: Client = {
        id: `client-${Date.now()}`, // Unique ID for the new client
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        dateOfBirth: dateOfBirth
          ? format(dateOfBirth, "yyyy-MM-dd")
          : undefined,
        address: address.trim() || undefined,
        portfolioValue: parseFloat(portfolioValue),
        status: status,
        joinDate: joinDate
          ? format(joinDate, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"), // Ensure a default if somehow null
        financialGoals: financialGoals.trim() || undefined,
        notes: notes.trim() || undefined,
        riskProfile: riskProfile,
        investmentPreferences: investmentPreferences,
        sourceOfLead: sourceOfLead.trim() || undefined,
        nextReview: nextReviewDate
          ? format(nextReviewDate, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd"), // Ensure a default
        // Default values for fields not collected in this form but required by interface
        monthlyReturn: 0,
        lastContact: "Today", // Or `format(new Date(), "yyyy-MM-dd")`
        totalGainLoss: 0,
        totalGainLossPercent: 0,
      };

      onClientAdded(newClient);
      resetForm();
      onClose(); // Close modal after successful submission
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDateOfBirth(undefined);
    setAddress("");
    setPortfolioValue("");
    setStatus("active");
    setJoinDate(new Date());
    setFinancialGoals("");
    setNotes("");
    setRiskProfile("Moderate");
    setInvestmentPreferences([]);
    setSourceOfLead("");
    setNextReviewDate(new Date(new Date().setMonth(new Date().getMonth() + 3)));
    setErrors({});
    setActiveTab("personal-contact");
  };

  // ShadCN's Dialog onOpenChange provides the new open state.
  // If `open` is false (meaning the dialog is closing), then reset the form.
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the details for the new client. Required fields are marked
            with *.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal-contact">
              Personal & Contact
            </TabsTrigger>
            <TabsTrigger value="financial-service">
              Financial & Service
            </TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Profile</TabsTrigger>
          </TabsList>

          {/* Personal & Contact Tab */}
          <TabsContent value="personal-contact" className="p-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" })); // Clear error on change
                }}
                placeholder="e.g. John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" })); // Clear error on change
                }}
                placeholder="e.g. john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+60 12-345 6789"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? (
                      format(dateOfBirth, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Client's full address"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Financial & Service Details Tab */}
          <TabsContent value="financial-service" className="p-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="portfolioValue">
                Initial Portfolio Value (RM) *
              </Label>
              <Input
                id="portfolioValue"
                type="number"
                value={portfolioValue}
                onChange={(e) => {
                  setPortfolioValue(e.target.value);
                  setErrors((prev) => ({ ...prev, portfolioValue: "" }));
                }}
                placeholder="e.g. 100000"
              />
              {errors.portfolioValue && (
                <p className="text-red-500 text-sm">{errors.portfolioValue}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Client Status</Label>
              <Select
                value={status}
                onValueChange={(value: Client["status"]) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="needs-attention">
                    Needs Attention
                  </SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="joinDate">Client Join Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !joinDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {joinDate ? (
                      format(joinDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={joinDate}
                    onSelect={(date) => {
                      setJoinDate(date);
                      setErrors((prev) => ({ ...prev, joinDate: "" }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.joinDate && (
                <p className="text-red-500 text-sm">{errors.joinDate}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="financialGoals">Financial Goals</Label>
              <Textarea
                id="financialGoals"
                value={financialGoals}
                onChange={(e) => setFinancialGoals(e.target.value)}
                placeholder="e.g. Save for retirement, fund child's education, buy a house"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any private notes about the client"
                rows={3}
              />
            </div>
          </TabsContent>

          {/* Risk Profile & Preferences Tab */}
          <TabsContent value="risk-assessment" className="p-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="riskProfile">Risk Profile</Label>
              <Select
                value={riskProfile}
                onValueChange={(value: Client["riskProfile"]) =>
                  setRiskProfile(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Investment Preferences</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-ethical"
                    checked={investmentPreferences.includes(
                      "Ethical Investing"
                    )}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "Ethical Investing",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-ethical">Ethical Investing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-high-growth"
                    checked={investmentPreferences.includes("High Growth")}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "High Growth",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-high-growth">High Growth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-income"
                    checked={investmentPreferences.includes(
                      "Income Generation"
                    )}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "Income Generation",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-income">Income Generation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-short-term"
                    checked={investmentPreferences.includes("Short-Term Gains")}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "Short-Term Gains",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-short-term">Short-Term Gains</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-real-estate"
                    checked={investmentPreferences.includes("Real Estate")}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "Real Estate",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-real-estate">Real Estate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pref-cryptocurrency"
                    checked={investmentPreferences.includes("Cryptocurrency")}
                    onCheckedChange={(checked) =>
                      handleInvestmentPreferenceChange(
                        "Cryptocurrency",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="pref-cryptocurrency">Cryptocurrency</Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sourceOfLead">Source of Lead</Label>
              <Input
                id="sourceOfLead"
                value={sourceOfLead}
                onChange={(e) => setSourceOfLead(e.target.value)}
                placeholder="e.g. Referral, Website, Cold Call"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextReviewDate">Next Review Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !nextReviewDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextReviewDate ? (
                      format(nextReviewDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={nextReviewDate}
                    onSelect={setNextReviewDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
