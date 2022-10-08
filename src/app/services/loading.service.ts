import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(public loadingController: LoadingController) {}
  async present(loadingID: string, loadingMessage: string) {
    const loading = await this.loadingController.create({
      id: loadingID,
      message: loadingMessage,
      spinner: 'crescent'
    });
    await loading.present();
  }
  async dismiss(loadingID: string) {
    await this.loadingController.dismiss(null, null, loadingID);
  }
}
