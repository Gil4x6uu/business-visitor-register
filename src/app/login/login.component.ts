
import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { SocialloginService } from '../social-sign-in.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StoreOwner } from '../models/storeOwner';
import { Store } from '../models/store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  response;
  storeOwner = new StoreOwner();
  store = new Store();
  
  constructor(
    public OAuth: AuthService,
    private SocialloginService: SocialloginService,
    private router: Router
  ) { }
  
  ngOnInit() {

  }
  
  
  public socialSignIn(socialProvider: string) {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
      console.log(socialProvider, socialusers);
      this.Savesresponse(socialusers);
    });
  }
  
  Savesresponse(storeOwner: SocialUser) {
    this.SocialloginService.Savesresponse(storeOwner).subscribe((res: any) => {
      
      console.log('result return from server: '+ res);
      this.storeOwner = res[0];
      this.store = res[1];
      localStorage.setItem('storeOwner', JSON.stringify(this.storeOwner));
      localStorage.setItem('store', JSON.stringify(this.store));
      this.router.navigate([`dashboard`]);
    })
  }
}