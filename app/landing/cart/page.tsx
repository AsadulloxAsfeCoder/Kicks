import Siteheader from '@/components/common/site-header'
import ProductCard from '@/components/listing/product-card'
import RelatedProducts from '@/components/listing/releted-product'
import Footer from '@/components/ui/footer'
import React from 'react'


function CheckoutPage() {


  return (
    <main>
      <Siteheader />
      <ProductCard  />
      <RelatedProducts />
      <Footer />
    </main>
  );
}

export default CheckoutPage;

