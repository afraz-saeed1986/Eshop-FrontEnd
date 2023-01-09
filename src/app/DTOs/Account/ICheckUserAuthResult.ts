export interface ICheckUserAuthResult{
  status: string;
  data: {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    address: string
  };
}
