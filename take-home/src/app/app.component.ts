import { MAIN_GRID_COL_DEFS } from './col-defs';
import { ColDef } from 'ag-grid-community';
import { GameDealsFactory } from './testing/factories/game-deals';
import { GameDeal } from './models/deals';
import { GameSearchService } from './services/game-search.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, startWith, take, takeUntil, tap } from 'rxjs/operators'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  currentGameDeals: GameDeal[] = [];
  title = 'take-home';
  form!: FormGroup;
  columnDefs: ColDef[] = MAIN_GRID_COL_DEFS;


  private readonly initialmaxSalePrice = 15;

  constructor(private gameSearchService: GameSearchService, private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({ maxSalePrice: this.fb.control(`${this.initialmaxSalePrice}`) })
    this.watchmaxSalePrice();
  }

  private watchmaxSalePrice() {
    this.form.get("maxSalePrice")?.valueChanges.pipe(takeUntil(this.destroy$),
      startWith(`${this.initialmaxSalePrice}`),
      debounceTime(100),
      tap((maxSalePrice: string) => this.getGameDeals(parseInt(maxSalePrice))))
      .subscribe();
  }

  getGameDeals(maxSalePrice: number) {
    this.gameSearchService.getGameDeals(maxSalePrice).pipe(take(1), tap((gameDeals) => { this.currentGameDeals = gameDeals; })).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
