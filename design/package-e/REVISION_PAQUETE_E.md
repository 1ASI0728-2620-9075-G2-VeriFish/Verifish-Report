# Revisión del paquete E y del repositorio

Fecha: 08/10/2026 (America/Lima). Responsable: Rúbens Fitzgerald Bendezu Navarro, `Lucemz`.

## Entregables

| Área | Resultado verificable |
| :--- | :--- |
| C6-1 | Guía visual de YakuTrace: Inter, tokens de color, estados con símbolo y texto, controles de 48 px y contraste. |
| C6-2 | Mapa de arquitectura de información por audiencia; navegación unificada, búsqueda contextual, revisión de SEO/ASO. |
| C6-3 | Landing actualizada con YakuTrace: wireframe y mockup en desktop y móvil. |
| C6-4 | 28 pantallas principales en español, 10 variantes móviles de YakuTrace y 70 estados/vistas complementarias. |
| C6-5 | 23 wireflows con pantallas, rutas principales y alternativas; cubren los objetivos nuevos y los del backlog que faltaban. |
| C6-6 | Revisión e integración del paquete: imágenes, fuentes, coherencia, Student Outcome y documentación. Su definición literal no aparece en las capturas del reparto; este es el alcance operativo utilizado. |

Total: 137 PNG con sus fuentes HTML editables, más fuente SVG del QR de demostración y tipografía licenciada. Los recursos históricos se conservan; las referencias del capítulo VI utilizan los diseños nuevos. Ver `index.html`.

## Validación técnica y visual

- `scripts/render-package-e.cjs all`: 137 diseños renderizados sin desbordamiento horizontal, imágenes ausentes ni errores de carga de Inter.
- `scripts/verify-package-e.cjs`: comprueba fuente/exportación, firma y ancho de cada PNG, idioma español, referencias locales y las 87 referencias de imágenes del capítulo VI.
- Contraste de texto: ocho combinaciones comprobadas, todas con razón ≥ 4.5:1. El botón Cyan accesible usa #007EA8 (4.62:1 con blanco); el Cyan original #00A3E0 queda como acento.
- `scripts/check-responsive-package-e.cjs`: compara la landing y las pantallas 19–28 en 320, 390, 768, 960 y 1440 px; comprueba ancho, imágenes, controles de 48 px, etiquetas y menú lateral.
- Inspección visual de guía, landing, tabla de lotes, verificación pública móvil y wireflow de emisión. Los resultados técnicos están en `verification.json` y `responsive-verification.json`.
- `git diff --check`: revisión de espacios y errores del diff.
- CodeGraph indexó el generador (44 nodos, 459 relaciones) y permitió localizar la función de wireflows. Tras añadir los verificadores, sincronizó el índice a 71 nodos.

Las comprobaciones no equivalen a validación con usuarios, certificación completa de accesibilidad o funcionamiento de sensores/pagos/blockchain. Este repositorio contiene el reporte y diseños; no se compiló una aplicación.

## Student Outcome 3

Se completó la contribución escrita de Rúbens con entregables realmente creados y se preparó `GUION_SUSTENTACION.md` para distintas audiencias. La fila oral registra preparación; no afirma una exposición ya realizada. Registrar fecha, audiencia y evidencia después de la sustentación. TB1 y las conclusiones grupales siguen pendientes de vincular a evidencias personales o grupales reales. Se eliminó el bloque comentado del Student Outcome 7 para evitar confundir los criterios del curso.

## Revisión de las otras ramas

Base revisada: `origin/develop` en `47580d3`.

- `main` en `52169a5` contenía únicamente el título del repositorio.
- `feat/chapter-5` y `feat/chapter-6` apuntaban al mismo commit `5769e56`; ambas son antecesoras de `develop`, sin commits exclusivos pendientes de integrar.
- `pkg-c-user-stories` en `98024c1` ya estaba integrada mediante el PR #1. No se repitió ese merge.
- Las ramas nuevas del paquete E mantienen commits separados y se integran mediante `feature/pkg-e`; la integración final conserva el trabajo previo de `develop`.

## Pendientes externos y del equipo

Las fuentes actuales se crean localmente con HTML/CSS y Chromium. Los enlaces históricos de Figma y LucidChart no fueron actualizados ni se presentan como nuevas evidencias de esas herramientas. Si el docente exige documentos nativos allí, importar/recrear las fuentes y compartir los enlaces es un paso adicional.

Fuera del paquete E hay 25 rutas de imágenes que ya estaban ausentes en `develop`: tres To-Be, cuatro C4 y dieciocho diagramas tácticos. Los recursos antiguos no se reutilizaron automáticamente porque no acreditan los cambios de YakuTrace ni la arquitectura nueva. También permanecen marcas de entrevistas, validación y aportes de otros integrantes; no se inventaron ni se marcaron como completadas.

### Imágenes ausentes fuera del capítulo VI

- `./assets/images/cap4/c0_system_landscape.png`
- `./assets/images/cap4/c1_yakucontrol_context.png`
- `./assets/images/cap4/c2_yakucontrol_container.png`
- `./assets/images/cap4/c4_deployment.png`
- `./assets/images/cap5/c3_equipment.png`
- `./assets/images/cap5/c3_iam.png`
- `./assets/images/cap5/c3_notification.png`
- `./assets/images/cap5/c3_payment.png`
- `./assets/images/cap5/c3_telemetry.png`
- `./assets/images/cap5/c3_traceability.png`
- `./assets/images/cap5/class_equipment.png`
- `./assets/images/cap5/class_iam.png`
- `./assets/images/cap5/class_notification.png`
- `./assets/images/cap5/class_payment.png`
- `./assets/images/cap5/class_telemetry.png`
- `./assets/images/cap5/class_traceability.png`
- `./assets/images/cap5/db_equipment.png`
- `./assets/images/cap5/db_iam.png`
- `./assets/images/cap5/db_notification.png`
- `./assets/images/cap5/db_payment.png`
- `./assets/images/cap5/db_telemetry.png`
- `./assets/images/cap5/db_traceability.png`
- `./assets/images/tobe-administrador.png`
- `./assets/images/tobe-comprador.png`
- `./assets/images/tobe-piscicultor.png`
