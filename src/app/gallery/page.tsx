"use client";

import { useEffect, useState, useRef } from "react";
import GalleryGrid from "@/components/GalleryGrid";
import TagList from "@/components/TagList";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const totalPagesRef = useRef(0);
  const [loading, setLoading] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  const pageSize = 12;

  const fetchImages = async (pageToLoad: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const res = await fetch(`/api/images?page=${pageToLoad}&limit=12`);
    const data = await res.json();

    setImages((prev) => [...prev, ...data.images]);
    setTotal(data.total);

    // Update allTags
    const newTags = data.images.flatMap((img: any) => img.hashtags);
    setAllTags((prev) => Array.from(new Set([...prev, ...newTags])));

    pageRef.current = pageToLoad;
    totalPagesRef.current = Math.ceil(data.total / pageSize);
    loadingRef.current = false;
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(1);
  }, []);

  // scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (!loadingRef.current && pageRef.current < totalPagesRef.current) {
          fetchImages(pageRef.current + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredImages =
    selectedTags.length === 0
      ? images
      : images.filter((img) =>
          selectedTags.every((tag) => img.hashtags.includes(tag))
        );

  return (
    <div>
      <h1>Image Gallery</h1>
      <TagList
        allTags={allTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
      />
      <GalleryGrid images={filteredImages} />
      {loading && <p>Loading...</p>}
    </div>
  );
}
