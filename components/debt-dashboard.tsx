import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Info } from "lucide-react";

export function DebtDashboard() {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Calendar data for February 2025
  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);
  const paymentDays = [9, 14, 15, 20, 21, 29]; // Days with payments
  const paymentTypes = {
    9: "credit",
    14: "mortgage",
    15: "credit",
    20: "car",
    21: "student",
    29: "renovation",
  };

  const getPaymentColor = (type: string) => {
    const colors = {
      credit: "bg-orange-500",
      mortgage: "bg-cyan-500",
      car: "bg-blue-500",
      student: "bg-pink-500",
      renovation: "bg-purple-500",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-muted-foreground">
          Your debt commitments at a glance. Attend to urgent matters, track
          your credit card utilisation, and monitor your debt progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Urgent Action & Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Action */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Urgent Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-800 mb-2">
                  American Express Business Credit Card: High Utilisation Alert
                </h4>
                <p className="text-sm text-red-700 mb-4">
                  Your utilization on your American Express Business Credit Card
                  is now above 70% of your available credit limit. This is a
                  critical threshold because high credit utilization can
                  negatively impact your credit score, even if you're paying
                  your bills on time. Credit scoring models view high
                  utilisation as a sign of potential financial distress and
                  increased risk.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-700 border-red-300"
                >
                  Read more
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credit Card Utilisation Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Credit Card Utilisation
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>Recommended threshold</span>
                  <span>100%</span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    {
                      name: "Chase Sapphire",
                      amount: "$3,000",
                      utilization: 45,
                      color: "bg-orange-500",
                    },
                    {
                      name: "Wells Fargo Re...",
                      amount: "$11,000",
                      utilization: 85,
                      color: "bg-gray-400",
                    },
                    {
                      name: "American Express ...",
                      amount: "$7,000",
                      utilization: 75,
                      color: "bg-blue-500",
                    },
                    {
                      name: "Chase Freedo...",
                      amount: "$12,000",
                      utilization: 90,
                      color: "bg-gray-400",
                    },
                  ].map((card, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="h-32 bg-gray-100 rounded relative overflow-hidden">
                        <div
                          className={`absolute bottom-0 left-0 right-0 ${card.color} transition-all duration-500`}
                          style={{ height: `${card.utilization}%` }}
                        />
                        {card.utilization > 30 && (
                          <div className="absolute top-2 left-2 right-2 h-px bg-red-400 opacity-60" />
                        )}
                      </div>
                      <div className="text-xs">
                        <div className="font-medium">{card.amount}</div>
                        <div className="text-muted-foreground">{card.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span>Travel Reward</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                    <span>Cashback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Bal. Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full" />
                    <span>Low Interest</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Debt Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Debt Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    $273,43
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total debt
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    $123,430
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Long-term debt left
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    $13,430
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Short-term debt left
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Upcoming Payments & Metrics */}
        <div className="space-y-6">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Payments
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Total to pay
                  </div>
                  <div className="text-2xl font-bold">$3,430</div>
                  <div className="text-sm text-green-600">
                    Balance: Sufficient
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">February</h3>
                  <h4 className="text-2xl font-bold">2025</h4>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["T", "W", "T", "F", "S", "S", "M"].map((day) => (
                    <div
                      key={day}
                      className="font-medium text-muted-foreground p-1"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for month start */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={`empty-${i}`} className="p-1" />
                  ))}

                  {/* Calendar days */}
                  {calendarDays.map((day) => (
                    <div key={day} className="relative p-1">
                      <div
                        className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${
                          paymentDays.includes(day)
                            ? `text-white ${getPaymentColor(
                                paymentTypes[day as keyof typeof paymentTypes]
                              )}`
                            : "hover:bg-gray-100"
                        }
                      `}
                      >
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span>Credit Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                    <span>Mortgage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Car Loan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full" />
                    <span>Student Loan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full" />
                    <span>Renovation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Metrics
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-4 text-xs">
                <Button variant="outline" size="sm" className="bg-white">
                  Peer Average
                </Button>
                <Button variant="outline" size="sm">
                  Industry Recommendation
                </Button>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Total Debt</span>
                  <span className="text-sm font-medium">
                    Debt-to-Income ratio
                  </span>
                </div>
                <div className="relative">
                  <Progress value={65} className="h-2" />
                  <div className="absolute top-0 right-1/4 w-px h-2 bg-orange-400" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$289,980</span>
                  <span>47%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Long-term Debt</div>
                  <div className="relative">
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    $250,489
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">
                    Short-term Debt
                  </div>
                  <div className="relative">
                    <Progress value={25} className="h-2 bg-green-100" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    $7,344
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
