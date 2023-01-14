import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activated-account',
  templateUrl: './activated-account.component.html',
  styleUrls: ['./activated-account.component.scss']
})
export class ActivatedAccountComponent implements OnInit{

  isLoading: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.
    activateUser(this.activatedRoute.snapshot.params['activeCode']).subscribe(res=>{
      if(res.status === 'Success'){
        this.isLoading = false;
        this.router.navigate(['login']);
      }
    });
  }

}
