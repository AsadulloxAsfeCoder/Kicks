"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Mock data for wishlist
const initialWishlist = [
  {
    id: "PROD-1",
    name: "Wireless Headphones",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "PROD-3",
    name: "Smart Watch",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "PROD-4",
    name: "Running Shoes",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    inStock: false,
  },
]

export function WishlistItems() {
  const [wishlist, setWishlist] = useState(initialWishlist)

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
    alert("❌ Item has been removed from your wishlist.")
  }

  const addToCart = (id: string, name: string) => {
    alert(`✅ ${name} has been added to your cart.`)
  }

  return (
    <div className="space-y-4">
      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Heart className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-lg font-medium">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground">
              Save items you like to your wishlist.
            </p>
            <Button className="mt-4">Start Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>${item.price.toFixed(2)}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item.id, item.name)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
