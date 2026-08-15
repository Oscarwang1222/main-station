import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'mid' | 'low';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    const reduceData = matchMedia('(prefers-reduced-data: reduce)').matches;
    const isMobile = matchMedia('(max-width: 768px)').matches;
    if (reduceData || mem < 2) setTier('low');
    else if (isMobile || cores < 4 || mem < 4) setTier('mid');
    else setTier('high');
  }, []);
  return tier;
}
