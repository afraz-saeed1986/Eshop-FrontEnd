import { Product } from './../../DTOs/Products/Product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
@Input() product!: Product;
}
