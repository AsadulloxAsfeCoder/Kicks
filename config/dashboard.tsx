import { User, Package, Heart, MapPin, CreditCard } from 'lucide-react'

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Profile",
      href: "/dashboard",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: "Wishlist",
      href: "/dashboard/wishlist",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      title: "Addresses",
      href: "/dashboard/addresses",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      title: "Payment Methods",
      href: "/dashboard/payment",
      icon: <CreditCard className="h-4 w-4" />,
    },
  ],
}

