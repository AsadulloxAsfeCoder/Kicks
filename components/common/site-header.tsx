import MainNav from "@/components/common/main-nav";
import MenuEnd from "@/components/common/menu-end";
import {LogoIcon} from "@/components/ui/icons"
import { MobileMenu } from "./menu";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Siteheader =()=> {
  return (
<header className="bg-white mx-4 lg:mx-[60px] mt-8 rounded-[12px] lg:rounded-3xl p-4 lg:p-8">
  <div className="relative flex items-center justify-between">
    {/* Chap tomondagi navigatsiya */}
    <div className="flex items-center    flex-1">
  
      <MobileMenu />
      <MainNav  />
    </div>

    {/* Markazdagi logo - absolute o'rniga flex markazlash */}
    <div className="flex-1 flex justify-center">
      <Link href="/">
      <LogoIcon className="w-32 h-8" />
      </Link>
    </div>

    {/* O'ng tomondagi elementlar */}
    <div className="flex-1 flex gap- justify-end">
      <MenuEnd />
    </div>
  </div>
</header>

  )
}

export default Siteheader
