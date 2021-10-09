import {GunProvider} from '../../gun-providers/shared/gun-provider.model';

export class GunType {
  id: number;
  name: string;
  category: string;
  gunProvider: GunProvider;

  constructor(name: string, category: string, gunProvider: GunProvider) {
    this.name = name;
    this.category = category;
    this.gunProvider = gunProvider;
  }

}
