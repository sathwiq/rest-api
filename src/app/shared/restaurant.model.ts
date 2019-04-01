export interface Restaurant {
    name: string;
    _id: string;
    items: 
    [
        {
            _id:string
            name:string;
            position:number;
            img:string;
            desc : string;
            price:number
        }
    ];
  }
  