import React from 'react';
import { CONTROL_EXPLANATIONS, ControlHelpData } from '../data/controlExplanations';
import { X, HelpCircle, BookOpen, Sparkles, Lightbulb, Compass } from 'lucide-react';
import { cameraAudio } from '../utils/audioSynthesizer';

interface HelpTooltipModalProps {
  helpId: string | null;
  onClose: () => void;
  onSelectAnotherHelp?: (id: string) => void;
}

export const HelpTooltipModal: React.FC<HelpTooltipModalProps> = ({
  helpId,
  onClose,
  onSelectAnotherHelp,
}) => {
  if (!helpId) return null;

  const data: ControlHelpData = CONTROL_EXPLANATIONS[helpId] || {
    id: helpId,
    name: 'Control de Cámara / Iluminación',
    category: 'Cámara & Óptica',
    whatIsIt: 'Parámetro técnico de ajuste manual de cámara e iluminación.',
    visualEffect: 'Modifica la exposición, nitidez, volumen o color de la imagen en tiempo real.',
    whyItHappens: 'Responde a los principios físicos de la óptica y captura de luz sobre el sensor.',
    goldenRule: 'Ajusta con precisión y evalúa el exposímetro y el histograma.',
    exampleValues: 'Ajuste manual',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 font-mono text-zinc-100">
      <div className="bg-zinc-950 border border-amber-500/60 rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/90 border-b border-zinc-800 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/50">
              ?
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                {data.category}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                {data.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-300">
          {/* 1. ¿Qué es? */}
          <div className="bg-zinc-900/70 p-3 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-200 block mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              ¿Qué es este parámetro?
            </span>
            <p className="text-zinc-400 text-[11px]">{data.whatIsIt}</p>
          </div>

          {/* 2. ¿Cómo afecta la imagen? */}
          <div className="bg-zinc-900/70 p-3 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-200 block mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ¿Cómo afecta la imagen en tiempo real?
            </span>
            <p className="text-zinc-300 text-[11px] font-medium">{data.visualEffect}</p>
          </div>

          {/* 3. ¿Por qué ocurre físicamente? */}
          <div className="bg-zinc-900/70 p-3 rounded-lg border border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-200 block mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              ¿Por qué ocurre? (La física y óptica detrás)
            </span>
            <p className="text-zinc-400 text-[11px]">{data.whyItHappens}</p>
          </div>

          {/* 4. Regla de Oro / Consejo de Director de Fotografía */}
          <div className="bg-amber-950/30 p-3.5 rounded-lg border border-amber-500/40 text-amber-200">
            <span className="text-[11px] font-bold text-amber-300 block mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Regla de Oro / Consejo de Rodaje:
            </span>
            <p className="text-[11px] text-amber-100/90 font-medium">{data.goldenRule}</p>
          </div>

          {/* 5. Valores Típicos de Ejemplo */}
          <div className="text-[10px] text-zinc-500 pt-1">
            <strong>Valores de referencia: </strong> {data.exampleValues}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-5 py-2.5 flex items-center justify-between text-xs text-zinc-400">
          <span>Manual de Instrucción para Operador de Cámara</span>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1 rounded font-bold transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
