// app/landing/product/[slug]/page.tsx

import React from "react"
import Siteheader from "@/components/common/site-header"
import Footer from "@/components/ui/footer"
import ProductDetal from "@/components/listing/product-detal"
import ReledetProduct from "@/components/listing/releted-product"

export default function ProductDetailPage() {
  return (
    <main>
      <Siteheader />
      <section className="py-8">
        <div className="container mx-auto">
          <ProductDetal  />
        </div>
      </section>
      <section>
        <ReledetProduct />
      </section>
      <Footer />
    </main>
  )
}
