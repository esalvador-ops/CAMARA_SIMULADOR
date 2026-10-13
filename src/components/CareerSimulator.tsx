import React, { useState } from 'react';
import { CameraSettings, OpticalMetrics, CareerBrief, SceneId, StudioLight } from '../types/camera';
import { SCENE_PRESETS } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import { FRAMED_INK_CAREER_BRIEFS } from '../data/careerBriefs';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  DollarSign,
  Star,
  Camera,
  Film,
  Lightbulb,
  Check,
} from 'lucide-react';

interface CareerSimulatorProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  lights: StudioLight[];
  onSelectScene: (sceneId: SceneId) => void;
  onApplyPresetSettings: (newSettings: Partial<CameraSettings>) => void;
  onUpdateLights?: (lights: StudioLight[]) => void;
  onUpdatePropDistance?: (propId: string, distM: number) => void;
}

export const CAREER_BRIEFS: CareerBrief[] = FRAMED_INK_CAREER_BRIEFS;

export const CareerSimulator: React.FC<CareerSimulatorProps> = ({
  settings,
  opticalMetrics,
  lights,
  onSelectScene,
  onApplyPresetSettings,
  onUpdateLights,
  onUpdatePropDistance,
}) => {
  // Simulator State
  const [activeTab, setActiveTab] = useState<'brief' | 'pyramid' | 'portfolio'>('brief');
  const [currentBriefId, setCurrentBriefId] = useState<string>(CAREER_BRIEFS[0].id);
  const [completedBriefIds, setCompletedBriefIds] = useState<string[]>([]);
  const [unlockedHintsCount, setUnlockedHintsCount] = useState<Record<string, number>>({});
  const [isSurrendered, setIsSurrendered] = useState<Record<string, boolean>>({});
  const [freePracticeMode, setFreePracticeMode] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    success: boolean;
    clientFeedback: string;
    details: { label: string; pass: boolean; currentVal: string; targetVal: string; hint?: string }[];
  } | null>(null);

  const currentBrief = CAREER_BRIEFS.find((b) => b.id === currentBriefId) || CAREER_BRIEFS[0];
  const hintsRevealed = unlockedHintsCount[currentBrief.id] || 0;
  const surrendered = !!isSurrendered[currentBrief.id];
  const isCompleted = completedBriefIds.includes(currentBrief.id);

  // Player Stats
  const completedCount = completedBriefIds.length;
  const totalEarnings = completedBriefIds.reduce((sum, id) => {
    const brief = CAREER_BRIEFS.find((b) => b.id === id);
    return sum + (brief?.payoutUsd || 0);
  }, 0);

  // Determine current player rank based on 28-level cinematography progression
  const getPlayerRank = (count: number): { title: string; badge: string; color: string } => {
    if (count >= 25) return { title: 'Director de Fotografía Maestro (ASC / AMC Lead DP)', badge: '👑 MASTER CINEMATOGRAPHER', color: 'text-amber-300 border-amber-500' };
    if (count >= 21) return { title: 'Director de Fotografía Senior (Feature Film DP)', badge: '🥇 SENIOR FEATURE DP', color: 'text-yellow-400 border-yellow-500' };
    if (count >= 17) return { title: 'Director de Fotografía Jr. (Commercial DP)', badge: '🌟 COMMERCIAL DP', color: 'text-indigo-400 border-indigo-500' };
    if (count >= 13) return { title: 'Operador de Cámara de Ficción (A-Cam Operator)', badge: '🎬 A-CAM OPERATOR', color: 'text-emerald-400 border-emerald-500' };
    if (count >= 9) return { title: 'Gaffer & Jefe de Iluminación de Set', badge: '💡 CHIEF LIGHTING GAFFER', color: 'text-blue-400 border-blue-500' };
    if (count >= 5) return { title: 'Primer Asistente de Cámara (1st AC / Focus Puller)', badge: '🎯 1ST AC FOCUS PULLER', color: 'text-cyan-300 border-cyan-500' };
    return { title: 'Segundo Asistente de Cámara (2nd AC / Trainee)', badge: '🥉 2ND AC TRAINEE', color: 'text-zinc-300 border-zinc-600' };
  };

  const playerRank = getPlayerRank(completedCount);

  // Select a brief
  const handleSelectBrief = (brief: CareerBrief) => {
    cameraAudio.playDialClick();
    setCurrentBriefId(brief.id);
    setEvaluationResult(null);
    onSelectScene(brief.targetScene);
  };

  // Evaluate shot
  const handleEvaluateShot = () => {
    cameraAudio.playShutterRelease();
    const result = currentBrief.validate(settings, opticalMetrics, lights);
    setEvaluationResult(result);

    if (result.success) {
      if (!completedBriefIds.includes(currentBrief.id)) {
        setCompletedBriefIds([...completedBriefIds, currentBrief.id]);
      }
    } else {
      // Auto-unlock first didactic hint upon failure if none unlocked yet
      if (hintsRevealed === 0) {
        setUnlockedHintsCount((prev) => ({ ...prev, [currentBrief.id]: 1 }));
      }
    }
  };

  // Unlock next pedagogical hint
  const handleUnlockNextHint = () => {
    cameraAudio.playDialClick();
    setUnlockedHintsCount((prev) => ({
      ...prev,
      [currentBrief.id]: Math.min(currentBrief.didacticHints.length, (prev[currentBrief.id] || 0) + 1),
    }));
  };

  // Surrender & reveal senior DP guide
  const handleSurrender = () => {
    cameraAudio.playDialClick();
    setIsSurrendered((prev) => ({ ...prev, [currentBrief.id]: true }));
  };

  // 1-Click Apply Recommended Settings
  const handleApplySolution = () => {
    cameraAudio.playDialClick();

    // 1. Ensure required scene is loaded so lighting and background match the brief
    onSelectScene(currentBrief.targetScene);

    // 2. Apply camera optics, exposure and spatial rig parameters
    onApplyPresetSettings(currentBrief.solutionGuide.recommendedSettings);

    // 3. Synchronize 3D model physical distance in the viewport
    const targetSubjDist = currentBrief.solutionGuide.recommendedSettings.subjectDistanceM;
    if (targetSubjDist && onUpdatePropDistance) {
      onUpdatePropDistance('prop_model_main', targetSubjDist);
    }

    // 4. Update photometric 360° light rig if recommended
    if (currentBrief.solutionGuide.recommendedLights && onUpdateLights) {
      const newLights = lights.map((l) => {
        const patch = currentBrief.solutionGuide.recommendedLights?.find((rl) => rl.id === l.id);
        return patch ? { ...l, ...patch } : l;
      });
      onUpdateLights(newLights);
    }
  };

  // Advance to next brief
  const handleAdvanceToNext = () => {
    cameraAudio.playDialClick();
    const nextIdx = CAREER_BRIEFS.findIndex((b) => b.id === currentBrief.id) + 1;
    if (nextIdx < CAREER_BRIEFS.length) {
      const nextBrief = CAREER_BRIEFS[nextIdx];
      setCurrentBriefId(nextBrief.id);
      setEvaluationResult(null);
      onSelectScene(nextBrief.targetScene);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-100 font-mono shadow-2xl space-y-4">
      {/* 1. AGENCY HEADER & CAREER STATUS BANNER */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-wider text-zinc-100 uppercase">
                LUMEN Studio • Retos de Carrera y Dirección de Foto
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${playerRank.color}`}>
                {playerRank.badge}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {playerRank.title} • Plan de Carrera Cinematográfica
            </p>
          </div>
        </div>

        {/* Player Stats */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-400">Briefs Aprobados:</span>
            <span className="font-bold text-emerald-400">{completedCount} / {CAREER_BRIEFS.length}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">Honorarios:</span>
            <span className="font-bold text-amber-400">${totalEarnings.toLocaleString()} USD</span>
          </div>

          {/* Free practice mode toggle */}
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setFreePracticeMode(!freePracticeMode);
            }}
            className={`text-[10px] px-2 py-1 rounded border transition cursor-pointer ${
              freePracticeMode
                ? 'bg-purple-950/70 border-purple-500 text-purple-300'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Alternar entre progresión piramidal estricta o modo práctica libre de cualquier nivel"
          >
            {freePracticeMode ? '🔓 Práctica Libre ON' : '🔒 Progresión Pirámide'}
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs">
        <button
          onClick={() => {
            cameraAudio.playDialClick();
            setActiveTab('brief');
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'brief'
              ? 'bg-amber-500 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Brief de Rodaje #{currentBrief.level}</span>
        </button>

        <button
          onClick={() => {
            cameraAudio.playDialClick();
            setActiveTab('pyramid');
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'pyramid'
              ? 'bg-amber-500 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Mapa de Carrera (Pirámide de {CAREER_BRIEFS.length} Niveles)</span>
        </button>

        <button
          onClick={() => {
            cameraAudio.playDialClick();
            setActiveTab('portfolio');
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'portfolio'
              ? 'bg-amber-500 text-black shadow'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-400" />
          <span>Portfolio de Trabajos Aprobados ({completedCount})</span>
        </button>
      </div>

      {/* 3. HORIZONTAL BRIEF SELECTOR PILLS */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {CAREER_BRIEFS.map((b, idx) => {
          const isDone = completedBriefIds.includes(b.id);
          const isSelected = b.id === currentBrief.id;
          const isLocked = !freePracticeMode && idx > 0 && !completedBriefIds.includes(CAREER_BRIEFS[idx - 1].id);

          return (
            <button
              key={b.id}
              disabled={isLocked}
              onClick={() => handleSelectBrief(b)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md font-bold'
                  : isDone
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/40'
                  : isLocked
                  ? 'bg-zinc-950 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span>{isDone ? '✓' : isLocked ? '🔒' : `#${b.level}`}</span>
              <span className="truncate max-w-[140px]">{b.title}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENT: BRIEF DE RODAJE */}
      {activeTab === 'brief' && (
        <div className="space-y-4">
          {/* Active Client Brief Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3.5 shadow-lg">
            {/* Header / Client Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Nivel {currentBrief.level} • {currentBrief.rankTitle}
                </span>
                <span className="text-xs text-zinc-300 font-bold">
                  {currentBrief.client}
                </span>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="text-xs text-cyan-400 font-medium">
                  {currentBrief.projectType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Honorarios: ${currentBrief.payoutUsd} USD
                </span>
                {isCompleted && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> APROBADO
                  </span>
                )}
              </div>
            </div>

            {/* Title & Assignment */}
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {currentBrief.title}
              </h3>
              <p className="text-xs text-zinc-400 italic leading-relaxed bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/80">
                "{currentBrief.artisticContext}"
              </p>
            </div>

            {/* Applied Cinematography Concept */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-300 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/30">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Principio Visual Aplicado:</span>
              <strong className="text-amber-300">{currentBrief.classLesson || currentBrief.bookReference}</strong>
            </div>

            {/* Objective statement */}
            <div className="bg-zinc-900/70 p-3 rounded-lg border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                Objetivo del Brief:
              </span>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {currentBrief.objective}
              </p>
            </div>

            {/* Delivery Specs (No numbers - professional client terms) */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Criterios de Aceptación del Cliente:
              </span>
              <ul className="space-y-1 text-xs">
                {currentBrief.deliverySpecs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300">
                    <span className="text-amber-400 font-bold">›</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar: Evaluate & Set Scene */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800">
              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  onSelectScene(currentBrief.targetScene);
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>📍 Cargar Plató Requerido:</span>
                <strong className="text-white">{SCENE_PRESETS[currentBrief.targetScene].name}</strong>
              </button>

              <div className="flex items-center gap-2">
                {/* Surrender Button */}
                {!surrendered && (
                  <button
                    onClick={handleSurrender}
                    className="text-xs text-zinc-400 hover:text-amber-400 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
                    title="Pedir la guía técnica y parámetros recomendados al Director de Fotografía Senior"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Pedir Solución al Director de Foto (Rendirme)</span>
                  </button>
                )}

                {/* Primary Evaluation Trigger Button */}
                <button
                  onClick={handleEvaluateShot}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-lg text-xs transition flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>📸 Disparar y Evaluar Entrega al Cliente</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. EVALUATION FEEDBACK & CLIENT REVIEW */}
          {evaluationResult && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-3.5 transition-all duration-300 shadow-xl ${
                evaluationResult.success
                  ? 'bg-emerald-950/40 border-emerald-600/90 text-emerald-100'
                  : 'bg-red-950/40 border-red-700/90 text-red-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-700/50 pb-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {evaluationResult.success ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400">¡ENTREGA APROBADA POR EL CLIENTE!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400">EL CLIENTE HA SOLICITADO AJUSTES</span>
                    </>
                  )}
                </div>

                {evaluationResult.success && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40">
                      +${currentBrief.payoutUsd} USD Transferidos
                    </span>
                    <button
                      onClick={handleAdvanceToNext}
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-3 py-1 rounded text-xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Siguiente Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Client Review Statement */}
              <p className="text-xs leading-relaxed italic bg-black/40 p-2.5 rounded border border-zinc-800">
                "{evaluationResult.clientFeedback}"
              </p>

              {/* Technical Criteria Checklist */}
              <div className="space-y-1.5 pt-1">
                {evaluationResult.details.map((detail, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-between gap-1 text-[11px] bg-black/30 px-2.5 py-1.5 rounded">
                    <span className="flex items-center gap-1.5">
                      {detail.pass ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className="font-medium text-zinc-200">{detail.label}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={detail.pass ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {detail.currentVal}
                      </span>
                      <span className="text-zinc-500">(Meta: {detail.targetVal})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. DIDACTIC PROGRESSIVE HINTS (NO SPOILERS) */}
          {hintsRevealed > 0 && (
            <div className="bg-zinc-950 border border-amber-500/30 rounded-xl p-4 space-y-2.5 shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Pistas y Consejos de Producción ({hintsRevealed}/{currentBrief.didacticHints.length})</span>
                </span>

                {hintsRevealed < currentBrief.didacticHints.length && (
                  <button
                    onClick={handleUnlockNextHint}
                    className="text-[11px] text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30 transition cursor-pointer"
                  >
                    💡 Revelar siguiente pista reflexiva
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {currentBrief.didacticHints.slice(0, hintsRevealed).map((hint, idx) => (
                  <div key={idx} className="text-xs text-zinc-300 bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 font-bold">Pista {idx + 1}:</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. SURRENDER / SENIOR DP GUIDE (IF SURRENDERED) */}
          {surrendered && (
            <div className="bg-purple-950/40 border border-purple-500/60 rounded-xl p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    Solución y Análisis Técnico del Director de Fotografía
                  </h4>
                </div>
                <button
                  onClick={handleApplySolution}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 shadow cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Aplicar Ajustes Recomendados a la Cámara</span>
                </button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-purple-900/50">
                <strong className="text-purple-300">Fundamento Teórico: </strong>
                {currentBrief.solutionGuide.explanation}
              </p>

              <div className="flex items-center justify-between text-xs bg-zinc-900/80 px-3 py-2 rounded-lg border border-zinc-800">
                <span className="text-zinc-400">Valores Óptimos Recomendados:</span>
                <span className="font-bold text-amber-400">{currentBrief.solutionGuide.summaryText}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8. TAB CONTENT: PYRAMID ROADMAP */}
      {activeTab === 'pyramid' && (
        <div className="space-y-4">
          <div className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex items-center justify-between">
            <span>
              La pirámide pedagógica de carrera progresa desde los fundamentos del marco hasta la gran escala épica.
            </span>
            <span className="font-bold text-amber-400">
              {completedCount} de {CAREER_BRIEFS.length} Niveles Conquistados
            </span>
          </div>

          <div className="space-y-3">
            {CAREER_BRIEFS.map((b, idx) => {
              const isDone = completedBriefIds.includes(b.id);
              const isSelected = b.id === currentBrief.id;
              const isLocked = !freePracticeMode && idx > 0 && !completedBriefIds.includes(CAREER_BRIEFS[idx - 1].id);

              return (
                <div
                  key={b.id}
                  onClick={() => !isLocked && handleSelectBrief(b)}
                  className={`p-3.5 rounded-xl border transition flex flex-wrap items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-lg'
                      : isDone
                      ? 'bg-zinc-950/70 border-emerald-900/60 hover:border-emerald-700'
                      : isLocked
                      ? 'bg-zinc-950/30 border-zinc-900 opacity-50 cursor-not-allowed'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isDone
                          ? 'bg-emerald-500 text-black'
                          : isLocked
                          ? 'bg-zinc-900 text-zinc-600'
                          : 'bg-zinc-800 text-zinc-200'
                      }`}
                    >
                      {isDone ? '✓' : isLocked ? '🔒' : `#${b.level}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{b.title}</span>
                        <span className="text-[10px] text-zinc-400">{b.rankTitle}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{b.client} • {b.projectType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-400 font-bold">${b.payoutUsd} USD</span>
                    <button
                      disabled={isLocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isLocked) handleSelectBrief(b);
                      }}
                      className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-black'
                          : isDone
                          ? 'bg-zinc-800 text-zinc-300 hover:text-white'
                          : isLocked
                          ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isSelected ? 'En Curso 🎯' : isDone ? 'Revisar' : isLocked ? 'Bloqueado' : 'Comenzar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 9. TAB CONTENT: PORTFOLIO ARCHIVE */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Portfolio Oficial de Producción</h3>
              <p className="text-xs text-zinc-400">Trabajos acreditados y aprobados por clientes en el simulador</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-emerald-400">${totalEarnings.toLocaleString()} USD</div>
              <div className="text-[10px] text-zinc-500">Total Ganado en la Carrera</div>
            </div>
          </div>

          {completedCount === 0 ? (
            <div className="text-center py-10 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
              <Camera className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400">Aún no has completado tu primera entrega.</p>
              <p className="text-[11px] text-zinc-500">Regresa a la pestaña "Brief de Rodaje" y completa el Nivel 1.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {completedBriefIds.map((id) => {
                const b = CAREER_BRIEFS.find((item) => item.id === id);
                if (!b) return null;
                return (
                  <div key={b.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Nivel {b.level} • {b.rankTitle}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">${b.payoutUsd} USD</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{b.title}</h4>
                    <p className="text-[11px] text-zinc-400">{b.client}</p>
                    <div className="pt-1 text-[10px] text-zinc-500 flex items-center justify-between border-t border-zinc-800/80">
                      <span>Plató: {SCENE_PRESETS[b.targetScene].name}</span>
                      <span className="text-emerald-400 font-bold">✓ Entrega Certificada</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
