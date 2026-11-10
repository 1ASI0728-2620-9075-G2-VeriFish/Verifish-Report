# Arquitectura empresarial de Verifish

Lámina única que organiza **YakuControl + YakuTrace** por capas, siguiendo el modelo de referencia del curso: bandas superiores de actores, estrategia y capacidades; el problema (Demanda) a la izquierda y el resultado (Oferta de valor) a la derecha; en el centro, las capas de negocio, aplicaciones, datos y tecnología. Se agrega una **capa lateral de blockchain**, que es lo que distingue a YakuTrace y atraviesa las cuatro capas.

El diagrama no usa flechas. Cada elemento pertenece a la caja que lo contiene, y la posición vertical indica la capa. Todo el contenido sale del informe del proyecto (capítulos I a VII).

## Archivos

| Archivo | Para qué sirve |
| :--- | :--- |
| `arquitectura-empresarial.png` | Imagen en alta resolución (4400 px de ancho) para insertar en el informe. |
| `arquitectura-empresarial.html` | Fuente editable. Se abre en el navegador y se ajusta al ancho de la ventana. |
| `README.md` | Esta explicación. |

## Íconos de esquina

Cada elemento tiene un ícono pequeño que indica qué tipo de cosa es:

| Ícono | Tipo |
| :--- | :--- |
| Persona | Actor o rol |
| Diana | Meta u objetivo |
| Escalera | Capacidad |
| Píldora | Servicio |
| Flecha / chevron | Proceso o proceso programado |
| Carpeta | Marco o norma de referencia |
| Componente | Aplicación o módulo |
| Tabla | Dato |
| Cubo | Nodo de infraestructura |
| Eslabones | Elemento de la capa blockchain |

## Explicación por capa

### Actores
- **Externos:** el comprador de supermercado, el consumidor final que escanea el QR y las cadenas del canal moderno (Cencosud, Supermercados Peruanos y Tottus). Fuente: segmentos objetivo (1.3).
- **Internos:** el administrador de la piscigranja (ROLE_ADMIN) y el piscicultor u operario.
- **Proveedor de la solución y entorno:** el equipo Verifish, los proveedores de servicios (Stripe, Firebase, RPC) y las entidades del sector (SANIPES y PRODUCE), que el informe cita como referencia de certificación y de ferias.

### Alineamiento estratégico
- **Misión y visión 2030** de la startup (1.1.1).
- **Objetivos SMART G1 a G5** del Impact Mapping (3.3): estanques conectados, menos mortalidad, lotes certificados, adopción del plan TRACE y un piloto con supermercado.
- **Modelo de negocio SaaS B2B:** suscripción mensual por estanque más el complemento TRACE.

### Capacidades de Verifish
Son las 14 cosas que la organización debe saber hacer para cumplir la estrategia. Van desde el monitoreo IoT y el cálculo del ICA hasta la certificación con blockchain, el aislamiento por granja y el despliegue continuo.

### Demanda y oferta de valor
- **Demanda:** mortalidad por cambios del agua que se detectan tarde (hasta 200 000 truchas y más de S/ 300 000 por evento) y falta de evidencia verificable para los supermercados (5W+2H, 1.2.1).
- **Oferta de valor:** alertas en menos de 10 s (QA-02), verificación del certificado en menos de 3 s y sin cuenta (QA-06) y una suscripción accesible.

### Arquitectura de negocio
- **Alineamiento normativo y marcos de referencia:** siete marcos (trazabilidad, certificación, procesos, aplicaciones, datos, seguridad e infraestructura). Salen del estándar GDST, la Marca SANIPES y ASC, y las restricciones técnicas TC01, TC03, TC06, TC08 y TC10.
- **Gestión del conocimiento:** entrevistas y User Personas, Ubiquitous Language, EventStorming y documentación OpenAPI.
- **Gestión del cambio:** el paso del cuaderno y WhatsApp al registro digital, la interfaz de dos toques para el campo (QA-09), los pilotos y las demostraciones en ferias.
- **Estructura organizacional:**
  - La piscigranja cliente (granja, estanques y lotes).
  - Las áreas de trabajo de Verifish.
  - El canal moderno de supermercados.
