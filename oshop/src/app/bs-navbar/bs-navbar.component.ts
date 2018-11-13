import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import {Observable} from 'rxjs/observable'

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth:AuthService, private shoppingCartService: ShoppingCartService) {
    
   }
   
   async ngOnInit(){
    this.auth.appuUser$.subscribe(appUser => this.appUser = appUser);  

    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart =>{
      
    });
   }

logout(){
  this.auth.logout();
}
}
