import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AuroraProps {
  className?: string;
  intensity?: 'low' | 'mid' | 'high';
}

export function Aurora({ className, intensity = 'mid' }: AuroraProps) {
  const reduced = useReducedMotion();
  const scale = intensity === 'high' ? 1.2 : intensity === 'low' ? 0.7 : 1;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <div
        className={`absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full ${
          reduced ? '' : 'animate-aurora-1'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(91,199,255,0.35) 0%, rgba(91,199,255,0.1) 35%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `scale(${scale})`,
        }}
      />
      <div
        className={`absolute -top-1/3 right-0 h-[90vh] w-[90vh] rounded-full ${
          reduced ? '' : 'animate-aurora-2'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(124,58,237,0.32) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)',
          filter: 'blur(100px)',
          transform: `scale(${scale})`,
        }}
      />
      <div
        className={`absolute bottom-0 left-1/3 h-[70vh] w-[70vh] rounded-full ${
          reduced ? '' : 'animate-aurora-3'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,122,23,0.18) 0%, rgba(255,122,23,0.05) 40%, transparent 70%)',
          filter: 'blur(90px)',
          transform: `scale(${scale})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.95) 100%)',
        }}
      />
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(8%, 5%) scale(1.08) rotate(8deg); }
          66% { transform: translate(-4%, 8%) scale(0.95) rotate(-6deg); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(-10%, 6%) scale(1.12) rotate(-10deg); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6%, -8%) scale(1.15); }
        }
        .animate-aurora-1 { animation: aurora-1 24s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 28s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Aurora;
