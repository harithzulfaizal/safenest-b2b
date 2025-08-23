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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileText,
  Globe,
  Phone,
  Plus,
  Share,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface PolicyDetailsProps {
  policyId: string;
  onBack?: () => void;
}

export function PolicyDetails({ policyId, onBack }: PolicyDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showReminderDialog, setShowReminderDialog] = useState(false);

  // Mock data - in real app, this would come from API based on policyId
  const policy = {
    id: policyId,
    name: "Great Eastern MediSave",
    policyNumber: "GE-MS-2023-001",
    insurer: "Great Eastern",
    type: "Health",
    status: "active",
    policyHolder: "John Doe",
    insuredParties: ["John Doe", "Jane Doe", "Little Doe"],
    beneficiaries: ["Jane Doe (Spouse)", "Little Doe (Child)"],
    premium: {
      amount: 2400,
      frequency: "Annual",
      paymentMethod: "Auto-debit from Maybank",
      nextDue: "2024-02-15",
    },
    coverage: {
      period: {
        start: "2023-02-15",
        end: "2024-02-15",
      },
      benefits: [
        { name: "Hospitalization", amount: "RM 150,000", type: "Annual Limit" },
        {
          name: "Surgical Benefits",
          amount: "RM 100,000",
          type: "Annual Limit",
        },
        {
          name: "Outpatient Treatment",
          amount: "RM 5,000",
          type: "Annual Limit",
        },
        {
          name: "Emergency Treatment",
          amount: "RM 10,000",
          type: "Per Incident",
        },
      ],
      deductible: "RM 500",
      copay: "10% after deductible",
    },
    exclusions: [
      "Pre-existing conditions (first 12 months)",
      "Cosmetic surgery",
      "Experimental treatments",
      "War and terrorism",
    ],
    riders: [
      { name: "Critical Illness Rider", coverage: "RM 50,000" },
      { name: "Personal Accident Rider", coverage: "RM 25,000" },
    ],
    contact: {
      customerService: "1-300-88-1111",
      agent: {
        name: "Ahmad Rahman",
        phone: "012-345-6789",
        email: "ahmad.rahman@greateasteragent.com",
      },
      website: "https://www.greateasteragent.com",
      claimsPortal: "https://claims.greateasteragent.com",
    },
    documents: [
      {
        id: "1",
        name: "Policy Schedule",
        type: "PDF",
        size: "2.3 MB",
        uploadDate: "2023-02-15",
        category: "Policy Documents",
      },
      {
        id: "2",
        name: "Policy Wording",
        type: "PDF",
        size: "5.1 MB",
        uploadDate: "2023-02-15",
        category: "Policy Documents",
      },
      {
        id: "3",
        name: "Medical Report",
        type: "PDF",
        size: "1.8 MB",
        uploadDate: "2023-02-10",
        category: "Medical Documents",
      },
    ],
    reminders: [
      {
        id: "1",
        type: "Premium Due",
        date: "2024-02-10",
        description: "Premium payment reminder - 5 days before due date",
        active: true,
      },
      {
        id: "2",
        type: "Policy Renewal",
        date: "2024-01-15",
        description: "Policy renewal reminder - 30 days before expiry",
        active: true,
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expired":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Expired
          </Badge>
        );
      case "lapsed":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Lapsed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{policy.name}</h2>
            <p className="text-muted-foreground">
              {policy.insurer} • {policy.policyNumber}
            </p>
          </div>
          {getStatusBadge(policy.status)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Policy Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Policy Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Policy Holder
                    </Label>
                    <div className="font-medium">{policy.policyHolder}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Insured Parties
                    </Label>
                    <div className="space-y-1">
                      {policy.insuredParties.map((party, index) => (
                        <div key={index} className="font-medium">
                          {party}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Beneficiaries
                    </Label>
                    <div className="space-y-1">
                      {policy.beneficiaries.map((beneficiary, index) => (
                        <div key={index} className="font-medium">
                          {beneficiary}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Coverage Period
                    </Label>
                    <div className="font-medium">
                      {formatDate(policy.coverage.period.start)} -{" "}
                      {formatDate(policy.coverage.period.end)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Premium
                    </Label>
                    <div className="font-medium">
                      {formatCurrency(policy.premium.amount)} (
                      {policy.premium.frequency})
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Payment Method
                    </Label>
                    <div className="font-medium">
                      {policy.premium.paymentMethod}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Next Due Date
                    </Label>
                    <div className="font-medium">
                      {formatDate(policy.premium.nextDue)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Customer Service
                    </Label>
                    <div className="font-medium">
                      {policy.contact.customerService}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Agent
                    </Label>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {policy.contact.agent.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {policy.contact.agent.phone}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {policy.contact.agent.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Website
                    </Label>
                    <div>
                      <Button variant="link" className="p-0 h-auto">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Claims Portal
                    </Label>
                    <div>
                      <Button variant="link" className="p-0 h-auto">
                        <FileText className="h-4 w-4 mr-2" />
                        File a Claim
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          {/* Coverage Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Coverage Benefits</CardTitle>
              <CardDescription>
                Detailed breakdown of your policy benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policy.coverage.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{benefit.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {benefit.type}
                      </div>
                    </div>
                    <div className="font-bold text-lg">{benefit.amount}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Deductible
                  </Label>
                  <div className="font-medium">
                    {policy.coverage.deductible}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Co-payment
                  </Label>
                  <div className="font-medium">{policy.coverage.copay}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Riders */}
          <Card>
            <CardHeader>
              <CardTitle>Riders & Add-ons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {policy.riders.map((rider, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div className="font-medium">{rider.name}</div>
                    <div className="font-medium">{rider.coverage}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exclusions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Policy Exclusions
              </CardTitle>
              <CardDescription>
                Important limitations and exclusions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {policy.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <div className="text-sm">{exclusion}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Policy Documents</CardTitle>
                  <CardDescription>
                    Manage your policy-related documents
                  </CardDescription>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policy.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.category} • {doc.size} • Uploaded{" "}
                          {formatDate(doc.uploadDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Reminders & Alerts
                  </CardTitle>
                  <CardDescription>
                    Manage your policy reminders
                  </CardDescription>
                </div>
                <Dialog
                  open={showReminderDialog}
                  onOpenChange={setShowReminderDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reminder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Reminder</DialogTitle>
                      <DialogDescription>
                        Set up a custom reminder for this policy
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="reminder-type">Reminder Type</Label>
                        <Input
                          id="reminder-type"
                          placeholder="e.g., Premium Due, Policy Review"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reminder-date">Reminder Date</Label>
                        <Input id="reminder-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="reminder-description">
                          Description
                        </Label>
                        <Textarea
                          id="reminder-description"
                          placeholder="Additional notes..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowReminderDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setShowReminderDialog(false)}>
                          Add Reminder
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policy.reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          reminder.active ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{reminder.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {reminder.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Scheduled for {formatDate(reminder.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reminder.active ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
