import { DomainName } from './../../../utilities/pathTools';
import { SliderService } from './../../../services/slider.service';
import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/DTOs/Sliders/Slider';
declare function homeSlider(): any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  public sliders: Slider[] = [];
  public domain: string = DomainName;

  constructor(private SliderService: SliderService) {}

  ngOnInit(): void {
    this.SliderService.getCurrentSliders().subscribe((sliders) => {
      if (sliders.length == 0) {
        this.SliderService.getSliders().subscribe((res) => {
          if(res.status === 'Success'){
            this.SliderService.setCurrentSliders(res.data);
          }
        });
      } else {
        this.sliders = sliders;

        setInterval(() => {
          homeSlider();
        },400);
      }

    });
  }
}
