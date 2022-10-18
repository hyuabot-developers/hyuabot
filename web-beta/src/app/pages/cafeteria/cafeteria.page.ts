import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CafeteriaQuery, CafeteriaService } from './cafeteria.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

const GET_CAFETERIA_MENU = gql`
  query GetCafeteriaMenu($campusID: Int!) {
    cafeteria(campusId: $campusID) {
      cafeteriaId, cafeteriaName, menu {
        timeType, menu, price
      }
    }
  }
`;

@Component({
  selector: 'app-cafeteria',
  templateUrl: 'cafeteria.page.html',
  styleUrls: ['cafeteria.page.scss']
})
export class CafeteriaPage implements OnInit {
  private swiper: any;
  private cafeteriaMenuQuery: QueryRef<CafeteriaQuery>;
  private cafeteriaMenuSubscription: Subscription;
  private cafeteriaIDList: string[] = ['student', 'faculty', 'food-court', 'foundation', 'dormitory'];
  constructor(
    private apollo: Apollo,
    private cafeteriaService: CafeteriaService,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {}
  ngOnInit() {
    this.cafeteriaMenuQuery = this.apollo.watchQuery<CafeteriaQuery>({
      query: GET_CAFETERIA_MENU, variables: { campusID: 1 }
    })
    this.cafeteriaMenuSubscription = this.cafeteriaMenuQuery.valueChanges.subscribe(({ data, loading }) => {
      this.cafeteriaService.setMenuList(data.cafeteria);
    });
    if (localStorage.getItem('bookmark.cafeteria.index')) {
      this.showFavoriteCafeteriaToast(parseInt(localStorage.getItem('bookmark.cafeteria.index'))).then();
    }
  }

  setSwiperInstance(swiper: any) {
    this.swiper = swiper;
    if (localStorage.getItem('bookmark.cafeteria.index')) {
      this.swiper.slideTo(parseInt(localStorage.getItem('bookmark.cafeteria.index')));
    }
  }
  async showFavoriteCafeteriaToast(cafeteriaIndex: number) {
    const toast = await this.toastController.create({
      message: this.translateService.instant(
        'cafeteria.favorite', {name: this.translateService.instant('cafeteria.name.' + this.cafeteriaIDList[cafeteriaIndex])}),
      buttons: [
        { text: this.translateService.instant('OK'), role: 'cancel' }
      ],
      cssClass: 'toast-favorite-cafeteria',
      duration: 1500
    });
    await toast.present();
  }
}
