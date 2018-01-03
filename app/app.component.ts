import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { device } from 'platform';
import { Page } from 'ui/page';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {

    constructor(
        private page: Page,
        private translateService: TranslateService,
        fonticon: TNSFontIconService
    ) {
        // page.actionBarHidden = true;
        page.backgroundSpanUnderStatusBar = true;

        translateService.setDefaultLang('en');
        translateService.use(device.language);
    }
}
