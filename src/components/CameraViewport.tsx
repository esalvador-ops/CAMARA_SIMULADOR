import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { CameraSettings, OpticalMetrics, ScenePreset, StudioLight, SceneProp, ModelPose, SceneId } from '../types/camera';
import { SENSOR_FORMATS } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import { Smartphone, Monitor, Grid, Sparkles } from 'lucide-react';

interface CameraViewportProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  scene: ScenePreset;
  lights: StudioLight[];
  sceneProps?: SceneProp[];
  onTapFocus?: (distanceM: number) => void;
  onUpdateSettings?: (newSettings: Partial<CameraSettings>) => void;
  onSelectScene?: (sceneId: SceneId) => void;
  onOpenHelp?: (helpId: string) => void;
  isTakingPhoto?: boolean;
}

export const CameraViewport: React.FC<CameraViewportProps> = ({
  settings,
  opticalMetrics,
  scene,
  lights,
  sceneProps = [],
  onTapFocus,
  onUpdateSettings,
  onSelectScene,
  onOpenHelp,
  isTakingPhoto,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js Core Refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bokehPassRef = useRef<BokehPass | null>(null);
  const outputPassRef = useRef<OutputPass | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastPoseRef = useRef<ModelPose | null>(null);

  // Environment and light tracking refs
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const lightObjectsRef = useRef<Map<string, { light: THREE.Light; visual?: THREE.Group }>>(new Map());
  const propObjectsRef = useRef<Map<string, THREE.Group>>(new Map());
  const groundMeshRef = useRef<THREE.Mesh | null>(null);
  const cycWallMeshRef = useRef<THREE.Mesh | null>(null);

  // Zebra animation offset
  const [zebraOffset, setZebraOffset] = useState<number>(0);

  // Convert Kelvin temperature to RGB THREE.Color
  const kelvinToColor = useCallback((k: number): THREE.Color => {
    const temp = k / 100;
    let r: number, g: number, b: number;
    if (temp <= 66) {
      r = 255;
      g = Math.min(255, Math.max(0, 99.4708025861 * Math.log(temp) - 161.1195681661));
      b = temp <= 19 ? 0 : Math.min(255, Math.max(0, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
    } else {
      r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
      g = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
      b = 255;
    }
    return new THREE.Color(r / 255, g / 255, b / 255);
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D CHARACTER: Cartoon Wolf Mascot (18% Neutral Gray Fur, Red Jersey & Basketball)
  // ---------------------------------------------------------------------------
  const buildMainModel = useCallback((pose: ModelPose = 'standing_frontal'): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_model_main';

    // Photographic 18% Neutral Middle Gray (matches standard VFX 18% Gray Ball)
    const wolfGrayMat = new THREE.MeshStandardMaterial({
      color: 0x777777, // Precise 18% Neutral Gray
      roughness: 0.82,
      metalness: 0.04,
    });

    const wolfWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.75,
      metalness: 0.0,
    });

    const jerseyRedMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626, // Bright athletic red t-shirt
      roughness: 0.65,
      metalness: 0.05,
    });

    const darkNoseMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.25,
      metalness: 0.1,
    });

    const cartoonEyeMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.1,
      metalness: 0.05,
    });

    const eyeGlintMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.0,
    });

    const basketballMat = new THREE.MeshStandardMaterial({
      color: 0xea580c, // Vibrant basketball orange
      roughness: 0.58,
      metalness: 0.02,
    });

    const seamBlackMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.5,
      metalness: 0.0,
    });

    const isSitting = pose === 'sitting_chair';
    const isProfile = pose === 'profile_3_4';
    const isBeauty = pose === 'close_beauty';
    const isFashion = pose === 'fashion_dynamic';
    const isMystery = pose === 'mystery_lowkey';

    // 1. Athletic Legs & White Paws
    const legGeo = new THREE.CylinderGeometry(0.08, 0.065, 0.65, 16);
    const leftLeg = new THREE.Mesh(legGeo, wolfGrayMat);
    const rightLeg = new THREE.Mesh(legGeo, wolfGrayMat);

    // White Paws / Socks
    const pawGeo = new THREE.SphereGeometry(0.075, 16, 16);
    pawGeo.scale(1.0, 0.65, 1.35);
    const leftPaw = new THREE.Mesh(pawGeo, wolfWhiteMat);
    leftPaw.position.set(0, -0.32, 0.04);
    leftLeg.add(leftPaw);

    const rightPaw = new THREE.Mesh(pawGeo, wolfWhiteMat);
    rightPaw.position.set(0, -0.32, 0.04);
    rightLeg.add(rightPaw);

    if (isSitting) {
      leftLeg.position.set(-0.14, -0.62, 0.3);
      leftLeg.rotation.x = Math.PI * 0.45;
      rightLeg.position.set(0.14, -0.62, 0.3);
      rightLeg.rotation.x = Math.PI * 0.45;
    } else {
      // Running / athletic jumping stance like in cartoon
      leftLeg.position.set(-0.16, -0.58, -0.08);
      leftLeg.rotation.x = -0.25;
      rightLeg.position.set(0.14, -0.55, 0.12);
      rightLeg.rotation.x = 0.28;
    }
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    group.add(leftLeg);
    group.add(rightLeg);

    // 2. Torso in Red Jersey (T-Shirt) with White Belly Patch
    const torsoY = isSitting ? -0.22 : 0;
    const torsoGeo = new THREE.CylinderGeometry(0.26, 0.22, 0.58, 20);
    const torso = new THREE.Mesh(torsoGeo, jerseyRedMat);
    torso.position.set(0, torsoY, 0);
    if (isProfile) torso.rotation.y = 0.35;
    if (isFashion) {
      torso.rotation.z = 0.1;
      torso.rotation.y = -0.15;
    }
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    // White chest / belly patch (just like cartoon illustration)
    const bellyGeo = new THREE.SphereGeometry(0.21, 16, 16);
    bellyGeo.scale(0.85, 1.0, 0.4);
    const belly = new THREE.Mesh(bellyGeo, wolfWhiteMat);
    belly.position.set(0, -0.04, 0.16);
    torso.add(belly);

    // Red sleeves
    const sleeveGeo = new THREE.CylinderGeometry(0.085, 0.08, 0.16, 16);
    const leftSleeve = new THREE.Mesh(sleeveGeo, jerseyRedMat);
    leftSleeve.position.set(-0.25, 0.2, 0);
    leftSleeve.rotation.z = 0.6;
    torso.add(leftSleeve);

    const rightSleeve = new THREE.Mesh(sleeveGeo, jerseyRedMat);
    rightSleeve.position.set(0.25, 0.2, 0);
    rightSleeve.rotation.z = -0.6;
    torso.add(rightSleeve);

    // 3. Fluffy Wolf Tail (Gray fur with White tip curving behind)
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, torsoY - 0.18, -0.18);
    const tailBodyGeo = new THREE.CylinderGeometry(0.065, 0.035, 0.42, 12);
    const tailBody = new THREE.Mesh(tailBodyGeo, wolfGrayMat);
    tailBody.position.set(0, 0.12, -0.12);
    tailBody.rotation.x = -Math.PI * 0.35;
    tailGroup.add(tailBody);

    const tailTipGeo = new THREE.ConeGeometry(0.075, 0.22, 12);
    const tailTip = new THREE.Mesh(tailTipGeo, wolfWhiteMat);
    tailTip.position.set(0, 0.28, -0.24);
    tailTip.rotation.x = -Math.PI * 0.25;
    tailGroup.add(tailTip);
    group.add(tailGroup);

    // 4. Head Group (18% Neutral Gray with White Muzzle, Pointy Ears, Snout & Cartoon Eyes)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, torsoY + 0.52, 0);

    if (isProfile) {
      headGroup.rotation.y = 0.55;
    } else if (isBeauty) {
      headGroup.rotation.z = 0.12;
      headGroup.rotation.y = -0.12;
    } else if (isFashion) {
      headGroup.rotation.z = -0.12;
      headGroup.rotation.y = 0.2;
    } else if (isMystery) {
      headGroup.rotation.x = 0.15;
      headGroup.rotation.y = 0.3;
    }

    // Main Head Skull (Gray)
    const headGeo = new THREE.SphereGeometry(0.2, 32, 32);
    headGeo.scale(1.05, 1.0, 1.05);
    const head = new THREE.Mesh(headGeo, wolfGrayMat);
    head.castShadow = true;
    head.receiveShadow = true;
    headGroup.add(head);

    // White Cheek Tufts (Fluffy wolf cheeks)
    const cheekGeo = new THREE.ConeGeometry(0.09, 0.22, 12);
    cheekGeo.scale(1.2, 0.7, 0.7);
    const leftCheek = new THREE.Mesh(cheekGeo, wolfWhiteMat);
    leftCheek.position.set(-0.19, -0.06, 0.06);
    leftCheek.rotation.z = Math.PI * 0.45;
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, wolfWhiteMat);
    rightCheek.position.set(0.19, -0.06, 0.06);
    rightCheek.rotation.z = -Math.PI * 0.45;
    headGroup.add(rightCheek);

    // White Muzzle / Snout (Extending forward)
    const snoutGeo = new THREE.CylinderGeometry(0.08, 0.13, 0.22, 16);
    snoutGeo.scale(1.0, 0.8, 1.25);
    const snout = new THREE.Mesh(snoutGeo, wolfWhiteMat);
    snout.position.set(0, -0.04, 0.18);
    snout.rotation.x = Math.PI * 0.5;
    snout.castShadow = true;
    headGroup.add(snout);

    // Black Nose on Snout Tip
    const noseGeo = new THREE.ConeGeometry(0.045, 0.065, 12);
    const nose = new THREE.Mesh(noseGeo, darkNoseMat);
    nose.position.set(0, -0.02, 0.3);
    nose.rotation.x = Math.PI * 0.65;
    nose.castShadow = true;
    headGroup.add(nose);

    // Pointed Wolf Ears (Triangular cones: Gray outer, White inner)
    const earGeo = new THREE.ConeGeometry(0.085, 0.24, 4);
    earGeo.scale(1.0, 1.0, 0.45);
    const leftEar = new THREE.Mesh(earGeo, wolfGrayMat);
    leftEar.position.set(-0.13, 0.23, 0.0);
    leftEar.rotation.z = 0.25;
    leftEar.rotation.y = -0.2;
    leftEar.castShadow = true;
    headGroup.add(leftEar);

    const innerEarGeo = new THREE.ConeGeometry(0.055, 0.18, 4);
    innerEarGeo.scale(0.9, 0.9, 0.4);
    const leftInnerEar = new THREE.Mesh(innerEarGeo, wolfWhiteMat);
    leftInnerEar.position.set(-0.13, 0.22, 0.03);
    leftInnerEar.rotation.z = 0.25;
    leftInnerEar.rotation.y = -0.2;
    headGroup.add(leftInnerEar);

    const rightEar = new THREE.Mesh(earGeo, wolfGrayMat);
    rightEar.position.set(0.13, 0.23, 0.0);
    rightEar.rotation.z = -0.25;
    rightEar.rotation.y = 0.2;
    rightEar.castShadow = true;
    headGroup.add(rightEar);

    const rightInnerEar = new THREE.Mesh(innerEarGeo, wolfWhiteMat);
    rightInnerEar.position.set(0.13, 0.22, 0.03);
    rightInnerEar.rotation.z = -0.25;
    rightInnerEar.rotation.y = 0.2;
    headGroup.add(rightInnerEar);

    // Expressive Cartoon Eyes (Glossy black with white catchlights)
    const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
    eyeGeo.scale(0.85, 1.25, 0.7);

    const leftEye = new THREE.Mesh(eyeGeo, cartoonEyeMat);
    leftEye.position.set(-0.08, 0.06, 0.17);
    leftEye.rotation.z = 0.08;
    headGroup.add(leftEye);

    const leftGlint = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), eyeGlintMat);
    leftGlint.position.set(-0.075, 0.08, 0.205);
    headGroup.add(leftGlint);

    const rightEye = new THREE.Mesh(eyeGeo, cartoonEyeMat);
    rightEye.position.set(0.08, 0.06, 0.17);
    rightEye.rotation.z = -0.08;
    headGroup.add(rightEye);

    const rightGlint = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), eyeGlintMat);
    rightGlint.position.set(0.085, 0.08, 0.205);
    headGroup.add(rightGlint);

    group.add(headGroup);

    // 5. Arms & Basketball
    // Left Arm (Reaching forward / natural athletic balance)
    const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.45, 12);
    const leftArm = new THREE.Mesh(armGeo, wolfGrayMat);
    leftArm.position.set(-0.32, torsoY + 0.1, 0.1);
    leftArm.rotation.set(-0.4, 0.1, 0.3);
    const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), wolfWhiteMat);
    leftHand.position.set(0, -0.24, 0);
    leftArm.add(leftHand);
    leftArm.castShadow = true;
    group.add(leftArm);

    // Right Arm: Raised high holding the Basketball (just like in the user's illustration B.png!)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.24, torsoY + 0.2, 0);

    const rightArm = new THREE.Mesh(armGeo, wolfGrayMat);
    rightArm.position.set(0.12, 0.22, 0.05);
    rightArm.rotation.set(0.2, -0.1, -0.65);
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);

    // Right Hand (White Paw supporting the ball)
    const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), wolfWhiteMat);
    rightHand.position.set(0.22, 0.44, 0.1);
    rightArmGroup.add(rightHand);

    // Basketball (Orange sphere with 3D black seam rings)
    const ballGroup = new THREE.Group();
    ballGroup.position.set(0.24, 0.62, 0.12);

    const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(0.165, 32, 32), basketballMat);
    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;
    ballGroup.add(ballMesh);

    // Black Seams on Basketball (Orthogonal rubber rib seams)
    const seamGeo = new THREE.TorusGeometry(0.166, 0.005, 8, 36);
    const seamH = new THREE.Mesh(seamGeo, seamBlackMat);
    ballGroup.add(seamH);

    const seamV = new THREE.Mesh(seamGeo, seamBlackMat);
    seamV.rotation.y = Math.PI * 0.5;
    ballGroup.add(seamV);

    const seamCross = new THREE.Mesh(seamGeo, seamBlackMat);
    seamCross.rotation.x = Math.PI * 0.5;
    ballGroup.add(seamCross);

    rightArmGroup.add(ballGroup);
    group.add(rightArmGroup);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D VFX CALIBRATION RIG: 18% Gray Ball, Chrome Ball & ColorChecker Chart
  // ---------------------------------------------------------------------------
  const buildVfxCalibrationKit = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_vfx_calibration_kit';

    const standMat = new THREE.MeshStandardMaterial({
      color: 0x27272a, // Black anodized aluminum c-stand
      roughness: 0.35,
      metalness: 0.85,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.01,
      metalness: 1.0, // 100% Mirror reflection for light angle inspection
    });

    const gray18Mat = new THREE.MeshStandardMaterial({
      color: 0x777777, // Exact 18% Neutral Gray (standard VFX middle gray)
      roughness: 0.95,
      metalness: 0.0,
    });

    // 1. Stand Center Column & Tripod Legs
    const poleGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.25, 16);
    const pole = new THREE.Mesh(poleGeo, standMat);
    pole.position.set(0, 0, 0);
    pole.castShadow = true;
    group.add(pole);

    // 3 Tripod Legs
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3;
      const legGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 12);
      const leg = new THREE.Mesh(legGeo, standMat);
      leg.position.set(Math.cos(ang) * 0.16, -0.48, Math.sin(ang) * 0.16);
      leg.rotation.z = Math.cos(ang) * 0.45;
      leg.rotation.x = Math.sin(ang) * 0.45;
      group.add(leg);
    }

    // Horizontal T-Bar at Y = 0.52m
    const barGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.46, 16);
    const bar = new THREE.Mesh(barGeo, standMat);
    bar.position.set(0, 0.52, 0);
    bar.rotation.z = Math.PI * 0.5;
    group.add(bar);

    // 2. Left: 18% Neutral Gray Ball (Diffuse Exposure Reference)
    const grayBallGeo = new THREE.SphereGeometry(0.085, 32, 32);
    const grayBall = new THREE.Mesh(grayBallGeo, gray18Mat);
    grayBall.position.set(-0.16, 0.62, 0);
    grayBall.castShadow = true;
    grayBall.receiveShadow = true;
    group.add(grayBall);

    // 3. Right: Chrome Mirror Ball (Specular Reflection Reference)
    const chromeBallGeo = new THREE.SphereGeometry(0.085, 32, 32);
    const chromeBall = new THREE.Mesh(chromeBallGeo, chromeMat);
    chromeBall.position.set(0.16, 0.62, 0);
    chromeBall.castShadow = true;
    chromeBall.receiveShadow = true;
    group.add(chromeBall);

    // 4. Center / Below: Macbeth ColorChecker Chart (24 Calibrated Patches)
    const chartGroup = new THREE.Group();
    chartGroup.position.set(0, 0.28, 0.02);

    const frameGeo = new THREE.BoxGeometry(0.3, 0.2, 0.012);
    const frame = new THREE.Mesh(frameGeo, standMat);
    chartGroup.add(frame);

    // 24 Standard ColorChecker Swatches (4 rows x 6 cols)
    const swatches: number[][] = [
      // Row 1: Dark skin, Light skin, Blue sky, Foliage, Blue flower, Bluish green
      [0x735244, 0xc29682, 0x627a9d, 0x576c43, 0x8580b1, 0x67bdaa],
      // Row 2: Orange, Purplish blue, Moderate red, Purple, Yellow green, Orange yellow
      [0xd67e2c, 0x505ba6, 0xc15a63, 0x5e3c6c, 0x9dbc40, 0xe0a32e],
      // Row 3: Blue, Green, Red, Yellow, Magenta, Cyan
      [0x383d96, 0x469449, 0xae363a, 0xe7c71f, 0xbb4989, 0x1f859a],
      // Row 4: White 95%, Neutral 8, Neutral 6.5, Neutral 5 (18% Gray!), Neutral 3.5, Black 3%
      [0xf3f3f2, 0xc8c8c8, 0xa0a0a0, 0x777777, 0x555555, 0x232323],
    ];

    const patchW = 0.04;
    const patchH = 0.038;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const patchMat = new THREE.MeshBasicMaterial({ color: swatches[r][c] });
        const patchGeo = new THREE.PlaneGeometry(patchW, patchH);
        const patch = new THREE.Mesh(patchGeo, patchMat);
        const px = (c - 2.5) * 0.045;
        const py = (1.5 - r) * 0.042;
        patch.position.set(px, py, 0.008);
        chartGroup.add(patch);
      }
    }
    group.add(chartGroup);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D SECONDARY ACTOR (Charcoal Coat, Scarf, Dark Hair)
  // ---------------------------------------------------------------------------
  const buildSecondaryActor = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_actor_secondary';

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf1c0b9, roughness: 0.5 });
    const coatMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
    const scarfMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.65 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.35 });

    const legGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.8, 12);
    const leftLeg = new THREE.Mesh(legGeo, coatMat);
    leftLeg.position.set(-0.12, -0.65, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, coatMat);
    rightLeg.position.set(0.12, -0.65, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);

    const coatGeo = new THREE.CylinderGeometry(0.24, 0.3, 0.85, 16);
    const coat = new THREE.Mesh(coatGeo, coatMat);
    coat.position.set(0, 0.1, 0);
    coat.castShadow = true;
    coat.receiveShadow = true;
    group.add(coat);

    const scarfGeo = new THREE.TorusGeometry(0.12, 0.05, 12, 24);
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.position.set(0, 0.45, 0);
    scarf.rotation.x = Math.PI * 0.5;
    group.add(scarf);

    const headGeo = new THREE.SphereGeometry(0.15, 24, 24);
    headGeo.scale(1.0, 1.25, 1.05);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 0.63, 0);
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    const hairGeo = new THREE.SphereGeometry(0.17, 24, 24);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.71, -0.02);
    hair.castShadow = true;
    group.add(hair);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D BOTANICAL FLOWERS (Foreground 0.8m - 1.2m)
  // ---------------------------------------------------------------------------
  const buildBotanicalFlower = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_plant_flower';

    const potMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.6 });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 });
    const petalMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 });
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3 });

    const potGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.35, 16);
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(0, -0.15, 0);
    pot.castShadow = true;
    pot.receiveShadow = true;
    group.add(pot);

    for (let i = 0; i < 5; i++) {
      const ang = (i * Math.PI * 2) / 5;
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.018, 0.55, 8);
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(Math.cos(ang) * 0.08, 0.18, Math.sin(ang) * 0.08);
      stem.rotation.z = Math.cos(ang) * 0.25;
      stem.rotation.x = Math.sin(ang) * 0.25;
      stem.castShadow = true;
      group.add(stem);

      const bloomGroup = new THREE.Group();
      bloomGroup.position.set(Math.cos(ang) * 0.14, 0.45, Math.sin(ang) * 0.14);

      const centerMesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), centerMat);
      bloomGroup.add(centerMesh);

      for (let p = 0; p < 6; p++) {
        const pAng = (p * Math.PI * 2) / 6;
        const petalMesh = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), petalMat);
        petalMesh.scale.set(1.2, 0.3, 0.8);
        petalMesh.position.set(Math.cos(pAng) * 0.06, 0, Math.sin(pAng) * 0.06);
        petalMesh.rotation.y = pAng;
        petalMesh.castShadow = true;
        bloomGroup.add(petalMesh);
      }
      group.add(bloomGroup);
    }

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D PINE TREE (Fondo Medio)
  // ---------------------------------------------------------------------------
  const buildPineTree = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_tree_pine';

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const needleMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.7 });

    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 1.8, 12);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(0, -0.2, 0);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);

    const tier1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.0, 16), needleMat);
    tier1.position.set(0, 1.1, 0);
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    group.add(tier1);

    const tier2 = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.8, 16), needleMat);
    tier2.position.set(0, 2.1, 0);
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    group.add(tier2);

    const tier3 = new THREE.Mesh(new THREE.ConeGeometry(0.95, 1.6, 16), needleMat);
    tier3.position.set(0, 3.1, 0);
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    group.add(tier3);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D STREET LAMP & PRACTICAL BOKEH LIGHT
  // ---------------------------------------------------------------------------
  const buildStreetLamp = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_street_lamp';

    const ironMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.8 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 3.2, 12), ironMat);
    pole.position.set(0, 0.2, 0);
    pole.castShadow = true;
    group.add(pole);

    const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), ironMat);
    headBox.position.set(0, 1.8, 0);
    headBox.castShadow = true;
    group.add(headBox);

    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), glowMat);
    lantern.position.set(0, 1.8, 0);
    group.add(lantern);

    const bulbLight = new THREE.PointLight(0xfef08a, 2.5, 12, 1.5);
    bulbLight.position.set(0, 1.8, 0);
    group.add(bulbLight);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D CABIN (Fondo Lejano)
  // ---------------------------------------------------------------------------
  const buildCabin = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_building_cabin';

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 });
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const house = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 2.8), woodMat);
    house.position.set(0, 0, 0);
    house.castShadow = true;
    house.receiveShadow = true;
    group.add(house);

    const roofGeo = new THREE.ConeGeometry(2.6, 1.6, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.9, 0);
    roof.scale.set(1.1, 1.0, 0.85);
    roof.castShadow = true;
    roof.receiveShadow = true;
    group.add(roof);

    const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.85), windowMat);
    windowMesh.position.set(0, 0.2, 1.41);
    group.add(windowMesh);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D RETRO VEHICLE
  // ---------------------------------------------------------------------------
  const buildCar = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_car_vehicle';

    const carPaintMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.25, metalness: 0.75 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9 });
    const rubberMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });

    const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.75, 1.8), carPaintMat);
    chassis.position.set(0, -0.2, 0);
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.7, 1.6), glassMat);
    cabin.position.set(-0.2, 0.5, 0);
    cabin.castShadow = true;
    group.add(cabin);

    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    [
      [-1.2, -0.4, 0.95],
      [1.2, -0.4, 0.95],
      [-1.2, -0.4, -0.95],
      [1.2, -0.4, -0.95],
    ].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, rubberMat);
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      group.add(wheel);
    });

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // BUILD 3D DIRECTOR CHAIR
  // ---------------------------------------------------------------------------
  const buildDirectorChair = useCallback((): THREE.Group => {
    const group = new THREE.Group();
    group.name = 'prop_director_chair';

    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
    const canvasMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 });

    const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.0, 8);
    const leg1 = new THREE.Mesh(legGeo, woodMat);
    leg1.position.set(0, -0.25, 0);
    leg1.rotation.z = 0.25;
    leg1.castShadow = true;
    group.add(leg1);

    const leg2 = new THREE.Mesh(legGeo, woodMat);
    leg2.position.set(0, -0.25, 0);
    leg2.rotation.z = -0.25;
    leg2.castShadow = true;
    group.add(leg2);

    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.55), canvasMat);
    seat.position.set(0, 0.1, 0);
    seat.castShadow = true;
    group.add(seat);

    const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.25, 0.04), canvasMat);
    backrest.position.set(0, 0.45, -0.25);
    backrest.castShadow = true;
    group.add(backrest);

    return group;
  }, []);

  // ---------------------------------------------------------------------------
  // INITIALIZE THREE.JS SCENE, RENDERER, EFFECT COMPOSER & BOKEH PASS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 540;

    // 1. Scene
    const threeScene = new THREE.Scene();
    sceneRef.current = threeScene;

    // 2. Camera: Tripod at eye level (0, 1.45, 0) looking forward (-Z)
    const sensor = SENSOR_FORMATS[settings.sensorFormatId] || SENSOR_FORMATS.super35;
    const initialVFov = 2 * Math.atan(sensor.heightMm / (2 * settings.focalLengthMm)) * (180 / Math.PI);
    const threeCamera = new THREE.PerspectiveCamera(initialVFov, width / height, 0.1, 150);
    threeCamera.position.set(settings.cameraTruckM || 0, settings.cameraHeightM || 1.45, settings.cameraDollyM || 0);
    threeCamera.lookAt(0, settings.cameraHeightM || 1.45, -10);
    cameraRef.current = threeCamera;

    // 3. WebGL Renderer with ACES Filmic Tone Mapping and Soft Shadows (preserveDrawingBuffer enabled for high-fidelity photo snapshots)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = Math.max(0.04, Math.min(8.0, Math.pow(2, opticalMetrics.exposureDeltaEV)));
    renderer.domElement.id = 'viewport-three-canvas';
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. EffectComposer + BokehPass for physical, verifiable Depth of Field blur + OutputPass for ACES Filmic Tone Mapping
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(threeScene, threeCamera);
    composer.addPass(renderPass);

    const bokehPass = new BokehPass(threeScene, threeCamera, {
      focus: settings.focusDistanceM,
      aspect: width / height,
      aperture: 0.025 / Math.max(1.0, settings.aperture),
      maxblur: 0.035,
    });
    composer.addPass(bokehPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    composerRef.current = composer;
    bokehPassRef.current = bokehPass;
    outputPassRef.current = outputPass;

    // 5. Ground Floor Plane (Y = 0)
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.65,
      metalness: 0.15,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.set(0, 0, -30);
    ground.receiveShadow = true;
    threeScene.add(ground);
    groundMeshRef.current = ground;

    // 6. Studio Cyclorama Curved Backdrop (Z = -38m)
    const cycGeo = new THREE.PlaneGeometry(90, 35);
    const cycMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
      metalness: 0.05,
    });
    const cyc = new THREE.Mesh(cycGeo, cycMat);
    cyc.position.set(0, 12, -38);
    cyc.receiveShadow = true;
    threeScene.add(cyc);
    cycWallMeshRef.current = cyc;

    // 7. Ambient Base Light & Natural Directional Sun
    const ambLight = new THREE.AmbientLight(0xffffff, 0.25);
    threeScene.add(ambLight);
    ambientLightRef.current = ambLight;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e1b4b, 0.25);
    threeScene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(8, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.bias = -0.0005;
    threeScene.add(sunLight);
    threeScene.add(sunLight.target);
    sunLightRef.current = sunLight;

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !threeCamera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      threeCamera.aspect = newW / newH;
      threeCamera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      composer.setSize(newW, newH);

      if (overlayCanvasRef.current) {
        overlayCanvasRef.current.width = newW;
        overlayCanvasRef.current.height = newH;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // UPDATE CAMERA RIG POSITION & ORIENTATION (Height, Tilt, Pan, Roll, Truck, Dolly)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const cam = cameraRef.current;
    if (!cam) return;

    const posX = settings.cameraTruckM || 0;
    const posY = settings.cameraHeightM || 1.45;
    const posZ = settings.cameraDollyM || 0;

    cam.position.set(posX, posY, posZ);

    const pitchRad = ((settings.cameraTiltDeg || 0) * Math.PI) / 180;
    const yawRad = ((settings.cameraPanDeg || 0) * Math.PI) / 180;
    const rollRad = ((settings.cameraRollDeg || 0) * Math.PI) / 180;

    const targetDistance = 10;
    const lookX = posX + targetDistance * Math.sin(yawRad) * Math.cos(pitchRad);
    const lookY = posY + targetDistance * Math.sin(pitchRad);
    const lookZ = posZ - targetDistance * Math.cos(yawRad) * Math.cos(pitchRad);

    cam.lookAt(lookX, lookY, lookZ);

    if (rollRad !== 0) {
      cam.rotateZ(rollRad);
    }
  }, [
    settings.cameraHeightM,
    settings.cameraTiltDeg,
    settings.cameraPanDeg,
    settings.cameraRollDeg,
    settings.cameraTruckM,
    settings.cameraDollyM,
  ]);

  // ---------------------------------------------------------------------------
  // UPDATE CAMERA OPTICS (Focal Length Zoom & Sensor Format & 1:1 Loupe)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const cam = cameraRef.current;
    if (!cam) return;
    const sensor = SENSOR_FORMATS[settings.sensorFormatId] || SENSOR_FORMATS.super35;
    // Physical FOV from lens focal length and sensor height
    const vFov = 2 * Math.atan(sensor.heightMm / (2 * settings.focalLengthMm)) * (180 / Math.PI);
    // If 1:1 loupe is active, zoom in 3x
    const finalFov = settings.isZoom1to1 ? Math.max(3, vFov / 3.0) : Math.max(6, Math.min(105, vFov));
    cam.fov = finalFov;
    cam.updateProjectionMatrix();
  }, [settings.focalLengthMm, settings.sensorFormatId, settings.isZoom1to1]);

  // ---------------------------------------------------------------------------
  // UPDATE DEPTH OF FIELD PASS UNIFORMS (Focus distance, Aperture, Max Blur)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const bokeh = bokehPassRef.current;
    if (!bokeh) return;

    (bokeh.uniforms as Record<string, { value: unknown }>)['focus'].value = settings.focusDistanceM;

    // Physical Circle of Confusion (CoC) lens simulation:
    // Blur disk grows with (focalLength / 50)^1.8 / aperture (thin DoF telephoto)
    // and contracts to near-zero at f/11, f/16, f/22 (deep DoF landscape).
    const physicalCoCFactor = Math.pow(settings.focalLengthMm / 50, 1.8) / Math.max(0.7, settings.aperture);
    const apertureVal = Math.max(0.0001, Math.min(0.075, 0.018 * physicalCoCFactor));
    (bokeh.uniforms as Record<string, { value: unknown }>)['aperture'].value = apertureVal;

    const maxBlurVal = Math.max(
      0.001,
      Math.min(0.055, (0.022 * Math.pow(settings.focalLengthMm / 50, 1.4)) / Math.sqrt(Math.max(1.0, settings.aperture)))
    );
    (bokeh.uniforms as Record<string, { value: unknown }>)['maxblur'].value = maxBlurVal;
  }, [settings.focusDistanceM, settings.aperture, settings.focalLengthMm]);

  // ---------------------------------------------------------------------------
  // UPDATE ENVIRONMENT, SKY & AMBIENT COLOR ACCORDING TO SCENE PRESET
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const threeScene = sceneRef.current;
    const ambLight = ambientLightRef.current;
    const hemiLight = hemiLightRef.current;
    const sunLight = sunLightRef.current;
    const ground = groundMeshRef.current;
    const cyc = cycWallMeshRef.current;
    if (!threeScene || !ambLight || !hemiLight || !sunLight) return;

    if (scene.id === 'night_studio') {
      threeScene.background = new THREE.Color(0x020617);
      ambLight.intensity = 0.035;
      ambLight.color = new THREE.Color(0x38bdf8);
      hemiLight.intensity = 0.02;
      sunLight.intensity = 0.0;
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0x09090b);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x0b0f19);
    } else if (scene.id === 'portrait_golden') {
      threeScene.background = new THREE.Color(0x78350f);
      ambLight.intensity = 0.35;
      ambLight.color = new THREE.Color(0xfef3c7);
      hemiLight.intensity = 0.35;
      hemiLight.color = new THREE.Color(0xfde68a);
      hemiLight.groundColor = new THREE.Color(0x1e1b4b);
      sunLight.intensity = 1.6;
      sunLight.color = new THREE.Color(0xfbbf24);
      sunLight.position.set(6, 4, 3);
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0x27272a);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x451a03);
    } else if (scene.id === 'fashion_commercial') {
      threeScene.background = new THREE.Color(0xf8fafc);
      ambLight.intensity = 0.75;
      ambLight.color = new THREE.Color(0xffffff);
      hemiLight.intensity = 0.6;
      hemiLight.color = new THREE.Color(0xffffff);
      hemiLight.groundColor = new THREE.Color(0xe2e8f0);
      sunLight.intensity = 1.2;
      sunLight.color = new THREE.Color(0xffffff);
      sunLight.position.set(0, 16, 5);
      if (ground) {
        const gm = ground.material as THREE.MeshStandardMaterial;
        gm.color.set(0xf1f5f9);
        gm.roughness = 0.25;
        gm.metalness = 0.1;
      }
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0xffffff);
    } else if (scene.id === 'documentary_interview') {
      threeScene.background = new THREE.Color(0x1c1917);
      ambLight.intensity = 0.22;
      ambLight.color = new THREE.Color(0xfef3c7);
      hemiLight.intensity = 0.2;
      hemiLight.color = new THREE.Color(0xfef3c7);
      hemiLight.groundColor = new THREE.Color(0x292524);
      sunLight.intensity = 0.4;
      sunLight.color = new THREE.Color(0xfef08a);
      sunLight.position.set(4, 8, 2);
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0x292524);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x1c1917);
    } else if (scene.id === 'landscape_depth') {
      threeScene.background = new THREE.Color(0x38bdf8);
      ambLight.intensity = 0.5;
      ambLight.color = new THREE.Color(0xffffff);
      hemiLight.intensity = 0.45;
      hemiLight.color = new THREE.Color(0xbae6fd);
      hemiLight.groundColor = new THREE.Color(0x166534);
      sunLight.intensity = 1.8;
      sunLight.color = new THREE.Color(0xfffbeb);
      sunLight.position.set(10, 16, 8);
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0x15803d);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x1e293b);
    } else if (scene.id === 'action_sports') {
      threeScene.background = new THREE.Color(0x60a5fa);
      ambLight.intensity = 0.65;
      ambLight.color = new THREE.Color(0xffffff);
      hemiLight.intensity = 0.5;
      sunLight.intensity = 2.0;
      sunLight.color = new THREE.Color(0xffffff);
      sunLight.position.set(4, 20, 4);
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0xb91c1c);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x1e293b);
    } else {
      threeScene.background = new THREE.Color(0x27272a);
      ambLight.intensity = 0.4;
      ambLight.color = new THREE.Color(0xffffff);
      hemiLight.intensity = 0.3;
      sunLight.intensity = 1.2;
      sunLight.color = new THREE.Color(0xffffff);
      sunLight.position.set(0, 12, 5);
      if (ground) (ground.material as THREE.MeshStandardMaterial).color.set(0x3f3f46);
      if (cyc) (cyc.material as THREE.MeshStandardMaterial).color.set(0x27272a);
    }
  }, [scene.id]);

  // ---------------------------------------------------------------------------
  // UPDATE EXPOSURE TONE MAPPING ON RENDERER AND POST-PROCESSING OUTPUT PASS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const targetExposure = Math.max(0.04, Math.min(8.0, Math.pow(2, opticalMetrics.exposureDeltaEV)));
    renderer.toneMappingExposure = targetExposure;

    const outPass = outputPassRef.current;
    if (outPass && outPass.uniforms && outPass.uniforms['toneMappingExposure']) {
      outPass.uniforms['toneMappingExposure'].value = targetExposure;
    }
  }, [opticalMetrics.exposureDeltaEV]);

  // ---------------------------------------------------------------------------
  // UPDATE 3D SCENE PROPS & MODEL POSES (STRICT 1-AXIS DEPTH POSITIONING)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const threeScene = sceneRef.current;
    if (!threeScene) return;

    const currentPropMap = propObjectsRef.current;

    sceneProps.forEach((prop) => {
      let group = currentPropMap.get(prop.id);

      // If prop is model_main, re-instantiate ONLY if pose actually changes or not yet instantiated
      if (prop.type === 'model_main') {
        const poseChanged = lastPoseRef.current !== settings.modelPose;
        if (!group || poseChanged) {
          if (group) {
            threeScene.remove(group);
            currentPropMap.delete(prop.id);
          }
          group = buildMainModel(settings.modelPose);
          lastPoseRef.current = settings.modelPose;
          currentPropMap.set(prop.id, group);
          threeScene.add(group);
        }
      } else if (!group) {
        switch (prop.type) {
          case 'actor_secondary':
            group = buildSecondaryActor();
            break;
          case 'vfx_calibration_kit':
            group = buildVfxCalibrationKit();
            break;
          case 'plant_flower':
            group = buildBotanicalFlower();
            break;
          case 'tree_pine':
            group = buildPineTree();
            break;
          case 'street_lamp':
          case 'bokeh_lights':
            group = buildStreetLamp();
            break;
          case 'building_cabin':
            group = buildCabin();
            break;
          case 'car_vehicle':
            group = buildCar();
            break;
          case 'director_chair':
            group = buildDirectorChair();
            break;
          default:
            group = buildMainModel(settings.modelPose);
        }
        currentPropMap.set(prop.id, group);
        threeScene.add(group);
      }

      group.visible = prop.enabled;

      // STRICT 1-AXIS (Z-AXIS) DEPTH POSITIONING:
      // Objects rest firmly on the ground plane (Y = baseY).
      // Lateral position is fixed in 3D world space (X = baseX).
      // Distance moves purely on the optical line of sight along the Z-axis (Z = -d).
      // This guarantees 0 vertical or horizontal jumping/drifting when adjusting distance!
      const d = Math.max(0.4, prop.distanceM);
      const baseX = (prop.xOffsetPct / 100) * 3.5;
      let baseY = 1.025; // Default human model feet at Y = 0

      switch (prop.type) {
        case 'model_main':
          baseY = settings.modelPose === 'sitting_chair' ? 0.72 : 1.025;
          break;
        case 'actor_secondary':
          baseY = 1.05;
          break;
        case 'vfx_calibration_kit':
          baseY = 0.62;
          break;
        case 'plant_flower':
          baseY = 0.35;
          break;
        case 'tree_pine':
          baseY = 1.1;
          break;
        case 'street_lamp':
        case 'bokeh_lights':
          baseY = 1.4;
          break;
        case 'building_cabin':
          baseY = 1.2;
          break;
        case 'car_vehicle':
          baseY = 0.75;
          break;
        case 'director_chair':
          baseY = 0.75;
          break;
      }

      group.position.set(baseX, baseY, -d);
      group.scale.set(prop.scale, prop.scale, prop.scale);
    });

    // Remove deleted props
    currentPropMap.forEach((grp, id) => {
      if (!sceneProps.some((p) => p.id === id)) {
        threeScene.remove(grp);
        currentPropMap.delete(id);
      }
    });
  }, [
    sceneProps,
    settings.modelPose,
    buildMainModel,
    buildSecondaryActor,
    buildBotanicalFlower,
    buildPineTree,
    buildStreetLamp,
    buildCabin,
    buildCar,
    buildDirectorChair,
  ]);

  // ---------------------------------------------------------------------------
  // UPDATE 360° REAL PHOTOMETRIC LIGHT RIG IN THREE.JS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const threeScene = sceneRef.current;
    if (!threeScene) return;

    const lightMap = lightObjectsRef.current;
    const mainProp = sceneProps.find((p) => p.type === 'model_main') || sceneProps[0];
    const targetDist = mainProp ? mainProp.distanceM : 2.2;
    const u = mainProp ? (mainProp.xOffsetPct / 100) * 0.55 : 0;
    const targetPos = new THREE.Vector3(u * targetDist, 1.45, -targetDist);

    lights.forEach((l) => {
      let entry = lightMap.get(l.id);

      if (!entry) {
        let lightObj: THREE.Light;
        if (l.modifier === 'lantern') {
          const pt = new THREE.PointLight(0xffffff, 1.0, 35, 1.5);
          pt.castShadow = true;
          pt.shadow.bias = -0.0005;
          pt.shadow.mapSize.set(1024, 1024);
          lightObj = pt;
        } else {
          const spot = new THREE.SpotLight(0xffffff, 1.0, 45, Math.PI / 3, 0.75, 1.5);
          spot.castShadow = true;
          spot.shadow.bias = -0.0005;
          spot.shadow.mapSize.set(1024, 1024);
          lightObj = spot;
          threeScene.add(spot.target);
        }

        const visualGroup = new THREE.Group();
        const lampMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.16, 0.28, 16),
          new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8, roughness: 0.3 })
        );
        lampMesh.rotateX(Math.PI / 2);
        visualGroup.add(lampMesh);

        const ledMesh = new THREE.Mesh(
          new THREE.CircleGeometry(0.11, 16),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        ledMesh.position.set(0, 0, 0.145);
        visualGroup.add(ledMesh);

        threeScene.add(lightObj);
        threeScene.add(visualGroup);

        entry = { light: lightObj, visual: visualGroup };
        lightMap.set(l.id, entry);
      }

      const { light, visual } = entry;

      if (!l.enabled || l.intensityPct <= 0) {
        light.visible = false;
        if (visual) visual.visible = false;
        return;
      }

      light.visible = true;
      if (visual) visual.visible = true;

      const col = l.mode === 'rgb' ? new THREE.Color(l.rgbColor || '#ffffff') : kelvinToColor(l.cctKelvin);
      light.color.copy(col);
      if (visual) {
        const led = visual.children[1] as THREE.Mesh;
        if (led) (led.material as THREE.MeshBasicMaterial).color.copy(col);
      }

      const intensityScale = (l.intensityPct / 100) * (l.powerWatts / 100) * 16.0;
      (light as THREE.SpotLight | THREE.PointLight).intensity = intensityScale;

      const rad = (l.angleDeg * Math.PI) / 180;
      const elevRad = (l.elevationDeg * Math.PI) / 180;
      const r = Math.max(0.8, l.distanceM);

      const lightX = targetPos.x + r * Math.sin(rad) * Math.cos(elevRad);
      const lightY = targetPos.y + r * Math.sin(elevRad);
      const lightZ = targetPos.z + r * Math.cos(rad) * Math.cos(elevRad);

      light.position.set(lightX, lightY, lightZ);
      if (visual) visual.position.set(lightX, lightY, lightZ);

      if (light instanceof THREE.SpotLight) {
        if (l.id === 'light_bg') {
          light.target.position.set(0, 2.0, -38);
          light.target.updateMatrixWorld();
          if (visual) visual.lookAt(0, 2.0, -38);
        } else {
          light.target.position.copy(targetPos);
          light.target.updateMatrixWorld();
          if (visual) visual.lookAt(targetPos);
        }

        if (l.modifier === 'softbox') {
          light.angle = (68 * Math.PI) / 180;
          light.penumbra = 0.88;
        } else if (l.modifier === 'direct_spot') {
          light.angle = (32 * Math.PI) / 180;
          light.penumbra = 0.12;
        } else {
          light.angle = (80 * Math.PI) / 180;
          light.penumbra = 0.95;
        }
      }
    });

    lightMap.forEach((entry, id) => {
      if (!lights.some((l) => l.id === id)) {
        threeScene.remove(entry.light);
        if (entry.visual) threeScene.remove(entry.visual);
        lightMap.delete(id);
      }
    });
  }, [lights, sceneProps, kelvinToColor]);

  // ---------------------------------------------------------------------------
  // CONTINUOUS ANIMATION LOOP (RENDER SCENE + POST-PASS OVERLAYS)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (settings.showZebra) {
        setZebraOffset((prev) => (prev + dt * 25) % 20);
      }

      const composer = composerRef.current;
      const renderer = rendererRef.current;
      const scene3D = sceneRef.current;
      const camera = cameraRef.current;

      if (composer) {
        composer.render();
      } else if (renderer && scene3D && camera) {
        renderer.render(scene3D, camera);
      }

      render2DOverlays();

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [settings, opticalMetrics]);

  // ---------------------------------------------------------------------------
  // 2D OVERLAYS: DYNAMIC RANGE FILM LOG, DIFFRACTION, WB TINT, GRAIN, HUD TOOLS
  // ---------------------------------------------------------------------------
  const render2DOverlays = () => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 1. Shutter Flash Effect
    if (isTakingPhoto) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, w, h);
      return;
    }

    // Optical Exposure Delta Visual Simulation:
    // ACES Filmic Tone Mapping on Three.js handles the physical sensor curve.
    // Here we only simulate extreme sensor clipping flare (> +1.8 EV) and shadow crush (< -2.0 EV).
    if (!settings.showFalseColor) {
      if (opticalMetrics.exposureDeltaEV < -2.0) {
        // Shadow crushing at deep underexposure (< -2.0 EV)
        const darknessAlpha = Math.min(0.92, Math.pow((Math.abs(opticalMetrics.exposureDeltaEV) - 2.0) / 2.5, 1.2));
        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${darknessAlpha})`;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      } else if (opticalMetrics.exposureDeltaEV > 1.8) {
        // Optical highlight flare / sensor blooming at severe overexposure (> +1.8 EV)
        const blowoutAlpha = Math.min(0.85, Math.pow((opticalMetrics.exposureDeltaEV - 1.8) / 2.2, 1.25));
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${blowoutAlpha})`;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
    }

    // 2. Dynamic Range Tone Curve ('Film' Cine Log vs 'Video' Rec.709)
    if (settings.dynamicRange === 'Film') {
      // Cine Log profile: lifted black pedestal (+10%), compressed highlight shoulder, flat log gamma
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // Lifted pedestal
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgba(235, 235, 235, 0.92)'; // Softened dynamic contrast
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // 3. Optical Diffraction Softness at high f-numbers (f/16, f/22, f/32)
    if (opticalMetrics.isDiffractionLimiting && !settings.showFalseColor) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // 4. Camera White Balance Color Temperature Shift
    const deltaK = settings.whiteBalanceK - 5600;
    if (Math.abs(deltaK) > 100 || settings.tint !== 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      if (deltaK > 0) {
        const alpha = Math.min(0.4, (deltaK / 4000) * 0.35);
        ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.fillRect(0, 0, w, h);
      } else {
        const alpha = Math.min(0.4, (Math.abs(deltaK) / 3000) * 0.35);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fillRect(0, 0, w, h);
      }
      if (settings.tint !== 0) {
        const tintCol = settings.tint > 0 ? 'rgba(217, 70, 239, 0.12)' : 'rgba(34, 197, 94, 0.12)';
        ctx.fillStyle = tintCol;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();
    }

    // 5. Sensor Noise & Grain Simulation at High ISO (Organic film grain)
    if (settings.iso > 400) {
      const noiseAlpha = Math.min(0.28, ((settings.iso - 400) / 12800) * 0.35);
      ctx.save();
      ctx.globalAlpha = noiseAlpha;
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 400; i++) {
        const nx = Math.random() * w;
        const ny = Math.random() * h;
        ctx.fillRect(nx, ny, 1.5, 1.5);
      }
      ctx.restore();
    }

    // 5b. Optical Motion Blur Streak on fast moving subjects (Action / Sports)
    if (scene.hasMotion && opticalMetrics.motionBlurPx > 1.5) {
      const blurPx = Math.min(45, opticalMetrics.motionBlurPx);
      const blurAlpha = Math.min(0.48, (blurPx / 35) * 0.45);
      ctx.save();
      ctx.globalAlpha = blurAlpha;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      // Horizontal optical streak representing sensor integration across shutter exposure time
      ctx.fillRect(w * 0.25, h * 0.42, w * 0.5, h * 0.35);
      // Directional motion blur lines across the moving subject zone
      ctx.strokeStyle = 'rgba(200, 225, 255, 0.22)';
      ctx.lineWidth = 2.0;
      for (let i = 0; i < 12; i++) {
        const ly = h * (0.44 + (i / 12) * 0.3);
        ctx.beginPath();
        ctx.moveTo(w * 0.32, ly);
        ctx.lineTo(w * 0.32 + blurPx * 6.0, ly);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 6. False Color Overlay (IRE Professional Exposure Map)
    if (settings.showFalseColor) {
      ctx.save();
      const ev = opticalMetrics.exposureDeltaEV;
      ctx.globalAlpha = 0.35;
      if (ev < -2.0) {
        ctx.fillStyle = '#9333ea'; // Purple (Underexposed)
        ctx.fillRect(0, 0, w, h);
      } else if (ev < -0.8) {
        ctx.fillStyle = '#2563eb'; // Blue (Shadows)
        ctx.fillRect(0, 0, w, h);
      } else if (ev <= 0.8) {
        const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.45);
        grad.addColorStop(0, '#f472b6'); // Pink (Skin tone)
        grad.addColorStop(1, '#22c55e'); // Green (18% Gray)
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      } else if (ev < 2.0) {
        ctx.fillStyle = '#eab308'; // Yellow (Highlight Warning)
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = '#dc2626'; // Red (Clipped 100% IRE)
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();
    }

    // 7. Zebra Stripes Overlay
    if (settings.showZebra && !settings.showFalseColor && opticalMetrics.exposureDeltaEV > 1.2) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 2.5;
      const spacing = 14;
      ctx.beginPath();
      for (let x = -h; x < w; x += spacing) {
        ctx.moveTo(x + zebraOffset, 0);
        ctx.lineTo(x + h + zebraOffset, h);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 8. Focus Peaking Overlay
    if (settings.showPeaking && !settings.showFalseColor) {
      const focusDist = settings.focusDistanceM;
      const dof = Math.max(0.05, opticalMetrics.dofTotalM);
      const peakCol = settings.peakingColor === 'red' ? '#ef4444' : settings.peakingColor === 'blue' ? '#3b82f6' : '#22c55e';

      sceneProps.forEach((prop) => {
        if (!prop.enabled) return;
        const delta = Math.abs(focusDist - prop.distanceM);
        if (delta < dof * 0.6) {
          const u = (prop.xOffsetPct / 100) * 0.55;
          const propX = w * (0.5 + u);
          const propY = h * 0.5;

          ctx.save();
          ctx.strokeStyle = peakCol;
          ctx.lineWidth = 2.0;
          ctx.globalAlpha = 0.85;
          ctx.strokeRect(propX - 45, propY - 70, 90, 140);
          ctx.restore();
        }
      });
    }

    // 9. Aspect Ratio Frame Guides & Orientation Masks (Cinema & Photography Standards)
    const activeGuide = settings.compositionGuide || (settings.frameGuide === 'thirds' ? 'thirds' : 'clean');
    const isPortrait = settings.orientation === 'portrait' || settings.aspectRatio === '9:16' || settings.aspectRatio === '4:5' || settings.aspectRatio === '2:3' || settings.frameGuide === '9:16' || settings.frameGuide === '4:5' || settings.frameGuide === '2:3';
    
    // Determine effective target ratio
    let targetRatio = 16 / 9;
    const ratioSetting = settings.aspectRatio || (settings.frameGuide !== 'clean' && settings.frameGuide !== 'thirds' ? settings.frameGuide : '16:9');
    
    if (ratioSetting === '9:16') targetRatio = 9 / 16;
    else if (ratioSetting === '4:5') targetRatio = 4 / 5;
    else if (ratioSetting === '2:3') targetRatio = 2 / 3;
    else if (ratioSetting === '3:2') targetRatio = isPortrait ? 2 / 3 : 3 / 2;
    else if (ratioSetting === '1:1') targetRatio = 1.0;
    else if (ratioSetting === '2.39:1') targetRatio = isPortrait ? 1 / 2.39 : 2.39;
    else if ((ratioSetting as string) === '1.85:1') targetRatio = isPortrait ? 1 / 1.85 : 1.85;
    else if (ratioSetting === '4:3') targetRatio = isPortrait ? 3 / 4 : 4 / 3;
    else { // '16:9' or default
      targetRatio = isPortrait ? 9 / 16 : 16 / 9;
    }

    ctx.save();
    const alpha = (settings.guideOpacity || 60) / 100;
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.5;

    let cropX = 0;
    let cropY = 0;
    let cropW = w;
    let cropH = h;
    const currentRatio = w / h;

    if (targetRatio > currentRatio) {
      cropH = w / targetRatio;
      cropY = (h - cropH) / 2;
      // Letterbox top & bottom bars
      ctx.fillRect(0, 0, w, cropY);
      ctx.fillRect(0, cropY + cropH, w, cropY);
      ctx.strokeRect(cropX, cropY, cropW, cropH);
    } else {
      cropW = h * targetRatio;
      cropX = (w - cropW) / 2;
      // Pillarbox left & right bars
      ctx.fillRect(0, 0, cropX, h);
      ctx.fillRect(cropX + cropW, 0, cropX, h);
      ctx.strokeRect(cropX, cropY, cropW, cropH);
    }

    // Format metadata watermark label on crop border
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    let formatLabel = isPortrait ? `📱 VERTICAL ${ratioSetting}` : `🎬 ${ratioSetting}`;
    if (ratioSetting === '9:16') formatLabel = '📱 9:16 REELS / TIKTOK / SHORTS';
    else if (ratioSetting === '4:5') formatLabel = '📸 4:5 FEED PORTRAIT';
    else if (ratioSetting === '2.39:1') formatLabel = '🎬 2.39:1 CINESCOPE ANAMÓRFICO';
    else if (ratioSetting === '3:2') formatLabel = isPortrait ? '📷 2:3 35mm RETRATO' : '📷 3:2 35mm FOTOGRAFÍA';
    else if (ratioSetting === '1:1') formatLabel = '⬛ 1:1 CUADRADO';
    else if (ratioSetting === '16:9') formatLabel = isPortrait ? '📱 9:16 VERTICAL' : '📺 16:9 REC.709 CINE/TV';

    ctx.fillText(formatLabel, cropX + 8, cropY + 16);

    // Composition Guides drawn INSIDE the active crop frame
    if (activeGuide === 'thirds') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cropX + cropW / 3, cropY); ctx.lineTo(cropX + cropW / 3, cropY + cropH);
      ctx.moveTo(cropX + (cropW * 2) / 3, cropY); ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);
      ctx.moveTo(cropX, cropY + cropH / 3); ctx.lineTo(cropX + cropW, cropY + cropH / 3);
      ctx.moveTo(cropX, cropY + (cropH * 2) / 3); ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (activeGuide === 'golden') {
      // Golden Ratio (Phi = 0.618)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      const phi = 0.618033;
      ctx.beginPath();
      ctx.moveTo(cropX + cropW * (1 - phi), cropY); ctx.lineTo(cropX + cropW * (1 - phi), cropY + cropH);
      ctx.moveTo(cropX + cropW * phi, cropY); ctx.lineTo(cropX + cropW * phi, cropY + cropH);
      ctx.moveTo(cropX, cropY + cropH * (1 - phi)); ctx.lineTo(cropX + cropW, cropY + cropH * (1 - phi));
      ctx.moveTo(cropX, cropY + cropH * phi); ctx.lineTo(cropX + cropW, cropY + cropH * phi);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (activeGuide === 'crosshair') {
      // Center Crosshair + Framing Brackets
      const cx = cropX + cropW / 2;
      const cy = cropY + cropH / 2;
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.75)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy); ctx.lineTo(cx + 15, cy);
      ctx.moveTo(cx, cy - 15); ctx.lineTo(cx, cy + 15);
      ctx.stroke();

      // Corner crop brackets
      const bLen = 14;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // TL
      ctx.moveTo(cropX + 10, cropY + 10 + bLen); ctx.lineTo(cropX + 10, cropY + 10); ctx.lineTo(cropX + 10 + bLen, cropY + 10);
      // TR
      ctx.moveTo(cropX + cropW - 10 - bLen, cropY + 10); ctx.lineTo(cropX + cropW - 10, cropY + 10); ctx.lineTo(cropX + cropW - 10, cropY + 10 + bLen);
      // BL
      ctx.moveTo(cropX + 10, cropY + cropH - 10 - bLen); ctx.lineTo(cropX + 10, cropY + cropH - 10); ctx.lineTo(cropX + 10 + bLen, cropY + cropH - 10);
      // BR
      ctx.moveTo(cropX + cropW - 10 - bLen, cropY + cropH - 10); ctx.lineTo(cropX + cropW - 10, cropY + cropH - 10); ctx.lineTo(cropX + cropW - 10, cropY + cropH - 10 - bLen);
      ctx.stroke();
    } else if (activeGuide === 'safe_area') {
      // Safe Action (90%) and Safe Title (80%)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.strokeRect(cropX + cropW * 0.05, cropY + cropH * 0.05, cropW * 0.9, cropH * 0.9);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.strokeRect(cropX + cropW * 0.1, cropY + cropH * 0.1, cropW * 0.8, cropH * 0.8);
    }

    ctx.restore();
  };

  // Camera Rig Operator Drag and Wheel
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; pan: number; tilt: number; truck: number; height: number; isShift: boolean }>({
    x: 0,
    y: 0,
    pan: 0,
    tilt: 0,
    truck: 0,
    height: 1.45,
    isShift: false,
  });
  const hasMovedSignificantlyRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Avoid triggering drag if clicking on floating buttons
    if ((e.target as HTMLElement).closest('button')) return;

    isDraggingRef.current = true;
    hasMovedSignificantlyRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pan: settings.cameraPanDeg || 0,
      tilt: settings.cameraTiltDeg || 0,
      truck: settings.cameraTruckM || 0,
      height: settings.cameraHeightM || 1.45,
      isShift: e.shiftKey || e.button === 2,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedSignificantlyRef.current = true;
    }

    if (dragStartRef.current.isShift) {
      // Shift-drag: Truck & Height (Pedestal) translation
      const newTruck = Math.max(-1.5, Math.min(1.5, dragStartRef.current.truck + dx * 0.004));
      const newHeight = Math.max(0.25, Math.min(3.0, dragStartRef.current.height - dy * 0.004));
      onUpdateSettings?.({
        cameraTruckM: Number(newTruck.toFixed(2)),
        cameraHeightM: Number(newHeight.toFixed(2)),
      });
    } else {
      // Normal drag: Pan & Tilt rotation
      const newPan = Math.max(-40, Math.min(40, dragStartRef.current.pan - dx * 0.12));
      const newTilt = Math.max(-35, Math.min(35, dragStartRef.current.tilt + dy * 0.12));
      onUpdateSettings?.({
        cameraPanDeg: Math.round(newPan),
        cameraTiltDeg: Math.round(newTilt),
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // If it was a clean tap without dragging, execute tap to focus on object!
    if (!hasMovedSignificantlyRef.current && onTapFocus) {
      const container = mountRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / rect.width;
      const clickXPct = clickX * 100 - 50;

      const activeProps = sceneProps.filter((p) => p.enabled);
      if (activeProps.length > 0) {
        let closest = activeProps[0];
        let minDiff = 999;
        activeProps.forEach((p) => {
          const diff = Math.abs(p.xOffsetPct - clickXPct);
          if (diff < minDiff) {
            minDiff = diff;
            closest = p;
          }
        });
        if (closest && minDiff < 30) {
          cameraAudio.playFocusLock();
          onTapFocus(closest.distanceM);
          return;
        }
      }
      cameraAudio.playFocusLock();
      onTapFocus(scene.defaultSubjectDistanceM);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newDolly = Math.max(-1.2, Math.min(1.5, (settings.cameraDollyM || 0) + delta));
    onUpdateSettings?.({ cameraDollyM: Number(newDolly.toFixed(2)) });
  };

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
    >
      {/* 2D Overlay Canvas for Blackmagic HUD Guides, False Color, Peaking & Zebras */}
      <canvas
        ref={overlayCanvasRef}
        width={960}
        height={540}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 1. TOP-LEFT: MINIMAL DIRECTOR'S HUD BADGE (NON-BLOCKING) */}
      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] font-mono text-zinc-300 pointer-events-none z-20 flex items-center gap-2 shadow">
        <span className="text-cyan-400 font-bold">RIG:</span>
        <span>Y: {settings.cameraHeightM.toFixed(2)}m</span>
        <span>•</span>
        <span>Tilt: {settings.cameraTiltDeg}°</span>
        <span>•</span>
        <span>Pan: {settings.cameraPanDeg}°</span>
        <span>•</span>
        <span>Roll: {settings.cameraRollDeg}°</span>
        <span className="hidden md:inline">• Dolly: {(settings.cameraDollyM || 0).toFixed(2)}m</span>
      </div>

      {/* 2. TOP-RIGHT: INTERACTIVE RATIO & ORIENTATION OPERATOR BAR */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-30">
        {settings.isZoom1to1 && (
          <div className="bg-amber-500 text-black px-2 py-0.5 text-[10px] font-mono font-bold rounded shadow pointer-events-none">
            LUPA 1:1
          </div>
        )}

        {/* Orientation Toggle (Landscape vs Portrait) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cameraAudio.playDialClick();
            const nextOrientation = (settings.orientation === 'portrait' ? 'landscape' : 'portrait');
            const nextRatio = nextOrientation === 'portrait'
              ? (settings.aspectRatio === '16:9' ? '9:16' : settings.aspectRatio === '3:2' ? '2:3' : settings.aspectRatio)
              : (settings.aspectRatio === '9:16' ? '16:9' : settings.aspectRatio === '2:3' ? '3:2' : settings.aspectRatio);
            onUpdateSettings?.({
              orientation: nextOrientation,
              aspectRatio: nextRatio,
            });
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono font-bold transition border cursor-pointer backdrop-blur shadow-md ${
            settings.orientation === 'portrait'
              ? 'bg-amber-500 text-black border-amber-400'
              : 'bg-black/75 text-zinc-300 hover:text-white border-zinc-700 hover:bg-zinc-800/80'
          }`}
          title="Alternar Orientación de Cámara (Horizontal / Vertical)"
        >
          {settings.orientation === 'portrait' ? (
            <>
              <Smartphone className="w-3 h-3" />
              <span>VERTICAL (9:16)</span>
            </>
          ) : (
            <>
              <Monitor className="w-3 h-3" />
              <span>HORIZONTAL (16:9)</span>
            </>
          )}
        </button>

        {/* Aspect Ratio Quick Cycler */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cameraAudio.playDialClick();
            const ratios: CameraSettings['aspectRatio'][] = [
              '16:9',
              '9:16',
              '4:5',
              '3:2',
              '2.39:1',
              '1:1',
              '4:3',
            ];
            const curIdx = ratios.indexOf(settings.aspectRatio || '16:9');
            const nextRatio = ratios[(curIdx + 1) % ratios.length];
            const nextOrient = (nextRatio === '9:16' || nextRatio === '4:5' || nextRatio === '2:3') ? 'portrait' : 'landscape';
            onUpdateSettings?.({
              aspectRatio: nextRatio,
              orientation: nextOrient,
            });
          }}
          className="bg-black/75 hover:bg-zinc-800/90 text-cyan-400 hover:text-cyan-300 border border-zinc-700 px-2 py-1 rounded text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer backdrop-blur shadow"
          title="Ciclar Formato de Relación de Aspecto (16:9, 9:16, 4:5, 3:2, 2.39:1, 1:1)"
        >
          <span>RATIO: {settings.aspectRatio || '16:9'}</span>
        </button>

        {/* Composition Guides Cycler */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cameraAudio.playDialClick();
            const guides: CameraSettings['compositionGuide'][] = ['thirds', 'golden', 'crosshair', 'safe_area', 'clean'];
            const curIdx = guides.indexOf(settings.compositionGuide || 'thirds');
            const nextGuide = guides[(curIdx + 1) % guides.length];
            onUpdateSettings?.({ compositionGuide: nextGuide });
          }}
          className="bg-black/75 hover:bg-zinc-800/90 text-zinc-300 hover:text-white border border-zinc-700 px-2 py-1 rounded text-[10px] font-mono transition flex items-center gap-1 cursor-pointer backdrop-blur shadow"
          title="Alternar Guías de Composición (Tercios, Proporción Áurea, Centro, Área Segura, Limpio)"
        >
          <Grid className="w-3 h-3 text-amber-400" />
          <span className="uppercase">{settings.compositionGuide || 'TERCIOS'}</span>
        </button>
      </div>

      {/* 3. CENTER: FOCUS DISTANCE HUD TARGET SQUARE */}
      <div
        className="absolute w-12 h-12 border-2 pointer-events-none transition-all duration-300 z-20"
        style={{
          borderColor: Math.abs(settings.focusDistanceM - settings.subjectDistanceM) < 0.25 ? '#22c55e' : 'rgba(255,255,255,0.6)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full shadow" />
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/90 whitespace-nowrap bg-black/75 px-1.5 py-0.5 rounded border border-zinc-700">
          {settings.focusDistanceM.toFixed(2)}m
        </div>
      </div>

      {/* 4. BOTTOM-LEFT: COMPACT FALSE COLOR LEGEND (CLEARS HISTOGRAM AT BOTTOM-RIGHT) */}
      {settings.showFalseColor && (
        <div className="absolute bottom-2.5 left-2.5 max-w-[calc(100%-210px)] bg-black/85 backdrop-blur border border-zinc-700/80 p-1.5 rounded-lg flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-300 z-20 pointer-events-none shadow-lg">
          <span className="text-zinc-400 font-bold hidden sm:inline">IRE:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-purple-600 rounded"></span> 0%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-600 rounded"></span> 15%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-green-500 rounded"></span> 38%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-pink-400 rounded ring-1 ring-white"></span> 65%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-yellow-400 rounded"></span> 85%</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-600 rounded"></span> 100%</span>
          </div>
        </div>
      )}
    </div>
  );
};
