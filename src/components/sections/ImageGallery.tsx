import React from 'react';
import Image from 'next/image';
import { ImageData } from '@/services/travel';

interface ImageGalleryProps {
  images?: ImageData[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50 border-b pb-4">
        Gallery
      </h2>
      <div className="flex flex-col gap-8 md:gap-10">
        {images.map((image, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`relative w-full md:w-[60%] aspect-[16/9] rounded-xl overflow-hidden shadow-xl group ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
            >
              <Image
                src={image.url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
