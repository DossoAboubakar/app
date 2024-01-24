import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../pokemon';
import { PokemonTypeColorPipe } from "../pokemon-type-color.pipe";
import { CommonModule } from '@angular/common';
import { PokemonServiceService } from '../../pokemon-service.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-detail-pokemon',
    standalone: true,
    templateUrl: './detail-pokemon.component.html',
    styleUrl: './detail-pokemon.component.css',
    imports: [PokemonTypeColorPipe,CommonModule,HttpClientModule],
    providers:[PokemonServiceService,HttpClientModule]
})
export class DetailPokemonComponent implements OnInit {

  pokemonList:Pokemon[];
  pokemon:Pokemon|undefined
  //pourquoi  j'ai ete obliger de definir privaate sur route
 // quel est alors la difference entre undifined et null
 //vue que ici le pokemonId peut avoir plusieurs ( undefined ou string  dans notre cas) alors il faut faire une disjonction avec if{}
/*constructor(private route: ActivatedRoute,private router:Router,private pokemonservcie: PokemonServiceService){
}*/
constructor(private route:ActivatedRoute,private router:Router,private pokemonservice:PokemonServiceService){
}
ngOnInit(){
  const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
console.log('pokemonId', pokemonId);

if (pokemonId) {
  /*this.pokemonservice.getPokemonList()
    .subscribe((pokemonList) => {
      this.pokemon = pokemonList.find(pokemon => pokemon.id === +pokemonId);
    });*/
   const pokemonList= this.pokemonservice.ListDePokemon()
   this.pokemon =  pokemonList.find(pokemon=> pokemon.id==+pokemonId)
}

}
goBack() {
  this.router.navigate(['/pokemons']);
  }
  goToEditPokemon(pokemon:Pokemon){
    const id = +pokemon.id
this.router.navigate(['/edit/pokemon',id])
  }
}
