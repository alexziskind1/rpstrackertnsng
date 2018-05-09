import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app.module';
// import { setAppEvents } from './globals/app-events';

// setAppEvents();

global.__assign = Object.assign;

platformNativeScriptDynamic().bootstrapModule(AppModule);