- **Servicios de negocio:**
  - Los externos son públicos y no piden cuenta: verificación por QR, planes y landing.
  - Los internos son para la piscigranja: monitoreo, alertas, control de equipos, lotes, certificados, reportes, usuarios y suscripción.
- **Procesos:** el ciclo del lote, que va de la siembra al monitoreo, los hitos, la cosecha, la certificación y la verificación del comprador. Se basa en los Domain Message Flows 5 a 7. La suscripción y facturación es un proceso transversal.
- **Gestión y gobierno de datos:** el recorrido del dato de recolección, validación (firma HMAC), análisis (ICA), consolidación (resúmenes cerrados) e indicadores.

### Arquitectura de aplicaciones
- **Backend YakuControl:** monolito modular en Spring Boot con los seis Bounded Contexts y su clasificación Core, Supporting o Generic (4.2.2). Incluye los tres procesos programados de AD-14.
- **Aplicaciones cliente:**
  - App móvil y Web App en Flutter.
  - Landing Page en HTML5, CSS3 y JavaScript.
- **Servicios de TI:** API REST con OpenAPI, eventos de dominio en proceso, puertos y adaptadores, y el Edge API.
- **Soluciones de terceros:** Stripe, Firebase Cloud Messaging, correo y la API meteorológica.

### Arquitectura de datos
PostgreSQL 16 con un esquema por contexto, la serie temporal en TimescaleDB, los resúmenes de calidad, los datos de trazabilidad, las suscripciones, la cola Redis del Edge y la regla de gobierno: cada consulta se aísla por `farmId`.

### Arquitectura tecnológica
- **Nodos:**
  - El dispositivo Arduino.
  - El Edge en Railway (Flask, Mosquitto y Redis).
  - Azure App Service y Azure Database for PostgreSQL.
  - Firebase Hosting y App Distribution.
  - Netlify.
  - El smartphone del piscicultor.
- **Gestión de riesgos:** Edge Computing ante la conectividad rural (AD-01), Outbox con reintentos (AD-10) y bloqueo de procesos con réplicas (AD-14).
- **Seguridad de la información:** JWT, roles, firma HMAC de lecturas (AD-12) y webhooks de Stripe validados.
- **Gobernanza tecnológica:** GitHub Actions, pruebas (JUnit, Cucumber y pytest) y arquitectura hexagonal (AD-05).

### Capa lateral de confianza blockchain (YakuTrace)
Recorre las cuatro capas para mostrar qué parte de cada una sostiene la trazabilidad verificable:

| Capa | Qué aporta |
| :--- | :--- |
| Negocio | El certificado verificable del lote (registro inalterado, no garantía absoluta), el complemento TRACE y los estados pendiente, anclado y revocado. |
| Aplicaciones | El `LedgerPort` con su adaptador (AD-05, AD-09) y la verificación pública en el servidor (AD-11). |
| Datos | La huella SHA-256 del contenido canónico (AD-08) y la tabla `anchor_outbox` con tx hash, bloque y reintentos. |
| Tecnología | El smart contract en Solidity, la red EVM de pruebas configurable y el proveedor RPC. |

## Nota sobre la Web App

El informe tiene una diferencia interna. La decisión AD-13 (capítulo IV) dice que la Web App es Angular, pero el capítulo VII (7.1.1 y 7.1.4) indica que se implementó en Flutter Web y se publicó en Firebase Hosting. La lámina refleja lo implementado. Conviene unificar el informe en una próxima versión.

## Cómo regenerar el PNG

Después de editar el HTML, ejecuta desde esta carpeta:

```bash
google-chrome-stable --headless=new --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=2200,2300 --screenshot=captura.png "file://$PWD/arquitectura-empresarial.html"
magick captura.png -trim +repage -bordercolor white -border 20 arquitectura-empresarial.png && rm captura.png
```
