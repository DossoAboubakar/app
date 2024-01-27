import { Injectable, OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { POKEMONS } from './pokemon/mock';

@Injectable({
  providedIn: 'root',
})
export class PokemonServiceService implements OnInit{
  private apiUrl = 'api/pokemons';
  pokemonList : Pokemon[]

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    
  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl).pipe(
      tap((pokemonList) => console.table(pokemonList)),
     // catchError((error) => this.handleError(error, []))
    );
  }
  ListDePokemon(){
    return POKEMONS
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    const url = `${this.apiUrl}/${pokemonId}`;
    return this.http.get<Pokemon | undefined>(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        console.error(error);
        // Retourner un Observable vide ou une valeur par défaut, par exemple
        return of(undefined);
      })
    );
  }
  private log(response: Pokemon[] | Pokemon | undefined): void {
    console.table(response);
  }
searchPokemonList(pokemonName: string): Observable<Pokemon[]> {
  const pokemonList = this.ListDePokemon();
  const foundPokemon = pokemonList.filter(pokemon => pokemon.name === pokemonName);
  return of(foundPokemon.length > 0 ? [foundPokemon[0]] : []);
}
  getPokemonTypeList(): string[] {
    return [
      'plante',
      'feu',
      'eau',
      'insecte',
      'normal',
      'electrick',
      'poison',
      'fee',
      'vol',
      'combat',
      'psy',
    ];
  }
}
