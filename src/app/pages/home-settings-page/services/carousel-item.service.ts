import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarouselItem} from '../models/carousel-item';

@Injectable({
  providedIn: 'root'
})
export class CarouselItemService {

  constructor(private http: HttpClient) {}

  getCarouselItems(apiUrl: string): Observable<CarouselItem[]> {
    return this.http.get<CarouselItem[]>( apiUrl + '/home/carousel-items');
  }

  updateCarouselById(apiUrl: string, id: number, carouselItem: CarouselItem) {
    return this.http.put<CarouselItem[]>( apiUrl + '/home/carousel-items/' + id, carouselItem);
  }

  saveNewCarousel(apiUrl: string, carouselItem: CarouselItem) {
    return this.http.post<CarouselItem[]>( apiUrl + '/home/carousel-items', carouselItem);
  }

  deleteCarouselById(apiUrl: string, id: number) {
    return this.http.delete( apiUrl + '/home/carousel-items/' + id);
  }
}
