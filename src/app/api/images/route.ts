import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const tagPool = [
    "nature",
    "city",
    "mountain",
    "night",
    "travel",
    "sunset",
    "people",
    "holiday",
  ];
  const randomTags = () =>
    Array.from(
      { length: Math.floor(Math.random() * 4) + 1 },
      () => tagPool[Math.floor(Math.random() * tagPool.length)]
    );

  const randomSize = () => {
    const w = Math.floor(Math.random() * 200) + 250;
    const h = Math.floor(Math.random() * 200) + 250;
    return { w, h };
  };

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);

  const allImages = Array.from({ length: 100 }, (_, i) => {
    const { w, h } = randomSize();
    return {
      id: i + 1,
      src: `https://placehold.co/${w}x${h}?text=Image+${i + 1}`,
      width: w,
      height: h,
      hashtags: randomTags(),
    };
  });

  // pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const images = allImages.slice(start, end);

  return NextResponse.json({ images, total: allImages.length });
}
