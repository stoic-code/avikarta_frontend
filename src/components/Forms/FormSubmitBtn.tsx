import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FormSubmitBtn({
  isLoading,
  children,
  classname,
}: {
  isLoading: boolean;
  children: ReactNode;
  classname?: any;
}) {
  return (
    <Button
      type="submit"
      className={cn(
        `rounded-lg bg-primary px-6 py-2 font-bold text-white hover:bg-blue-600 hover:bg-primary/80`,
        classname
      )}
    >
      {isLoading ? (
        <div>
          <Loader2 className="animate-spin text-base text-muted" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
