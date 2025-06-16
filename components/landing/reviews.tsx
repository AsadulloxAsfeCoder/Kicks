import { Section } from 'lucide-react'
import React from 'react'
import RewiewsCorusel from './rewiews-corusel'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const Reviews =()=> {
  return (
    <section className='p-5 lg:p-12  lg:py-32'>
      <div className="pl-5 overflow-hidden">
        <div className="flex justify-between pt-5 pb-5  lg:items-normal lg:pr-14 relative sm:*:bottom-3 ">
        <h2 className="leading-[95%] relative  text-2xl lg:text-[74px] font-semibold lg:uppercase mb-5 lg:mb-12">Reviews</h2>
        <Link href="#" className={cn(buttonVariants({variant:'blue'}),"lg:uppercase bg-blue-500 py-[15px]  px-8 w-[89px] h-[40px] lg:w-[121px] lg:h-[48px] ")}>
        See all
        </Link>
        </div>
      <RewiewsCorusel/>
      </div>
    </section>
  )
}

export default Reviews
