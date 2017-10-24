import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app.module';
import * as app from 'application';


app.on(app.uncaughtErrorEvent, (args) => {
    console.error('appliocation error');
});


platformNativeScriptDynamic().bootstrapModule(AppModule);
