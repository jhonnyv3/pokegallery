import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonListResponse, PokemonDetail } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-page',
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss'
})
export class PokemonPageComponent implements OnInit {
  pokemonList!: Array<PokemonDetail>;
  pokemonSelected!: PokemonDetail;
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
}
