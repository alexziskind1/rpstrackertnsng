import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import * as app from 'application';
import { AppModule } from './app.module';

app.on(app.uncaughtErrorEvent, (args) => {
    console.error('appliocation error');
});

platformNativeScriptDynamic().bootstrapModule(AppModule);
