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
  columnDefs: ColDef[] = [
    {
      headerName: "Title", field: "title", sortable: true, resizable: true, pinned: true, lockPosition: true, filter: 'agTextColumnFilter'
    },
    {
      headerName: 'On Sale', field: 'isOnSale', sortable: true, resizable: true, valueFormatter: (params) => { return params.value === "1" ? "On Sale" : "Not On Sale" },
    },
    {
      headerName: 'Deal Rating', field: 'dealRating', sortable: true, resizable: true, filter: 'agNumberColumnFilter'
    },
    { headerName: 'Sale Price', field: 'salePrice', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Normal Price', field: 'normalPrice', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Meta Critic Score', field: 'metacriticScore', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
    { headerName: 'Steam Rating', field: 'steamRatingCount', sortable: true, resizable: true, filter: 'agNumberColumnFilter' },
  ];


  private readonly initialSearchPrice = 15;

  constructor(private gameSearchService: GameSearchService, private fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({ searchPrice: this.fb.control(`${this.initialSearchPrice}`) })
    this.watchSearchPrice();
  }

  private watchSearchPrice() {
    this.form.get("searchPrice")?.valueChanges.pipe(takeUntil(this.destroy$),
      startWith(`${this.initialSearchPrice}`),
      debounceTime(100),
      tap((searchPrice: string) => this.getGameDeals(parseInt(searchPrice))))
      .subscribe();
  }

  getGameDeals(searchPrice: number) {
    this.gameSearchService.getGameDeals(searchPrice).pipe(take(1), tap((gameDeals) => { this.currentGameDeals = gameDeals; })).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
