import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge"

function  CartDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="default"
          className="flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-yellow-500 hover:bg-yellow-500"
        >
          0
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="w-56">No items in cart</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CartDropdownMenu
