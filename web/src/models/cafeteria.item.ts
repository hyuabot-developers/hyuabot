export interface CafeteriaItem {
  name: string;
  workingTime: Date;
  menuList: {[key: string]: MenuItem[]};
}

export interface MenuItem {
  menu: string;
  price: number;
}
