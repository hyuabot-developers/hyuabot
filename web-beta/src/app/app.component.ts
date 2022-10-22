import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import FontFaceObserver from 'fontfaceobserver';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService, private renderer: Renderer2) {
    translate.setDefaultLang(localStorage.getItem('language') || 'ko');
    translate.use(localStorage.getItem('language') || 'ko');

    if (localStorage.getItem('app-theme') === 'dark') {
      this.renderer.setAttribute(document.body, 'app-theme', 'dark');
    }
    const fontFaceObserver = new FontFaceObserver('Godo');
    fontFaceObserver.load().then(() => {
      document.documentElement.classList.add('font-loaded');
    });
  }
}
