import { Loader2 } from 'lucide-react';
import React from 'react';

export default function PageLoadingUI() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
}
