import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  useSubscription: Subscription;
  userId: string;
  
  constructor(private orderService: OrderService, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.useSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.useSubscription.unsubscribe();
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
