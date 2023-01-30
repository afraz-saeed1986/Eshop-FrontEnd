import { ImagePath } from './../../utilities/pathTools';
import { Product } from './../../DTOs/Products/Product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
@Input() product!: Product;
imagePath = ImagePath;
productName!: string;

ngOnInit(): void{
  this.productName = this.product.productName.replace(/\s/g,'-');
}
}
