// app/landing/product/[slug]/page.tsx

import React from "react"
import Siteheader from "@/components/common/site-header"
import Footer from "@/components/ui/footer"
import ProductDetal from "@/components/listing/product-detal"
import ReledetProduct from "@/components/listing/releted-product"

interface PageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = params

  return (
    <main>
      <Siteheader />
      <section className="py-8">
        <div className="container mx-auto">
          <ProductDetal params={{ slug }} />
        </div>
      </section>
      <section>
        <ReledetProduct />
      </section>
      <Footer />
    </main>
  )
}
