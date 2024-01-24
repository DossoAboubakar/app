import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonServiceService } from '../pokemon-service.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PokemonServiceService]
})
export class PokemonModule { }
