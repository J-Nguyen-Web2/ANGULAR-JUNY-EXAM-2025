import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Footer } from "./shared/components/footer/footer";
import { NotFound } from "./shared/components/not-found/not-found";
import { Lore } from "./features/public/lore/lore";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'game-guides-forum';
}
