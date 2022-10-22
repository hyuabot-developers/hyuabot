import { Component, Input } from '@angular/core';
import { CafeteriaService, MenuItem } from '../../pages/cafeteria/cafeteria.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cafeteria-card',
  templateUrl: 'cafeteria.card.html',
  styleUrls: ['cafeteria.card.scss']
})
export class CafeteriaCardComponent {
  @Input() cafeteriaName: string;
  @Input() cafeteriaIndex: number;
  breakfastMenuList: MenuItem[] = [];
  lunchMenuList: MenuItem[] = [];
  dinnerMenuList: MenuItem[] = [];
  lunchAndDinnerMenuList: MenuItem[] = [];
  constructor(private cafeteriaService: CafeteriaService, private translateService: TranslateService) {
    this.cafeteriaService.menuList.subscribe(menuList => {
      let cafeteriaItem = menuList.find(item => item.cafeteriaName === this.getCafeteriaName());
      if (cafeteriaItem) {
        this.breakfastMenuList = cafeteriaItem.menu.filter(item => item.timeType === '조식');
        this.lunchMenuList = cafeteriaItem.menu.filter(item => item.timeType === '중식');
        this.dinnerMenuList = cafeteriaItem.menu.filter(item => item.timeType === '석식');
        this.lunchAndDinnerMenuList = cafeteriaItem.menu.filter(item => item.timeType === '중식/석식');
      }
    });
  }
  isBookmarked() {
    return localStorage.getItem('bookmark.cafeteria.index') === this.cafeteriaIndex.toString();
  }
  addBookmark() {
    console.log('addBookmark');
    localStorage.setItem('bookmark.cafeteria.index', this.cafeteriaIndex.toString());
  }
  removeBookmark() {
    localStorage.removeItem('bookmark.cafeteria.index');
  }
  getCafeteriaName(): string {
    switch (this.cafeteriaName) {
      case 'student':
        return '학생식당'
      case 'faculty':
        return '교직원식당'
      case 'dormitory':
        return '창의인재원식당'
      case 'food-court':
        return '푸드코트'
      case 'foundation':
        return '창업보육센터'
    }
  }
}
