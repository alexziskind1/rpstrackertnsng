export enum ItemTypeEnum {
    PBI = 1,
    Bug = 2,
    Chore = 3,
    Impediment = 4
}
export namespace ItemTypeEnum {
    export function getIndicatorClass(type: ItemTypeEnum): string {
        switch (type) {
            case ItemTypeEnum.PBI:
                return 'indicator-pbi';
            case ItemTypeEnum.Bug:
                return 'indicator-bug';
            case ItemTypeEnum.Chore:
                return 'indicator-chore';
            case ItemTypeEnum.Impediment:
                return 'indicator-impediment';
            default:
                return '';
        }
    }
    export function getImage(type: ItemTypeEnum): string {
        switch (type) {
            case ItemTypeEnum.PBI:
                return '~/images/i-pbi.png';
            case ItemTypeEnum.Bug:
                return '~/images/i-bug.png';
            case ItemTypeEnum.Chore:
                return '~/images/i-chore.png';
            case ItemTypeEnum.Impediment:
                return '~/images/i-impediment.png';
            default:
                return '';
        }
    }
}
