import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class PtMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        console.log('missing translation');
        return 'some value';
    }
}
