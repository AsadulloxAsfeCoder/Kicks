import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashvord/dashboard-shell"
import { AddressList } from "@/components/dashvord/address-list"

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your shipping addresses",
}

export default function AddressesPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Manage Addresses</h1>
      </div>
      <AddressList />
    </DashboardShell>
  )
}

