import { AgGridModule } from 'ag-grid-angular';
import { GameDeal } from './models/deals';
import { GameDealsFactory } from './testing/factories/game-deals';
import { GameSearchService } from './services/game-search.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockModule } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
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
        MatToolbarModule,
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
    expect(fixture.debugElement.query(By.css('#app-title')).nativeElement.innerHTML).toContain('Game It Up Bro');
  });

  it("should search for gamedeals on startup", () => {
    fixture.detectChanges();
    expect(component.currentGameDeals).toBe(getGameDealsReturn);
  })
});
