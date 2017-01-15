export interface Bookmark {
    aindex: string,
    index: number,
    text: string,
    sura: any,
    type: BookmarkType
}

export enum BookmarkType {
    Application = 1,
    User = 2
}