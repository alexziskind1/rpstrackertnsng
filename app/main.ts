import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import * as app from 'application';
import { AppModule } from './app.module';
import { setAppEvents } from './globals/app-events';

setAppEvents();

platformNativeScriptDynamic().bootstrapModule(AppModule);
