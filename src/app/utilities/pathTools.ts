import { environment } from '../../environment/environment'

export const DomainName = environment.production ? 'https://toplearn.com' : 'https://localhost:7043';
