import { Observable } from "rxjs/Observable";


export interface PtModalListModel<T> {
    items: T[];
    selectedIndex: number;
    //items$: Observable<T[]>;
    //loadItemsTrigger(): Promise<void>;
}
