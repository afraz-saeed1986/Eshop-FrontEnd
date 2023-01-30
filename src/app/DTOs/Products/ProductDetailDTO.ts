import { ProductGalley } from './ProductGalley';
import { Product } from './Product';
export class ProductDetailDTO{
  constructor(
    public product: Product,
    public galleries: ProductGalley[]
  ){}
}
