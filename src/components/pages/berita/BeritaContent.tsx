/** @format */

// components/berita/BeritaContent.tsx
"use client";

interface BeritaContentProps {
  content: string;
  className?: string;
}

const BeritaContent = ({ content, className = "" }: BeritaContentProps) => {
  return (
    <div
      className={`mt-6 prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BeritaContent;
