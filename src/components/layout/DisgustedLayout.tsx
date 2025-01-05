import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const DisgustedLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};