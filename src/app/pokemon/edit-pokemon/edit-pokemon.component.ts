import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonServiceService } from '../../pokemon-service.service';
import { Pokemon } from '../../pokemon';
import { PokemonFormComponent } from '../../pokemon-form/pokemon-form.component';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [PokemonFormComponent,CommonModule,HttpClientModule],
  providers:[PokemonServiceService,HttpClientModule],
  template: `<h2 class="center">Editer {{pokemon?.name}}</h2>
  <p *ngIf="pokemon" class= "center">
    <img [src]="pokemon.picture">
</p>
<app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>` ,
  styleUrl: './edit-pokemon.component.css'
})
export class EditPokemonComponent implements OnInit{
pokemon : Pokemon | undefined ;
constructor ( 
  private route : ActivatedRoute,
  private pokemonService: PokemonServiceService
  ){
 
}
ngOnInit(): void {
  HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 0 });
  const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
  if(pokemonId){
    /*this.pokemonService.getPokemonById(+pokemonId)
    .subscribe(pokemon => this.pokemon=pokemon)*/
    const pokemonList= this.pokemonService.ListDePokemon()
   this.pokemon =  pokemonList.find(pokemon=> pokemon.id==+pokemonId)
  }
  else {
    this.pokemon = undefined;
  }
}
}

