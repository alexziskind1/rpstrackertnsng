import { PtListDisplayItem } from './pt-list-display-item.model';
import {
    PT_ITEM_TYPE_PBI,
    PT_ITEM_TYPE_BUG,
    PT_ITEM_TYPE_CHORE,
    PT_ITEM_TYPE_IMPEDIMENT
}
    from '../../../core/constants';
import { DictType } from '../../../core/types';
import { PtItemType } from '../../../core/models/domain/types';



export class PtItemTypeImpl implements PtListDisplayItem {

    public key: string;
    public label: string;

    public get imageUrl() {
        return this.getImage();
    }

    public get indicatorClass() {
        return this.getIndicatorClass();
    }

    constructor(
        private title: PtItemType
    ) {
        this.key = title;
        this.label = title;
        this.type = title;
    }

    public type: PtItemType;
    public imdicatorClass: string;
    public imgUrl: string;

    public getIndicatorClass() {
        return PtItemTypeImpl.getIndicatorClass(this.type);
    }

    public getImage() {
        return PtItemTypeImpl.getImage(this.type);
    }

    public static get pbi(): PtItemTypeImpl {
        return new PtItemTypeImpl(PT_ITEM_TYPE_PBI);
    }
    public static get bug(): PtItemTypeImpl {
        return new PtItemTypeImpl(PT_ITEM_TYPE_BUG);
    }
    public static get chore(): PtItemTypeImpl {
        return new PtItemTypeImpl(PT_ITEM_TYPE_CHORE);
    }
    public static get impediment(): PtItemTypeImpl {
        return new PtItemTypeImpl(PT_ITEM_TYPE_IMPEDIMENT);
    }

    public static getIndicatorClass(type: PtItemType): string {
        switch (type) {
            case PT_ITEM_TYPE_PBI:
                return 'indicator-pbi';
            case PT_ITEM_TYPE_BUG:
                return 'indicator-bug';
            case PT_ITEM_TYPE_CHORE:
                return 'indicator-chore';
            case PT_ITEM_TYPE_IMPEDIMENT:
                return 'indicator-impediment';
            default:
                return '';
        }
    }
    public static getImage(type: PtItemType): string {
        switch (type) {
            case PT_ITEM_TYPE_PBI:
                return '~/images/i-pbi.png';
            case PT_ITEM_TYPE_BUG:
                return '~/images/i-bug.png';
            case PT_ITEM_TYPE_CHORE:
                return '~/images/i-chore.png';
            case PT_ITEM_TYPE_IMPEDIMENT:
                return '~/images/i-impediment.png';
            default:
                return '';
        }
    }
}

export const PT_ITEM_TYPE_DISPLAY_ITEMS: PtListDisplayItem[] = [
    PtItemTypeImpl.pbi,
    PtItemTypeImpl.bug,
    PtItemTypeImpl.chore,
    PtItemTypeImpl.impediment
];


export const PT_ITEM_TYPE_DISPLAY_MAPPING: DictType<PtListDisplayItem> = {
    PT_ITEM_TYPE_PBI: PtItemTypeImpl.pbi,
    PT_ITEM_TYPE_BUG: PtItemTypeImpl.bug,
    PT_ITEM_TYPE_CHORE: PtItemTypeImpl.chore,
    PT_ITEM_TYPE_IMPEDIMENT: PtItemTypeImpl.impediment
};
