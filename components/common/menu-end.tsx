"use client"
import CartDropdownMenu from "@/components/common/cart-dialog"
import SearchCommandDialog from "@/components/common/search-command"
import UserDropdownMenu from "@/components/common/user-dropdown-menu"
import { useSession } from "next-auth/react"
import { UserIcon } from "../ui/dropdown-menu"
import Link from "next/link"

const   MenuEnd = () => {
  const session = useSession()
  console.log("Session:", session);


  return (
    <div className="flex items-center justify-end gap-[9px] lg:gap-10 lg:[319px]">
      <SearchCommandDialog />

      {session.status === "authenticated" ? (
        <UserDropdownMenu />
      ) : (
        <Link href="/landing/auth/login">
          <div className="cursor-pointer">
            <UserIcon />
          </div>
        </Link>
      )}

      <CartDropdownMenu />
    </div>
  )
}

export default MenuEnd
