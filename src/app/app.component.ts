import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PokemonTypeColorPipe } from "./pokemon/pokemon-type-color.pipe";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, PokemonTypeColorPipe]
})
export class AppComponent {
  
}

