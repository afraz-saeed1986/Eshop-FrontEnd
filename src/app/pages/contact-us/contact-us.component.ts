import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {


  confirm(data: any){
    console.log(data);
  }

  cancel(data: any){
    console.log(data);
  }
}
