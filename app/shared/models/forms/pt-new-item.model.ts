import { PtItemTypeImpl } from '../ui';


export interface PtNewItem {
    title: string;
    description?: string;
    type: PtItemTypeImpl;
}
