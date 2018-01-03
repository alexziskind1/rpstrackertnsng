import { PtItem, PtUser } from '../../core/models/domain';
import { PresetType } from '../../shared/models/ui/types';


export type StateKey = 'users' | 'backlogItems' | 'currentUser' | 'currentSelectedItem' | 'selectedPreset';

export interface State {
    backlogItems: PtItem[];
    users: PtUser[];
    currentUser: PtUser;
    currentSelectedItem: PtItem;
    selectedPreset: PresetType;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    backlogItems: [],
    users: [],
    currentUser: undefined,
    currentSelectedItem: undefined,
    selectedPreset: 'open'
};

