import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {

    constructor(
        translate: TranslateService,
        fonticon: TNSFontIconService
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
