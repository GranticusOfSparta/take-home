import { environment } from './../../environments/environment.prod';
import { TestBed } from '@angular/core/testing';

import { GameSearchService } from './game-search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameDealsFactory } from '../testing/factories/game-deals';
describe('GameSearchService', () => {
  let service: GameSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GameSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get a list of games with an upper price limit", (finish) => {
    const upperPrice = "15";
    const gameDeals = GameDealsFactory.createGameDeals();
    service.getGameDeals(upperPrice).subscribe(returnedDeals => {
      expect(returnedDeals.length).toBe(gameDeals.length);
      expect(returnedDeals).toEqual(gameDeals);
      finish();
    })
    const req = httpMock.expectOne(`${environment.baseURL}/deals?storeID=1&upperPrice=${upperPrice}`);
    expect(req.request.method).toBe("GET");
    req.flush(gameDeals);
  })
});
