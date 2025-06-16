  "use client"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Link from "next/link"
  import { clsx as cn } from 'clsx'
  import React, { useState, useEffect } from 'react'
  import { buttonVariants } from "../ui/button"
  import Image from "next/image"
  import AxiosInstance from '@/lib/axios'

  interface ProductImage {
    id: string;
    url: string;
    is_primary: boolean;
  }

  const HiroCarousel = () => {
    const [images, setImages] = useState<ProductImage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [currentImage, setCurrentImage] = useState("")

    // Default images if API fails
    const defaultImages = [
      { id: 'default1', url: '/images/hiro-bg.jpg', is_primary: true },
      { id: 'default2', url: '/images/hiro-bg1.png', is_primary: false },
      { id: 'default3', url: '/images/hiro-bg2.png', is_primary: false }
    ]

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await AxiosInstance.get('/api/products/featured-images')
          if (response.data.length > 0) {
            setImages(response.data)
            const primary = response.data.find((img: ProductImage) => img.is_primary) || response.data[0]
            setCurrentImage(primary.url)
          } else {
            setImages(defaultImages)
            setCurrentImage(defaultImages[0].url)
          }
        } catch (err) {
          console.error("Failed to fetch images:", err)
          setError(true)
          setImages(defaultImages)
          setCurrentImage(defaultImages[0].url)
        } finally {
          setLoading(false)
        }
      }

      fetchImages()
    }, [])

    if (loading) {
      return <div className="w-full h-[600px] flex items-center justify-center">Loading...</div>
    }

    return (
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div
              className="relative w-auto md:w-full h-[382px] md:h-auto lg:h-full bg-cover 
              bg-center p-8  lg:pt-[476px] md:p-12 rounded-[24px] lg:rounded-[64px]
            overflow-hidden flex flex-col justify-end transition-all duration-500"
              style={{ backgroundImage: `url("${currentImage}")` }}
            >
              <div className="w-full max-w-[200px] md:max-w-[490px] ">
                <h2 className="text-[24px] md:text-[74px] font-sans font-semibold text-white">NIKE AIR MAX</h2>
                <p className="text-[14px] md:text-2xl font-sans font-medium text-gray-400 leading-none mb-2 md:mb-[24px]">
                  Nike introducing the new air max for everyone's comfort
                </p>
                  <Link 
                    className={cn(buttonVariants(), " lg:w-[138px] lg:h-[48px] uppercase !bg-indigo-500 hover:!bg-blue-500/90")}
                    href="#"
                  >
                    Shop Now
                  </Link>
              </div>

              {/* Thumbnails */}
              <div className="absolute flex flex-col gap-2 right-8 bottom-8 ">
                {images.filter(img => !img.is_primary).map((image) => (
                  <Image
                    key={image.id}
                    onClick={() => setCurrentImage(image.url)}
                    className=" w-16 h-16   lg:w-[160px] lg:h-[160px] cursor-pointer border-[3px] border-gray-300 rounded-xl lg:rounded-4xl hover:border-blue-500 transition-all"
                    src={image.url}
                    width={160}
                    height={160}
                    alt={`Thumbnail ${image.id}`}
                  />
                ))}
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
  }

  export default HiroCarousel