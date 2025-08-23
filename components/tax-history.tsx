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
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Phone,
  TrendingDown,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface TaxHistoryProps {
  onBack?: () => void;
}

export function TaxHistory({ onBack }: TaxHistoryProps) {
  const [pastTaxYears] = useState([
    {
      year: "2023",
      assessmentYear: "2024",
      taxPayable: 8200,
      refund: 0,
      dateFiled: "2024-04-15",
      status: "completed",
      comparison: { amount: 500, direction: "up" },
    },
    {
      year: "2022",
      assessmentYear: "2023",
      taxPayable: 0,
      refund: 1200,
      dateFiled: "2023-04-20",
      status: "completed",
      comparison: { amount: 800, direction: "down" },
    },
    {
      year: "2021",
      assessmentYear: "2022",
      taxPayable: 6800,
      refund: 0,
      dateFiled: "2022-04-10",
      status: "completed",
      comparison: { amount: 300, direction: "up" },
    },
  ]);

  const [filedDocuments] = useState([
    {
      id: "1",
      name: "Tax_Summary_2023.pdf",
      year: "2023",
      type: "App Generated Summary",
      size: "245 KB",
      dateCreated: "2024-04-15",
    },
    {
      id: "2",
      name: "LHDN_Assessment_2023.pdf",
      year: "2023",
      type: "LHDN Assessment Notice",
      size: "189 KB",
      dateUploaded: "2024-06-20",
    },
    {
      id: "3",
      name: "EA_Form_2023.pdf",
      year: "2023",
      type: "EA Form",
      size: "156 KB",
      dateUploaded: "2024-03-01",
    },
    {
      id: "4",
      name: "Tax_Summary_2022.pdf",
      year: "2022",
      type: "App Generated Summary",
      size: "234 KB",
      dateCreated: "2023-04-20",
    },
  ]);

  const [lhdnResources] = useState([
    {
      title: "LHDN Official Website",
      url: "https://www.hasil.gov.my",
      description: "Official tax authority website",
      type: "website",
    },
    {
      title: "MyTax E-Filing Portal",
      url: "https://mytax.hasil.gov.my",
      description: "Online tax filing system",
      type: "portal",
    },
    {
      title: "LHDN Helpdesk",
      phone: "03-8911 1000",
      description: "Tax enquiry hotline",
      type: "phone",
    },
    {
      title: "Tax Relief Guidelines 2024",
      url: "#",
      description: "Latest tax relief information",
      type: "guide",
    },
  ]);

  const [taxPlanningTips] = useState([
    {
      title: "Year-End Tax Planning",
      description: "Maximize your deductions before the year ends",
      tips: [
        "Top up your PRS contribution to get RM 3,000 deduction",
        "Purchase qualifying lifestyle items before December 31",
        "Schedule medical check-ups to utilize medical relief",
        "Consider making zakat payments for tax rebate benefits",
      ],
      season: "December",
    },
    {
      title: "Starting Freelance Work",
      description: "Tax considerations when you begin freelancing",
      tips: [
        "Register for tax file number if income exceeds RM 34,000",
        "Keep detailed records of business expenses",
        "Set aside 10-15% of income for tax payments",
        "Consider quarterly tax payments to avoid penalties",
      ],
      season: "Year-round",
    },
    {
      title: "Investment Tax Planning",
      description: "Optimize your investment strategy for tax efficiency",
      tips: [
        "Utilize EPF voluntary contributions for tax relief",
        "Consider tax-efficient investment vehicles",
        "Time your capital gains and losses strategically",
        "Explore dividend reinvestment plans",
      ],
      season: "Year-round",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "App Generated Summary":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "LHDN Assessment Notice":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "EA Form":
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
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
            <h2 className="text-xl font-bold">Tax History & Documents</h2>
            <p className="text-sm text-muted-foreground">
              Archive of past tax filings and important documents
            </p>
          </div>
        </div>
      </div>

      {/* Past Tax Years */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Past Tax Years</span>
          </CardTitle>
          <CardDescription>
            Summary of your previous tax filings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastTaxYears.map((year) => (
              <div key={year.year} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold">Tax Year {year.year}</h3>
                    <Badge variant="outline">
                      Assessment Year {year.assessmentYear}
                    </Badge>
                    {getStatusBadge(year.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Filed: {year.dateFiled}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {year.refund > 0 ? "Refund Received" : "Tax Paid"}
                      </p>
                      <p
                        className={`font-medium ${
                          year.refund > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        RM{" "}
                        {(year.refund > 0
                          ? year.refund
                          : year.taxPayable
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {year.comparison.direction === "up" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        vs Previous Year
                      </p>
                      <p
                        className={`font-medium ${
                          year.comparison.direction === "up"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {year.comparison.direction === "up" ? "+" : "-"}RM{" "}
                        {year.comparison.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filed Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Filed Documents</span>
          </CardTitle>
          <CardDescription>
            Tax documents and reports from previous years
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filedDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getDocumentIcon(document.type)}
                  <div>
                    <h4 className="font-medium text-sm">{document.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{document.type}</span>
                      <span>Tax Year {document.year}</span>
                      <span>{document.size}</span>
                      <span>
                        {document.dateCreated
                          ? `Created: ${document.dateCreated}`
                          : `Uploaded: ${document.dateUploaded}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Tax Document
          </Button>
        </CardContent>
      </Card>

      {/* LHDN Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>LHDN Resources & Information</span>
          </CardTitle>
          <CardDescription>
            Important tax information and official resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lhdnResources.map((resource, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start space-x-3">
                  {resource.type === "website" || resource.type === "portal" ? (
                    <Globe className="h-4 w-4 text-blue-500 mt-0.5" />
                  ) : resource.type === "phone" ? (
                    <Phone className="h-4 w-4 text-green-500 mt-0.5" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-purple-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {resource.description}
                    </p>
                    {resource.url && (
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="text-xs">Visit Website</span>
                      </Button>
                    )}
                    {resource.phone && (
                      <p className="text-sm font-medium text-green-600">
                        {resource.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Planning Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Tax Planning Tips</span>
          </CardTitle>
          <CardDescription>
            Seasonal advice and strategies to optimize your tax situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {taxPlanningTips.map((tip, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{tip.title}</h4>
                  <Badge variant="outline">{tip.season}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
                <ul className="space-y-2">
                  {tip.tips.map((tipItem, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{tipItem}</span>
                    </li>
                  ))}
                </ul>
                {index < taxPlanningTips.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
