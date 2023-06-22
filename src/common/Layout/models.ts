export interface User {
    name?: string;
    city: string;
  }
  
  export interface SidebarProps {
    user?: User;
  }
  
  export interface HeaderProps {
    user?: User;
    isSignedIn: boolean;
    itemsInBasket: number;
  }
  