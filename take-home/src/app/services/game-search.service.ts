import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDeal } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GameSearchService {
  private baseURL = environment.baseURL;
  constructor(private http: HttpClient) {

  }

  getGameDeals(upperPrice: number): Observable<GameDeal[]> {
    return this.http.get<GameDeal[]>(`${this.baseURL}/deals?storeID=1&upperPrice=${upperPrice}`)
  }
}
