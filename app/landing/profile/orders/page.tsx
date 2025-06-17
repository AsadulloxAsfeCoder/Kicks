import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashvord/dashboard-shell"
import { OrderList } from "@/components/dashvord/order-list"

export const metadata: Metadata = {
  title: "Orders",
  description: "View your order history",
}

export default function OrdersPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Orders</h1>
      </div>
      <OrderList />
    </DashboardShell>
  )
}
// 