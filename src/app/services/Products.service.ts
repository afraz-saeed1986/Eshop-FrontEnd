import { ProductDetailDTO } from './../DTOs/Products/ProductDetailDTO';
import { ProductCategory } from './../DTOs/Products/ProductCategory';
import { FilterProductsDTO } from './../DTOs/Products/FilterProductsDTO';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { Product } from './../DTOs/Products/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{
  constructor(private http: HttpClient){}

  getFilteredProducts(filter: FilterProductsDTO):Observable<IResponseResult<FilterProductsDTO>>{
    let params;
    if(filter !== null){

      params = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('title', filter.title)
        .set('startPrice', filter.startPrice.toString())
        .set('endPrice', filter.endPrice.toString())
        .set('takeEntity', filter.takeEntity.toString());

        for(const category of filter.categories){
          params = params.append('categories' , category.toString());
        }

        if(filter.orderBy !== null){
          params = params.append('orderBy' , filter.orderBy.toString());
        }
    }

    return this.http.get<IResponseResult<FilterProductsDTO>>('/product/filter-products', {params});
  }


  getProductActiveCategories():Observable<IResponseResult<ProductCategory[]>>{
    return this.http.get<IResponseResult<ProductCategory[]>>('/product/product-active-categories');
  }

  getSingleProduct(productId: number): Observable<IResponseResult<ProductDetailDTO>>{
    return this.http.get<IResponseResult<ProductDetailDTO>>('/product/single-product/' + productId);
  }

  getRelatedProducts(productId: number):Observable<IResponseResult<Product[]>> {
    return this.http.get<IResponseResult<Product[]>>('/product/related-products/' + productId);
  }
}
