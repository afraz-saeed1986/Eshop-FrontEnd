export class ProductCategory {
  constructor(
    public id: number,
    public createDate: Date,
    public isDelete: boolean,
    public lastUpDate: Date,
    public parentId: number,
    public title: string,
    public urlTitle: string
  ) {}
}
