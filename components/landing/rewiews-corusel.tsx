"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const ReviewsCarousel = () => {
  return (
    <Carousel className="" opts={{ align: "start" }}>
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="w-full sm:basis-full md:basis-1/2 lg:basis-1/3 px-2"
          >
            <Card className="flex flex-col justify-between h-full rounded-[32px] overflow-hidden shadow-md">
              <CardHeader className="flex flex-row justify-between items-start gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-primary text-2xl font-bold">
                    Good Quality
                  </h3>
                  <p className="text-gray-700 text-base max-w-[260px]">
                    I highly recommend shopping from Kicks.
                  </p>
                  <div className="flex gap-2 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        className="fill-yellow-500 stroke-yellow-500 size-4"
                        key={i}
                      />
                    ))}
                    <span className="text-primary text-lg font-medium">5.0</span>
                  </div>
                </div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/avatar.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </CardHeader>
              <Image
                className="w-full h-[300px] object-cover"
                src="/revyu1.jpg"
                width={600}
                height={300}
                alt="Customer review"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Optional next/prev buttons */}
    
    </Carousel>
  );
};

export default ReviewsCarousel;
