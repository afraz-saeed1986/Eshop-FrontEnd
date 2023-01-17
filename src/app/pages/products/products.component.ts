import { ProductOrderBy } from './../../DTOs/Products/ProductOrderBy';
import { ProductCategory } from './../../DTOs/Products/ProductCategory';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductsDTO } from './../../DTOs/Products/FilterProductsDTO';
import { ProductsService } from './../../services/Products.service';
import { Component, OnInit } from '@angular/core';
declare function jqUiSlider():any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  filterProducts: FilterProductsDTO = new FilterProductsDTO(
    '', 0, 0, 1, 0, 0, 0, 5, 0, 1, null! , [], []
  );
  isLoading = true;
  pages: number[] = [];
  categories : ProductCategory[] = [];


  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if(params['pageId'] !== undefined){
        pageId = parseInt(params['pageId'], 0);
      }

      this.filterProducts.categories = params['categories'] ? params['categories'] : [];
      console.log(this.filterProducts.categories);

      this.filterProducts.pageId = pageId;
      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if(res.status === 'Success'){
        this.categories = res.data;
            }
    });

    jqUiSlider();
  }

  setPage(page: number){
    this.router.navigate(['products'], {queryParams: {pageId: page, categories: this.filterProducts.categories}});
  }

  getProducts() {
    this.productsService.getFilteredProducts(this.filterProducts).subscribe(res=>{
      this.filterProducts = res.data;
      if(res.data.title === null){
        this.filterProducts.title = '';
      }
      this.isLoading = false;
      this.pages = [];
      if(res.data.categories === null){
        this.filterProducts.categories = [];
      }

      for(let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++){
        this.pages.push(i);
      }
    });
  }

  filterCategories(event: any){
    const value = parseInt(event.target.value,0);

    if(this.filterProducts.categories === undefined || this.filterProducts.categories === null){
      this.filterProducts.categories = [];
    }
    if(event.target.checked){
      this.filterProducts.categories.push(value);
      this.setCategoriesFilter();
    } else {
      // let index = this.filterProducts.categories.findIndex(c => c === value);
      // this.filterProducts.categories.splice(index,1);
      this.filterProducts.categories = this.filterProducts.categories.filter(c => c !== value);
      this.setCategoriesFilter();
    }

    console.log(this.filterProducts.categories);
  }

  setCategoriesFilter(){
    if(this.filterProducts.categories.length > 0){
      this.router.navigate(['products'], {queryParams: {categories: this.filterProducts.categories}});
    } else {
      this.router.navigate(['products']);

    }
  }

  changeOrder(event: any){
    //console.log(event)
    console.log(this.filterProducts);
    this.getProducts();

    switch(event.target.value){
      case ProductOrderBy.PriceAsc.toString():
        this.router.navigate(['products'], {queryParams: {pageId: this.filterProducts.activePage, categories: this.filterProducts.categories, orderBy: 'priceAsc'}});
        break;
        case ProductOrderBy.PriceDes.toString():
          this.router.navigate(['products'], {queryParams: {pageId: this.filterProducts.activePage, categories: this.filterProducts.categories, orderBy: 'priceDes'}});
          break;
    }

  }

}
