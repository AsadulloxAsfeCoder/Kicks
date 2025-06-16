export interface Product {
  id: number
  name: string
  price: number
  slug: string
  thumbnail: {
    file: string
  }

}

interface ProductApiResponse {
  results: Product[];
  // Boshqa mumkin bo'lgan maydonlar...
}
export interface Size {
  id:number,
  name:string,
  value:string
}

// types/product.types.ts
export interface Colors {
  id: number | string,
  name: string;
  hex?: string;
}

export interface ProductDetail   extends Product{
  is_new: boolean
  discount: number
  colors: string[]
  sizes: string[]
  
}
export interface Category {
 id:number,
 name:string,
 parent: null | string

}
 export interface Response {
    count:number;
    next:string | null
    pervious:string | null
    results:Product[]


}