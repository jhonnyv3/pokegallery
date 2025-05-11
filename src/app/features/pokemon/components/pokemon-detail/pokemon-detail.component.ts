import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '@features/pokemon/models/pokemon.model';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatIconModule]
})
export class PokemonDetailComponent {
  @Input() pokemon!: PokemonDetail;
  @Output() close = new EventEmitter<void>();
}
