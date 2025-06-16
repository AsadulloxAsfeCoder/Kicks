import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ClubBenefits() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Join Kicks Club Get Rewarded Today.</h2>

      <p className="mb-6 text-neutral-700">
        As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive
        immediate access to these Level 1 benefits:
      </p>

      <ul className="space-y-2 mb-8 list-disc pl-5 text-neutral-700">
        <li>Free shipping</li>
        <li>A 15% off voucher for your next purchase</li>
        <li>Access to Members Only products and sales</li>
        <li>Access to adidas Running and Training apps</li>
        <li>Special offers and promotions</li>
      </ul>

      <p className="mb-8 text-neutral-700">
        Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
      </p>
      <Button className="w-full h-12 bg-neutral-900 hover:bg-black text-white flex justify-between items-center">
       
        <span className="sr-only">Join the club</span>
        <span className="mx-auto font-medium">JOIN THE CLUB</span>
        <ArrowRight className="h-4 w-4" />
       
      </Button>
    </div>
  )
}
