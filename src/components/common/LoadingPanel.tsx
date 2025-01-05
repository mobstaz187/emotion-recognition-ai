```typescript
import React from 'react';

interface Props {
  message: string;
}

export const LoadingPanel: React.FC<Props> = ({ message }) => (
  <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
    <div className="h-[140px] flex items-center justify-center">
      <div className="text-primary animate-pulse">{message}</div>
    </div>
  </div>
);
```