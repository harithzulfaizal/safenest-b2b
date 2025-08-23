// components/support.tsx
"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type SupportProps = {
  context?: "planner" | "client";
  clientName?: string;
};

export function Support({ context = "client", clientName }: SupportProps) {
  const { toast } = useToast();

  function submit(form: HTMLFormElement, label: string) {
    const data = new FormData(form);
    toast({
      title: `${label} submitted`,
      description: "We'll get back to you shortly.",
    });
    console.log(`${label}:`, Object.fromEntries(data.entries()));
    form.reset();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Support</h2>
        <p className="text-sm text-muted-foreground">
          We're here to help. Reach out to the developer team for assistance,
          feature requests, or to report issues.
        </p>
      </div>

      <Tabs defaultValue="contact" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="ticket">New ticket</TabsTrigger>
          <TabsTrigger value="bug">Report a bug</TabsTrigger>
          <TabsTrigger value="feature">Feature request</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact the team</CardTitle>
              <CardDescription>
                Preferred channels and expected response times.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <ContactBlock
                title="Email"
                value="support@yourapp.dev"
                description="Typical reply within 1 business day"
                actionLabel="Email us"
                actionHref="mailto:support@yourapp.dev"
              />
              <ContactBlock
                title="Emergency"
                value="+60 12-000 0000"
                description="Critical outages only"
                actionLabel="Call"
                actionHref="tel:+60120000000"
              />
              <ContactBlock
                title="Community"
                value="Forum"
                description="Ask questions and share ideas"
                actionLabel="Open forum"
                actionHref="https://community.yourapp.dev"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ticket">
          <Card>
            <CardHeader>
              <CardTitle>Create a ticket</CardTitle>
              <CardDescription>
                General inquiries or assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(e.currentTarget, "Ticket");
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Short summary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select name="priority" defaultValue="normal">
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    rows={5}
                    placeholder="Describe your request..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit">Submit ticket</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bug">
          <Card>
            <CardHeader>
              <CardTitle>Report a bug</CardTitle>
              <CardDescription>
                Help us fix issues faster with clear steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(e.currentTarget, "Bug report");
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="area">Area</Label>
                  <Select name="area" defaultValue="ui">
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui">UI</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="module">Module</Label>
                  <Input
                    id="module"
                    name="module"
                    placeholder="e.g., Investments > All Holdings"
                  />
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <Label htmlFor="steps">Steps to reproduce</Label>
                  <Textarea
                    id="steps"
                    name="steps"
                    rows={4}
                    placeholder="1) ... 2) ... 3) ..."
                  />
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <Label htmlFor="expected">Expected behavior</Label>
                  <Textarea id="expected" name="expected" rows={3} />
                </div>
                <div className="md:col-span-2 grid gap-2">
                  <Label htmlFor="actual">Actual behavior</Label>
                  <Textarea id="actual" name="actual" rows={3} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit">Submit bug</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature">
          <Card>
            <CardHeader>
              <CardTitle>Feature request</CardTitle>
              <CardDescription>
                Tell us what would make your workflow better.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(e.currentTarget, "Feature request");
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="idea">Your idea</Label>
                  <Textarea
                    id="idea"
                    name="idea"
                    rows={5}
                    placeholder="Describe the feature and how you'd use it..."
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Impacted role</Label>
                    <Select name="role" defaultValue={context}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planner">Planner</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Impact</Label>
                    <Select name="impact" defaultValue="medium">
                      <SelectTrigger id="impact">
                        <SelectValue placeholder="Select impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit">Send request</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>System status</CardTitle>
              <CardDescription>
                Live overview of uptime and incidents.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <StatusTile title="API" status="Operational" />
              <StatusTile title="Dashboards" status="Operational" />
              <StatusTile title="Data syncs" status="Degraded" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently asked questions</CardTitle>
              <CardDescription>Answers to common issues.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <strong>How do I reset my password?</strong> Go to Settings →
                Security and change your password.
              </p>
              <p>
                <strong>How do I export my data?</strong> In Settings → Privacy,
                click “Export my data”.
              </p>
              <p>
                <strong>How can I schedule a call?</strong> Planners can set a
                meeting link in Planner Settings; clients can use that link to
                book time.
              </p>
              <p>
                <strong>What’s your SLA?</strong> We aim to respond within 1
                business day for standard tickets and 4 hours for urgent issues.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContactBlock(props: {
  title: string;
  value: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-1 text-sm text-muted-foreground">{props.title}</div>
      <div className="text-base font-medium">{props.value}</div>
      <div className="text-xs text-muted-foreground">{props.description}</div>
      <div className="mt-3">
        <a href={props.actionHref} target="_blank" rel="noreferrer">
          <Button variant="outline" size="sm">
            {props.actionLabel}
          </Button>
        </a>
      </div>
    </div>
  );
}

function StatusTile({
  title,
  status,
}: {
  title: string;
  status: "Operational" | "Degraded" | "Down";
}) {
  const color =
    status === "Operational"
      ? "bg-emerald-500"
      : status === "Degraded"
      ? "bg-amber-500"
      : "bg-red-500";
  return (
    <div className="rounded-lg border p-4 flex items-center justify-between">
      <div className="font-medium">{title}</div>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-sm text-muted-foreground">{status}</span>
      </div>
    </div>
  );
}
