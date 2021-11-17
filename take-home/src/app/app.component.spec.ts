import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { GameDeal } from './models/deals';
import { GameDealsFactory } from './testing/factories/game-deals';
import { GameSearchService } from './services/game-search.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockModule } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('AppComponent', () => {
  let gameSearchService: jasmine.SpyObj<GameSearchService>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let getGameDealsReturn: GameDeal[];

  beforeEach(async () => {
    getGameDealsReturn = GameDealsFactory.createGameDeals();
    gameSearchService = jasmine.createSpyObj("GameSearchService", { getGameDeals: of(getGameDealsReturn) })
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(MatIconModule),
        MockModule(AgGridModule),
        MockModule(MatToolbarModule),
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [{ provide: GameSearchService, useValue: gameSearchService }],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'take-home'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('take-home');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#app-title'));
    expect(fixture.debugElement.query(By.css('#app-title')).nativeElement.innerHTML).toContain('Game It Up');
  });

  it("should search for gamedeals on startup", fakeAsync(() => {
    fixture.detectChanges();
    tick(1000);
    flush();
    fixture.detectChanges();
    expect(component.currentGameDeals).toBe(getGameDealsReturn);
    const agGrid = fixture.debugElement.query(By.css(".ag-grid-main")).componentInstance;
    expect(agGrid.columnDefs).toEqual(component.columnDefs);
    expect(agGrid.rowData).toEqual(getGameDealsReturn);
  }))

  // it("should call getGameDeals on sale price change", () => {
  //   fixture.detectChanges();
  //  fixture.debugElement.query(By.css('#search-by-price-input'))
  // })
});
