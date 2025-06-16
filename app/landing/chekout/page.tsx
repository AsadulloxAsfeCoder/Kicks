import Siteheader from '@/components/common/site-header'
import ProductCard from '@/components/listing/product-card'
import ProductChekuot from '@/components/listing/product-chekuot'
import RelatedProducts from '@/components/listing/releted-product'
import Footer from '@/components/ui/footer'
import React from 'react'

const chekout =()=> {
  return (
    <main>
      <Siteheader/>
    <ProductChekuot/>
      <Footer/>
    </main>
  )
}

export default chekout
