import { Component, Renderer2 } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-card',
  templateUrl: 'menu.card.html',
  styleUrls: ['menu.card.scss']
})
export class MenuCardComponent {
  darkModeToggleChecked: boolean = localStorage.getItem('app-theme') === 'dark';
  constructor(
    private renderer: Renderer2,
    private translateService: TranslateService,
    private actionSheetController: ActionSheetController) {

  }
  async openLanguageSettings(event: Event) {
    const languageActionSheet = await this.actionSheetController.create({
      cssClass: 'setting-action-sheet',
      header: this.translateService.instant('menu.language.header'),
      buttons: [
        {
          text: this.translateService.instant('menu.language.korean'),
          handler: () => {
            this.translateService.use('ko');
            localStorage.setItem('language', 'ko');
          }
        },
        {
          text: this.translateService.instant('menu.language.english'),
          handler: () => {
            this.translateService.use('en');
            localStorage.setItem('language', 'en');
          }
        },
        {
          text: this.translateService.instant('menu.cancel'),
          role: 'cancel',
        }
      ]
    });
    await languageActionSheet.present();
  }

  onToggleTheme(event) {
    if (event.detail.checked) {
      this.renderer.setAttribute(document.body, 'app-theme', 'dark');
      localStorage.setItem('app-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'app-theme', 'light');
      localStorage.setItem('app-theme', 'light');
    }
  }
  openAppInformationDialog(event: Event) {
    console.log('openAppInformationDialog');
  }
}
