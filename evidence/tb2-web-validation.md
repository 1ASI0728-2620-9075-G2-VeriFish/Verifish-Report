# Validación Landing y Flutter Web — 30/10/2026

Trabajo de Rúbens. Los cambios están en ramas feature y los PR apuntan a develop. No se hizo merge ni se creó un tag de release.

- [Landing PR #1](https://github.com/1ASI0728-2620-9075-G2-VeriFish/Verifish-Landing/pull/1)
- [Flutter Web PR #1](https://github.com/1ASI0728-2620-9075-G2-VeriFish/VeriFish-Fronted/pull/1)

## Qué se verificó

| Comprobación | Resultado |
| --- | --- |
| Landing antes de los cambios | Sin formulario comercial, términos ni sección YakuTrace |
| Playwright Landing | 4 pruebas aprobadas: contacto, navegación, términos y móvil de 390 px |
| Flutter antes de los cambios | 1 test de relleno aprobado; 52 incidencias del analizador |
| Flutter después | 7 tests aprobados: los 6 nuevos y el previo |
| Análisis final | 49 incidencias previas; ninguna nueva en las fuentes |
| Compilación debug | Correcta con Azure como API_BASE_URL |
| Compilación release | Correcta; preparada para Hosting |
| Login contra Azure | Correcto |
| Crear granja y volver a ingresar | Correcto; el nuevo JWT obtiene farmId |
| Registrar estanque y dispositivo IoT | Correcto |
| Vincular equipo al estanque | Correcto; no se activaron bombas |
| Notificaciones y restauración de sesión | Correcto |
| JWT inválido y cierre de sesión | 401 real; la Web limpia la sesión y permite ingresar otra vez |
| Usuario sin granja | 403 en recursos protegidos |
| Acceso a otra granja | 403; acceso a la granja propia devuelve 200 |
| Token anterior a crear la granja | 403 hasta renovar sesión |

El smoke test de navegador termina con código 1 porque detecta el fallo real de duplicados descrito abajo. Las pruebas del frontend que simulan 409 sí pasan.

## Pendientes

1. Azure responde 201 al registrar nuevamente el mismo deviceId. Debe responder 409; corresponde al backend.
2. El preflight CORS acepta http://localhost:3000, pero devuelve 403 para https://yakucontrol-v2.web.app y https://yakucontrol-v2.firebaseapp.com. El dueño del backend debe habilitar esos orígenes.
3. Firebase MCP/CLI todavía tiene la cuenta de ApuestaTotal. Se inició la autenticación de bendezuni@gmail.com, pero falta completarla. No se publicó esta rama en Hosting ni se cambiaron los otros proyectos.
4. Netlify queda pendiente de acceso. La integración existente de Vercel generó una vista previa, pero exige login y no sustituye una publicación pública verificada.
5. Figma y el video del prototipo quedan fuera por indicación del usuario. Se copiaron los mockups 8–18 existentes conservando sus originales.

Se crearon dos administradores y recursos de prueba con prefijo TB2 en Azure. Sus credenciales se guardaron fuera de los repositorios y no se incluyeron en las evidencias.

## Evidencias

Los resultados crudos están en [assets/images/sprint1](../assets/images/sprint1/): `tests-fronted.txt`, `tests-landing.txt`, `analyze-before.txt`, `analyze-after.txt`, `build-web-debug.txt`, `build-web-release.txt`, `web-browser-results.json`, `web-browser-output.txt` y `api-integration-results.json`.

Las capturas `exec-landing-*` y `exec-web-*` son ejecuciones locales. Las imágenes `tests-*` muestran la salida registrada de los comandos, no una ejecución nueva. Los archivos originales de diseño permanecen en assets/diseñoux; las copias solicitadas están en assets/images/cap6/mockup8.png hasta mockup18.png.
