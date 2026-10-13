import React from 'react';
import { SlateMetadata } from '../types/camera';
import { X, RefreshCw, Check, Film } from 'lucide-react';
import { cameraAudio } from '../utils/audioSynthesizer';

interface SlateModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: SlateMetadata;
  onUpdateMetadata: (meta: Partial<SlateMetadata>) => void;
}

export const SlateModal: React.FC<SlateModalProps> = ({
  isOpen,
  onClose,
  metadata,
  onUpdateMetadata,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-zinc-950 border border-zinc-700 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl font-mono text-zinc-100 flex flex-col">
        {/* Clapper Stripes Header */}
        <div className="h-10 bg-zinc-900 border-b border-zinc-700 flex overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`w-12 h-full skew-x-[-30deg] ${
                i % 2 === 0 ? 'bg-zinc-950' : 'bg-white'
              }`}
            />
          ))}
        </div>

        {/* Header Bar */}
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
              Pizarra Virtual (Slate & Metadatos de Rodaje)
            </h2>
          </div>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs overflow-y-auto max-h-[70vh]">
          {/* Project Name */}
          <div>
            <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
              Nombre del Proyecto / Producción:
            </label>
            <input
              type="text"
              value={metadata.projectName}
              onChange={(e) => onUpdateMetadata({ projectName: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 font-bold focus:outline-none focus:border-amber-500"
              placeholder="Ej. Cortometraje CineSim 2026"
            />
          </div>

          {/* Reel, Scene, Shot, Take Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Reel */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-lg text-center">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Rollo (Reel)</span>
              <input
                type="number"
                min={1}
                value={metadata.reelNumber}
                onChange={(e) => onUpdateMetadata({ reelNumber: parseInt(e.target.value) || 1 })}
                className="w-full bg-zinc-950 text-center font-bold text-base text-zinc-100 border border-zinc-700 rounded py-1"
              />
            </div>

            {/* Scene */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-lg text-center">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Escena (Scene)</span>
              <input
                type="text"
                value={metadata.sceneNumber}
                onChange={(e) => onUpdateMetadata({ sceneNumber: e.target.value })}
                className="w-full bg-zinc-950 text-center font-bold text-base text-zinc-100 border border-zinc-700 rounded py-1"
              />
            </div>

            {/* Shot */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-lg text-center">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Plano (Shot)</span>
              <input
                type="text"
                value={metadata.shotNumber}
                onChange={(e) => onUpdateMetadata({ shotNumber: e.target.value })}
                className="w-full bg-zinc-950 text-center font-bold text-base text-zinc-100 border border-zinc-700 rounded py-1"
              />
            </div>

            {/* Take with Auto-increment */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-3 rounded-lg text-center relative">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1">Toma (Take)</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  value={metadata.takeNumber}
                  onChange={(e) => onUpdateMetadata({ takeNumber: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-950 text-center font-bold text-base text-amber-400 border border-zinc-700 rounded py-1"
                />
                <button
                  onClick={() => onUpdateMetadata({ autoIncrementTake: !metadata.autoIncrementTake })}
                  className={`p-1.5 rounded transition ${
                    metadata.autoIncrementTake
                      ? 'bg-amber-500 text-black shadow'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title="Auto-incrementar toma al disparar o grabar"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Shot Type & Lens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
                Encuadre (Angle / Shot):
              </label>
              <div className="flex gap-2">
                {(['WS', 'MS', 'MCU', 'CU', 'ECU'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => onUpdateMetadata({ shotType: type })}
                    className={`flex-1 py-1.5 rounded text-xs font-bold border transition cursor-pointer ${
                      metadata.shotType === type
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
                Modelo de Lente:
              </label>
              <input
                type="text"
                value={metadata.lensModel}
                onChange={(e) => onUpdateMetadata({ lensModel: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Director & Operator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
                Director / Docente:
              </label>
              <input
                type="text"
                value={metadata.director}
                onChange={(e) => onUpdateMetadata({ director: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
                Operador / Alumno:
              </label>
              <input
                type="text"
                value={metadata.cameraOperator}
                onChange={(e) => onUpdateMetadata({ cameraOperator: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Comments & Keywords */}
          <div>
            <label className="text-zinc-400 block mb-1 text-[11px] uppercase tracking-wider">
              Notas y Palabras Clave (Keywords):
            </label>
            <input
              type="text"
              value={metadata.comments}
              onChange={(e) => onUpdateMetadata({ comments: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-zinc-100 focus:outline-none focus:border-amber-500"
              placeholder="Ej. Prueba de bokeh f/1.4, filtro ND, luz lateral"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            Los metadatos se guardarán en los archivos generados y capturas.
          </span>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Actualizar Claqueta
          </button>
        </div>
      </div>
    </div>
  );
};
