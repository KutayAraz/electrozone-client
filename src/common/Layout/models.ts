export interface User {
    name?: string;
    city: string;
  }
  
  export interface HeaderProps {
    user?: User;
    isSignedIn: boolean;
    itemsInBasket: number;
  }
  