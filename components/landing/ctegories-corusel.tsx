import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '../ui/icons'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'


function CtegoriesCorusel() {
  return (
<Carousel className='overflow-hidden  '>
  <div className='container'>
    <div className='relative flex  lg:justify-between items-center  lg:items-end pb-6 lg:pb-16'>
      <h2 className='leading-[95%] text-2xl lg:text-[74px] font-semibold lg:uppercase'>Categories</h2>
     <div className="">
       <CarouselPrevious className=''/>
      <CarouselNext  className=''/>
     </div>
    </div>
  </div>

 
    <CarouselContent className='ml-0'>
      <CarouselItem className='grid grid-cols-1 md:grid-cols-2 pl-0'>
       <div className="flex flex-col justify-between p-4 lg:pl-12 lg:pr-[60px] lg:pb-[30px] bg-[#ECEEF0] rounded-tl-3xl lg:rounded-tl-[64px] w-full h-full">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/img.jpeg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
      <div className="flex items-center justify-between pt-4">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Lifestyle Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
     <div className="p-4 lg:pl-12 lg:pr-[60px]  overflow-hidden bg-[#F6F6F6] ">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/chatoq1.jpg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
          <div className="flex items-end lg:items-center justify-between  ">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Basketball Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem className='grid grid-cols-1 md:grid-cols-2'>
       <div className="flex flex-col justify-between p-4 lg:pl-12 lg:pr-[60px] lg:pb-[30px] bg-[#ECEEF0] rounded-tl-3xl lg:rounded-tl-[64px] w-full h-full">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/img.jpeg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
      <div className="flex items-center justify-between pt-4">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Lifestyle Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
     <div className="p-4 lg:pl-12 lg:pr-[60px]  overflow-hidden bg-[#F6F6F6] ">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/chatoq1.jpg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
          <div className="flex items-end lg:items-center justify-between  ">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Basketball Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem className='grid grid-cols-1 md:grid-cols-2'>
       <div className="flex flex-col justify-between p-4 lg:pl-12 lg:pr-[60px] lg:pb-[30px] bg-[#ECEEF0] rounded-tl-3xl lg:rounded-tl-[64px] w-full h-full">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/img.jpeg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
      <div className="flex items-center justify-between pt-4">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Lifestyle Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
     <div className="p-4 lg:pl-12 lg:pr-[60px]  overflow-hidden bg-[#F6F6F6] ">
          <Image
            className='w-2/3 object-center object-cover mx-auto'
            src="/chatoq1.jpg"
            alt="img.jpeg"
            width={160}
            height={160}
          />
          <div className="flex items-end lg:items-center justify-between  ">
            <h3 className="w-full max-w-[191px] text-primary text-2xl lg:text-4xl leading-[auto] font-semibold lg:uppercase">Basketball Shoes</h3>
            <Link className={cn(buttonVariants({size:"icon"}))} href="#">
           <Arrow/>            
            </Link>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>

</Carousel>


  )
}

export default CtegoriesCorusel
