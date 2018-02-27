import "reflect-metadata";

import { Store } from '../../core/state/app-store';


describe('Make sure store works', () => {
    it('must work', () => {
        const store = new Store();
        store.set('selectedPreset', 'open');
        expect(store.value.selectedPreset).toBe('open');

    });

    it('must work2', () => {
        const store = new Store();
        store.set('selectedPreset', 'open');
        expect(store.value.selectedPreset).toBe('open');

    });
});


describe('Make sure store works 2', () => {
    it('must work', () => {
        const store = new Store();
        store.set('selectedPreset', 'open');
        expect(store.value.selectedPreset).toBe('open');

    });

    it('must work2', () => {
        const store = new Store();
        store.set('selectedPreset', 'open');
        expect(store.value.selectedPreset).toBe('open');

        store.set('selectedPreset', 'doodoo');
        expect(store.value.selectedPreset).toBe('open');
    });
});
