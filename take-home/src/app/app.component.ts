import { GameDeal } from './models/deals';
import { GameSearchService } from './services/game-search.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  currentGameDeals: GameDeal[] = [];
  title = 'take-home';

  private readonly initialSearchPrice = 15;

  constructor(private gameSearchService: GameSearchService) { }
  ngOnInit() {
    this.getGameDeals(this.initialSearchPrice);
  }

  private getGameDeals(searchPrice: number) {
    this.gameSearchService.getGameDeals(searchPrice).pipe(take(1), tap((gameDeals) => { this.currentGameDeals = gameDeals; })).subscribe();
  }

  ngOnDestroy() {

  }
}
