---
titulo: 'BluckerTV: cinco meses y un suscriptor'
resumo: Post-mortem de una plataforma de video construida en solitario y cerrada por decisión de negocio, no por falla técnica. Lo que enseñaron los números.
data: 2026-08-07T21:27:00-03:00
idioma: es
obra: bluckertv
endereco: bluckertv
ordem: 7
assuntos:
  - PeerTube
  - Infraestructura
  - Post-mortem
---

BluckerTV era una plataforma brasileña de video bajo demanda, de propósito
general. No era un sitio de gameplay: era infraestructura de video, construida
sobre [PeerTube](https://joinpeertube.org), con interfaz propia, complementos
propios, distribución propia, marca registrada, empresa abierta y app publicada
en Google Play.

La idea venía de una pérdida real. Videolog, una plataforma brasileña que operó
de 2004 a 2015, cerró y se llevó su acervo. BluckerTV prometía lo contrario:
**lo que publicas no desaparece**. Ese era el diferencial, y como se verá, era
también el problema.

Todo lo hizo una sola persona. Desarrollo, infraestructura, DevOps, producto,
legal, cumplimiento, moderación y soporte.

## Lo que corría por debajo

PeerTube 8.2.3 fijado en la línea 8.2.x, con política de aplicar solo parches.
Node 22 LTS, PostgreSQL 16, Redis 7, nginx, FFmpeg, Ubuntu Server 24.04 en un
VPS KVM4. Entrega en HLS con P2P por WebRTC, y transcodificación deliberadamente
escueta: **solo dos escalones, 360p30 y 1080p60**. Nada de 1440p ni 4K, porque
cada escalón extra multiplica el costo de CPU y almacenamiento sin multiplicar
la audiencia.

En el borde, Bunny CDN con origin shield en Chicago y 88,8% de cache hit,
apoyado en Backblaze B2 como object storage. Cloudflare en el DNS, con orange
cloud en la raíz y SSL Full Strict.

La app de Android era un TWA empaquetado a partir del PWA. iOS fue evaluado y
pospuesto a conciencia, no por olvido.

### Nueve complementos propios, y una decisión de arquitectura con función legal

Todos en TypeScript, bajo el espacio `peertube-plugin-blucker-*`. **No se
modificó nada del núcleo de PeerTube**, y eso no era solo higiene: PeerTube es
AGPLv3, y tocar el núcleo abre la lectura de obra derivada, con obligación de
liberar el código de los complementos. Hacerlo todo por complemento desactivaba
ese riesgo.

- **`blucker-copyright`** ejecutaba el flujo completo de DMCA y marca:
  notificación, contranotificación en 10 días hábiles y panel de casos. Nació
  lleno de crons y automatización y luego fue refactorizado a 100% manual, lo
  que **borró más de 1.500 líneas de su propio código**. Terminó con una purga
  automática que anonimiza los datos cinco años después del cierre de cada caso.
- **`blucker-monetizacao`** limitaba vistas por IP por video por día como
  antifraude. La IP pasó de texto plano a hash SHA-256: mantiene la función
  antifraude y deja de retener dato personal.
- **`blucker-age-verification`** cumplía la Ley 15.211/2025 de Brasil. La
  arquitectura se eligió con cuidado: **el documento de identidad nunca entraba
  en el registro ni en el login**. El control solo se activaba al abrir un video
  sensible, una vez por cuenta, guardado como hash.
- **`blucker-blucks`** era el feed de video corto, con algoritmo de ranking
  propio.
- **`blucker-ads`** era publicidad sin cookies, sin métricas y sin
  segmentación: un banner estático alojado en el propio servidor, con tiempo de
  exhibición comprado por rotación.

Más `blucker-ganhos`, `blucker-voice-search`, `blucker-blust` y
`blucker-livechat`, este último descontinuado junto con el streaming en vivo.

## Lo legal, escrito desde cero

Es la parte menos común en un proyecto en solitario, y la que más tiempo
consumió.

Términos de Uso con **29.998 caracteres** en 10 secciones, comprimidos desde
unos 83.000 de la primera versión, con todas las citas legales auditadas contra
fuente oficial. Política de Privacidad de 9.988 caracteres, mapeando las bases
legales y los derechos de la ley brasileña de protección de datos.

El hallazgo más interesante fue un error en el propio texto: la cláusula sobre
responsabilidad por contenido de terceros repetía el régimen antiguo del marco
civil de internet brasileño. El Supremo declaró ese artículo parcialmente
inconstitucional, con tesis proclamada en junio de 2026. **El texto estaba
jurídicamente desactualizado antes de que el sitio abriera**, y fue reescrito
para remitir a la interpretación fijada por el tribunal.

La marca fue depositada en noviembre de 2024, clase 41, y **concedida en junio
de 2026**, sin oposición. Está a nombre de persona física, así que sobrevivió al
cierre de la empresa.

## Los números

Corte público de julio de 2026, de la pestaña de transparencia de la propia
plataforma:

| Métrica | Julio de 2026 |
| --- | --- |
| Usuarios | 72 |
| Videos | 270 |
| Visualizaciones | 3.361 |
| Alojado | 1,8 TB |
| Suscriptores de pago | **1** |

El plan Blucker+ costaba R$ 6,90 al mes y subía la cuota de 50 GB a 1 TB. Entró
un único suscriptor, el 31 de mayo. El saldo final en la cuenta de la pasarela
de pago, al cierre, era de **R$ 6,18**.

Del otro lado, el costo total rondó los **R$ 8.100**: unos R$ 4.250 en
herramientas de desarrollo, R$ 2.850 en servidor y dominios, cerca de 40 dólares
al mes de CDN y almacenamiento, más domicilio fiscal e impuestos.

Cómo se concentró ese gasto cuenta una historia por sí solo: **abril por sí solo
fue el 75% de todo el gasto en herramientas**, y de abril a julio la caída fue
del 96%. El pico de construcción y el enfriamiento aparecen en el extracto antes
que en ningún otro lado.

## Por qué terminó

No fue falla técnica. La plataforma estaba en línea, funcionando, con
cumplimiento al día y app publicada. Terminó por cuentas.

**La matemática no cerraba.** Con marketing proyectado en unos R$ 1.045 al mes,
harían falta **145 suscripciones de R$ 6,90 solo para empatar**. Una sola baja
ya ponía la operación en rojo.

**Y el diferencial era un pasivo.** "Lo que publicas no desaparece" más una
cuota generosa significa pagar almacenamiento eterno para quien ya canceló.
Incluso con 200 o 300 suscriptores, una ola de bajas dejaría al operador pagando
la cuenta de todo el acervo, sin ingreso alguno. La promesa que vendía el
producto era la misma que lo hundía a largo plazo. Por eso la idea de cuota
ilimitada murió antes de nacer.

**Faltaba respuesta a la pregunta central.** Nunca hubo una buena respuesta a
"por qué alguien usaría esto en vez de YouTube". El caso de uso original,
archivar mis propios videos, ya había sido abandonado antes de eso.

**El riesgo estaba invertido.** La plataforma se financiaba con los ingresos del
canal de YouTube. Es decir, el proyecto que existía como plan B contra una
desmonetización estaba consumiendo justamente el ingreso que debía proteger.
Amplificaba el riesgo en vez de diluirlo.

**El orden de construcción estaba mal.** Infraestructura, cumplimiento y marca
vinieron antes de validar la demanda. Cuando el marketing entró en la agenda, ya
había cinco meses de costo fijo acumulado y ninguna señal de mercado.

## Lo que ahorró parar temprano

La decisión llegó **antes** de gastar los R$ 500 a R$ 1.000 mensuales previstos
en anuncios. A lo largo de un año eso sumaría de R$ 6.000 a R$ 12.000, con el
mismo resultado. Parar en agosto costó bastante menos de lo que habría costado
parar en diciembre.

El cierre se ejecutó entero, no se abandonó: empresa dada de baja con
certificado, declaración final presentada, cuenta bancaria cerrada, domicilio
fiscal cancelado por escrito, tarjetas retiradas de todos los proveedores y
renovación automática apagada en todo. La marca quedó preservada.

La pérdida neta real rondó los **R$ 5.500**, descontando el servidor todavía
utilizable hasta marzo de 2027 y la parte de los impuestos que fue aporte
previsional.

## Lo que quedó de aprendizaje

**Incidentes de producción resueltos**, que es donde se aprende de verdad:

- Una copia de la base de datos quedó accesible públicamente a través de la CDN.
  Encontrada y eliminada.
- Selectores DKIM rotos tumbaron la entregabilidad del dominio entero y llevaron
  a un listado en Spamhaus. Resuelto realineando SPF, DKIM y DMARC, terminando
  con 9,5 de 10 en mail-tester.
- Un `npm install` lanzado en el directorio equivocado casi se lleva la
  instalación. Recuperado del respaldo, sin caída de servicio.
- Una regla de ciclo de vida del almacenamiento quedó en 1 día tras una prueba y
  siguió así más de un mes. Descubierta y corregida, con el hallazgo extra de que
  el panel web del proveedor sobrescribe en silencio un campo que ni siquiera
  muestra.

**Contribuciones a PeerTube**, bajo el usuario
[@lipfelipef](https://github.com/lipfelipef): dos issues resueltas, cinco
abiertas y un pull request. Una de ellas, sobre la ventana de estadísticas de
canal, fue tomada por otro colaborador con el visto bueno del mantenedor y se
convirtió en una función completa del proyecto, con selector de período y
agregación semanal y mensual.

**Un reporte de seguridad** a Framasoft, mantenedor de PeerTube: una falla de
verificación de cuenta en la versión 8.2.3, severidad media evaluada en CVSS
4.3, comunicada por el canal oficial de seguridad. Los detalles técnicos quedan
fuera de este texto a propósito, porque otras instancias corren la misma
versión.

## El resumen honesto

Cinco meses, una plataforma entera en producción, nueve complementos, una marca
concedida, una empresa abierta y cerrada correctamente, una app publicada, un
reporte de seguridad aceptado y una contribución incorporada a un proyecto open
source serio.

Y un suscriptor.

Las dos mitades son verdad al mismo tiempo, y por eso mismo existe este texto.
La mitad técnica enseñó infraestructura, video, licenciamiento y regulación. La
mitad de negocio enseñó algo más difícil: **construirlo bien no es lo mismo que
construir algo que alguien quiere**, y el momento de descubrirlo es antes de la
primera factura, no después de la quinta.
