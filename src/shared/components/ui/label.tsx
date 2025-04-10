import * as React from 'react';
import { cn } from '@/shared/utils/tailwind-merge';
import * as LabelPrimitive from '@radix-ui/react-label';



const Label = (({ className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(className)}
    {...props}
  />
));

export { Label };
