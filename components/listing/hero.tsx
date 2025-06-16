import React from 'react'
import HeroCorusel from './hero-corusel'
import ProductFilter from './ptoduct-filter'
import PruductFilterMobile from '@/components/listing/pruduct-filter-mobile'
import ProductList from './product-list'
import ProductBreadcrumb from './product-bredcrump'

const Hero =()=> {
  return (
    <section className='p-5 lg:p-12'>
     
      <HeroCorusel/>
 <div className='pt-12 pl-4'>
    <ProductBreadcrumb/>
     <div className="flex justify-between">
  <div className="flex flex-col space-y-2">
    <h2 className="text-4xl text-[20px] lg:text-[36px] font-semibold">
      Life Style Shoes
    </h2>
    <p className="text-[14px] lg:text-[16px] font-semibold">122 items</p>
     </div>
    <PruductFilterMobile/>
    </div>
  <div className="flex gap-10">
      <ProductFilter />
      <ProductList/>
  </div>
      </div>
    </section>
  )
}

export default Hero
