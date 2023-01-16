export class Product{
  constructor(
    public id: number,
    public createDate: Date,
    public productName: string,
    public price: number,
    public shortDescription: string,
    public description: string,
    public imageName: string,
    public isExists: boolean,
    public isSpecial: boolean
  ){}
}
