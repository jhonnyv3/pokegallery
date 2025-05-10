const BASE_URL = 'https://pokeapi.co/api/v2';

export const PokeEndpoints = {
  // Listado paginado de pokemones
  list: (limit: number = 20, offset: number = 0) =>
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,

  // Detalle por id o nombre
  detail: (idOrName: string | number) =>
    `${BASE_URL}/pokemon/${idOrName}`,

  // Imagen usando ID
  image: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
};
