# Presentación CIMAT · Servicios Tecnológicos 2026

Presentación dinámica en HTML con el formato institucional del CIMAT (paleta guinda, verde y dorado, tipografía Noto Sans) y una propuesta de proyecto para MIUS Medical: **Health Tower Intelligence**.

**Ver la presentación:** https://colchadito.github.io/presentacion-cimat-mius/

**Solo el diagrama interactivo:** https://colchadito.github.io/presentacion-cimat-mius/artefacto_health_tower.html

## Contenido

15 diapositivas: las 13 del catálogo institucional del CIMAT y, en las posiciones 11 y 12, dos diagramas interactivos de la plataforma:

- **Arquitectura:** fuentes de datos, motores analíticos, ocho proyectos en tres dominios y una torre de control.
- **Del programa general a cada proyecto:** árbol de los ocho proyectos con su detalle (problema, solución, KPIs).

## Controles

| Tecla | Acción |
| --- | --- |
| `←` `→` / `Espacio` | Anterior / siguiente |
| `G` | Índice de diapositivas |
| `F` | Pantalla completa |
| `Inicio` / `Fin` | Primera / última |

También funciona con gestos táctiles y rueda del ratón. Al abrir `index.html#11` se salta directo a la diapositiva 11.

## Estructura

```
index.html            marcado de las 15 diapositivas
deck.css / deck.js    estilo institucional y visor (escala 1280×720, navegación)
diagramas.css / .js   diagramas interactivos de la plataforma
assets/               imágenes optimizadas (WebP)
artefacto_health_tower.html   los dos diagramas en una página independiente
```

No requiere compilación. Para verla en local basta abrir `index.html` en un navegador; las fuentes se cargan desde Google Fonts, por lo que necesita conexión para verse con Noto Sans.

## Nota

Esta versión pública no incluye los logotipos oficiales de Secihti ni el escudo nacional. Las imágenes y textos del catálogo provienen de la presentación institucional del CIMAT.
