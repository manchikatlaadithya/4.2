import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Player {
  id: string;
  name: string;
  position: string;
  touchdownPasses: number; 
  rushingYards: number;
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  queryType: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers() {
    this.http.get<Player[]>('http://localhost:8080/players')
      .subscribe((players) => {
        this.players = players;
      });
  }

  deletePlayer(playerId: string) {
    this.http.delete(`http://localhost:8080/players/${playerId}`)
      .subscribe(() => {
        this.getPlayers(); // Refresh the player after running server
      });
  }

  performQuery() {
    if (this.queryType === 'mostTouchdownPasses') {
      this.http.get<Player[]>('http://localhost:8080/players/query?type=mostTouchdownPasses')
        .subscribe((players) => {
          console.log('Players with most touchdown passes:', players);
        });
    } else if (this.queryType === 'mostRushingYards') {
      this.http.get<Player[]>('http://localhost:8080/players/query?type=mostRushingYards')
        .subscribe((players) => {
          console.log('Players with most rushing yards:', players);
        });
    } else {
      console.error('Invalid query type.');
    }
  }
}
