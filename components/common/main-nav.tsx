import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';

const MainNav = () => {
  return (
    <NavigationMenu className='hidden lg:flex'>
      <NavigationMenuList className="flex gap-6 m">
        {/* New Drops link */}
        <NavigationMenuItem>  
          <Link href="/landing/listing" className={`${navigationMenuTriggerStyle()} font-medium text-sm`}>
            🔥 New Drops
          </Link>
        </NavigationMenuItem>

        {/* Men dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium text-sm [&[data-state=open]]:bg-transparent">
            Men ▼
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[200px]">
              {/* Dropdown content for Men */}
              <Link href={`/landing/listing`}>
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Shoes</p>
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Clothing</p>
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Accessories</p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Women dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium text-sm [&[data-state=open]]:bg-transparent">
            Women ▼
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[200px]">
              {/* Dropdown content for Women */}
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Shoes</p>
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Clothing</p>
              <p className="text-sm p-2 hover:bg-gray-100 rounded">Accessories</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Accessories link */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
