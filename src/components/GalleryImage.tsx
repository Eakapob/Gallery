"use client";

export default function GalleryImage({ image }: { image: any }) {
  return (
    <div className="border rounded-lg">
      <img src={image.src} alt={`Image ${image.id}`} className="w-full" />
      <div className="p-2">
        {image.hashtags.map((tag: string, i: number) => (
          <span key={i} className="inline-block rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
