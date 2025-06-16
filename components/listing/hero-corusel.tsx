"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import AxiosInstance from "@/lib/axios";

function HeroCarousel() {
  const [banners, setBanners] = useState<{ image: string; title?: string }[]>([
    { image: "/images/product-bg.svg" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await AxiosInstance.get("/banner");
        if (res.data && Array.isArray(res.data)) {
          setBanners(res.data.length > 0 ? res.data : [{ image: "/product-bg.svg" }]);
        }
      } catch (error) {
        console.error("Bannerlarni yuklashda xato:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[149px] lg:h-[565px] bg-gray-200 animate-pulse rounded-2xl lg:rounded-[48px]" />
    );
  }

  return (
    <div className="relative ">
      <Carousel className="overflow-hidden rounded-2xl lg:rounded-[48px]">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div
                className="relative w-full h-[149px] sm:h-[250px] md:h-[300px] lg:h-[395px] bg-cover bg-center"
                style={{ backgroundImage: `url('${banner.image}')` }}
              >
                <div className="absolute inset-0 flex flex-col gap-2 sm:gap-3 lg:gap-4 justify-center px-4 sm:px-6 lg:px-12 text-white">
                  <p className="text-sm sm:text-base lg:text-2xl font-normal lg:font-semibold">
                    Limited time only
                  </p>
                  <h2 className="text-xl sm:text-3xl lg:text-[74px] font-bold lg:leading-[80px]">
                    {banner.title || "Get 30% off"}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-[20px] max-w-[300px] sm:max-w-[450px] lg:max-w-[550px]">
                    Sneakers made with your comfort in mind so you can put all of your focus into your next session.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {banners.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 hidden lg:flex" />
            <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 hidden lg:flex" />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
