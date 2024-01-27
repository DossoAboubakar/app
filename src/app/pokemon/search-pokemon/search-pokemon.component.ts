import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { PokemonServiceService } from '../../pokemon-service.service';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export class SearchPokemonComponent implements OnInit {
  pokemonList : Pokemon[]
  searchTerms = new Subject<string>()
  pokemon$:Observable<Pokemon[]>
  constructor (  private pokemonService : PokemonServiceService, private router : Router){}
  ngOnInit(): void {
    this.pokemon$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    )
    
  }
  search(term: string ){
    this.searchTerms.next(term)

  }
  goToDetail( pokemon:Pokemon){
    const link = ['/pokemon',pokemon.id]
    this.router.navigate(link)
  }


}
