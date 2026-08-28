# 05_FIRESTORE_INSTALABLE — versión con Firebase Firestore (reemplaza a Google Sheets)

Estos 6 archivos son la nueva versión de "Mi Entrenamiento", que ya **no usa Google Sheets ni
Apps Script para nada** — habla directo con Firebase Firestore desde el navegador. Es más rápida
que la versión de `04_PWA_INSTALABLE/` (esa seguía dependiendo de Apps Script por debajo).

Tu app anterior (Google Sheets + Apps Script) **sigue intacta y funcionando** — esta es una app
nueva en paralelo, no una edición de la anterior. Nada de lo de antes se borra ni se rompe.

Archivos: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`,
`icon-512-maskable.png`.

## Antes de publicar: falta migrar tus datos actuales

`index.html` ya funciona (probado con 46 comprobaciones automáticas sobre la lógica, ver
`checklist-migracion-firestore.md`), pero **Firestore todavía está vacío** — tu fase activa
("Volumen", semana 5, día 5), tus RMs y tu programación siguen solo en Google Sheets. Antes de usar
esta versión en serio hay que decidir cómo pasarlos — ver la sección 5 de
`checklist-migracion-firestore.md` (dos caminos posibles, a conversar paso a paso).

## Paso 1 — Publicar en GitHub Pages

Los pasos son los mismos que para la versión anterior (ver `checklist-migracion-pwa.md`, sección
"Publicación en GitHub Pages") — subir estos 6 archivos a un repositorio y activar Pages. Falta
decidir si van al mismo repositorio `HitHub/` (reemplazando esos archivos) o a uno nuevo — ver
`normas-de-trabajo.md`.

**Importante:** el inicio de sesión con Google (`signInWithRedirect`) puede necesitar que agregues
el dominio de GitHub Pages a la lista de dominios autorizados en Firebase: consola de Firebase →
Authentication → Settings → Authorized domains. Si el login falla justo después de publicar, es el
primer lugar para revisar.

## Paso 2 — Instalar en el Android

Igual que antes: abrir la URL en Chrome del teléfono → ⋮ → "Instalar app". Al abrir la app instalada
vas a ver primero la pantalla de inicio de sesión con Google — solo la cuenta
`franjaparedes90@gmail.com` puede entrar (protegido también por las Reglas de Seguridad de
Firestore, no solo por la pantalla).

## Cuando actualicemos el código más adelante

Igual que la versión anterior: repetir el Paso 1 (volver a subir los archivos que cambiaron al
mismo repositorio). No hace falta tocar nada en la consola de Firebase salvo que cambie algo de la
configuración del proyecto (muy poco probable).
