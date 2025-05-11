import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '@features/pokemon/models/pokemon.model';
import { PokeEndpoints } from '@core/constants/poke-endpoints';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  @Input() pokemons: PokemonDetail[] = [];

  spriteUrl(id: number): string {
    return PokeEndpoints.image(id);
  }
}
