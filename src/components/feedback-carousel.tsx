'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const feedbacks = [
  { src: '/feedback1.jpg', alt: 'Feedback de cliente 1' },
  { src: '/feedback2.jpg', alt: 'Feedback de cliente 2' },
];

export default function FeedbackCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm mx-auto"
    >
      <CarouselContent>
        {feedbacks.map((feedback, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
            <div className="p-1">
              <div className="relative aspect-[9/16]">
                <Image
                  src={feedback.src}
                  alt={feedback.alt}
                  fill
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
