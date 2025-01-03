import React from 'react';

interface Props {
  className?: string;
}

export const SearchIcon: React.FC<Props> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a1 1 0 01-1.414 1.414l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
  </svg>
);