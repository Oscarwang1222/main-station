import { cn } from '@/lib/cn';

interface HairlineProps {
  className?: string;
  vertical?: boolean;
}

export function Hairline({ className, vertical }: HairlineProps) {
  if (vertical) {
    return <div className={cn('w-px h-full bg-hairline', className)} />;
  }
  return <div className={cn('hairline-x w-full', className)} />;
}

export default Hairline;
