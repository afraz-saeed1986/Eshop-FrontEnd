import { ProductGalley } from './../../DTOs/Products/ProductGalley';
import { Product } from './../../DTOs/Products/Product';
import { ImagePath, ImageGalleryPath } from './../../utilities/pathTools';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/Products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  imagePath = ImagePath;
  imageGalleryPath = ImageGalleryPath;
  product!: Product;
  galleries!: ProductGalley[];
  mainImage!: string;
  selectedImageId = 0;
  relatedProducts: Product[] = [];

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params['productId'];
      if(productId === undefined){
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if(res.status === 'NotFound'){
          this.router.navigate(['']);
        } else if(res.status === 'Success'){
          this.product = res.data.product;
          this.galleries = res.data.galleries;
          this.mainImage = ImagePath + this.product.imageName;
        }
      });
      this.productService.getRelatedProducts(productId).subscribe(result => {
        if(result.status === 'Success'){
          this.relatedProducts = result.data;
        }
      });
    });


  }

  selectImage(imageId: number){
    this.selectedImageId = imageId;
    if(imageId != 0){
      const gallery = this.galleries.filter(g => g.id === imageId)[0];
      this.mainImage = ImageGalleryPath + gallery.imageName;
    } else {
      this.mainImage = ImagePath + this.product.imageName;
    }

  }


}
