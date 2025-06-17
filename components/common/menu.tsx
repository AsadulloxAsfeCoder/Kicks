"use client"

import { Menu, Search, ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/command"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [commandOpen, setCommandOpen] = useState(false)

  const handleCartClick = () => {
    router.push("/landing/profile/orders")
  }

  return (
    <>
      <div className="flex items-center p-0">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="text-xl">KICKS SHOP</SheetTitle>
              <SheetDescription className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setOpen(false)
                    setCommandOpen(true)
                  }}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleCartClick}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </SheetDescription>
            </SheetHeader>

            <nav className="flex-1 py-4">
              <ul className="space-y-3">
                <li>
                  <SheetClose asChild>
                    <Link
                      href="/landing/listing"
                      className="block py-2 text-lg font-medium transition-colors hover:text-primary"
                    >
                      Dew Drops
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link
                      href="/landing/listing"
                      className="block py-2 text-lg font-medium transition-colors hover:text-primary"
                    >
                      Men
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link
                      href="/landing/listing"
                      className="block py-2 text-lg font-medium transition-colors hover:text-primary"
                    >
                      Women
                    </Link>
                  </SheetClose>
                </li>
              </ul>
            </nav>
            <SheetFooter className="border-t pt-4">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Close Menu
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Modal dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search for items</DialogDescription>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>Drop</span>
            </CommandItem>
            <CommandItem>
              <span>Men</span>
            </CommandItem>
            <CommandItem>
              <span>Women</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}