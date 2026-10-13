import { CareerBrief } from '../types/camera';

export const CAREER_BRIEFS: CareerBrief[] = [
  // ===========================================================================
  // TIER 1: SEGUNDO ASISTENTE DE CÁMARA (2nd AC / TRAINEE) - NIVELES 1 A 4
  // Fundamentos: Encuadre, Pasaporte Biométrico, Escala Emotiva y Congelación
  // ===========================================================================
  {
    id: 'career_1_aspect_ratio_frame',
    level: 1,
    rank: 'junior',
    rankTitle: '🥉 Asistente de Cámara Jr. (2nd AC)',
    title: 'Foto Escolar y Credencial Oficial: Definiendo el Lienzo',
    client: 'Academia Central & Anuario Estudiantil',
    projectType: 'Sesión Fotográfica Escolar y Credenciales',
    payoutUsd: 280,
    targetScene: 'portrait_golden',
    objective: 'Te han contratado para la sesión oficial del anuario escolar. Tienes que retratar a la mascota del colegio para la credencial y la portada. El director de producción pide un encuadre deliberado (16:9, 2.39:1 o 9:16 vertical), con una lente clásica de 50mm para que las proporciones no se deformen, y un fotómetro perfectamente equilibrado (EV = 0.0 ± 0.6).',
    artisticContext: 'El comité del anuario insiste en que las fotos de credencial deben verse limpias y profesionales. Antes de disparar, el primer paso en cualquier rodaje o sesión es decidir las fronteras del encuadre y asegurar que la exposición no queme los detalles ni empaste las sombras.',
    classLesson: 'Encuadre y Formato • Relación de Aspecto (16:9, 2.39:1, 9:16) y Exposición Neutra',
    bookReference: 'Encuadre y Formato • Relación de Aspecto (16:9, 2.39:1, 9:16) y Exposición Neutra',
    deliverySpecs: [
      'Relación de aspecto definida deliberadamente (16:9, 2.39:1, 9:16 o 4:5)',
      'Lente estándar de 50mm (40mm - 60mm) sin distorsión angular de rostro',
      'Exposición limpia calibrada en fotómetro (0.0 ± 0.6 EV)',
    ],
    didacticHints: [
      '¿Te acuerdas de cómo una lente muy angular deforma la nariz y las facciones si te acercas demasiado? Para una foto escolar, mantén la focal en 50mm.',
      'Revisa el indicador de EV en la barra superior. Si está en positivo (+) entra demasiada luz; si está en negativo (-) la escena queda oscura. Como recordarás, puedes equilibrar el diafragma, obturación o ISO para llevarlo a 0.0.',
    ],
    solutionGuide: {
      explanation: 'Una lente estándar de 50mm a f/2.8 y 1/125s con ISO 400 en ratio 16:9 o 2.39:1 produce una perspectiva natural y respetuosa del sujeto, ideal para fotografía institucional o editorial.',
      recommendedSettings: {
        aspectRatio: '16:9',
        orientation: 'landscape',
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        cameraHeightM: 1.45,
        cameraTiltDeg: 0,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Ratio 16:9 • Focal 50mm • f/2.8 • 1/125s • ISO 400 • Distancia 2.2m',
    },
    validate: (settings, metrics) => {
      const ratioOk = !!settings.aspectRatio;
      const focalOk = settings.focalLengthMm >= 40 && settings.focalLengthMm <= 60;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = ratioOk && focalOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Excelente trabajo! La credencial escolar luce impecable: proporciones naturales en 50mm y el fotómetro está clavado en el punto justo. El director aprueba la entrega.'
          : 'El cliente observa que el encuadre aún no está en su punto. Asegúrate de definir el ratio de aspecto, mantener la focal cerca de 50mm y nivelar el fotómetro a 0.0 EV.',
        details: [
          {
            label: 'Formato / Relación de Aspecto',
            pass: ratioOk,
            currentVal: settings.aspectRatio || 'No seleccionado',
            targetVal: '16:9, 2.39:1, 9:16 o 4:5',
            hint: 'Ajusta el ratio de aspecto desde la consola de encuadre o menú superior.',
          },
          {
            label: 'Focal Estándar (50mm)',
            pass: focalOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '40mm - 60mm (Ideal 50mm)',
            hint: 'Mantén la focal cerca de 50mm para una perspectiva natural del sujeto.',
          },
          {
            label: 'Exposición Equilibrada (EV)',
            pass: exposureOk,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 0.6 EV',
            hint: 'Ajusta diafragma, obturación o ISO hasta que el indicador de EV quede cerca de 0.0.',
          },
        ],
      };
    },
  },

  {
    id: 'career_2_infant_passport_sharp',
    level: 2,
    rank: 'junior',
    rankTitle: '🥉 Asistente de Cámara Jr. (2nd AC)',
    title: 'Retrato Infantil y Pasaporte Biométrico: Nitidez y Profundidad',
    client: 'Estudio Fotográfico Municipal & Visas',
    projectType: 'Identificación Oficial y Fotografía Infantil de Estudio',
    payoutUsd: 340,
    targetScene: 'fashion_commercial',
    objective: 'El consulado exige fotografías de identificación biométrica para menores. Todo el rostro (desde la punta de la nariz hasta las orejas) debe estar en foco crítico sin perder nitidez. Para ello, necesitas cerrar el diafragma a un punto dulce (entre f/5.6 y f/11), mantener la distancia estándar (1.8m a 2.5m) y asegurar exposición neutral.',
    artisticContext: 'En fotografía técnica y de identificación oficial no se busca desenfoque artístico; se exige profundidad de campo generosa para que las autoridades y sistemas de reconocimiento facial puedan validar cada rasgo anatómico.',
    classLesson: 'Diafragma y Profundidad de Campo • Punto Dulce Óptico (f/5.6 - f/11) para Foco Integral',
    bookReference: 'Diafragma y Profundidad de Campo • Punto Dulce Óptico (f/5.6 - f/11) para Foco Integral',
    deliverySpecs: [
      'Apertura de diafragma cerrada entre f/5.6 y f/11',
      'Distancia estándar de retrato (1.8m - 2.5m)',
      'Exposición limpia calibrada (0.0 ± 0.6 EV)',
    ],
    didacticHints: [
      'Si abres el diafragma a f/1.4 o f/2.8, solo los ojos saldrán en foco y las orejas quedarán desenfocadas, lo cual rechaza el trámite consular.',
      'Al cerrar a f/5.6 o f/8 entra menos luz al sensor; como recordarás, compensa subiendo el ISO o bajando la velocidad a 1/125s.',
    ],
    solutionGuide: {
      explanation: 'Un diafragma de f/5.6 o f/8 garantiza que la profundidad de campo cubra varios centímetros de volumen facial con la máxima resolución óptica de la lente.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 5.6,
        shutterSpeedInv: 125,
        iso: 800,
        subjectDistanceM: 2.0,
        focusDistanceM: 2.0,
      },
      summaryText: 'Focal 50mm • f/5.6 • 1/125s • ISO 800 • Distancia 2.0m',
    },
    validate: (settings, metrics) => {
      const apertureOk = settings.aperture >= 5.0 && settings.aperture <= 11.5;
      const distOk = settings.subjectDistanceM >= 1.7 && settings.subjectDistanceM <= 2.6;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = apertureOk && distOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Aprobado con honores por el perito consular! Nitidez uniforme en todo el rostro, sin zonas fuera de foco y exposición perfecta.'
          : 'El consulado rechazó la muestra. Se requiere diafragma entre f/5.6 y f/11 para profundidad suficiente y exposición bien balanceada.',
        details: [
          {
            label: 'Diafragma Cerrado (f/5.6 - f/11)',
            pass: apertureOk,
            currentVal: `f/${settings.aperture}`,
            targetVal: 'f/5.6 a f/11',
            hint: 'Cierra el diafragma para asegurar profundidad de campo en todo el rostro.',
          },
          {
            label: 'Distancia de Retrato',
            pass: distOk,
            currentVal: `${settings.subjectDistanceM}m`,
            targetVal: '1.8m - 2.5m',
            hint: 'Sitúa la cámara a unos 2.0 metros del sujeto.',
          },
          {
            label: 'Exposición Equilibrada',
            pass: exposureOk,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 0.6 EV',
            hint: 'Compensa con ISO para nivelar el fotómetro a 0.0 EV.',
          },
        ],
      };
    },
  },

  {
    id: 'career_3_scale_close_up',
    level: 3,
    rank: 'junior',
    rankTitle: '🥉 Asistente de Cámara Jr. (2nd AC)',
    title: 'Campaña de Adopción y Juguetes: Primer Plano Emotivo (Close-Up)',
    client: 'Kids & Paws Toy Brand',
    projectType: 'Retrato Comercial de Personaje (Close-Up)',
    payoutUsd: 400,
    targetScene: 'portrait_golden',
    objective: 'Una marca de juguetes te ha contratado para la campaña navideña. Necesitan un primer plano cerrado (Close-Up) de la mascota donde la mirada y expresión llenen el encuadre, aislando el fondo con un desenfoque suave (teleobjetivo ≥ 70mm y apertura amplia ≤ f/2.8).',
    artisticContext: 'El cliente explica que en publicidad de juguetes la empatía lo es todo. Un plano general muestra el lugar, pero solo un primer plano cerrado con fondo desenfocado logra que los niños y padres sientan una conexión inmediata con el personaje.',
    classLesson: 'Escala de Plano • El Primer Plano (Close-Up) y Aislamiento por Bokeh',
    bookReference: 'Escala de Plano • El Primer Plano (Close-Up) y Aislamiento por Bokeh',
    deliverySpecs: [
      'Lente de retrato / teleobjetivo moderado (≥ 70mm)',
      'Apertura abierta de diafragma (≤ f/2.8) para crear desenfoque (DoF reducida)',
      'Exposición limpia en fotómetro (0.0 ± 0.8 EV)',
    ],
    didacticHints: [
      'Para que el sujeto resalte con fuerza sobre el fondo de la ciudad, recurre a una focal más larga (85mm o superior).',
      'Como recordarás, una apertura amplia (como f/2.0 o f/2.8) reduce la profundidad de campo, convirtiendo las luces lejanas en círculos de bokeh cremoso.',
    ],
    solutionGuide: {
      explanation: 'Una lente de 85mm o 100mm a f/2.0 y 1/125s con ISO 200 aisla al personaje mediante poca profundidad de campo, concentrando toda la carga emocional en sus ojos.',
      recommendedSettings: {
        focalLengthMm: 85,
        aperture: 2.0,
        shutterSpeedInv: 125,
        iso: 200,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      summaryText: 'Focal 85mm • f/2.0 • 1/125s • ISO 200 • Distancia 1.8m',
    },
    validate: (settings, metrics) => {
      const focalOk = settings.focalLengthMm >= 70;
      const apertureOk = settings.aperture <= 2.8;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = focalOk && apertureOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡El cliente está fascinado! La mirada del personaje atrapa al instante y el fondo se disuelve en un bokeh elegante. Entrega aprobada.'
          : 'El departamento de arte siente que el personaje aún no destaca. Emplea una focal más larga (≥ 70mm) y abre el diafragma (≤ f/2.8) para aislarlo.',
        details: [
          {
            label: 'Teleobjetivo de Retrato (≥ 70mm)',
            pass: focalOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≥ 70mm (Ideal 85mm)',
            hint: 'Aumenta la distancia focal para cerrar el ángulo visual.',
          },
          {
            label: 'Diafragma Abierto (≤ f/2.8)',
            pass: apertureOk,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≤ f/2.8 (Ideal f/2.0)',
            hint: 'Abre el diafragma para difuminar el fondo.',
          },
          {
            label: 'Exposición Equilibrada',
            pass: exposureOk,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 0.8 EV',
            hint: 'Ajusta la velocidad o ISO para balancear la luz que entra.',
          },
        ],
      };
    },
  },

  {
    id: 'career_4_sports_freeze_action',
    level: 4,
    rank: 'junior',
    rankTitle: '🥉 Asistente de Cámara Jr. (2nd AC)',
    title: 'Maratón Urbana & Spot Deportivo: Congelación de Movimiento',
    client: 'Apex Athletics & Energy Drink',
    projectType: 'Fotografía Publicitaria de Deportes de Alta Velocidad',
    payoutUsd: 460,
    targetScene: 'action_sports',
    objective: 'Campaña publicitaria de zapatillas deportivas. El atleta corre a toda velocidad y la marca exige congelar las gotas de sudor y el impacto del calzado en el suelo sin el más mínimo barrido de movimiento (shutter speed ≥ 1/1000s o ángulo de obturación ≤ 45°).',
    artisticContext: 'En fotografía publicitaria de alto rendimiento, el movimiento borroso arruina la percepción de potencia y nitidez del producto. Se requiere velocidad de obturación implacable.',
    classLesson: 'Obturación de Alta Velocidad • Congelar Movimiento Extremo (1/1000s)',
    bookReference: 'Obturación de Alta Velocidad • Congelar Movimiento Extremo (1/1000s)',
    deliverySpecs: [
      'Velocidad de obturación ultrarrápida (≥ 1/1000s)',
      'Compensación de exposición para luz diurna',
      'Exposición limpia (|EV| ≤ 1.0)',
    ],
    didacticHints: [
      'Al disparar a 1/1000s a plena luz de día (EV 12), una apertura de f/2.8 con ISO 200 compensa con precisión la luz que entra.',
      'Comprueba que el indicador de EV quede equilibrado.',
    ],
    solutionGuide: {
      explanation: 'Una velocidad de 1/1000s congela cualquier movimiento humano rápido, convirtiendo la acción en una escultura suspendida en el tiempo.',
      recommendedSettings: {
        shutterSpeedInv: 1000,
        aperture: 2.8,
        iso: 200,
        focalLengthMm: 70,
        subjectDistanceM: 4.5,
        focusDistanceM: 4.5,
      },
      summaryText: '1/1000s • f/2.8 • ISO 200 • Focal 70mm',
    },
    validate: (settings, metrics) => {
      const shutterOk = settings.shutterSpeedInv >= 800 || (settings.shutterMode === 'angle' && settings.shutterAngleDeg <= 50);
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 1.0;
      const success = shutterOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Impacto visual absoluto! Cada detalle de la pisada y el músculo quedó nítidamente congelado sin trepidación. El director de marca aprueba la campaña.'
          : 'La imagen presenta trepidación o exposición desajustada. Sube la velocidad a 1/1000s o más y compensa con ISO/apertura para nivelar el fotómetro.',
        details: [
          {
            label: 'Obturación Rápida (≥ 1/1000s)',
            pass: shutterOk,
            currentVal: `1/${settings.shutterSpeedInv}s`,
            targetVal: '≥ 1/1000s',
            hint: 'Aumenta el dial de velocidad a 1000 o más.',
          },
          {
            label: 'Exposición Equilibrada',
            pass: exposureOk,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 1.0 EV',
            hint: 'Ajusta ISO/apertura para nivelar la luz.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 2: PRIMER ASISTENTE DE CÁMARA (1st AC / FOCUS PULLER) - NIVELES 5 A 8
  // Control Temporal, Low-Light, Macro Quirúrgico y Arquitectura Gran Angular
  // ===========================================================================
  {
    id: 'career_5_waterfall_motion_blur',
    level: 5,
    rank: 'semi_senior',
    rankTitle: '🎯 1st AC / Operador Jr.',
    title: 'Naturaleza & Publicidad de Automoción: Efecto Seda y Barrido',
    client: 'Alpine Motors & Turismo Forestal',
    projectType: 'Spot Comercial de Paisaje Dinámico',
    payoutUsd: 540,
    targetScene: 'landscape_depth',
    objective: 'Un fabricante de vehículos todoterreno filma en una cordillera con cascadas y ríos. Quieren transmitir sensación de viaje fluido y contemplación mediante efecto seda en el agua en movimiento (velocidad lenta ≤ 1/15s, como 1/15s o 1/8s). Para evitar sobreexponer la toma a plena luz de día, debes cerrar diafragma (≥ f/8 o f/16) y mantener ISO al mínimo.',
    artisticContext: 'El tiempo es un lienzo. Las exposiciones prolongadas transforman el agua turbulenta en vapor etéreo, creando una atmósfera poética muy cotizada en anuncios de coches y marcas de aventura.',
    classLesson: 'Larga Exposición • Efecto Seda y Control de Sobreexposición',
    bookReference: 'Larga Exposición • Efecto Seda y Control de Sobreexposición',
    deliverySpecs: [
      'Velocidad de obturación lenta (≤ 1/15s)',
      'Diafragma cerrado (≥ f/8) para evitar quemar la imagen en exteriores',
      'Exposición limpia (|EV| ≤ 1.0)',
    ],
    didacticHints: [
      'Al dejar el obturador abierto durante 1/15s a plena luz de día entra muchísima luz. Cierra el diafragma a f/11 o f/16 para compensar.',
      'Baja el ISO al mínimo (50 o 100) para proteger las altas luces.',
    ],
    solutionGuide: {
      explanation: 'A 1/15s el agua se suaviza en seda. Cerrar a f/16 y bajar a ISO 100 equilibra la cantidad masiva de luz exterior.',
      recommendedSettings: {
        shutterSpeedInv: 15,
        aperture: 16,
        iso: 100,
        focalLengthMm: 35,
        subjectDistanceM: 6,
        focusDistanceM: 6,
      },
      summaryText: '1/15s • f/16 • ISO 100 • Focal 35mm',
    },
    validate: (settings, metrics) => {
      const slowShutter = settings.shutterSpeedInv <= 20;
      const closedAperture = settings.aperture >= 7.5;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 1.0;
      const success = slowShutter && closedAperture && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La imagen destila calma y magia! El efecto seda del agua fluye con suavidad sedosa y la escena conserva textura en las rocas. Spot aprobado.'
          : 'El agua aún no tiene el efecto seda o la imagen se sobreexpuso. Baja la velocidad a 1/15s o menor y cierra el diafragma a f/8 o más.',
        details: [
          {
            label: 'Obturación Lenta (≤ 1/15s)',
            pass: slowShutter,
            currentVal: `1/${settings.shutterSpeedInv}s`,
            targetVal: '≤ 1/15s',
            hint: 'Reduce la velocidad a 1/15s o menos.',
          },
          {
            label: 'Diafragma Cerrado (≥ f/8)',
            pass: closedAperture,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≥ f/8',
            hint: 'Cierra el diafragma para compensar el exceso de luz.',
          },
          {
            label: 'Exposición Equilibrada',
            pass: exposureOk,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 1.0 EV',
            hint: 'Ajusta ISO para nivelar el fotómetro.',
          },
        ],
      };
    },
  },

  {
    id: 'career_6_low_light_concert',
    level: 6,
    rank: 'semi_senior',
    rankTitle: '🎯 1st AC / Operador Jr.',
    title: 'Sesión Acústica en Club Subterráneo: Dominio de Poca Luz e ISO',
    client: 'Blue Note Sessions & Indie Vinyl',
    projectType: 'Documental Musical en Sala Nocturna',
    payoutUsd: 620,
    targetScene: 'night_studio',
    objective: 'Grabación de un documental musical en un club íntimo. El director de fotografía te pide capturar la atmósfera tenue abriendo el diafragma (≤ f/2.0), fijar una velocidad cinemática de rodaje (1/48s a 1/60s) y utilizar una ganancia ISO adecuada para captar la atmósfera cálida sin dejar la toma en penumbras.',
    artisticContext: 'En conciertos y rodajes nocturnos íntimos, la luz disponible es escasa. Dominar la apertura máxima de lentes fijas luminosas y equilibrar la ganancia ISO es la marca de un operador profesional.',
    classLesson: 'Exposición en Poca Luz • Apertura Máxima (f/1.4 - f/2.0) y Velocidad Cinemática',
    bookReference: 'Exposición en Poca Luz • Apertura Máxima (f/1.4 - f/2.0) y Velocidad Cinemática',
    deliverySpecs: [
      'Apertura ultra luminosa (≤ f/2.0)',
      'Velocidad cinemática de rodaje (1/48s a 1/60s)',
      'Exposición adecuada para atmósfera nocturna',
    ],
    didacticHints: [
      'Abre la lente a f/1.8 para absorber la luz física disponible en el club.',
      'Usa velocidad 1/50s para respetar el movimiento natural de 24fps.',
    ],
    solutionGuide: {
      explanation: 'f/1.8 capta la máxima luz física, mientras que 1/50s a ISO 400 con luz de ambiente tenue resalta al músico con calidez intimista.',
      recommendedSettings: {
        aperture: 1.8,
        iso: 400,
        shutterSpeedInv: 50,
        focalLengthMm: 50,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 15 },
        { id: 'light_fill', enabled: false, intensityPct: 0 },
        { id: 'light_rim', enabled: false, intensityPct: 0 },
      ],
      summaryText: 'f/1.8 • 1/50s • ISO 400 • Focal 50mm',
    },
    validate: (settings, metrics) => {
      const apertureOk = settings.aperture <= 2.0;
      const shutterOk = settings.shutterSpeedInv >= 40 && settings.shutterSpeedInv <= 75;
      const exposureOk = metrics.exposureDeltaEV >= -1.5 && metrics.exposureDeltaEV <= 1.5;
      const success = apertureOk && shutterOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Atmósfera pura! El ambiente del club se siente íntimo, cálido y vibrante. Los detalles de las sombras tienen vida. La productora musical te felicita.'
          : 'Ajusta la apertura a ≤ f/2.0 y la velocidad a 1/50s para capturar la estética musical nocturna.',
        details: [
          {
            label: 'Apertura Luminosa (≤ f/2.0)',
            pass: apertureOk,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≤ f/2.0',
            hint: 'Abre el diafragma a su punto más luminoso.',
          },
          {
            label: 'Velocidad Cinemática (1/50s)',
            pass: shutterOk,
            currentVal: `1/${settings.shutterSpeedInv}s`,
            targetVal: '1/48s - 1/60s',
            hint: 'Ajusta la velocidad cerca de 1/50s para cine.',
          },
        ],
      };
    },
  },

  {
    id: 'career_7_macro_commercial_product',
    level: 7,
    rank: 'semi_senior',
    rankTitle: '🎯 1st AC / Operador Jr.',
    title: 'Relojería de Lujo: Detalle Crítico y Enfoque Quirúrgico',
    client: 'Kronos Horology & Swiss Design',
    projectType: 'Fotografía Macro de Producto Comercial',
    payoutUsd: 700,
    targetScene: 'fashion_commercial',
    objective: 'Encargo publicitario de alta relojería suiza. Se requiere un plano detalle donde el producto esté a distancia muy cercana (≤ 1.2m) o focal teleobjetivo (≥ 85mm), con el anillo de enfoque clavado con precisión milimétrica sobre el sujeto (|enfoque - distancia| ≤ 0.15m) y diafragma dulce (f/4.0 a f/8) para evitar que la profundidad de campo sea tan delgada como una hoja de papel.',
    artisticContext: 'En fotografía de producto de lujo, la precisión es sagrada. Un error de 5 centímetros en el foco deja la esfera del reloj borrosa y la foto se desecha.',
    classLesson: 'Enfoque Crítico de Producto • Distancia Mínima de Enfoque y Punto Dulce f/5.6',
    bookReference: 'Enfoque Crítico de Producto • Distancia Mínima de Enfoque y Punto Dulce f/5.6',
    deliverySpecs: [
      'Distancia cercana al sujeto (≤ 1.3m) o teleobjetivo macro (≥ 85mm)',
      'Enfoque crítico calibrado exactamente a la distancia del sujeto',
      'Diafragma controlado (f/4.0 a f/8)',
      'Exposición limpia (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Toca directamente sobre el sujeto o ajusta el dial de enfoque para que la distancia de foco coincida exactamente con la distancia del sujeto.',
      'A distancias tan cortas la profundidad de campo se vuelve diminuta. No uses f/1.4; cierra a f/5.6 para tener nitidez en todo el producto.',
    ],
    solutionGuide: {
      explanation: 'Una distancia de 1.1m con foco en 1.1m a f/5.6 y focal de 85mm produce una imagen de catálogo nítida y cristalina.',
      recommendedSettings: {
        focalLengthMm: 85,
        subjectDistanceM: 1.1,
        focusDistanceM: 1.1,
        aperture: 5.6,
        iso: 800,
        shutterSpeedInv: 125,
      },
      summaryText: 'Distancia 1.1m • Foco 1.1m • f/5.6 • Focal 85mm',
    },
    validate: (settings, metrics) => {
      const distOk = settings.subjectDistanceM <= 1.35 || settings.focalLengthMm >= 85;
      const focusPrecision = Math.abs(settings.focusDistanceM - settings.subjectDistanceM) <= 0.18;
      const apertureSweet = settings.aperture >= 3.8 && settings.aperture <= 8.5;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = distOk && focusPrecision && apertureSweet && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Nitidez quirúrgica! Los grabados del reloj y el cristal se aprecian con detalle microscópico. Aprobado por la casa relojera.'
          : 'El enfoque o la profundidad de campo no son óptimos. Asegúrate de enfocar con precisión sobre el sujeto y usar diafragma entre f/4.0 y f/8.',
        details: [
          {
            label: 'Precisión de Enfoque (Foco = Distancia)',
            pass: focusPrecision,
            currentVal: `Foco: ${settings.focusDistanceM}m / Sujeto: ${settings.subjectDistanceM}m`,
            targetVal: 'Diferencia ≤ 0.15m',
            hint: 'Ajusta el dial de foco hasta igualar la distancia del sujeto.',
          },
          {
            label: 'Diafragma Dulce (f/4 - f/8)',
            pass: apertureSweet,
            currentVal: `f/${settings.aperture}`,
            targetVal: 'f/4.0 a f/8.0',
            hint: 'Cierra el diafragma para ganar profundidad.',
          },
        ],
      };
    },
  },

  {
    id: 'career_8_architectural_wide_angle',
    level: 8,
    rank: 'semi_senior',
    rankTitle: '🎯 1st AC / Operador Jr.',
    title: 'Espacio Vanguardista: Gran Angular sin Distorsión',
    client: 'ArchDaily & Studio Loft Contemporáneo',
    projectType: 'Catálogo Arquitectónico de Interiores',
    payoutUsd: 780,
    targetScene: 'landscape_depth',
    objective: 'Una prestigiosa revista de arquitectura te encarga fotografiar un espacio contemporáneo con paisaje al fondo. La consigna es utilizar una lente gran angular (≤ 28mm) para abarcar la majestuosidad de la estancia, pero manteniendo la cámara perfectamente nivelada en el horizonte (Roll = 0° ± 1° y Tilt entre -4° y +4°) para que las líneas verticales no converjan ni se deformen.',
    artisticContext: 'En fotografía de arquitectura, las líneas verticales torcidas o convergentes denotan descuido amateur. Un operador riguroso calibra la burbuja del trípode a cero grados.',
    classLesson: 'Gran Angular y Perspectiva • Líneas Verticales Paralelas y Horizonte Nivelado',
    bookReference: 'Gran Angular y Perspectiva • Líneas Verticales Paralelas y Horizonte Nivelado',
    deliverySpecs: [
      'Lente gran angular (≤ 28mm, como 24mm o 18mm)',
      'Nivel de cámara riguroso (Roll = 0° ± 1° y Tilt entre -4° y +4°)',
      'Diafragma cerrado (≥ f/5.6) para nitidez en esquinas',
      'Exposición limpia (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Si inclinas la cámara hacia arriba o hacia abajo con un gran angular, los pilares y paredes parecerán caerse hacia atrás. Mantén el tilt en 0°.',
      'Revisa que el Roll (rotación lateral) esté en 0° para un horizonte plano.',
    ],
    solutionGuide: {
      explanation: 'Un 24mm a f/8 con Tilt 0° y Roll 0° ofrece un campo de visión expansivo con columnas verticales perfectamente rectas.',
      recommendedSettings: {
        focalLengthMm: 24,
        cameraTiltDeg: 0,
        cameraRollDeg: 0,
        aperture: 8,
        iso: 200,
        shutterSpeedInv: 125,
        subjectDistanceM: 6,
        focusDistanceM: 6,
      },
      summaryText: 'Focal 24mm • Tilt 0° • Roll 0° • f/8 • ISO 200',
    },
    validate: (settings, metrics) => {
      const wideOk = settings.focalLengthMm <= 28;
      const rollOk = Math.abs(settings.cameraRollDeg || 0) <= 1.5;
      const tiltOk = Math.abs(settings.cameraTiltDeg || 0) <= 4.0;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = wideOk && rollOk && tiltOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Geometría impecable! Las columnas y marcos de ventana están perfectamente paralelos y la amplitud visual impresiona. La revista publica la foto a doble página.'
          : 'El encuadre presenta distorsión de perspectiva o desnivel. Mantén la focal en ≤ 28mm y nivela el trípode a 0° de roll y tilt.',
        details: [
          {
            label: 'Gran Angular (≤ 28mm)',
            pass: wideOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≤ 28mm (Ideal 24mm)',
            hint: 'Abre la lente a 24mm o menos.',
          },
          {
            label: 'Horizonte Nivelado (Roll = 0°)',
            pass: rollOk,
            currentVal: `${settings.cameraRollDeg || 0}°`,
            targetVal: '0° ± 1°',
            hint: 'Nivela la rotación a 0°.',
          },
          {
            label: 'Cámara Nivelada en Vertical (Tilt ≈ 0°)',
            pass: tiltOk,
            currentVal: `${settings.cameraTiltDeg || 0}°`,
            targetVal: '0° ± 4°',
            hint: 'Pon la inclinación vertical en 0°.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 3: GAFFER & JEFE DE ILUMINACIÓN - NIVELES 9 A 12
  // Esquema 3 Puntos, Triángulo Rembrandt, Clave Alta y Clave Baja Chiaroscuro
  // ===========================================================================
  {
    id: 'career_9_three_point_lighting',
    level: 9,
    rank: 'semi_senior',
    rankTitle: '💡 Gaffer & Jefe de Iluminación',
    title: 'Entrevista Documental: Esquema Canónico de 3 Puntos',
    client: 'HBO Latin America Docuseries',
    projectType: 'Entrevista Formal de Ficción & Documental',
    payoutUsd: 880,
    targetScene: 'documentary_interview',
    objective: 'Rodaje de una entrevista documental de alto presupuesto. Debes construir el esquema de iluminación cinematográfica más famoso de la historia: Luz Principal (Key) a 45° modelando el rostro, Luz de Relleno (Fill) encendida a menor potencia para suavizar sombras sin anular el volumen, y Luz de Recorte (Rim/Kicker) activa para separar al personaje del fondo.',
    artisticContext: 'El esquema de tres puntos es el abecedario de la iluminación en cine y televisión. Proporciona tridimensionalidad, separa los planos y otorga un acabado pulcro e impecable.',
    classLesson: 'Iluminación de Set • El Esquema Clásico de Tres Puntos (Key, Fill, Rim)',
    bookReference: 'Iluminación de Set • El Esquema Clásico de Tres Puntos (Key, Fill, Rim)',
    deliverySpecs: [
      'Luz Principal (Key Light) activa (intensidad 35% - 70%)',
      'Luz de Relleno (Fill Light) activa pero a menor ratio que Key',
      'Luz de Recorte (Rim Light) activa (≥ 20%) despegando la silueta',
      'Exposición limpia (|EV| ≤ 0.8)',
    ],
    didacticHints: [
      'Abre el panel de luces de estudio. Asegúrate de encender las tres fuentes: Key, Fill y Rim.',
      'Como recordarás, el Fill debe tener menor potencia que el Key (un ratio 2:1 o 3:1) para que el rostro conserve modelado y no quede plano.',
    ],
    solutionGuide: {
      explanation: 'Key al 45% a 45° modela la cara; Fill al 20% rellena la sombra con sutileza; Rim al 35% enciende el borde del cabello y hombros separando al sujeto de la oscuridad.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 100,
        iso: 200,
        subjectDistanceM: 2.4,
        focusDistanceM: 2.4,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 45, angleDeg: 45 },
        { id: 'light_fill', enabled: true, intensityPct: 20, angleDeg: -45 },
        { id: 'light_rim', enabled: true, intensityPct: 35, angleDeg: 145 },
      ],
      summaryText: 'Key 45% • Fill 20% • Rim 35% • f/2.8 • 1/100s • ISO 200 • Distancia 2.4m',
    },
    validate: (settings, metrics, lights) => {
      const key = lights.find((l) => l.id === 'light_key');
      const fill = lights.find((l) => l.id === 'light_fill');
      const rim = lights.find((l) => l.id === 'light_rim');

      const keyOk = !!key?.enabled && key.intensityPct >= 25 && key.intensityPct <= 85;
      const fillOk = !!fill?.enabled && fill.intensityPct >= 10 && fill.intensityPct < (key?.intensityPct || 100);
      const rimOk = !!rim?.enabled && rim.intensityPct >= 18;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = keyOk && fillOk && rimOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Iluminación de libro de cine! La separación de planos es exquisita, el modelado en mejilla es suave y el brillo del rim light despega al entrevistado con elegancia.'
          : 'El esquema no está completo o equilibrado. Asegúrate de encender Key, Fill (a menor potencia) y Rim light, manteniendo el fotómetro nivelado.',
        details: [
          {
            label: 'Key Light Modelando (30% - 70%)',
            pass: keyOk,
            currentVal: key?.enabled ? `${key.intensityPct}%` : 'Apagada',
            targetVal: 'Activa (30% - 70%)',
            hint: 'Enciende la luz principal.',
          },
          {
            label: 'Fill Light Suave (Ratio < Key)',
            pass: fillOk,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : 'Apagada',
            targetVal: 'Activa (< potencia que Key)',
            hint: 'Enciende el relleno a menor potencia que la principal.',
          },
          {
            label: 'Rim Light de Recorte (≥ 20%)',
            pass: rimOk,
            currentVal: rim?.enabled ? `${rim.intensityPct}%` : 'Apagada',
            targetVal: 'Activa (≥ 20%)',
            hint: 'Enciende la luz de contra para despegar al sujeto del fondo.',
          },
        ],
      };
    },
  },

  {
    id: 'career_10_rembrandt_triangle',
    level: 10,
    rank: 'semi_senior',
    rankTitle: '💡 Gaffer & Jefe de Iluminación',
    title: 'Retrato Editorial Dramático: Triángulo de Rembrandt',
    client: 'Vanity Fair & Revista de Cine',
    projectType: 'Portada Editorial de Ficción Dramática',
    payoutUsd: 960,
    targetScene: 'portrait_golden',
    objective: 'Portada de revista para el estreno de una serie de época. Se requiere la iluminación clásica por excelencia de la pintura barroca y el cine: el esquema Rembrandt. Debes colocar la luz principal en un ángulo de 45° a 55° y con elevación, de tal modo que en la mejilla que queda en sombra se forme el icónico triángulo de luz debajo del ojo, con el modelo en pose de tres cuartos.',
    artisticContext: 'El triángulo de Rembrandt aporta misterio, madurez y sofisticación aristocrática. Es la firma visual preferida de los directores de fotografía en dramas psicológicos y cine de autor.',
    classLesson: 'Iluminación Clásica • El Triángulo de Rembrandt y Modelado de Rostro',
    bookReference: 'Iluminación Clásica • El Triángulo de Rembrandt y Modelado de Rostro',
    deliverySpecs: [
      'Key Light lateralizada a 45° - 60° con elevación',
      'Fill Light tenue para mantener contraste (Fill ≤ 25% o ratio ≥ 3:1)',
      'Pose del modelo en tres cuartos (profile_3_4)',
      'Exposición limpia (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Configura la pose del modelo en "3/4 Rembrandt" en la consola de dirección.',
      'Gira la luz principal (Key) a unos 45° o 50°. Mantén el relleno suave para que el triángulo luminoso en la mejilla ensombrecida destaque con claridad.',
    ],
    solutionGuide: {
      explanation: 'Al situar la luz a 45° con la nariz proyectando sombra hacia el labio, se cierra el icónico triángulo invertido de luz sobre el pómulo opuesto.',
      recommendedSettings: {
        focalLengthMm: 70,
        modelPose: 'profile_3_4',
        aperture: 2.8,
        iso: 400,
        shutterSpeedInv: 125,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 50, angleDeg: 50, elevationDeg: 35 },
        { id: 'light_fill', enabled: true, intensityPct: 15, angleDeg: -45 },
      ],
      summaryText: 'Pose 3/4 • Key a 50° • Fill tenue 15% • f/2.8',
    },
    validate: (settings, metrics, lights) => {
      const key = lights.find((l) => l.id === 'light_key');
      const fill = lights.find((l) => l.id === 'light_fill');

      const poseOk = settings.modelPose === 'profile_3_4';
      const keyAngleOk = !!key?.enabled && key.angleDeg >= 38 && key.angleDeg <= 65;
      const contrastOk = !fill?.enabled || fill.intensityPct <= 25;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = poseOk && keyAngleOk && contrastOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Pura maestría pictórica! El triángulo de luz dibuja el pómulo con una elegancia que recuerda a los maestros clásicos. Vanity Fair aprueba la portada.'
          : 'El esquema no genera el triángulo de Rembrandt. Asegúrate de colocar al modelo en pose 3/4, lateralizar la Key Light a unos 45°-55° y mantener el Fill muy suave.',
        details: [
          {
            label: 'Pose del Modelo en 3/4',
            pass: poseOk,
            currentVal: settings.modelPose,
            targetVal: 'profile_3_4 (3/4 Rembrandt)',
            hint: 'Selecciona la pose 3/4 en la consola de dirección.',
          },
          {
            label: 'Ángulo Key Light (40° - 60°)',
            pass: keyAngleOk,
            currentVal: key?.enabled ? `${key.angleDeg}°` : 'Apagada',
            targetVal: '40° a 60°',
            hint: 'Ajusta el ángulo de la luz principal.',
          },
          {
            label: 'Contraste Rembrandt (Fill tenue)',
            pass: contrastOk,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : '0% (Ideal)',
            targetVal: '≤ 25%',
            hint: 'Baja la potencia del relleno para marcar la sombra.',
          },
        ],
      };
    },
  },

  {
    id: 'career_11_high_key_commercial',
    level: 11,
    rank: 'semi_senior',
    rankTitle: '💡 Gaffer & Jefe de Iluminación',
    title: 'Spot Cosmético: Iluminación Clave Alta (High-Key)',
    client: "L'Aura Skincare & Pure Beauty",
    projectType: 'Campaña Publicitaria de Moda y Cuidado Personal',
    payoutUsd: 1050,
    targetScene: 'fashion_commercial',
    objective: 'Campaña de televisión para una línea de cosmética de lujo. El cliente solicita una estética "High-Key" (Clave Alta): iluminación abundante, casi sin sombras duras, ciclorama blanco luminoso y una exposición aireada y limpia (EV entre 0.0 y +0.8). Debes encender tanto Key como Fill con potencias equilibradas para eliminar contrastes toscos.',
    artisticContext: 'La iluminación High-Key comunica pureza, juventud, alegría y transparencia. Las sombras se minimizan para que la piel luzca inmaculada y el producto inspire frescura.',
    classLesson: 'Clave Tonal Alta (High-Key) • Iluminación Envolvente y Sombras Suaves',
    bookReference: 'Clave Tonal Alta (High-Key) • Iluminación Envolvente y Sombras Suaves',
    deliverySpecs: [
      'Luz Principal y de Relleno activas con ratio suave (Fill ≥ 30%)',
      'Exposición luminosa y aireada (0.0 a +1.0 EV)',
      'Diafragma comercial nítido (f/2.8 a f/5.6)',
    ],
    didacticHints: [
      'En High-Key no queremos sombras oscuras. Sube el Fill Light a un 35% o 45% para bañar el rostro en luz envolvente.',
      'Deja que el fotómetro marque ligeramente hacia el lado positivo (+0.2 a +0.8 EV) sin quemar los blancos.',
    ],
    solutionGuide: {
      explanation: 'Al igualar Key (50%) y Fill (40%) se eliminan las sombras duras, generando una luminosidad sedosa perfecta para belleza cosmética.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 3.5,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2,
        focusDistanceM: 2,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 55 },
        { id: 'light_fill', enabled: true, intensityPct: 40 },
        { id: 'light_rim', enabled: true, intensityPct: 25 },
      ],
      summaryText: 'Key 55% • Fill 40% • f/3.5 • ISO 400 • EV +0.8',
    },
    validate: (settings, metrics, lights) => {
      const key = lights.find((l) => l.id === 'light_key');
      const fill = lights.find((l) => l.id === 'light_fill');

      const keyOk = !!key?.enabled && key.intensityPct >= 35;
      const fillOk = !!fill?.enabled && fill.intensityPct >= 28;
      const highExposure = metrics.exposureDeltaEV >= -0.1 && metrics.exposureDeltaEV <= 1.0;
      const success = keyOk && fillOk && highExposure;

      return {
        success,
        clientFeedback: success
          ? '¡Luminosidad radiante! La piel luce de porcelana, sin sombras agresivas, transmitiendo frescura y belleza pura. La marca aprueba el spot internacional.'
          : 'La escena presenta sombras demasiado oscuras o falta de luz para ser High-Key. Sube la luz de relleno (Fill ≥ 30%) y mantén la exposición limpia y positiva.',
        details: [
          {
            label: 'Fill Potente para Sombras Suaves (≥ 30%)',
            pass: fillOk,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : 'Apagada',
            targetVal: '≥ 30%',
            hint: 'Sube la luz de relleno.',
          },
          {
            label: 'Exposición Positiva y Aireada (High-Key)',
            pass: highExposure,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 a +1.0 EV',
            hint: 'Ajusta para una exposición limpia y brillante.',
          },
        ],
      };
    },
  },

  {
    id: 'career_12_low_key_chiaroscuro',
    level: 12,
    rank: 'semi_senior',
    rankTitle: '💡 Gaffer & Jefe de Iluminación',
    title: 'Serie Policíaca: Iluminación Clave Baja (Low-Key)',
    client: 'Dark Room Thriller & Streaming Series',
    projectType: 'Secuencia de Interrogatorio Cine Noir',
    payoutUsd: 1150,
    targetScene: 'night_studio',
    objective: 'Secuencia de suspense e interrogatorio policial para una plataforma de streaming. El showrunner exige estética "Low-Key" (Clave Baja) con marcado claroscuro: sombras profundas que devoren gran parte del set, luz de relleno totalmente apagada (Fill = 0% o deshabilitada), y una única luz dura modelando al personaje desde un lateral, con fotómetro en valores bajos (-1.5 a -0.2 EV).',
    artisticContext: 'En la clave baja, la sombra tiene el mismo peso narrativo que la luz. Se oculta información para crear tensión, sospecha y peligro inminente.',
    classLesson: 'Clave Tonal Baja (Low-Key) • Chiaroscuro y Dominio de la Masa de Sombra',
    bookReference: 'Clave Tonal Baja (Low-Key) • Chiaroscuro y Dominio de la Masa de Sombra',
    deliverySpecs: [
      'Luz de Relleno (Fill) desactivada o a 0%',
      'Luz Principal (Key) direccional y contrastada',
      'Exposición en clave baja (EV entre -1.5 y -0.2)',
    ],
    didacticHints: [
      'Apaga completamente la luz de relleno (Fill Light). Deja que la mitad de la cara quede en la sombra.',
      'Mantén la exposición deliberadamente en valores negativos (-0.6 o -1.0 EV). No trates de sobreiluminar.',
    ],
    solutionGuide: {
      explanation: 'Una sola fuente lateral sin relleno crea un corte gráfico tajante. El ojo humano completa el vacío de la sombra, generando intriga instantánea.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 55, angleDeg: 60 },
        { id: 'light_fill', enabled: false, intensityPct: 0 },
        { id: 'light_rim', enabled: false, intensityPct: 0 },
      ],
      summaryText: 'Key 55% • Fill Apagada • EV -0.45 • f/2.8 • ISO 400',
    },
    validate: (settings, metrics, lights) => {
      const fill = lights.find((l) => l.id === 'light_fill');
      const key = lights.find((l) => l.id === 'light_key');

      const fillOff = !fill?.enabled || fill.intensityPct <= 5;
      const keyOn = !!key?.enabled && key.intensityPct >= 25;
      const lowKeyEV = metrics.exposureDeltaEV <= -0.15 && metrics.exposureDeltaEV >= -1.8;
      const success = fillOff && keyOn && lowKeyEV;

      return {
        success,
        clientFeedback: success
          ? '¡Tensión que corta la respiración! El claroscuro es implacable y el personaje parece ocultar un secreto oscuro en cada sombra. El director de la serie queda impresionado.'
          : 'Aún no se logra el efecto Low-Key. Asegúrate de apagar el Fill por completo y dejar que el fotómetro marque entre -1.5 y -0.2 EV.',
        details: [
          {
            label: 'Fill Apagada (Sombra Pura)',
            pass: fillOff,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : 'Apagada (Correcto)',
            targetVal: 'Desactivada o 0%',
            hint: 'Apaga la luz de relleno.',
          },
          {
            label: 'Exposición Low-Key (-1.5 a -0.2 EV)',
            pass: lowKeyEV,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '-1.5 a -0.2 EV',
            hint: 'Ajusta diafragma u obturación para no sobreiluminar.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 4: OPERADOR DE CÁMARA DE FICCIÓN (A-CAM OPERATOR) - NIVELES 13 A 16
  // Ángulos Psicológicos: Contrapicado, Picado, Holandés y Cenital
  // ===========================================================================
  {
    id: 'career_13_low_angle_power',
    level: 13,
    rank: 'senior',
    rankTitle: '🎬 Operador de Cámara (A-Cam)',
    title: 'El Monólogo del Antagonista: Ángulo Contrapicado Heroico',
    client: 'Apex Films & Distribuidora de Ficción',
    projectType: 'Rodaje de Ficción Cinemática (Contrapicado)',
    payoutUsd: 1300,
    targetScene: 'portrait_golden',
    objective: 'El antagonista acaba de tomar el control del territorio en una película de acción. El director quiere que el espectador sienta la superioridad y amenaza del personaje. Debes situar el trípode a ras de pecho/cintura (altura ≤ 0.65m) e inclinar la cámara hacia arriba (tilt ≥ +15°), de modo que el personaje domine el encuadre contra el cielo.',
    artisticContext: 'El contrapicado es la herramienta cinematográfica fundamental para dotar de autoridad, poder e intimidación al sujeto. Al mirar hacia arriba, el espectador se siente psicológicamente subordinado.',
    classLesson: 'Ángulo Contrapicado • Altura de Eje Bajo y Psicología de Poder',
    bookReference: 'Ángulo Contrapicado • Altura de Eje Bajo y Psicología de Poder',
    deliverySpecs: [
      'Altura de cámara baja en trípode (≤ 0.65m)',
      'Inclinación positiva hacia arriba (Tilt ≥ +15°)',
      'Exposición limpia calibrada (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Ve a la consola de dirección de cámara o haz clic en el botón de ángulo "Contrapicado".',
      'Verifica que la altura de cámara baje a unos 0.45m o 0.55m y el tilt se eleve a +22°.',
    ],
    solutionGuide: {
      explanation: 'Una cámara a 0.55m apuntando hacia arriba a +22° transforma la postura del personaje en un monumento de autoridad sobre el espectador.',
      recommendedSettings: {
        cameraHeightM: 0.55,
        cameraTiltDeg: 22,
        cameraRollDeg: 0,
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Altura 0.55m • Tilt +22° • Focal 50mm',
    },
    validate: (settings, metrics) => {
      const heightOk = settings.cameraHeightM <= 0.7;
      const tiltOk = settings.cameraTiltDeg >= 14;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = heightOk && tiltOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La presencia del villano es colosal! El contrapicado le da una imponente sensación de invencibilidad. Toma aprobada para el corte final.'
          : 'El ángulo aún no transmite suficiente poder. Baja el trípode a ≤ 0.65m e inclina la cámara hacia arriba con tilt ≥ +15°.',
        details: [
          {
            label: 'Cámara Baja (≤ 0.65m)',
            pass: heightOk,
            currentVal: `${settings.cameraHeightM.toFixed(2)}m`,
            targetVal: '≤ 0.65m (Ideal 0.55m)',
            hint: 'Baja la altura de la cámara.',
          },
          {
            label: 'Inclinación Ascendente (Tilt ≥ +15°)',
            pass: tiltOk,
            currentVal: `${settings.cameraTiltDeg}°`,
            targetVal: '≥ +15° (Ideal +22°)',
            hint: 'Apunta la cámara hacia arriba.',
          },
        ],
      };
    },
  },

  {
    id: 'career_14_high_angle_vulnerability',
    level: 14,
    rank: 'senior',
    rankTitle: '🎬 Operador de Cámara (A-Cam)',
    title: 'El Desengaño del Protagonista: Ángulo Picado de Vulnerabilidad',
    client: 'Campaña Solidaria Internacional',
    projectType: 'Drama Cinemático (Picado Emotivo)',
    payoutUsd: 1420,
    targetScene: 'portrait_golden',
    objective: 'Secuencia dramática donde el protagonista ha sufrido una dura derrota moral. El director quiere transmitir desamparo, fragilidad y soledad. Debes elevar la cámara por encima de la altura de los ojos (altura ≥ 2.0m) e inclinarla hacia abajo (tilt ≤ -12°, como -18° o -20°) para empequeñecer al sujeto frente al entorno.',
    artisticContext: 'Al colocar la cámara por encima del personaje y apuntar hacia el suelo, la mirada descendente despoja al sujeto de su grandeza y despierta empatía inmediata y compasión en la audiencia.',
    classLesson: 'Ángulo Picado • Elevación de Cámara, Vulnerabilidad y Empatía',
    bookReference: 'Ángulo Picado • Elevación de Cámara, Vulnerabilidad y Empatía',
    deliverySpecs: [
      'Altura de cámara elevada (≥ 2.0m)',
      'Inclinación negativa hacia abajo (Tilt ≤ -12°)',
      'Exposición limpia calibrada (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Usa el botón de 1 clic "Picado" o eleva manualmente el trípode a más de 2 metros.',
      'Asegúrate de inclinar el tilt en negativo (-18° a -20°) para apuntar al rostro del personaje desde arriba.',
    ],
    solutionGuide: {
      explanation: 'Una cámara a 2.25m con tilt a -20° aplasta la perspectiva contra el suelo, convirtiendo al personaje en un ser pequeño y vulnerable.',
      recommendedSettings: {
        cameraHeightM: 2.25,
        cameraTiltDeg: -20,
        cameraRollDeg: 0,
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Altura 2.25m • Tilt -20° • Focal 50mm',
    },
    validate: (settings, metrics) => {
      const heightOk = settings.cameraHeightM >= 1.95;
      const tiltOk = settings.cameraTiltDeg <= -11;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = heightOk && tiltOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La emoción es desgarradora! El picado hace que el espectador sienta el peso del mundo sobre el personaje. El director felicita al operador.'
          : 'Falta sensación de picado. Eleva la cámara a ≥ 2.0m e inclina el tilt a ≤ -12° apuntando hacia abajo.',
        details: [
          {
            label: 'Cámara Elevada (≥ 2.0m)',
            pass: heightOk,
            currentVal: `${settings.cameraHeightM.toFixed(2)}m`,
            targetVal: '≥ 2.0m (Ideal 2.25m)',
            hint: 'Sube la altura del trípode.',
          },
          {
            label: 'Inclinación Descendente (Tilt ≤ -12°)',
            pass: tiltOk,
            currentVal: `${settings.cameraTiltDeg}°`,
            targetVal: '≤ -12° (Ideal -20°)',
            hint: 'Inclina la cámara hacia abajo.',
          },
        ],
      };
    },
  },

  {
    id: 'career_15_dutch_angle_paranoia',
    level: 15,
    rank: 'senior',
    rankTitle: '🎬 Operador de Cámara (A-Cam)',
    title: 'Secuencia de Persecución: Plano Holandés y Paranoia',
    client: 'Thriller Psicológico "Vértigo Nocturno"',
    projectType: 'Secuencia de Inestabilidad y Tensión Psicológica',
    payoutUsd: 1550,
    targetScene: 'night_studio',
    objective: 'El protagonista sospecha que lo siguen por una calle oscura y entra en un ataque de paranoia y desorientación. El director pide un plano holandés (Dutch Angle / Canted) rotando la cámara sobre su eje óptico (|Roll| entre 10° y 22°) para romper la estabilidad del horizonte y generar desasosiego visceral en la audiencia.',
    artisticContext: 'Al inclinar el horizonte respecto a la horizontal natural, el cerebro del espectador detecta inconscientemente que algo anda mal, transmitiendo peligro, locura o pérdida de control.',
    classLesson: 'Plano Holandés (Dutch Angle) • Ruptura del Horizonte y Dinamismo Desestabilizador',
    bookReference: 'Plano Holandés (Dutch Angle) • Ruptura del Horizonte y Dinamismo Desestabilizador',
    deliverySpecs: [
      'Rotación en eje Roll marcada (|Roll| entre 10° y 22°)',
      'Focal normal o angular (28mm a 50mm)',
      'Exposición limpia (|EV| ≤ 0.85)',
    ],
    didacticHints: [
      'Pulsa el botón de 1 clic "Holandés" en la consola de dirección o rota manualmente el dial de Roll a unos +14°.',
      'Observa cómo las diagonales que se forman en el fondo aumentan la agresividad visual de la escena.',
    ],
    solutionGuide: {
      explanation: 'Una inclinación de 14° en Roll quiebra el orden natural de la gravedad visual, inyectando tensión psicológica instantánea.',
      recommendedSettings: {
        cameraHeightM: 1.45,
        cameraTiltDeg: 4,
        cameraRollDeg: 14,
        focalLengthMm: 35,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      summaryText: 'Roll +14° • Focal 35mm • Tilt +4°',
    },
    validate: (settings, metrics) => {
      const rollOk = Math.abs(settings.cameraRollDeg || 0) >= 9.5 && Math.abs(settings.cameraRollDeg || 0) <= 25;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = rollOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Vértigo cinematográfico total! La rotación del horizonte genera una tensión eléctrica impecable. Toma validada por el director.'
          : 'El horizonte aún está demasiado recto para ser un plano holandés. Rota el dial de Roll entre 10° y 22°.',
        details: [
          {
            label: 'Plano Holandés (|Roll| 10° - 22°)',
            pass: rollOk,
            currentVal: `${settings.cameraRollDeg || 0}°`,
            targetVal: '10° a 22° (Ideal 14°)',
            hint: 'Aplica inclinación en el eje Roll.',
          },
        ],
      };
    },
  },

  {
    id: 'career_16_overhead_cenital_geometry',
    level: 16,
    rank: 'senior',
    rankTitle: '🎬 Operador de Cámara (A-Cam)',
    title: 'Inspección Forense: Plano Cenital (Overhead)',
    client: 'Producción Policíaca "Peritaje Forense"',
    projectType: 'Rodaje de Vista Cenital de Arriba Abajo',
    payoutUsd: 1700,
    targetScene: 'documentary_interview',
    objective: 'Secuencia de apertura de una serie sobre crímenes sin resolver. El director quiere filmar la mesa y el set desde arriba en un plano cenital (Overhead / Bird’s Eye) absoluto: cámara elevada en pluma/grúa (altura ≥ 2.6m) apuntando perpendicularmente hacia abajo (tilt ≤ -40° o cenital), revelando la disposición espacial como un mapa clínico.',
    artisticContext: 'El plano cenital despoja a los personajes de su perspectiva terrenal y adopta una mirada divina, médica o analítica, enfatizando la geometría del decorado y la soledad del destino.',
    classLesson: 'Plano Cenital • Perspectiva Aérea Perpendicular y Abstracción Espacial',
    bookReference: 'Plano Cenital • Perspectiva Aérea Perpendicular y Abstracción Espacial',
    deliverySpecs: [
      'Cámara elevada en grúa (altura ≥ 2.6m)',
      'Inclinación descendente pronunciada (Tilt ≤ -40°)',
      'Exposición limpia (|EV| ≤ 0.75)',
    ],
    didacticHints: [
      'Haz clic en el preset de 1 clic "Cenital" en la consola de dirección.',
      'Comprueba que la cámara suba a 2.85m y el tilt apunte hacia abajo.',
    ],
    solutionGuide: {
      explanation: 'Una elevación a 2.85m con inclinación a -60° crea un punto de vista cenital analítico que convierte el set en un diagrama visual.',
      recommendedSettings: {
        cameraHeightM: 2.85,
        cameraTiltDeg: -60,
        cameraRollDeg: 0,
        cameraDollyM: -0.8,
        focalLengthMm: 35,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.4,
        focusDistanceM: 2.4,
      },
      summaryText: 'Altura 2.85m • Tilt -60° • Dolly -0.8m',
    },
    validate: (settings, metrics) => {
      const heightOk = settings.cameraHeightM >= 2.5;
      const tiltOk = settings.cameraTiltDeg <= -35;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.75;
      const success = heightOk && tiltOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Composición geométrica fascinante! La perspectiva cenital aporta un tono clínico y detectivesco insuperable. Toma aprobada.'
          : 'Aún no alcanza la elevación y ángulo cenital. Eleva la cámara a ≥ 2.6m e inclina el tilt a ≤ -40°.',
        details: [
          {
            label: 'Grúa Elevada (≥ 2.6m)',
            pass: heightOk,
            currentVal: `${settings.cameraHeightM.toFixed(2)}m`,
            targetVal: '≥ 2.6m (Ideal 2.85m)',
            hint: 'Sube la cámara en grúa.',
          },
          {
            label: 'Inclinación Cenital (Tilt ≤ -40°)',
            pass: tiltOk,
            currentVal: `${settings.cameraTiltDeg}°`,
            targetVal: '≤ -40° (Ideal -60°)',
            hint: 'Apunta hacia el suelo.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 5: DIRECTOR DE FOTOGRAFÍA JR. (COMMERCIAL DP) - NIVELES 17 A 20
  // Composición Geométrica: Tercios, Líneas Guía, Multiplano y Compresión
  // ===========================================================================
  {
    id: 'career_17_rule_of_thirds_asymmetry',
    level: 17,
    rank: 'senior',
    rankTitle: '🌟 Commercial DP / DoP Jr.',
    title: 'Anuncio de Perfume: Regla de Tercios y Asimetría Dinámica',
    client: 'Maison Elegance & Fragancias',
    projectType: 'Campaña Publicitaria de Moda Minimalista',
    payoutUsd: 1850,
    targetScene: 'fashion_commercial',
    objective: 'Spot de televisión para una fragancia de alta gama. El director creativo prohíbe el encuadre centrado convencional y exige colocar al personaje deliberadamente en una de las líneas de tercio laterales (descentrado mediante pan o truck), dejando aire hacia donde mira, en relación de aspecto cinematográfica (16:9 o 2.39:1).',
    artisticContext: 'El encuadre asimétrico basado en la regla de los tercios dinamiza la imagen, activa el espacio negativo y genera elegancia visual que invita a la mirada a recorrer todo el lienzo.',
    classLesson: 'Composición Asimétrica • Regla de Tercios y Aire en la Mirada',
    bookReference: 'Composición Asimétrica • Regla de Tercios y Aire en la Mirada',
    deliverySpecs: [
      'Sujeto descentrado lateralmente (|Pan| ≥ 6° o |Truck| ≥ 0.35m)',
      'Relación de aspecto cinematográfica (16:9 o 2.39:1)',
      'Exposición limpia (|EV| ≤ 0.8)',
    ],
    didacticHints: [
      'Gira el paneo de cámara (Pan) unos 8° a 12° a la izquierda o derecha para situar al personaje sobre la línea de tercio.',
      'También puedes mover el slider de Truck (desplazamiento lateral) para descentrar el punto de vista.',
    ],
    solutionGuide: {
      explanation: 'Un paneo de 10° desplaza al personaje al tercio izquierdo, dejando el tercio derecho como un elegante vacío con aire para la tipografía del perfume.',
      recommendedSettings: {
        cameraPanDeg: 10,
        aspectRatio: '16:9',
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 200,
        subjectDistanceM: 2,
        focusDistanceM: 2,
      },
      summaryText: 'Pan 10° • Ratio 16:9 • Focal 50mm • f/2.8',
    },
    validate: (settings, metrics) => {
      const offCenter = Math.abs(settings.cameraPanDeg || 0) >= 6.0 || Math.abs(settings.cameraTruckM || 0) >= 0.35;
      const cinemaRatio = settings.aspectRatio === '16:9' || settings.aspectRatio === '2.39:1';
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.8;
      const success = offCenter && cinemaRatio && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Elegancia editorial sublime! El descentrado otorga aire y sofisticación al plano, dejando espacio perfecto para el frasco de perfume. Entrega aprobada.'
          : 'El sujeto está demasiado centrado o el ratio no es cinematográfico. Aplica un paneo lateral (|Pan| ≥ 6°) y usa ratio 16:9 o 2.39:1.',
        details: [
          {
            label: 'Descentrado en Tercios (|Pan| ≥ 6° o Truck)',
            pass: offCenter,
            currentVal: `Pan: ${settings.cameraPanDeg || 0}°`,
            targetVal: '|Pan| ≥ 6°',
            hint: 'Gira el paneo de cámara.',
          },
          {
            label: 'Ratio Cinemático (16:9 / 2.39:1)',
            pass: cinemaRatio,
            currentVal: settings.aspectRatio || '16:9',
            targetVal: '16:9 o 2.39:1',
            hint: 'Ajusta el ratio de aspecto.',
          },
        ],
      };
    },
  },

  {
    id: 'career_18_leading_lines_diagonals',
    level: 18,
    rank: 'senior',
    rankTitle: '🌟 Commercial DP / DoP Jr.',
    title: 'Fuga por el Bulevar: Líneas Guía y Diagonales',
    client: 'Cine Independiente "Rumbo al Norte"',
    projectType: 'Rodaje de Fuga en Perspectiva Diagonal',
    payoutUsd: 2000,
    targetScene: 'landscape_depth',
    objective: 'Secuencia de viaje en un largometraje independiente. El director busca acentuar la sensación de marcha y perspectiva infinita mediante líneas guía que conduzcan el ojo hacia el horizonte. Debes usar una focal angular (≤ 35mm) que estire las fugas del camino y ajustar el encuadre para que los elementos del set tracen una diagonal.',
    artisticContext: 'Las líneas diagonales y de fuga guían el ojo del espectador de manera irresistible a través de la profundidad del plano, creando una tridimensionalidad hipnótica.',
    classLesson: 'Líneas Guía • Puntos de Fuga y Tensión Diagonal en el Lienzo',
    bookReference: 'Líneas Guía • Puntos de Fuga y Tensión Diagonal en el Lienzo',
    deliverySpecs: [
      'Focal angular para acentuar líneas de fuga (≤ 35mm)',
      'Composición con perspectiva profunda',
      'Exposición limpia (|EV| ≤ 0.85)',
    ],
    didacticHints: [
      'Una lente de 28mm o 35mm exagera la convergencia de las líneas hacia el fondo.',
      'Asegúrate de que la exposición en exteriores conserve el brillo del cielo sin empastar el camino.',
    ],
    solutionGuide: {
      explanation: 'Una focal de 28mm potencia las líneas diagonales que convergen en el fondo, dotando al plano de un dinamismo irresistible.',
      recommendedSettings: {
        focalLengthMm: 28,
        aperture: 5.6,
        cameraHeightM: 1.35,
        cameraTiltDeg: 2,
        shutterSpeedInv: 125,
        iso: 100,
        subjectDistanceM: 6,
        focusDistanceM: 6,
      },
      summaryText: 'Focal 28mm • f/5.6 • Tilt +2° • 1/125s • ISO 100',
    },
    validate: (settings, metrics) => {
      const wideOk = settings.focalLengthMm <= 35;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = wideOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La perspectiva tiene una fuerza descomunal! Las líneas de fuga jalan la mirada directo al horizonte. Plano maestro aprobado por el director.'
          : 'Aún no se potencia la fuga. Usa una focal angular (≤ 35mm) y mantén la exposición nivelada.',
        details: [
          {
            label: 'Focal Angular para Fugas (≤ 35mm)',
            pass: wideOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≤ 35mm (Ideal 28mm)',
            hint: 'Abre la distancia focal a 28mm o 35mm.',
          },
        ],
      };
    },
  },

  {
    id: 'career_19_multi_plane_depth',
    level: 19,
    rank: 'senior',
    rankTitle: '🌟 Commercial DP / DoP Jr.',
    title: 'Conversación Clandestina: Profundidad Multiplano',
    client: 'Serie de Espionaje Diplomático',
    projectType: 'Rodaje con Términos Espaciales (Primer término, foco y fondo)',
    payoutUsd: 2200,
    targetScene: 'documentary_interview',
    objective: 'Escena de espionaje en una cafetería diplomática. El showrunner quiere construir un encuadre en capas: un primer término desenfocado que otorgue sensación de observación espía (frame within frame), el personaje principal en foco nítido en plano medio (2.0m - 2.8m), y las luces del fondo diluyéndose con diafragma abierto (f/2.0 a f/3.2).',
    artisticContext: 'La profundidad multiplano transforma la pantalla plana en un diorama vivo de tres dimensiones: primer plano borroso (contexto íntimo), plano medio enfocado (el núcleo dramático) y fondo lejano (atmósfera).',
    classLesson: 'Multiplano Cinemático • Superposición de Capas y Profundidad Espacial',
    bookReference: 'Multiplano Cinemático • Superposición de Capas y Profundidad Espacial',
    deliverySpecs: [
      'Enfoque clavado en el sujeto principal (2.0m a 2.8m)',
      'Apertura luminosa para separar planos (f/2.0 a f/3.2)',
      'Focal estándar o tele moderado (50mm a 85mm)',
      'Exposición limpia (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Mantén la focal entre 50mm y 85mm y el diafragma en f/2.8 para que los planos espaciales queden nítidamente diferenciados por la profundidad de campo.',
      'Comprueba que el foco esté en el sujeto (2.4m).',
    ],
    solutionGuide: {
      explanation: 'A 50mm y f/2.4, la DoF delgada aisla al personaje en el plano medio mientras los objetos cercanos y lejanos enmarcan la acción.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.4,
        subjectDistanceM: 2.4,
        focusDistanceM: 2.4,
        shutterSpeedInv: 125,
        iso: 200,
      },
      summaryText: 'Focal 50mm • f/2.4 • Foco 2.4m',
    },
    validate: (settings, metrics) => {
      const apertureOk = settings.aperture <= 3.2;
      const focalOk = settings.focalLengthMm >= 45 && settings.focalLengthMm <= 85;
      const focusOk = Math.abs(settings.focusDistanceM - settings.subjectDistanceM) <= 0.25;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = apertureOk && focalOk && focusOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La sensación de tridimensionalidad es sobrecogedora! El espectador se siente un espía escondido detrás del primer término. Excelente puesta en cámara.'
          : 'Revisa la separación de planos. Mantén apertura ≤ f/3.2, focal entre 50mm y 85mm y enfoque clavado en el sujeto.',
        details: [
          {
            label: 'Apertura de Separación (≤ f/3.2)',
            pass: apertureOk,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≤ f/3.2',
            hint: 'Abre el diafragma.',
          },
          {
            label: 'Foco en Sujeto',
            pass: focusOk,
            currentVal: `${settings.focusDistanceM}m`,
            targetVal: `${settings.subjectDistanceM}m ± 0.25m`,
            hint: 'Enfoca al sujeto.',
          },
        ],
      };
    },
  },

  {
    id: 'career_20_lens_compression',
    level: 20,
    rank: 'senior',
    rankTitle: '🌟 Commercial DP / DoP Jr.',
    title: 'Duelo en el Asfalto: Compresión Espacial con Teleobjetivo',
    client: 'Campaña de Acción y Motor',
    projectType: 'Aplanamiento de Planos y Bokeh Gigante',
    payoutUsd: 2400,
    targetScene: 'portrait_golden',
    objective: 'Spot cinematográfico de una persecución de alta gama. El director busca el efecto visual clásico de teleobjetivo largo: comprimir el espacio de modo que los rascacielos y farolas del fondo parezcan estar inmediatamente detrás del protagonista, aplanando los planos con una focal teleobjetivo extrema (≥ 100mm, ideal 135mm o 200mm) y diafragma abierto (≤ f/2.8).',
    artisticContext: 'Los teleobjetivos largos tienen un campo de visión estrecho que acerca visualmente los planos distantes, creando una estética hiperestilizada y cinematográfica.',
    classLesson: 'Compresión Espacial • Teleobjetivos Largos (135mm+) y Magnificación de Bokeh',
    bookReference: 'Compresión Espacial • Teleobjetivos Largos (135mm+) y Magnificación de Bokeh',
    deliverySpecs: [
      'Teleobjetivo largo (≥ 100mm, ideal 135mm - 200mm)',
      'Apertura abierta de diafragma (≤ f/2.8)',
      'Exposición limpia (|EV| ≤ 0.8)',
    ],
    didacticHints: [
      'Ajusta la distancia focal a 135mm o 200mm en el panel óptico.',
      'Observa cómo el fondo parece agigantarse y acercarse al personaje gracias a la compresión de perspectiva.',
    ],
    solutionGuide: {
      explanation: 'A 135mm y f/2.0 con ISO 200 y 1/125s, los edificios del fondo a 15m parecen estar encima del actor, agigantando las luces bokeh con glamour hollywoodense.',
      recommendedSettings: {
        focalLengthMm: 135,
        aperture: 2.0,
        iso: 200,
        shutterSpeedInv: 125,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Focal 135mm • f/2.0 • ISO 200 • 1/125s',
    },
    validate: (settings, metrics) => {
      const teleOk = settings.focalLengthMm >= 100;
      const apertureOk = settings.aperture <= 2.8;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.8;
      const success = teleOk && apertureOk && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La compresión óptica es colosal! La ciudad parece respirar en la nuca del protagonista y las luces bokeh lucen espectaculares. El cliente automotriz firma la entrega.'
          : 'Aún no se aprecia la compresión de teleobjetivo. Sube la focal a ≥ 100mm y mantén el diafragma abierto en ≤ f/2.8.',
        details: [
          {
            label: 'Teleobjetivo Largo (≥ 100mm)',
            pass: teleOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≥ 100mm (Ideal 135mm)',
            hint: 'Aumenta la distancia focal.',
          },
          {
            label: 'Apertura Abierta (≤ f/2.8)',
            pass: apertureOk,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≤ f/2.8',
            hint: 'Abre el diafragma.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 6: DIRECTOR DE FOTOGRAFÍA SENIOR (FEATURE FILM DP) - NIVELES 21 A 24
  // Clave Tonal, Psicología Espacial, Silueta y Dualidad Moral
  // ===========================================================================
  {
    id: 'career_21_silhouettes_graphic',
    level: 21,
    rank: 'senior',
    rankTitle: '🥇 Director de Fotografía Senior',
    title: 'El Mensajero Anónimo: Silueta Gráfica y Contraluz',
    client: 'Film Noir Contemporáneo',
    projectType: 'Rodaje de Silueta de Alto Impacto',
    payoutUsd: 2650,
    targetScene: 'night_studio',
    objective: 'Secuencia de intriga donde la identidad del contacto debe permanecer oculta en la penumbra. El director quiere una silueta gráfica pura: el personaje debe ser una masa negra definida solo por un filete de luz brillante en el contorno (Rim light ≥ 40%), con la luz frontal de relleno completamente apagada (Fill = 0% o deshabilitada).',
    artisticContext: 'La silueta gráfica elimina los detalles superficiales del rostro y reduce el personaje a su forma esencial. Fuerza al espectador a concentrarse en la postura corporal y el misterio.',
    classLesson: 'Siluetas Gráficas • Contraluz Puro y Eliminación de Detalle Frontal',
    bookReference: 'Siluetas Gráficas • Contraluz Puro y Eliminación de Detalle Frontal',
    deliverySpecs: [
      'Luz de Relleno frontal (Fill) apagada (0% o desactivada)',
      'Luz de Contra / Recorte (Rim Light) activa y potente (≥ 40%)',
      'Exposición limpia (|EV| ≤ 0.85)',
    ],
    didacticHints: [
      'Apaga el Fill Light para que el frente del personaje quede en negro absoluto.',
      'Sube el Rim Light al 50% o más para encender el borde brillante que perfila la silueta.',
    ],
    solutionGuide: {
      explanation: 'El contraluz potente dibuja la forma exterior del personaje mientras la ausencia de luz frontal garantiza que el interior sea una sombra gráfica sin detalle.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.8,
        iso: 400,
        shutterSpeedInv: 125,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      recommendedLights: [
        { id: 'light_rim', enabled: true, intensityPct: 65, angleDeg: 150 },
        { id: 'light_fill', enabled: false, intensityPct: 0 },
        { id: 'light_key', enabled: false, intensityPct: 0 },
      ],
      summaryText: 'Rim 65% • Fill Apagada • Key Apagada',
    },
    validate: (settings, metrics, lights) => {
      const fill = lights.find((l) => l.id === 'light_fill');
      const rim = lights.find((l) => l.id === 'light_rim');

      const fillOff = !fill?.enabled || fill.intensityPct <= 5;
      const rimOn = !!rim?.enabled && rim.intensityPct >= 35;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.85;
      const success = fillOff && rimOn && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Impacto gráfico magistral! La silueta se recorta con un filo de luz cristalino en la oscuridad más absoluta. El director de cine noir aplaude de pie.'
          : 'Aún no se logra la silueta pura. Apaga la luz de relleno frontal (Fill) y asegura que el Rim Light esté encendido con potencia (≥ 40%).',
        details: [
          {
            label: 'Fill Apagada (Frente Negro)',
            pass: fillOff,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : 'Apagada (Correcto)',
            targetVal: 'Desactivada o 0%',
            hint: 'Apaga la luz de relleno.',
          },
          {
            label: 'Rim Light de Contraluz (≥ 40%)',
            pass: rimOn,
            currentVal: rim?.enabled ? `${rim.intensityPct}%` : 'Apagada',
            targetVal: '≥ 40%',
            hint: 'Enciende el Rim Light a buena potencia.',
          },
        ],
      };
    },
  },

  {
    id: 'career_22_negative_space_tension',
    level: 22,
    rank: 'senior',
    rankTitle: '🥇 Director de Fotografía Senior',
    title: 'La Soledad del Náufrago: Tensión de Espacio Negativo',
    client: 'Cortometraje de Autor "Silencio en el Set"',
    projectType: 'Composición con Espacio Vacío Opresivo',
    payoutUsd: 2900,
    targetScene: 'portrait_golden',
    objective: 'Película dramática sobre el aislamiento humano en la gran ciudad. El guión pide expresar la soledad existencial del personaje no con palabras, sino mediante un uso radical del espacio negativo: el personaje debe ocupar apenas una esquina del encuadre (|Pan| ≥ 8° o |Truck| ≥ 0.45m), dejando el 70% restante del plano como un gran vacío compositivo en formato Scope (2.39:1 o 16:9).',
    artisticContext: 'El espacio negativo no es espacio desperdiciado; es el peso invisible del mundo oprimiendo al personaje. Cuanto mayor es el vacío, mayor es la sensación de soledad o peligro.',
    classLesson: 'Espacio Negativo • El Peso del Vacío y la Tensión Psicológica',
    bookReference: 'Espacio Negativo • El Peso del Vacío y la Tensión Psicológica',
    deliverySpecs: [
      'Sujeto confinado al margen del encuadre (|Pan| ≥ 8° o |Truck| ≥ 0.45m)',
      'Relación de aspecto cinematográfica (2.39:1 o 16:9)',
      'Exposición limpia (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Gira el paneo de cámara (Pan) a +10° o -10° para llevar al personaje al extremo del marco.',
      'Selecciona el formato 2.39:1 en la consola de encuadre para estirar el espacio horizontal.',
    ],
    solutionGuide: {
      explanation: 'En 2.39:1 con Pan a 11°, el personaje queda atrapado en la orilla del cuadro, rodeado por un inmenso vacío que comunica desamparo.',
      recommendedSettings: {
        cameraPanDeg: 11,
        aspectRatio: '2.39:1',
        focalLengthMm: 40,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Pan +11° • Scope 2.39:1 • Focal 40mm',
    },
    validate: (settings, metrics) => {
      const extremePan = Math.abs(settings.cameraPanDeg || 0) >= 7.5 || Math.abs(settings.cameraTruckM || 0) >= 0.42;
      const wideRatio = settings.aspectRatio === '2.39:1' || settings.aspectRatio === '16:9';
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = extremePan && wideRatio && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Poesía visual desgarradora! El inmenso vacío del encuadre cuenta la historia por sí solo. El jurado del festival ovaciona la cinematografía.'
          : 'Falta tensión de espacio negativo. Lleva al personaje más hacia el extremo (|Pan| ≥ 8°) y usa ratio 2.39:1 o 16:9.',
        details: [
          {
            label: 'Espacio Negativo Extremo (|Pan| ≥ 8°)',
            pass: extremePan,
            currentVal: `Pan: ${settings.cameraPanDeg || 0}°`,
            targetVal: '|Pan| ≥ 8°',
            hint: 'Aplica mayor paneo lateral.',
          },
          {
            label: 'Formato Panorámico (2.39:1 / 16:9)',
            pass: wideRatio,
            currentVal: settings.aspectRatio || '16:9',
            targetVal: '2.39:1 o 16:9',
            hint: 'Usa relación Scope 2.39:1.',
          },
        ],
      };
    },
  },

  {
    id: 'career_23_split_lighting_contrast',
    level: 23,
    rank: 'senior',
    rankTitle: '🥇 Director de Fotografía Senior',
    title: 'La Doble Moral del Espía: Iluminación Dividida (Split)',
    client: 'Producción de Ficción Psicológica',
    projectType: 'Máximo Contraste Gráfico Lateral',
    payoutUsd: 3200,
    targetScene: 'night_studio',
    objective: 'Momento climático donde el protagonista debe decidir si traicionar a su país o salvar a su familia. El director exige la iluminación de dualidad moral por antonomasia: Split Lighting (Luz Dividida). Debes colocar la luz principal exactamente a 90° lateral (entre 75° y 105°), con el relleno apagado (0%), partiendo el rostro del actor con una frontera tajante entre luz brillante y sombra absoluta.',
    artisticContext: 'El split lighting divide literalmente al personaje en dos mitades: la faceta pública y el secreto oculto. Es la representación gráfica del dilema ético sin palabras.',
    classLesson: 'Split Lighting • Iluminación a 90° y la Metáfora de la Dualidad Moral',
    bookReference: 'Split Lighting • Iluminación a 90° y la Metáfora de la Dualidad Moral',
    deliverySpecs: [
      'Key Light a 90° lateral puro (75° a 105°)',
      'Fill Light completamente desactivada (0%)',
      'Exposición limpia (|EV| ≤ 0.75)',
    ],
    didacticHints: [
      'Gira el ángulo horizontal de la Key Light en el panel de luces a 90° exactos.',
      'Apaga el Fill Light por completo para que el corte entre luz y sombra sea tajante.',
    ],
    solutionGuide: {
      explanation: 'Una luz principal a 90° rasante ilumina únicamente un hemisferio del cráneo, proyectando una línea divisoria vertical perfecta en la nariz.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 1.8,
        focusDistanceM: 1.8,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 60, angleDeg: 90, elevationDeg: 10 },
        { id: 'light_fill', enabled: false, intensityPct: 0 },
      ],
      summaryText: 'Key a 90° • Fill 0% • f/2.8 • ISO 400',
    },
    validate: (settings, metrics, lights) => {
      const key = lights.find((l) => l.id === 'light_key');
      const fill = lights.find((l) => l.id === 'light_fill');

      const splitAngle = !!key?.enabled && key.angleDeg >= 75 && key.angleDeg <= 105;
      const fillOff = !fill?.enabled || fill.intensityPct <= 5;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.75;
      const success = splitAngle && fillOff && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La dualidad psicológica es brutal! La línea divisoria en el rostro encarna el conflicto ético a la perfección. Escena aprobada para el clímax.'
          : 'Aún no se logra el Split Lighting perfecto. Coloca la Key Light a 90° lateral (entre 75° y 105°) y apaga el Fill por completo.',
        details: [
          {
            label: 'Key a 90° Lateral (75° - 105°)',
            pass: splitAngle,
            currentVal: key?.enabled ? `${key.angleDeg}°` : 'Apagada',
            targetVal: '75° a 105° (Ideal 90°)',
            hint: 'Ajusta el ángulo de la Key a 90°.',
          },
          {
            label: 'Fill Apagada',
            pass: fillOff,
            currentVal: fill?.enabled ? `${fill.intensityPct}%` : 'Apagada (Correcto)',
            targetVal: '0% o Desactivada',
            hint: 'Apaga el relleno.',
          },
        ],
      };
    },
  },

  {
    id: 'career_24_intimacy_shallow_dof',
    level: 24,
    rank: 'senior',
    rankTitle: '🥇 Director de Fotografía Senior',
    title: 'El Último Adiós: Intimidad y Diafragma Crítico',
    client: 'Drama Histórico para Cine',
    projectType: 'Primer Plano con Diafragma Crítico',
    payoutUsd: 3500,
    targetScene: 'portrait_golden',
    objective: 'Escena de despedida entre dos amantes en una estación al anochecer. El director de cine pide la máxima intimidad óptica: focal de retrato clásica (≥ 85mm) en apertura ultra abierta (f/1.4 a f/2.0), con el enfoque calibrado con exactitud sobre los ojos del actor (|enfoque - distancia| ≤ 0.15m), logrando que las lágrimas resalten nítidas mientras el resto del mundo se disuelve.',
    artisticContext: 'Una profundidad de campo ultrafina concentra la atención humana con una intensidad hipnótica. No hay distracciones: solo el alma del actor comunicándose con el espectador.',
    classLesson: 'Intimidad Óptica • Apertura Crítica f/1.4 - f/2.0 y Enfoque Quirúrgico de Ojos',
    bookReference: 'Intimidad Óptica • Apertura Crítica f/1.4 - f/2.0 y Enfoque Quirúrgico de Ojos',
    deliverySpecs: [
      'Teleobjetivo de retrato (≥ 85mm)',
      'Apertura ultra abierta (≤ f/2.0)',
      'Enfoque clavado exactamente sobre el sujeto (|foco - distancia| ≤ 0.15m)',
      'Exposición limpia (|EV| ≤ 0.8)',
    ],
    didacticHints: [
      'Configura la focal en 85mm o 105mm y abre el diafragma a f/1.4 o f/1.8.',
      'Toca directamente sobre los ojos del sujeto o sincroniza el focusDistanceM con la distancia del sujeto.',
    ],
    solutionGuide: {
      explanation: 'A 85mm y f/1.8 con foco a 2.2m e ISO 200 a 1/160s, la profundidad de campo mide escasos 4 centímetros, aislando los ojos con una belleza desgarradora.',
      recommendedSettings: {
        focalLengthMm: 85,
        aperture: 1.8,
        focusDistanceM: 2.2,
        subjectDistanceM: 2.2,
        iso: 200,
        shutterSpeedInv: 160,
      },
      summaryText: '85mm • f/1.8 • Foco 2.2m • ISO 200 • 1/160s',
    },
    validate: (settings, metrics) => {
      const teleOk = settings.focalLengthMm >= 80;
      const openAperture = settings.aperture <= 2.0;
      const focusPrecision = Math.abs(settings.focusDistanceM - settings.subjectDistanceM) <= 0.16;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.8;
      const success = teleOk && openAperture && focusPrecision && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡La toma más emotiva de la película! La mirada del actor traspasa la pantalla con una intimidad conmovedora. El director se pone de pie con lágrimas en los ojos.'
          : 'El enfoque o la apertura no tienen la intimidad requerida. Asegúrate de usar ≥ 85mm, abrir a ≤ f/2.0 y clavar el foco en el sujeto.',
        details: [
          {
            label: 'Focal Retrato (≥ 85mm)',
            pass: teleOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≥ 85mm',
            hint: 'Ajusta la focal a 85mm o más.',
          },
          {
            label: 'Diafragma Abierto (≤ f/2.0)',
            pass: openAperture,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≤ f/2.0 (Ideal f/1.8)',
            hint: 'Abre el diafragma a f/1.8 o f/1.4.',
          },
          {
            label: 'Foco Crítico en Sujeto',
            pass: focusPrecision,
            currentVal: `${settings.focusDistanceM}m`,
            targetVal: `${settings.subjectDistanceM}m ± 0.15m`,
            hint: 'Calibra el foco exactamente a la distancia del sujeto.',
          },
        ],
      };
    },
  },

  // ===========================================================================
  // TIER 7: DIRECTOR DE FOTOGRAFÍA MAESTRO (ASC LEAD CINEMATOGRAPHER) - NIVELES 25 A 28
  // Puesta en Escena Épica, Calibración VFX Hollywood, Worm Eye y Armonía Total
  // ===========================================================================
  {
    id: 'career_25_epic_grandeur_master_frame',
    level: 25,
    rank: 'master',
    rankTitle: '👑 Master DP (ASC / AMC Lead)',
    title: 'Amanecer en el Valle: Master Shot Panorámico Épico',
    client: 'Superproducción Internacional de Aventuras',
    projectType: 'Master Shot Panorámico en Relación de Aspecto 2.39:1',
    payoutUsd: 3900,
    targetScene: 'landscape_depth',
    objective: 'El plano maestro de apertura para una superproducción de aventuras. El director necesita un encuadre colosal en relación anamórfica Scope (2.39:1), con una lente angular que abarque todo el horizonte (24mm - 35mm), gran profundidad de campo nítida (≥ f/5.6) para que las montañas lejanas y el suelo inmediato conserven detalle, y exposición dorada en fotómetro.',
    artisticContext: 'El Master Shot panorámico no solo sitúa la geografía: establece el tono épico y la magnitud emocional de toda la obra cinematográfica.',
    classLesson: 'El Master Shot Panorámico • Formato Scope 2.39:1 e Hiperfocal Escénica',
    bookReference: 'El Master Shot Panorámico • Formato Scope 2.39:1 e Hiperfocal Escénica',
    deliverySpecs: [
      'Relación de aspecto cinematográfica Scope (2.39:1)',
      'Gran angular para inmensidad de escala (24mm a 35mm)',
      'Profundidad de campo generosa (≥ f/5.6)',
      'Exposición limpia calibrada (|EV| ≤ 0.65)',
    ],
    didacticHints: [
      'Selecciona el formato 2.39:1 Scope en la consola de encuadre.',
      'Usa una focal de 24mm o 28mm y cierra el diafragma a f/8 para una nitidez infinita en todo el valle.',
    ],
    solutionGuide: {
      explanation: 'El ratio 2.39:1 con 28mm a f/8 extiende el lienzo horizontalmente, permitiendo que la escala monumental del paisaje respire con majestuosidad.',
      recommendedSettings: {
        aspectRatio: '2.39:1',
        focalLengthMm: 28,
        aperture: 8,
        iso: 200,
        shutterSpeedInv: 125,
        subjectDistanceM: 6,
        focusDistanceM: 6,
      },
      summaryText: 'Scope 2.39:1 • 28mm • f/8 • ISO 200',
    },
    validate: (settings, metrics) => {
      const scopeRatio = settings.aspectRatio === '2.39:1';
      const wideFocal = settings.focalLengthMm <= 35;
      const deepDof = settings.aperture >= 5.4;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 0.65;
      const success = scopeRatio && wideFocal && deepDof && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Épica cinematográfica en estado puro! El plano maestro quita el aliento por su amplitud, nitidez y majestuosidad Scope. Aprobado para el estreno mundial.'
          : 'El encuadre aún no alcanza la escala requerida. Usa ratio 2.39:1, focal ≤ 35mm y diafragma cerrado ≥ f/5.6.',
        details: [
          {
            label: 'Formato Anamórfico Scope (2.39:1)',
            pass: scopeRatio,
            currentVal: settings.aspectRatio || '16:9',
            targetVal: '2.39:1',
            hint: 'Ajusta el ratio a 2.39:1.',
          },
          {
            label: 'Gran Angular (≤ 35mm)',
            pass: wideFocal,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '≤ 35mm (Ideal 28mm)',
            hint: 'Abre la lente.',
          },
          {
            label: 'Profundidad de Campo (≥ f/5.6)',
            pass: deepDof,
            currentVal: `f/${settings.aperture}`,
            targetVal: '≥ f/5.6',
            hint: 'Cierra el diafragma.',
          },
        ],
      };
    },
  },

  {
    id: 'career_26_vfx_calibration_shoot',
    level: 26,
    rank: 'master',
    rankTitle: '👑 Master DP (ASC / AMC Lead)',
    title: 'Superproducción Sci-Fi: Calibración VFX y Matchmove',
    client: 'Industrial Light & Magic / VFX Pipeline',
    projectType: 'Rodaje de Placa de Referencia con Kit VFX (Gris 18%, Croma y Macbeth)',
    payoutUsd: 4400,
    targetScene: 'portrait_golden',
    objective: 'Rodaje de elementos de efectos visuales (VFX) para una película de ciencia ficción de 150 millones de dólares. El supervisor de VFX exige rodar la placa de calibración con el kit de referencia en el set: la bola de gris neutro 18%, la esfera cromada de reflexión y la carta Macbeth ColorChecker. La exposición debe estar calibrada con precisión milimétrica a 0.0 EV (|EV| ≤ 0.3) y en lente estándar de 50mm.',
    artisticContext: 'En los grandes rodajes de Hollywood, el equipo de efectos visuales utiliza la bola gris del 18% para igualar la exposición difusa del sol y focos, la bola cromada para capturar el mapa de reflejos HDRI 360°, y el ColorChecker para la fidelidad colorimétrica.',
    classLesson: 'Calibración de Set VFX • Bola Gris 18%, Esfera Cromada y Tabla de Color Macbeth',
    bookReference: 'Calibración de Set VFX • Bola Gris 18%, Esfera Cromada y Tabla de Color Macbeth',
    deliverySpecs: [
      'Exposición de precisión quirúrgica (0.0 ± 0.3 EV)',
      'Focal estándar sin distorsión (45mm a 55mm)',
      'Kit VFX presente en el encuadre para referencia de matchmove',
    ],
    didacticHints: [
      'Observa la esfera de gris 18% y la esfera cromada junto al personaje en el plató.',
      'Ajusta la exposición con precisión milimétrica hasta que el indicador de EV marque exactamente 0.0 EV.',
    ],
    solutionGuide: {
      explanation: 'Una exposición de 0.0 EV exacto asegura que el gris neutro del 18% refleje con precisión matemática los valores estándar para el pipeline de composición digital.',
      recommendedSettings: {
        focalLengthMm: 50,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      summaryText: 'Focal 50mm • f/2.8 • 1/125s • ISO 400 • EV 0.0',
    },
    validate: (settings, metrics) => {
      const focalOk = settings.focalLengthMm >= 45 && settings.focalLengthMm <= 55;
      const precisionEV = Math.abs(metrics.exposureDeltaEV) <= 0.35;
      const success = focalOk && precisionEV;

      return {
        success,
        clientFeedback: success
          ? '¡Calibración científica perfecta! El equipo de VFX valida la placa de referencia: el gris 18% y los reflejos cromados coinciden con los shaders de postproducción al 100%.'
          : 'La exposición o la focal aún no tienen la precisión requerida para VFX. Ajusta para un EV clavado en 0.0 ± 0.3 y mantén la focal en 50mm.',
        details: [
          {
            label: 'Exposición Quirúrgica (0.0 ± 0.3 EV)',
            pass: precisionEV,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 0.3 EV',
            hint: 'Nivela con exactitud a 0.0 EV.',
          },
          {
            label: 'Focal Estándar (50mm)',
            pass: focalOk,
            currentVal: `${settings.focalLengthMm}mm`,
            targetVal: '45mm - 55mm',
            hint: 'Mantén la focal en 50mm.',
          },
        ],
      };
    },
  },

  {
    id: 'career_27_worms_eye_action_climax',
    level: 27,
    rank: 'master',
    rankTitle: '👑 Master DP (ASC / AMC Lead)',
    title: 'Persecución a Ras de Asfalto: Plano Gusano (Worm’s Eye)',
    client: 'Película de Acción Blockbuster',
    projectType: 'Secuencia de Persecución a Ras de Neumático',
    payoutUsd: 4900,
    targetScene: 'action_sports',
    objective: 'Clímax de una persecución de alta velocidad. El director busca una perspectiva visceral extrema: colocar la cámara a ras de suelo en plano gusano (altura ≤ 0.30m) con tilt ascendente pronunciado (tilt ≥ +25°), y una velocidad de obturación implacable (≥ 1/500s) para capturar el rugido y la velocidad del vehículo pasando rozando el lente.',
    artisticContext: 'El plano gusano (Worm’s Eye) ubica la cámara directamente sobre el pavimento o la tierra. Hace que cualquier objeto en movimiento parezca una fuerza de la naturaleza colosal y amenazante.',
    classLesson: 'Plano Gusano (Worm’s Eye) • Perspectiva a Ras de Suelo y Dinámica Visceral',
    bookReference: 'Plano Gusano (Worm’s Eye) • Perspectiva a Ras de Suelo y Dinámica Visceral',
    deliverySpecs: [
      'Altura de cámara a ras de suelo (altura ≤ 0.30m)',
      'Inclinación ascendente pronunciada (Tilt ≥ +25°)',
      'Obturación rápida para congelar dinamismo (≥ 1/500s)',
      'Exposición limpia (|EV| ≤ 1.0)',
    ],
    didacticHints: [
      'Usa el botón de 1 clic "Gusano" en la consola de dirección.',
      'Sube la velocidad a 1/500s o 1/1000s y compensa con apertura f/4.0 e ISO 400 para una imagen nítida sin trepidación.',
    ],
    solutionGuide: {
      explanation: 'Una altura de 0.20m con tilt a +30° y obturación a 1/1000s transforma la carrera en una estampida gigantesca contra el objetivo.',
      recommendedSettings: {
        cameraHeightM: 0.2,
        cameraTiltDeg: 30,
        shutterSpeedInv: 1000,
        aperture: 4.0,
        iso: 400,
        subjectDistanceM: 4.5,
        focusDistanceM: 4.5,
      },
      summaryText: 'Altura 0.20m • Tilt +30° • 1/1000s • f/4.0 • ISO 400',
    },
    validate: (settings, metrics) => {
      const groundHeight = settings.cameraHeightM <= 0.35;
      const steepTilt = settings.cameraTiltDeg >= 22;
      const fastShutter = settings.shutterSpeedInv >= 500;
      const exposureOk = Math.abs(metrics.exposureDeltaEV) <= 1.0;
      const success = groundHeight && steepTilt && fastShutter && exposureOk;

      return {
        success,
        clientFeedback: success
          ? '¡Una toma colosal y visceral! El plano gusano hace vibrar la sala de cine con pura adrenalina. El director de acción queda eufórico.'
          : 'Aún no se logra el plano gusano. Baja la cámara a ≤ 0.30m, apunta hacia arriba (Tilt ≥ +25°) y obtura a ≥ 1/500s.',
        details: [
          {
            label: 'Cámara a Ras de Suelo (≤ 0.30m)',
            pass: groundHeight,
            currentVal: `${settings.cameraHeightM.toFixed(2)}m`,
            targetVal: '≤ 0.30m (Ideal 0.20m)',
            hint: 'Baja la cámara al suelo.',
          },
          {
            label: 'Inclinación Ascendente (Tilt ≥ +25°)',
            pass: steepTilt,
            currentVal: `${settings.cameraTiltDeg}°`,
            targetVal: '≥ +25°',
            hint: 'Apunta hacia arriba.',
          },
          {
            label: 'Obturación Rápida (≥ 1/500s)',
            pass: fastShutter,
            currentVal: `1/${settings.shutterSpeedInv}s`,
            targetVal: '≥ 1/500s',
            hint: 'Sube la velocidad de obturación.',
          },
        ],
      };
    },
  },

  {
    id: 'career_28_masterpiece_lighting_harmony',
    level: 28,
    rank: 'master',
    rankTitle: '👑 Master DP (ASC / AMC Lead)',
    title: 'La Gran Obra Maestra: Armonía Total de Dirección de Foto',
    client: 'Largometraje Galardonado en Festivales Internacionales',
    projectType: 'Cuadro de Honor: Iluminación, Óptica, Encuadre y Colorimetría',
    payoutUsd: 5500,
    targetScene: 'portrait_golden',
    objective: 'El reto supremo de graduación y consagración profesional como Director de Fotografía Lead. Debes orquestar en perfecta armonía todos los departamentos: formato cinematográfico (2.39:1 o 16:9), esquema de 3 luces de estudio completo y calibrado (Key, Fill y Rim despegando al personaje con Rim ≥ 20%), focal clásica de retrato (50mm a 85mm), diafragma estético (f/2.0 a f/2.8) y fotómetro en equilibrio maestro (|EV| ≤ 0.8).',
    artisticContext: 'La cinematografía definitiva no es la suma de trucos aislados, sino la comunión invisible donde la luz, la lente, la composición y el color respiran como un solo organismo al servicio de la historia.',
    classLesson: 'Armonía Integral Cinematográfica • La Fusión de Luz, Lente, Encuadre y Narrativa',
    bookReference: 'Armonía Integral Cinematográfica • La Fusión de Luz, Lente, Encuadre y Narrativa',
    deliverySpecs: [
      'Relación de aspecto cinematográfica (2.39:1 o 16:9)',
      'Esquema de iluminación de 3 puntos activo y equilibrado (Key, Fill, Rim ≥ 20%)',
      'Focal de retrato estética (50mm a 85mm) a f/2.0 - f/2.8',
      'Exposición magistral en fotómetro (0.0 ± 0.8 EV)',
    ],
    didacticHints: [
      'Activa las 3 luces de estudio: Key a 45° (40%-50%), Fill (-45°, 20%) y Rim (145°, 30%+).',
      'Elige ratio 2.39:1 o 16:9, focal 70mm a f/2.8 y equilibra el ISO/velocidad hasta clavar el EV en 0.0.',
    ],
    solutionGuide: {
      explanation: 'Una focal de 70mm a f/2.8 en formato Scope 2.39:1 con el esquema completo de tres luces y fotómetro nivelado representa la cúspide de la dirección de fotografía moderna.',
      recommendedSettings: {
        aspectRatio: '2.39:1',
        focalLengthMm: 70,
        aperture: 2.8,
        shutterSpeedInv: 125,
        iso: 400,
        subjectDistanceM: 2.2,
        focusDistanceM: 2.2,
      },
      recommendedLights: [
        { id: 'light_key', enabled: true, intensityPct: 45, angleDeg: 45 },
        { id: 'light_fill', enabled: true, intensityPct: 20, angleDeg: -45 },
        { id: 'light_rim', enabled: true, intensityPct: 35, angleDeg: 145 },
      ],
      summaryText: 'Scope 2.39:1 • 70mm • f/2.8 • 3 Luces Calibradas • EV 0.0',
    },
    validate: (settings, metrics, lights) => {
      const cinemaRatio = settings.aspectRatio === '2.39:1' || settings.aspectRatio === '16:9';
      const focalOk = settings.focalLengthMm >= 50 && settings.focalLengthMm <= 85;
      const apertureOk = settings.aperture >= 1.8 && settings.aperture <= 2.8;

      const key = lights.find((l) => l.id === 'light_key');
      const fill = lights.find((l) => l.id === 'light_fill');
      const rim = lights.find((l) => l.id === 'light_rim');

      const lightsOk = !!key?.enabled && !!fill?.enabled && !!rim?.enabled && rim.intensityPct >= 18;
      const masterEV = Math.abs(metrics.exposureDeltaEV) <= 0.8;
      const success = cinemaRatio && focalOk && apertureOk && lightsOk && masterEV;

      return {
        success,
        clientFeedback: success
          ? '¡UNA OBRA MAESTRA CINEMATOGRÁFICA! Has demostrado el dominio absoluto de la luz, la óptica, la geometría y la exposición. Te consagras con el máximo honor del simulador como Director de Fotografía Maestro.'
          : 'Casi lo tienes. Revisa que las tres luces estén encendidas con Rim ≥ 20%, focal 50-85mm a f/2.0-f/2.8 y el fotómetro nivelado en 0.0 ± 0.8 EV.',
        details: [
          {
            label: 'Formato Cinemático (2.39:1 / 16:9)',
            pass: cinemaRatio,
            currentVal: settings.aspectRatio || '16:9',
            targetVal: '2.39:1 o 16:9',
            hint: 'Ajusta el ratio.',
          },
          {
            label: 'Focal y Diafragma Estético (50-85mm, f/2-f/2.8)',
            pass: focalOk && apertureOk,
            currentVal: `${settings.focalLengthMm}mm • f/${settings.aperture}`,
            targetVal: '50-85mm a f/2.0-f/2.8',
            hint: 'Ajusta focal y apertura.',
          },
          {
            label: 'Esquema de 3 Luces Completo',
            pass: lightsOk,
            currentVal: `${lights.filter((l) => l.enabled).length}/3 luces activas`,
            targetVal: 'Key, Fill y Rim (≥ 20%) activas',
            hint: 'Enciende Key, Fill y Rim.',
          },
          {
            label: 'Equilibrio Maestro de Exposición (0.0 ± 0.8 EV)',
            pass: masterEV,
            currentVal: `${metrics.exposureDeltaEV > 0 ? '+' : ''}${metrics.exposureDeltaEV} EV`,
            targetVal: '0.0 ± 0.8 EV',
            hint: 'Nivela con precisión.',
          },
        ],
      };
    },
  },
];

export const FRAMED_INK_CAREER_BRIEFS = CAREER_BRIEFS;
