export interface ILoginUserAccount{
  status: string;
  data: {
    token: string,
    expireTime: number,
    firstName: string,
    lastName: string,
    userId: number,
    address: string,
    message: string
  };
}
