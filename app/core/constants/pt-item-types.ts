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
            return 'res://i-pbi';
        case PT_ITEM_TYPE_BUG:
            return 'res://i-bug';
        case PT_ITEM_TYPE_CHORE:
            return 'res://i-chore';
        case PT_ITEM_TYPE_IMPEDIMENT:
            return 'res://i-impediment';
        default:
            return '';
    }
};
