import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, forkJoin, switchMap, catchError, throwError, tap, of  } from 'rxjs';
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
    const localKey = `pokemon-list-${limit}-${offset}`;

    const fromLocal = localStorage.getItem(localKey);
    if (fromLocal) {
      const parsed: PokemonListResponse = JSON.parse(fromLocal);
      return of(parsed);
    }

    if (!this.cacheList.has(cacheKey)) {
      const url = PokeEndpoints.list(limit, offset);
      const request$ = this.http.get<PokemonListResponse>(url).pipe(
        tap(res => localStorage.setItem(localKey, JSON.stringify(res))),
        shareReplay(1)
      );
      this.cacheList.set(cacheKey, request$);
    }

    return this.cacheList.get(cacheKey)!;
  }

  getPokemonDetail(idOrName: string | number): Observable<PokemonDetail> {
    const localKey = `pokemon-detail-${idOrName}`;

    const fromLocal = localStorage.getItem(localKey);
    if (fromLocal) {
      const parsed: PokemonDetail = JSON.parse(fromLocal);
      return of(parsed);
    }

    if (!this.cacheDetail.has(idOrName)) {
      const url = PokeEndpoints.detail(idOrName);
      const request$ = this.http.get<PokemonDetail>(url).pipe(
        tap(res => localStorage.setItem(localKey, JSON.stringify(res))),
        shareReplay(1)
      );
      this.cacheDetail.set(idOrName, request$);
    }

    return this.cacheDetail.get(idOrName)!;
  }

  getPokemonListWithDetails(limit = 20, offset = 0): Observable<PokemonDetail[]> {
    return this.getPokemonList(limit, offset).pipe(
      switchMap((res) => {
        const ids = res.results.map(r => this.extractIdFromUrl(r.url));
        const detailRequests = ids.map(id => this.getPokemonDetail(id));
        return forkJoin(detailRequests);
      }),
      catchError(err => {
        console.error('Error al obtener listado + detalles', err);

        return throwError(() => new Error('Error al cargar datos del pokémon'));
      })
    );
  }

  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
