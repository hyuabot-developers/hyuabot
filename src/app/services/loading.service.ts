import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(public loadingController: LoadingController, private translateService: TranslateService) {}
  async present(loadingID: string, loadingMessage: string) {
    const loading = await this.loadingController.create({
      id: loadingID,
      message: this.translateService.instant(loadingMessage),
      spinner: 'crescent'
    });
    await loading.present();
  }
  async dismiss(loadingID: string) {
    await this.loadingController.dismiss(null, null, loadingID);
  }
}
