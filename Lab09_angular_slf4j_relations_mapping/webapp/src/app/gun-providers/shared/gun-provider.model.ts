export class GunProvider {
  id: number;
  name: string;
  speciality: string;
  reputation: number;

  constructor(name: string, speciality: string, reputation: number) {
    this.name = name;
    this.speciality = speciality;
    this.reputation = reputation;
  }
}
