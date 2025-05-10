import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PokemonListResponse, PokemonDetail } from '../models/pokemon.model';
import { PokeEndpoints } from '../../../core/constants/poke-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private cacheList: Map<string, Observable<PokemonListResponse>> = new Map();
  private cacheDetail: Map<string | number, Observable<PokemonDetail>> = new Map();

  constructor(private http: HttpClient) {}

  getPokemonList(limit = 20, offset = 0): Observable<PokemonListResponse> {
    const cacheKey = `limit=${limit}&offset=${offset}`;
    if (!this.cacheList.has(cacheKey)) {
      const url = PokeEndpoints.list(limit, offset);
      const request$ = this.http.get<PokemonListResponse>(url).pipe(shareReplay(1));
      this.cacheList.set(cacheKey, request$);
    }
    return this.cacheList.get(cacheKey)!;
  }

  getPokemonDetail(idOrName: string | number): Observable<PokemonDetail> {
    if (!this.cacheDetail.has(idOrName)) {
      const url = PokeEndpoints.detail(idOrName);
      const request$ = this.http.get<PokemonDetail>(url).pipe(shareReplay(1));
      this.cacheDetail.set(idOrName, request$);
    }
    return this.cacheDetail.get(idOrName)!;
  }
}
