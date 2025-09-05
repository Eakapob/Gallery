"use client";

import GalleryImage from "./GalleryImage";

export default function GalleryGrid({ images }: { images: any[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((img, index) => (
        <GalleryImage key={`${img.id}-${index}`} image={img} />
      ))}
    </div>
  );
}
