import { ItemTypeEnum } from '../enums';

export interface PtNewItem {
    title: string;
    description?: string;
    type: ItemTypeEnum;
}
