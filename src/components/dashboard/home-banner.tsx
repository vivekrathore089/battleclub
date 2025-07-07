'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Link from 'next/link';
import { initialBanners } from "@/lib/banner-data";

export default function HomeBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {initialBanners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="p-1">
              {banner.clickable && banner.link ? (
                <Link href={banner.link}>
                  <Card className="overflow-hidden border-primary shadow-lg shadow-primary/20">
                    <CardContent className="flex aspect-[2/1] items-center justify-center p-0">
                      <Image 
                        src={banner.src} 
                        alt={banner.alt} 
                        width={600} 
                        height={300} 
                        className="w-full h-full object-cover" 
                        data-ai-hint={banner.hint}
                      />
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card className="overflow-hidden border-primary shadow-lg shadow-primary/20">
                  <CardContent className="flex aspect-[2/1] items-center justify-center p-0">
                    <Image 
                      src={banner.src} 
                      alt={banner.alt} 
                      width={600} 
                      height={300} 
                      className="w-full h-full object-cover" 
                      data-ai-hint={banner.hint}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12 hidden sm:flex" />
      <CarouselNext className="mr-12 hidden sm:flex" />
    </Carousel>
  );
}
