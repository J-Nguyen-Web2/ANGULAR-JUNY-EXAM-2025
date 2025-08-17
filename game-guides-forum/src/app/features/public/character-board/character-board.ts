import { Component } from '@angular/core';

@Component({
  selector: 'app-character-board',
  imports: [],
  templateUrl: './character-board.html',
  styleUrl: './character-board.css'
})
export class CharacterBoard {
  characters = [
    {
      name: 'Archon',
      element: 'Pyro',
      weapon: 'Claymore',
      image: 'https://i.pinimg.com/736x/57/d1/e7/57d1e7af07d4fe2275f42aafa2eff149.jpg'
    },
    {
      name: 'Venti',
      element: 'Anemo',
      weapon: 'Bow',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmahtg7Xv1E3H1jskzcykrhFIo_hEvMXkrSQ&s'
    },
    {
      name: 'Qiqi',
      element: 'Cryo',
      weapon: 'Sword',
      image: 'https://i.redd.it/happy-birthday-qiqi-v0-wlln6d8am1mc1.jpg?width=2500&format=pjpg&auto=webp&s=c0ac45ef32eccc1d114039051f0fd4d7ea0676b2'
    },
    // Add more characters later
  ];
}
