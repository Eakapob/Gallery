"use client";

type TagListProps = {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
};

export default function TagList({ allTags, selectedTags, onToggleTag }: TagListProps) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`px-2 py-1 rounded ${
            selectedTags.includes(tag)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => onToggleTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
