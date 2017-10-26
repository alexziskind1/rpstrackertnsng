export function enumToArray(theEnum): any[] {
    let retArray = [];
    for (var enumMember in theEnum) {
        const intVal = parseInt(enumMember, 10);
        const isValueProperty = intVal >= 0;
        if (isValueProperty) {
            //theItems.push({ value: enumMember, title: ItemTypeEnum[enumMember], img: ItemTypeEnum.getImage(intVal) });
            retArray.push(theEnum[enumMember]);
        }
    }
    return retArray;
}

export function enumValueIndex(enumVal: number, e: any): number {
    let idx = -1;
    for (var enumMember in e) {
        idx++;
        const intVal = parseInt(enumMember, 10);
        const isValueProperty = intVal >= 0;
        if (isValueProperty) {
            if (intVal === enumVal) {
                break;
            }
        }
    }
    return idx;
}

export function enumToString<E>(enumMember: string, e: E): string {
    let intVal = parseInt(enumMember, 10);
    return e[enumMember];
}
