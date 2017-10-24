import { PtObjectBase, PtTask, PtComment, PtUser } from './';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../../enums';

export interface PtItem extends PtObjectBase {
    description?: string;
    type: ItemTypeEnum;
    estimate: number;
    priority: PriorityEnum;
    status: StatusEnum;
    assignee: PtUser;
    tasks: PtTask[];
    comments: PtComment[];
}
