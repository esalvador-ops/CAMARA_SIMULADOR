import React, { useMemo } from 'react';
import { OpticalMetrics } from '../types/camera';

interface LiveHistogramProps {
  opticalMetrics: OpticalMetrics;
  sceneCategory: string;
  onOpenHelp?: (helpId: string) => void;
}

export const LiveHistogram: React.FC<LiveHistogramProps> = ({ opticalMetrics, onOpenHelp }) => {
  const evDelta = opticalMetrics.exposureDeltaEV;

  // Generate a realistic bell curve / histogram distribution based on exposureDeltaEV
  const histogramPoints = useMemo(() => {
    const bins = 64;
    // Mean center shifted by exposureDeltaEV (-3 to +3 stops)
    const centerNorm = Math.max(0.08, Math.min(0.92, 0.5 + evDelta * 0.14));
    const variance = 0.035;

    const points: { luma: number; r: number; g: number; b: number }[] = [];
    for (let i = 0; i < bins; i++) {
      const x = i / (bins - 1);
      // Gaussian distribution
      const luma = Math.exp(-Math.pow(x - centerNorm, 2) / (2 * variance));
      const r = Math.exp(-Math.pow(x - (centerNorm + 0.03), 2) / (2 * variance));
      const g = Math.exp(-Math.pow(x - centerNorm, 2) / (2 * variance));
      const b = Math.exp(-Math.pow(x - (centerNorm - 0.03), 2) / (2 * variance));

      points.push({ luma, r, g, b });
    }
    return points;
  }, [evDelta]);

  const maxVal = 1.0;
  const h = 54;
  const w = 180;

  // Build SVG paths for Luma, R, G, B
  const makePath = (key: 'luma' | 'r' | 'g' | 'b') => {
    return histogramPoints
      .map((pt, i) => {
        const x = (i / (histogramPoints.length - 1)) * w;
        const y = h - (pt[key] / maxVal) * (h - 6);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const isShadowCrushed = evDelta < -2.2;
  const isHighlightClipped = evDelta > 2.2;

  return (
    <div className="bg-zinc-950/90 border border-zinc-800 rounded p-2 text-zinc-100 font-mono select-none">
      <div className="flex items-center justify-between text-[9px] text-zinc-400 mb-1">
        <div className="flex items-center gap-1.5">
          <span>HISTOGRAMA RGB / ETTR</span>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('histogram')}
              className="text-zinc-500 hover:text-amber-400 font-bold cursor-pointer"
              title="¿Cómo leer el histograma y exponer a la derecha (ETTR)?"
            >
              ?
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isShadowCrushed && <span className="text-blue-400 font-bold">● SUB</span>}
          {isHighlightClipped && <span className="text-red-500 font-bold animate-pulse">● CLIP</span>}
          {!isShadowCrushed && !isHighlightClipped && <span className="text-emerald-400 font-bold">● ETTR OK</span>}
        </div>
      </div>

      <div className="relative border border-zinc-800 bg-zinc-900/60 rounded overflow-hidden">
        <svg width={w} height={h} className="w-full h-12 block">
          {/* Subtle grid lines */}
          <line x1={w * 0.25} y1={0} x2={w * 0.25} y2={h} stroke="#27272a" strokeWidth={1} />
          <line x1={w * 0.5} y1={0} x2={w * 0.5} y2={h} stroke="#27272a" strokeWidth={1} />
          <line x1={w * 0.75} y1={0} x2={w * 0.75} y2={h} stroke="#27272a" strokeWidth={1} />

          {/* Color channels */}
          <path d={makePath('r')} fill="none" stroke="#ef4444" strokeWidth="1.2" opacity={0.6} />
          <path d={makePath('g')} fill="none" stroke="#22c55e" strokeWidth="1.2" opacity={0.6} />
          <path d={makePath('b')} fill="none" stroke="#3b82f6" strokeWidth="1.2" opacity={0.6} />
          {/* Master Luminance Curve */}
          <path d={makePath('luma')} fill="none" stroke="#f4f4f5" strokeWidth="1.8" />
        </svg>

        {/* Shadow and highlight clipping bars */}
        {isShadowCrushed && (
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-blue-600/80 shadow-[0_0_8px_#2563eb]" />
        )}
        {isHighlightClipped && (
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-red-600/80 shadow-[0_0_8px_#dc2626] animate-pulse" />
        )}
      </div>

      <div className="flex justify-between text-[8px] text-zinc-500 mt-1">
        <span>0 (Negros)</span>
        <span>18% Gris</span>
        <span>255 (Altas luces)</span>
      </div>
    </div>
  );
};
