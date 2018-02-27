import 'reflect-metadata';

import { Store } from '../../core/state/app-store';


describe('Make sure store works', () => {
    it('must work', () => {
        const store = new Store();
        store.set('selectedPreset', 'open');
        expect(store.value.selectedPreset).toBe('open');
    });
});
