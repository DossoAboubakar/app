import { Component,OnInit,Input } from '@angular/core';
import { PokemonServiceService } from '../pokemon-service.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from "../pokemon/pokemon-type-color.pipe";
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../pokemon/loader/loader.component";

@Component({
    selector: 'app-pokemon-form',
    standalone: true,
    templateUrl: './pokemon-form.component.html',
    styleUrls: ['./pokemon-form.component.css'],
    imports: [FormsModule, PokemonTypeColorPipe, CommonModule, LoaderComponent]
})
export class PokemonFormComponent implements OnInit {
  
  @Input() pokemon: Pokemon;
  types: string []
  constructor (private pokemonService: PokemonServiceService , private router: Router){
  }
ngOnInit(){
this.types = this.pokemonService.getPokemonTypeList();
}

  hasType(type:string) :boolean {
   return this.pokemon?.types.includes(type);
  }
  selectType($event :Event ,type: string){
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      this.pokemon.types.push(type);
    }else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index,1)
    }
  }
  isTypeValid(type: string): boolean {
    if (this.pokemon.types.length ==1 && this.hasType(type)){
      return false
    }
    if (this.pokemon.types.length > 2 && !this.hasType(type)){
      return false
    }
    return true
}
  onSubmit(){
    console.log('Submit form !');
    this.router.navigate(['/pokemon',this.pokemon.id])
  }
}
