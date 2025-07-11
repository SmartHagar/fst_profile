/** @format */

// components/berita/BeritaContent.tsx
"use client";

interface BeritaContentProps {
  content: string;
  className?: string;
}

const BeritaContent = ({ content, className = "" }: BeritaContentProps) => {
  return (
    <article
      className={`prose lg:prose-xl prose-img:rounded-xl prose-img:-mb-6 prose-img:mt-0 max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BeritaContent;
