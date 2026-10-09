# Presentación CIMAT · Servicios Tecnológicos 2026

Presentación dinámica en HTML con el formato institucional del CIMAT (paleta guinda, verde y dorado, tipografía Noto Sans) y una propuesta de proyecto para MIUS Medical: **Health Tower Intelligence**.

**Ver la presentación:** https://colchadito.github.io/presentacion-cimat-mius/

**Solo el diagrama interactivo:** https://colchadito.github.io/presentacion-cimat-mius/artefacto_health_tower.html

## Contenido

14 diapositivas: las 13 del catálogo institucional del CIMAT y, en la posición 11, el diagrama interactivo de la plataforma **Health Tower Intelligence**: una plataforma modular donde los módulos se pueden sumar, ajustar o retirar, con su capa de datos, motores analíticos y torre de control. Al pasar el cursor por un módulo se muestra su detalle (problema, solución, KPIs).

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
index.html            marcado de las 14 diapositivas
deck.css / deck.js    estilo institucional y visor (escala 1280×720, navegación)
diagramas.css / .js   diagramas interactivos de la plataforma
assets/               imágenes optimizadas (WebP)
artefacto_health_tower.html   los dos diagramas en una página independiente
```

No requiere compilación. Para verla en local basta abrir `index.html` en un navegador; las fuentes se cargan desde Google Fonts, por lo que necesita conexión para verse con Noto Sans.

## Nota

Esta versión pública no incluye los logotipos oficiales de Secihti ni el escudo nacional. Las imágenes y textos del catálogo provienen de la presentación institucional del CIMAT.
