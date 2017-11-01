import { PtItemType } from '../domain/types';


export interface PtNewItem {
    title: string;
    description?: string;
    type: PtItemType;
}
