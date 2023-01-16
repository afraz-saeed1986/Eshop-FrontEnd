import { FilterProductsDTO } from './../../DTOs/Products/FilterProductsDTO';
import { ProductsService } from './../../services/Products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterProducts: FilterProductsDTO = null!;
  isLoading = true;
  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
    this.productsService.getFilteredProducts().subscribe(res=>{
      this.filterProducts = res.data;
      this.isLoading = false;
    })
  }

}
