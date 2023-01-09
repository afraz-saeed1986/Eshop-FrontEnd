import { HomeSliderResponse } from './../DTOs/Sliders/HomeSliderResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Slider } from '../DTOs/Sliders/Slider';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private homeSliders: BehaviorSubject<Slider[]> = new BehaviorSubject<Slider[]>([]);

  constructor(private http: HttpClient) { }

  public getSliders(): Observable<HomeSliderResponse>{
     return this.http.get<HomeSliderResponse>('/slider/GetActiveSliders');
  }

  public getCurrentSliders() : Observable<Slider[]> {
    return this.homeSliders;
  }

  public setCurrentSliders(sliders: Slider[]){
    this.homeSliders.next(sliders);
  }
}
