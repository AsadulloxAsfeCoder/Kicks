"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { UserIcon } from "@/components/ui/icons"; 
import AxiosInstance from '@/lib/axios'

interface Usida {
  id: string;
  username: string;
  email: string;
  photo: {
    file:string;
  };
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

function UserDropdownMenu() {
  const [user, setUser] = useState<Usida | null>(null);
  const session = useSession();

     async function getUserProfile() {
      try {
        const response = await AxiosInstance.get('/accounts/profile');
        setUser(response.data);
      } catch (error) {
        console.error("User profile error:", error);
      }
    }

  useEffect(() => {
 

    getUserProfile();
  }, []);

  const logOut = async () => {
    try {
      await AxiosInstance.post("/accounts/logout", {
        refresh: session.data?.user.refreshToken
      });
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
           {user?.photo ? (
            <Image
              src={user.photo?.file}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <UserIcon/>
          )}
            <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <Link  href="/profile" >
                  <DropdownMenuItem>
          Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
            </Link>
        <DropdownMenuItem>
          Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Keyboard shortcuts <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Team</DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>
          New Team <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={logOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;
