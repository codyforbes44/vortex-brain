import React from 'react';
import Search from '@/components/search';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useAnimateIn } from '@/lib/animations';
import { SEOHead } from '@/components/SEOHead';

const SearchPage = () => {
  const showContent = useAnimateIn(false, 300);
  
  return (
    <div className="max-w-full mx-auto px-4 pt-24 pb-6">
      <SEOHead 
        title="AI Search"
        description="Search your knowledge base with Vortex's AI-powered semantic search. Find anything instantly using natural language queries."
        keywords="AI search, semantic search, knowledge search, second brain search"
        ogImage="/og-search.png"
        ogImageAlt="Vortex - AI-Powered Search"
        noIndex={true}
      />
      <AnimatedTransition show={showContent} animation="slide-up">
        <Search />
      </AnimatedTransition>
    </div>
  );
};

export default SearchPage;
