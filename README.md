# PokéGallery

Listado, búsqueda y detalle de pokemones usando Angular + Angular Material + RxJS + PokeAPI.

Una app moderna, responsiva y optimizada que permite visualizar, buscar y explorar pokemones con una interfaz tipo galía y detalle enriquecido.

---

## Arquitectura

Este proyecto sigue una arquitectura basada en Feature Modules con componentes standalone introducidos en Angular 15+. Se organiza en carpetas por funcionalidad (features), con separation of concerns y nombres consistentes.

### Componentes principales

- `PokemonPageComponent`: componente orquestador principal. Divide la pantalla en dos columnas:
  - Izquierda: listado de pokemones (con buscador integrado)
  - Derecha: panel flotante que muestra el detalle del pokémon seleccionado (en desktop)

- `PokemonListComponent`: recibe la lista de pokemones y emite el evento `(selectPokemon)` al hacer click en uno de ellos.

- `PokemonDetailComponent`: muestra el detalle completo del pokemón con su imagen, tipos, altura, peso, habilidades y stats base. Se activa desde el componente padre y recibe el objeto `PokemonDetail` por `@Input()`.

### Servicio

- El `PokemonService` expone:
  - `getPokemonList(limit, offset)`: obtiene la lista paginada desde `/pokemon` (pero esta respuesta no incluye imágenes).
  - `getPokemonDetail(idOrName)`: obtiene los detalles individuales desde `/pokemon/:id`
  - `getPokemonListWithDetails()`: usa `forkJoin` y `switchMap` para combinar ambos. Una vez obtenida la lista de nombres, se lanzan múltiples llamadas a detalle y se combina todo en un solo Observable.

### Memoización y performance

- Todas las respuestas se memoizan en memoria con `Map` y `shareReplay(1)` para evitar repeticiones innecesarias.
- Además, se almacena en `localStorage` para mejorar la experiencia en visitas repetidas.

---

## Instalación y uso

```bash
git clone https://github.com/jhonnyv3/pokegallery.git
cd pokegallery
npm install
ng serve
```

Abrir en navegador:

```bash
http://localhost:4200
```

o acceder directamente desde GitHub Pages:

🔗 [https://jhonnyv3.github.io/pokegallery](https://jhonnyv3.github.io/pokegallery)

---

> Proyecto realizado como ejercicio técnico de Angular: pokegallery 🎯
