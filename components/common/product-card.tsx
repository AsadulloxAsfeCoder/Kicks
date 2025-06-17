import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge'



const  ProductCard =({image,title,slug, price,priceColor,is_new 
  ,discount}:{image:string,title:string,slug:string,
  discount?:number, price:number,is_new?:boolean, 
  priceColor: boolean;})=> {
  return (
  <Card className='w-full bg-transparent shadow-none border-none space-y-4'>
<CardContent className='p-0 space-y-4'>
    <div className='relative w-full h-[180px] md:h-[250px] lg:h-[300px] bg-white p-2 rounded-[12px] lg:rounded-[28px]'> 
<Badge 
  className={cn(
    "absolute top-2 left-2 py-1 lg:py-3 px-2 lg:px-4 rounded-[12px_0_13px_0] lg:rounded-tl-3xl lg:rounded-br-3xl",
    "rounded-tr-none rounded-bl-none text-[12px] lg:text-sm font-semibold bg-blue-500",
    is_new && "bg-yellow-500 text-primary" // Add color classes
  )}
>
{discount ? `${discount}% off` :"New"}
</Badge>
    <Image  className="rounded-[12px] md:rounded-2xl lg:rounded-3xl w-full h-full object-cover"
    src={image || "/images/placeholder.png"} 
    alt={title || "ADIDAS 4DFWD X PARLEY RUNNING SHOES"} 
    width={302} 
    height={302}/>    
  </div>
  <CardTitle className='text-[15px] lg:w-[318px] md:text-[20px] lg:text-[20px] font-semibold text-primary uppercase'>
    {title || "ADIDAS 4DFWD X PARLEY RUNNING SHOES"}</CardTitle>
  </CardContent>
  <div className='relative bottom-[25px]'>
  <CardFooter className='p-0'>
   <Link href={`/landing/product/slug`} 
   className={cn(buttonVariants(),"font-medium font-sans text-[10px] lg:text-sm uppercase w-full py-[13px] lg:py-[15px] h-[40px] lg:h-[48px]")}>
   View Product - 
   <span className={cn(priceColor && "text-yellow-500")}>${price.toFixed(2)}</span>
   </Link>
  </CardFooter>
  </div>
</Card>

  )
}

export default ProductCard
