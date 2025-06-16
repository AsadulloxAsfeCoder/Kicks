import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashvord/dashboard-shell"
import { WishlistItems } from "@/components/dashvord/wishlist-items"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View and manage your wishlist",
}

export default function WishlistPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Your Wishlist</h1>
      </div>
      <WishlistItems />
    </DashboardShell>
  )
}
