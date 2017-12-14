import { PtItemType } from '../../core/models/domain/types';


export const PT_ITEM_TYPE_PBI: PtItemType = 'PBI';
export const PT_ITEM_TYPE_BUG: PtItemType = 'Bug';
export const PT_ITEM_TYPE_CHORE: PtItemType = 'Chore';
export const PT_ITEM_TYPE_IMPEDIMENT: PtItemType = 'Impediment';

export const PT_ITEM_TYPES: PtItemType[] = [
    PT_ITEM_TYPE_PBI,
    PT_ITEM_TYPE_BUG,
    PT_ITEM_TYPE_CHORE,
    PT_ITEM_TYPE_IMPEDIMENT
];

export const getPtTypeImage = (type: PtItemType): string => {
    switch (type) {
        case PT_ITEM_TYPE_PBI:
            return 'res://ipbi';
        case PT_ITEM_TYPE_BUG:
            return 'res://ibug';
        case PT_ITEM_TYPE_CHORE:
            return 'res://ichore';
        case PT_ITEM_TYPE_IMPEDIMENT:
            return 'res://iimpediment';
        default:
            return '';
    }
};
