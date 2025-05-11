import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDetail } from '@features/pokemon/models/pokemon.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(pokemons: PokemonDetail[], search: string): PokemonDetail[] {
    if (!search?.trim()) return pokemons;
    return pokemons.filter(p =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }
}
