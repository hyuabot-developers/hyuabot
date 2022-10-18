import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShuttleTimetableItem } from '../shuttle/shuttle.service';

export interface CafeteriaQuery {
  cafeteria: CafeteriaItem[];
}

export interface CafeteriaItem {
  cafeteriaId: number;
  cafeteriaName: string;
  menu: MenuItem[];
}

export interface MenuItem {
  timeType: string;
  menu: string;
  price: string;
}

@Injectable()
export class CafeteriaService {
  menuList: BehaviorSubject<CafeteriaItem[]> = new BehaviorSubject<CafeteriaItem[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public setMenuList(menuList: CafeteriaItem[]) {
    this.menuList.next(menuList);
  }
  public setLoading(loading: boolean) {
    this.loading.next(loading);
  }
}

export const cafeteriaServiceInjectables: Array<any> = [
  CafeteriaService
];
