# Fuentes UX/UI del paquete E

Responsable: Rúbens Fitzgerald Bendezu Navarro (`Lucemz`). Entrega TP1: YakuControl + YakuTrace, capítulo VI hasta 6.4.2.

Los archivos HTML son las fuentes editables de los diseños; los PNG del informe se encuentran en `assets/images/cap6/`. El script central `scripts/render-package-e.cjs` mantiene los componentes, las pantallas, los estados y los flujos en una única fuente. La tipografía Inter se distribuye junto con su licencia SIL Open Font License.

## Reproducción

Requisitos: Node.js, Playwright 1.60 y Chromium de Playwright. En una máquina sin dependencias: `npm install`, `npx playwright install chromium`, `npm run render:designs` y `npm run verify:designs`.

Para usar un runtime ya instalado, definir `PACKAGE_E_NODE_MODULES` con el directorio de sus módulos y ejecutar `node scripts/render-package-e.cjs all`. También se pueden renderizar los grupos `style`, `landing`, `wireframes` y `wireflows`, en ese orden: los wireflows utilizan los PNG de las pantallas.

Abrir `index.html` para recorrer la galería local. Las capturas se generan a 1440 px para escritorio y 390 px para móvil; los wireflows de cinco pasos se exportan a 1640 px. El ancho del contenido se verifica para evitar desbordamientos.

## Alcance y datos

Son propuestas de diseño, no una aplicación implementada. Las métricas, usuarios, códigos y mensajes de confirmación son ilustrativos. Los formularios no transmiten datos, las acciones no controlan equipos y las pantallas no procesan pagos. El QR contiene `YAKUTRACE-DEMO-NO-VALIDO`, sin URL ni certificado válido. No se inventan precios, transacciones blockchain, validaciones con usuarios o exposiciones realizadas.

Se redibujan en español las 18 pantallas base y los 10 flujos anteriores, y se añaden las pantallas 19–28, sus variantes móviles y los flujos 11–14 de YakuTrace. Los PNG anteriores se conservan en su carpeta original para mantener el historial.

## Herramientas externas

Los enlaces antiguos de Figma y LucidChart se conservan en el informe como referencias históricas. Esta entrega se creó y verificó mediante fuentes HTML/CSS locales y Chromium; no se afirma que los documentos externos hayan sido actualizados. Si el docente exige autoría nativa en esas herramientas, importar o recrear estas fuentes en ellas y adjuntar sus enlaces editables es un paso adicional.

## Identificadores de trabajo

- C6-1: guía de estilos y estados de confianza.
- C6-2: arquitectura de información, navegación, búsqueda y SEO/ASO.
- C6-3: landing desktop/móvil, wireframe y mockup.
- C6-4: pantallas base y nuevas, estados y responsive.
- C6-5: wireflows con pantallas y rutas alternativas.
- C6-6: se utiliza como revisión e integración del paquete E. Esta interpretación es operativa: las capturas del reparto no incluyen su descripción literal; confirmar si el equipo asignó un alcance adicional.

Los controles de calidad y el estado de Student Outcome se detallan en `REVISION_PAQUETE_E.md`.
