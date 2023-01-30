import { environment } from '../../environment/environment'

export const DomainName = environment.production ? 'https://toplearn.com' : 'https://localhost:7043';
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/'
