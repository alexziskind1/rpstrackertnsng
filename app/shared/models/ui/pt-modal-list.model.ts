import { Observable } from "rxjs/Observable";


export interface PtModalListModel<T> {
    items: T[];
    selectedItem: T;
    //items$: Observable<T[]>;
    //loadItemsTrigger(): Promise<void>;
}
