// hooks/use-clients.ts
"use client";

import { supabase } from "@/lib/supabase-browser";
import { useEffect, useMemo, useState } from "react";

// ---- Match your UI interface exactly ----
export interface ClientActionItem {
  type:
    | "Meeting"
    | "Email"
    | "Contract Renewal"
    | "Review"
    | "Follow-up"
    | "Other";
  description: string;
  dueDate: string; // ISO
  status: "Pending" | "Completed" | "Overdue";
}
export interface ClientUI {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string; // not in schema -> optional (or add a column if you need it)
  joinDate: string; // from clients.created_at
  status: "active" | "needs-attention" | "inactive";
  portfolioValue: number; // assets_under_management
  riskProfile: "Conservative" | "Moderate" | "Aggressive" | string;
  financialGoals?: string;
  investmentPreferences: string[];
  notes?: string;
  monthlyReturn: number; // derive or store; here default 0
  totalGainLoss: number;
  totalGainLossPercent: number;
  lifetimeRevenue: number;
  actionItems?: ClientActionItem[];
}

type TaskRow = {
  task_id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  // embedded joins:
  priority: { priority_name: string } | null;
  tstatus: { status_name: string } | null;
  client: { client_id: number } | null;
};

export function useClients() {
  const [loadingClients, setLoading] = useState(true);
  const [clients, setClients] = useState<ClientUI[]>([]);
  const [errorClients, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      // ===== Option A: query base table with embedded join (no view needed) =====
      const { data: clientRows, error: clientErr } = await supabase
        .from("clients")
        .select(
          `
          client_id,
          full_name,
          email,
          phone_number,
          status,
          assets_under_management,
          total_gain_loss,
          lifetime_revenue,
          created_at,
          risk_profiles:risk_profile_id(profile_name)
        `
        )
        .order("created_at", { ascending: false });

      if (clientErr) {
        setError(clientErr.message);
        setLoading(false);
        return;
      }
      // Pull tasks (for actionItems)
      const { data: taskRows, error: taskErr } = await supabase
        .from("tasks")
        .select(
          `
          task_id,
          title,
          description,
          due_date,
          priority:priority_id(priority_name),
          tstatus:status_id(status_name),
          client:client_id(client_id)
        `
        )
        .order("due_date", { ascending: true });

      if (taskErr) {
        setError(taskErr.message);
        setLoading(false);
        return;
      }

      // Map tasks by client_id
      const tasksByClient = new Map<number, TaskRow[]>();
      (taskRows ?? []).forEach((t) => {
        const cid = t.client?.client_id;
        if (!cid) return;
        if (!tasksByClient.has(cid)) tasksByClient.set(cid, []);
        tasksByClient.get(cid)!.push(t);
      });

      // Map DB rows → UI clients
      const mapped: ClientUI[] = (clientRows ?? []).map((c: any) => {
        const aum = Number(c.assets_under_management ?? 0);
        const gainLoss = Number(c.total_gain_loss ?? 0);
        const totalGainLossPercent =
          aum !== 0 ? Number(((gainLoss / aum) * 100).toFixed(2)) : 0;

        // Build actionItems from tasks for this client
        const rowsForClient = tasksByClient.get(c.client_id) ?? [];
        const actionItems: ClientActionItem[] = rowsForClient.map((t) => {
          const statusName = (t.tstatus?.status_name ?? "").toLowerCase();
          // Map task status → Pending/Completed/Overdue
          let normalizedStatus: ClientActionItem["status"] = "Pending";
          if (statusName === "completed") normalizedStatus = "Completed";

          // Overdue check (only if still Pending)
          if (normalizedStatus === "Pending" && t.due_date) {
            const due = new Date(t.due_date);
            const today = new Date();
            if (
              due <
              new Date(today.getFullYear(), today.getMonth(), today.getDate())
            ) {
              normalizedStatus = "Overdue";
            }
          }

          // Map priority → type (very rough)
          const pr = (t.priority?.priority_name ?? "").toLowerCase();
          let type: ClientActionItem["type"] = "Other";
          if (pr === "high") type = "Review";
          if (pr === "medium") type = "Follow-up";
          if (pr === "low") type = "Email";

          return {
            type,
            description: t.description ?? t.title,
            dueDate: t.due_date ?? new Date().toISOString(),
            status: normalizedStatus,
          };
        });

        // Risk profile mapping
        const rp = (c.risk_profiles?.profile_name ??
          "Moderate") as ClientUI["riskProfile"];

        // Status mapping (your DB stores free text; keep your component’s strings)
        const statusRaw = (c.status ?? "active").toLowerCase();
        const status =
          statusRaw === "needs-attention"
            ? "needs-attention"
            : statusRaw === "inactive"
            ? "inactive"
            : "active";

        return {
          id: String(c.client_id),
          name: c.full_name,
          email: c.email,
          phone: c.phone_number ?? undefined,
          dateOfBirth: undefined, // add a column if you need DOB
          joinDate: c.created_at,
          status,
          portfolioValue: aum,
          riskProfile: rp,
          financialGoals: "", // add a column later if needed
          investmentPreferences: [], // add a junction table later if needed
          notes: undefined,
          monthlyReturn: 0, // if you store monthly performance, map it here
          totalGainLoss: gainLoss,
          totalGainLossPercent,
          lifetimeRevenue: Number(c.lifetime_revenue ?? 0),
          actionItems,
        };
      });

      setClients(mapped);
      setLoading(false);
    })();
  }, []);

  // Some handy top-level computed values if you need them
  const summary = useMemo(() => {
    const totalAUM = clients.reduce((s, c) => s + c.portfolioValue, 0);
    const active = clients.filter((c) => c.status === "active").length;
    const needsAttn = clients.filter(
      (c) => c.status === "needs-attention"
    ).length;
    return { totalAUM, active, needsAttn };
  }, [clients]);

  return { loadingClients, errorClients, clients, summary };
}
