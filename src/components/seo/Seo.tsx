import React, { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      const existing = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;
      if (existing) existing.content = description;
      else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = description;
        document.head.appendChild(m);
      }
    }

    const href = canonical || window.location.href;
    let link = document.querySelector('link[rel="canonical"]') as
      | HTMLLinkElement
      | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [title, description, canonical]);

  return null;
};

export default Seo;
