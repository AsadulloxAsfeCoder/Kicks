import Siteheader from '@/components/common/site-header'
import ProductCard from '@/components/listing/product-card'
import RelatedProducts from '@/components/listing/releted-product'
import Footer from '@/components/ui/footer'
import React from 'react'

interface ProductDetailPageProps {
  params: {
    color: string;
  };
}

function CheckoutPage({ params }: ProductDetailPageProps) {
  const productColor = params.color;

  return (
    <main>
      <Siteheader />
      <ProductCard color={productColor} />
      <RelatedProducts />
      <Footer />
    </main>
  );
}

export default CheckoutPage;

