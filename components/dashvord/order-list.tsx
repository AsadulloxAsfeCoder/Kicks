"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ChevronDown, ChevronUp, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for orders
const orders = [
  {
    id: "ORD-12345",
    date: new Date(2023, 4, 15),
    status: "Delivered",
    total: 129.99,
    items: [
      {
        id: "PROD-1",
        name: "Wireless Headphones",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "PROD-2",
        name: "Phone Case",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "ORD-12346",
    date: new Date(2023, 3, 28),
    status: "Processing",
    total: 59.99,
    items: [
      {
        id: "PROD-3",
        name: "Smart Watch",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    address: "123 Main St, Anytown, USA",
  },
  {
    id: "ORD-12347",
    date: new Date(2023, 3, 15),
    status: "Shipped",
    total: 149.97,
    items: [
      {
        id: "PROD-4",
        name: "Running Shoes",
        price: 99.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "PROD-5",
        name: "Fitness Tracker",
        price: 49.98,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    address: "123 Main St, Anytown, USA",
  },
]

export function OrderList() {
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Package className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-lg font-medium">No orders yet</p>
            <p className="text-sm text-muted-foreground">When you place orders, they will appear here.</p>
            <Button className="mt-4">Start Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <Collapsible
            key={order.id}
            open={openOrder === order.id}
            onOpenChange={() => {
              setOpenOrder(openOrder === order.id ? null : order.id)
            }}
            className="w-full"
          >
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <CardTitle className="text-base font-medium">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {format(order.date, "MMMM d, yyyy")}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </Badge>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {openOrder === order.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="p-4 pt-0">
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <div className="h-20 w-20 overflow-hidden rounded-md">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Shipping Address</span>
                      <span className="text-sm">{order.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end p-4 pt-0">
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                </CardFooter>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))
      )}
    </div>
  )
}
