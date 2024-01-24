import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from "../pokemon-type-color.pipe";
import { POKEMONS } from '../mock';
import { Pokemon } from '../../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonServiceService } from '../../pokemon-service.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { InMemoryDataService } from '../../in-memory-data.service';

@Component({
    selector: 'app-list-pokemon',
    standalone: true,
    templateUrl: './list-pokemon.component.html',
    styleUrl: './list-pokemon.component.css',
    imports: [PokemonTypeColorPipe,CommonModule,HttpClientModule],
    providers :[PokemonServiceService,HttpClientInMemoryWebApiModule]
})
export class ListPokemonComponent implements OnInit {

  pokemonList:Pokemon[] = POKEMONS;
  pokemonSelected:Pokemon|undefined
  constructor(private route:ActivatedRoute,private router:Router,private pokemonservice:PokemonServiceService){

  }
  ngOnInit() {
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 0 });

  console.table(this.pokemonList)
  this.pokemonservice.getPokemonList().subscribe(pokemonList => this.pokemonList=pokemonList);
  }
  selectionPokemon(pokemonId:number){
    const id = +pokemonId
    this.router.navigate(['/pokemon',id])
  }
}
