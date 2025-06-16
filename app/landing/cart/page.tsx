import Siteheader from '@/components/common/site-header'
import ProductCard from '@/components/listing/product-card'
import RelatedProducts from '@/components/listing/releted-product'
import Footer from '@/components/ui/footer'
import React from 'react'

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

function ChekoutPage({ color }: { color: string }) {
   const productColor = color; 
  return (
    <main>
      <Siteheader/>
      <ProductCard color={productColor} />
      <RelatedProducts/>
      <Footer/>
    </main>
  )
}

export default ChekoutPage
