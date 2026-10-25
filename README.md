# Programación Avanzada · 2.º BT TI · 2026

**Materiales de estudio de Programación Avanzada**, elaborados para estudiantes de **2.º Bachillerato Tecnológico en Tecnologías de la Información (DGETP/UTU, Uruguay)**.

Proyecto educativo de **Profe Macón**: [profemacon.net](https://profemacon.net).

El sitio reúne lecciones basadas en paquetes SCORM, ejemplos de código Java y una referencia integrada de la aplicación **Tienda de Cómics («La Viñeta»)**. La propuesta avanza desde el análisis orientado a objetos hasta la construcción de una interfaz gráfica y la persistencia mediante JDBC.

## Contenidos

| Unidad | Temas | Competencias |
| --- | --- | --- |
| **01 · Introducción a la POO** | Análisis y diseño OO, clases y objetos, asociaciones, agregación, composición, herencia, colecciones, polimorfismo, clases abstractas y Maven | CET1 / CET2 |
| **02 · Vista** | Java Swing, `JFrame`, `JPanel`, layouts, eventos, `JTable` y separación de responsabilidades | CET1 |
| **03 · Control y Servicio** | Modularidad, `Main`, `ProductoController`, `ProductoService`, excepciones y reglas de negocio | CET1 / CET2 |
| **04 · Persistencia** | JDBC, `Connection`, consultas SQL, `PreparedStatement`, `ResultSet`, DAO, CRUD, interfaces y bajo acoplamiento | CET2 / CET3 |

### Unidad 01 · Introducción a la POO

1. Análisis y diseño orientado a objetos.
2. Clases, objetos y responsabilidades.
3. Asociaciones, agregación, composición y herencia.
4. Colecciones: `List`, `ArrayList`, `LinkedList` y polimorfismo.
5. Clases abstractas, sobrescritura y polimorfismo.
6. Maven y organización de paquetes.

### Proyecto integrado · Tienda de Cómics

La referencia del proyecto reúne los paquetes `model`, `view`, `controller`, `service`, `dao`, `config` y `exceptions`, con **Java, Swing, FlatLaf, MySQL y JDBC directo**. El objetivo es reconocer qué responsabilidad tiene cada clase y cómo colaboran las distintas capas.

> El código publicado tiene finalidad didáctica. Para ejecutar la aplicación Java se necesita configurar las dependencias Maven, MySQL y los datos de conexión correspondientes. La web no ejecuta Java en el navegador.

## Abrir el sitio localmente

Este repositorio contiene una **web estática**: HTML, CSS, JavaScript e imágenes. **No requiere Astro, Node.js ni compilación.**

1. Descarga o clona el repositorio.
2. Abre el archivo `index.html` de la raíz en tu navegador.
3. Selecciona una unidad y una lección desde el índice.

```bash
git clone <URL-DEL-REPOSITORIO>
cd <CARPETA-DEL-REPOSITORIO>
```

También puedes servir la carpeta con un servidor estático local, si lo prefieres.

## Organización de archivos

```text
.
├── index.html                    # Portada e índice del curso
├── assets/                       # Estilos e identidad visual
│   ├── style.css
│   ├── logo-pm.png
│   └── logo-profe-macon.png
├── lecciones/
│   ├── 01-analisis-diseno-oo/
│   ├── 02-clases-objetos/
│   ├── 03-relaciones-herencia/
│   ├── 04-colecciones/
│   ├── 05-abstractas-polimorfismo/
│   ├── 06-maven/
│   ├── 01-producto-vista/
│   ├── 02-eventos-tabla/
│   ├── 01-main-arquitectura/
│   ├── 02-producto-controller/
│   ├── 03-producto-service/
│   ├── 04-excepciones/
│   ├── 01-introduccion-jdbc/
│   ├── 02-connection/
│   ├── 03-sql/
│   ├── 04-dao/
│   ├── 05-interfaces/
│   ├── 06-polimorfismo/
│   └── proyecto-tienda-comics/
└── README.md
```

Cada lección conserva sus propios archivos HTML y recursos asociados. Las rutas indicadas corresponden a la organización actual del sitio; se irán ampliando conforme se incorporen materiales.

## Publicar en GitHub Pages

1. Sube a la **raíz** del repositorio `index.html`, `assets/`, `lecciones/` y este `README.md`.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta **/(root)**; guarda los cambios.
5. Comprueba la dirección que GitHub Pages indique y abre varias lecciones para verificar sus imágenes y enlaces.

No hace falta ejecutar `npm install` ni `npm run build`.

## SCORM y accesibilidad

Los contenidos provienen de materiales diseñados como paquetes **SCORM 1.2**. En esta web se presentan como páginas estáticas para permitir su consulta directa.

- Las explicaciones, recursos visuales e interacciones locales pueden consultarse desde el navegador.
- El seguimiento del progreso o las calificaciones propio de SCORM **requiere una plataforma compatible (LMS)** y no funciona automáticamente en GitHub Pages.
- El material continúa en revisión y mejora pedagógica; algunas páginas pueden actualizarse con nuevas explicaciones y recursos.

## Criterio didáctico

El recorrido utiliza el caso **«La Viñeta»** para conectar el análisis UML con las clases Java, la interfaz gráfica, la arquitectura en capas y la base de datos. Se prioriza comprender el problema antes de codificar, explicitar las decisiones de diseño y separar responsabilidades.

Competencias tecnológicas trabajadas:

- **CET1:** programación orientada a objetos en Java.
- **CET2:** interfaces, polimorfismo, flexibilidad y bajo acoplamiento.
- **CET3:** conexión a bases de datos y persistencia mediante JDBC.

## Autoría y uso

**Profe Macón** · Material educativo para Programación Avanzada 2026.

Los materiales e imágenes tienen fines educativos. Este repositorio **no declara una licencia de reutilización**; si se desea autorizar expresamente copias o modificaciones de terceros, deberá incorporarse un archivo `LICENSE` con la licencia elegida.
