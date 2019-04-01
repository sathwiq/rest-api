export interface Order {
    _id:number;
  userId: number;
  status: string;
  tNo: number;
  items: [{
      title: string;
      price: number;
      no:number
    }];
    totalPrice: number;
}
