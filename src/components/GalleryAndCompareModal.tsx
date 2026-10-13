import React, { useState } from 'react';
import { ShotSnapshot } from '../types/camera';
import { X, SplitSquareVertical, Trash2, Camera, Download, Layers } from 'lucide-react';
import { formatShutterSpeed } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';

interface GalleryAndCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  snapshots: ShotSnapshot[];
  onDeleteSnapshot: (id: string) => void;
  onClearAll: () => void;
}

export const GalleryAndCompareModal: React.FC<GalleryAndCompareModalProps> = ({
  isOpen,
  onClose,
  snapshots,
  onDeleteSnapshot,
  onClearAll,
}) => {
  const [selectedAId, setSelectedAId] = useState<string | null>(null);
  const [selectedBId, setSelectedBId] = useState<string | null>(null);
  const [splitPos, setSplitPos] = useState<number>(50); // 0 to 100%

  if (!isOpen) return null;

  const shotA = snapshots.find((s) => s.id === selectedAId) || snapshots[0] || null;
  const shotB = snapshots.find((s) => s.id === selectedBId) || (snapshots.length > 1 ? snapshots[1] : null);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 font-mono">
      <div className="bg-zinc-950 border border-zinc-700/80 rounded-xl w-full max-w-5xl h-[620px] flex flex-col shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
              Galería de Tomas & Comparador A/B de Parámetros
            </h2>
            <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
              {snapshots.length} capturas
            </span>
          </div>
          <div className="flex items-center gap-2">
            {snapshots.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-zinc-800 transition"
              >
                Borrar Todo
              </button>
            )}
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
        </div>

        {/* Main Content Area */}
        {snapshots.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500">
            <Camera className="w-12 h-12 stroke-[1.2] mb-3 text-zinc-600" />
            <p className="text-sm font-bold text-zinc-400">No hay capturas guardadas aún</p>
            <p className="text-xs text-zinc-600 mt-1 max-w-md">
              Presiona el botón "DISPARAR FOTO" en los controles físicos para tomar una fotografía de prueba y compararla con otros ajustes.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Thumbnails Strip */}
            <div className="w-full md:w-80 bg-zinc-900/60 border-r border-zinc-800 p-3 overflow-y-auto space-y-3">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Historial de Capturas:
              </span>

              {snapshots.map((shot, idx) => {
                const isSelectedA = shot.id === selectedAId || (!selectedAId && idx === 0);
                const isSelectedB = shot.id === selectedBId || (!selectedBId && idx === 1);

                return (
                  <div
                    key={shot.id}
                    className={`p-2.5 rounded-lg border text-xs transition relative group ${
                      isSelectedA
                        ? 'border-cyan-500 bg-cyan-950/20'
                        : isSelectedB
                        ? 'border-amber-500 bg-amber-950/20'
                        : 'border-zinc-800 bg-zinc-900/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex gap-2">
                      <img
                        src={shot.thumbnailUrl}
                        alt="thumbnail"
                        className="w-20 h-14 object-cover rounded border border-zinc-800 shrink-0 bg-black"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-zinc-200 truncate">{shot.sceneName}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSnapshot(shot.id);
                            }}
                            className="text-zinc-500 hover:text-red-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          f/{shot.settings.aperture} • 1/{shot.settings.shutterSpeedInv}s • ISO {shot.settings.iso}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {shot.settings.focalLengthMm}mm • DoF: {(shot.dofTotalM * 100).toFixed(0)}cm
                        </div>
                      </div>
                    </div>

                    {/* Compare selector buttons */}
                    <div className="flex gap-1.5 mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px]">
                      <button
                        onClick={() => setSelectedAId(shot.id)}
                        className={`flex-1 py-0.5 rounded font-bold cursor-pointer ${
                          isSelectedA ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Toma [A]
                      </button>
                      <button
                        onClick={() => setSelectedBId(shot.id)}
                        className={`flex-1 py-0.5 rounded font-bold cursor-pointer ${
                          isSelectedB ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        Toma [B]
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Comparative View */}
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              {shotA && (
                <div className="flex-1 flex flex-col space-y-4">
                  {/* Split Screen Image Viewer */}
                  <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden border border-zinc-800 flex items-center justify-center">
                    {shotB ? (
                      <>
                        {/* Image B under */}
                        <img
                          src={shotB.thumbnailUrl}
                          alt="Shot B"
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                        {/* Image A clipped on top */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${splitPos}%` }}
                        >
                          <img
                            src={shotA.thumbnailUrl}
                            alt="Shot A"
                            className="absolute top-0 left-0 max-w-none h-full"
                            style={{ width: '100%' }}
                          />
                        </div>

                        {/* Split dividing line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_#ffffff] cursor-ew-resize"
                          style={{ left: `${splitPos}%` }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black p-1 rounded-full shadow text-[10px]">
                            ⇄
                          </div>
                        </div>

                        {/* Labels A and B */}
                        <div className="absolute top-2 left-2 bg-cyan-600/90 text-black font-bold px-2 py-0.5 rounded text-[10px]">
                          TOMA [A]
                        </div>
                        <div className="absolute top-2 right-2 bg-amber-500/90 text-black font-bold px-2 py-0.5 rounded text-[10px]">
                          TOMA [B]
                        </div>
                      </>
                    ) : (
                      <img
                        src={shotA.thumbnailUrl}
                        alt="Shot A"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Split Slider Control */}
                  {shotB && (
                    <div className="flex items-center gap-3 text-xs bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 font-bold text-[10px]">LÍNEA DIVISORIA A/B:</span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={splitPos}
                        onChange={(e) => setSplitPos(parseInt(e.target.value))}
                        className="flex-1 accent-white h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
                      />
                      <span className="text-zinc-300 text-[10px] w-10 text-right">{splitPos}%</span>
                    </div>
                  )}

                  {/* Comparative Metrics Table */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    {/* Data for Shot A */}
                    <div className="bg-zinc-900/70 border border-cyan-800/80 p-3 rounded-lg space-y-1.5">
                      <div className="font-bold text-cyan-400 text-sm border-b border-zinc-800 pb-1">
                        TOMA A ({shotA.sceneName})
                      </div>
                      <div>Apertura: <strong className="text-zinc-100">f/{shotA.settings.aperture}</strong></div>
                      <div>Obturador: <strong className="text-zinc-100">1/{shotA.settings.shutterSpeedInv}s</strong></div>
                      <div>ISO: <strong className="text-zinc-100">{shotA.settings.iso}</strong></div>
                      <div>Focal: <strong className="text-zinc-100">{shotA.settings.focalLengthMm}mm</strong></div>
                      <div>DoF Total: <strong className="text-emerald-400">{(shotA.dofTotalM * 100).toFixed(1)} cm</strong></div>
                      <div>Exposición: <strong className="text-zinc-100">{shotA.exposureDeltaEV > 0 ? `+${shotA.exposureDeltaEV}` : shotA.exposureDeltaEV} EV</strong></div>
                      <div>Balance Blancos: <strong className="text-zinc-100">{shotA.settings.whiteBalanceK}K</strong></div>
                      <div>Luces en Set: <strong className="text-amber-400">{shotA.lightsCount} focos activos</strong></div>
                      {shotA.notes && <div className="text-[10px] text-zinc-400 border-t border-zinc-800 pt-1">{shotA.notes}</div>}
                    </div>

                    {/* Data for Shot B */}
                    {shotB ? (
                      <div className="bg-zinc-900/70 border border-amber-800/80 p-3 rounded-lg space-y-1.5">
                        <div className="font-bold text-amber-400 text-sm border-b border-zinc-800 pb-1">
                          TOMA B ({shotB.sceneName})
                        </div>
                        <div>Apertura: <strong className="text-zinc-100">f/{shotB.settings.aperture}</strong></div>
                        <div>Obturador: <strong className="text-zinc-100">1/{shotB.settings.shutterSpeedInv}s</strong></div>
                        <div>ISO: <strong className="text-zinc-100">{shotB.settings.iso}</strong></div>
                        <div>Focal: <strong className="text-zinc-100">{shotB.settings.focalLengthMm}mm</strong></div>
                        <div>DoF Total: <strong className="text-emerald-400">{(shotB.dofTotalM * 100).toFixed(1)} cm</strong></div>
                        <div>Exposición: <strong className="text-zinc-100">{shotB.exposureDeltaEV > 0 ? `+${shotB.exposureDeltaEV}` : shotB.exposureDeltaEV} EV</strong></div>
                        <div>Balance Blancos: <strong className="text-zinc-100">{shotB.settings.whiteBalanceK}K</strong></div>
                        <div>Luces en Set: <strong className="text-amber-400">{shotB.lightsCount} focos activos</strong></div>
                        {shotB.notes && <div className="text-[10px] text-zinc-400 border-t border-zinc-800 pt-1">{shotB.notes}</div>}
                      </div>
                    ) : (
                      <div className="bg-zinc-900/40 border border-dashed border-zinc-800 p-4 rounded-lg flex items-center justify-center text-center text-zinc-500 text-xs">
                        Selecciona una segunda captura de la lista para comparar parámetros lado a lado
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
