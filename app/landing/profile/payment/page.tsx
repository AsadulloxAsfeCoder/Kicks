import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashvord/dashboard-shell"
import  SavedCards  from "@/components/dashvord/saved-cards"

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "Manage your payment methods",
}

export default function PaymentPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Saved Cards</h1>
      </div>
      <SavedCards />
    </DashboardShell>
  )
}
