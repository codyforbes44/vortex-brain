import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const defaultMeta = {
  siteName: 'Vortex',
  title: 'Vortex - Your Personal AI-Powered Second Brain | Knowledge Management',
  description: 'Vortex is an AI-powered personal knowledge management system. Organize notes, bookmarks, articles, and ideas in one private second brain. Search intelligently, connect ideas, and never forget what matters.',
  keywords: 'second brain, personal knowledge management, PKM, AI notes app, note-taking, knowledge base, digital brain, bookmarks manager, information organization, AI search, semantic search, knowledge graph',
  ogImage: '/og-image.png',
  twitterHandle: '@vortexapp',
};

export const SEOHead = ({
  title,
  description,
  keywords,
  ogImage,
  ogImageAlt,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
}: SEOHeadProps) => {
  const fullTitle = title 
    ? `${title} | Vortex` 
    : defaultMeta.title;
  
  const metaDescription = description || defaultMeta.description;
  const metaKeywords = keywords || defaultMeta.keywords;
  const metaOgImage = ogImage || defaultMeta.ogImage;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullOgImage = metaOgImage.startsWith('http') ? metaOgImage : `${baseUrl}${metaOgImage}`;
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Vortex" />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt || "Vortex - Your Personal AI Engine"} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt || "Vortex - Your Personal AI Engine"} />
      
      {/* Additional SEO */}
      <meta name="application-name" content="Vortex" />
      <meta name="apple-mobile-web-app-title" content="Vortex" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
