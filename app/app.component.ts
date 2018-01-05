import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

import * as application from 'application';
import { device, isIOS } from 'platform';
import { Page } from 'ui/page';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {

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

    public ngOnInit() {
        if (isIOS && application.ios.window.safeAreaInsets) {
            const topSafeArea: number = application.ios.window.safeAreaInsets.top;
            const bottomSafeArea: number = application.ios.window.safeAreaInsets.bottom;

            if (topSafeArea > 0) {
                application.addCss(`
                  .top-safe-nav { padding-top: ${topSafeArea} !important }
                  .top-safe-full-screen-margin { margin-top: -${topSafeArea} !important }
              `);
            } else {
                application.addCss(`
                  .top-safe-full-screen-margin { margin-top: -20 !important }
              `);
            }

            if (bottomSafeArea > 0) {
                application.addCss(`
                  .bottom-safe-nav { padding-bottom: ${bottomSafeArea} !important }
              `);
            }
        }
    }
}
