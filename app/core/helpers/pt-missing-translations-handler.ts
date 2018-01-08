import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class PtMissingTranslationHandler implements MissingTranslationHandler {
    handle(_params: MissingTranslationHandlerParams) {
        return 'missing translation';
    }
}
