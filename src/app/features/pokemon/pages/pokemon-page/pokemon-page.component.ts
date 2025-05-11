import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetail } from '../../models/pokemon.model';
import { PokemonListComponent } from '@features/pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from '@features/pokemon/components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonDetailComponent
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss'
})
export class PokemonPageComponent implements OnInit {
  pokemonList!: Array<PokemonDetail>;
  pokemonSelected!: PokemonDetail | null;
  isError: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemonListWithDetails(20, 0).subscribe({
      next: (res) => {
        console.log('Lista + Detalles:', res);
        this.pokemonList = res;
      },
      error: (err) => {
        console.error('Error al cargar datos', err);
        this.isError = true;
      }
    });
  }

  selectPokemon(pokemon: PokemonDetail) {
    this.pokemonSelected = pokemon;
    console.log('Pokemon seleccionado:', pokemon);
  }

  cerrarDetalle(): void {
    this.pokemonSelected = null;
  }
}
