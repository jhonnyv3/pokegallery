import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '@features/pokemon/models/pokemon.model';
import { PokeEndpoints } from '@core/constants/poke-endpoints';
import { MatCardModule } from '@angular/material/card';
import { FilterByNamePipe } from '@shared/pipes/filter-by-name.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  imports: [
    CommonModule,
    FilterByNamePipe,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Input() pokemons: PokemonDetail[] = [];
  @Output() selectPokemon = new EventEmitter<PokemonDetail>();
  filter = '';

  ngOnInit(): void {
    console.log('Pokemones:', this.pokemons);
    if (this.pokemons.length === 0) {
      console.warn('No hay pokemones para mostrar');
    }
  }

  spriteUrl(id: number): string {
    return PokeEndpoints.image(id);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (!img.src.includes('404.png')) {
      img.src = 'img/404.png';
    }
  }

  emitSelected(pokemon: PokemonDetail): void {
    this.selectPokemon.emit(pokemon);
  }
}
