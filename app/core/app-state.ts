import { PtItem, PtUser } from '../shared/models/domain';
import { Preset } from '../shared/models/ui';

export type StateKey = 'users' | 'backlogItems' | 'currentUser' | 'currentSelectedItem' | 'selectedPreset';

export interface State {
    backlogItems: PtItem[];
    users: PtUser[];
    currentUser: PtUser;
    currentSelectedItem: PtItem;
    selectedPreset: Preset;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    backlogItems: [],
    users: [],
    currentUser: undefined,
    currentSelectedItem: undefined,
    selectedPreset: 'open',
};

