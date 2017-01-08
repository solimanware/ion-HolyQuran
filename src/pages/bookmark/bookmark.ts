export interface Bookmark {
    aindex: string,
    index: string,
    text: string,
    sura: any,
    type: BookmarkType
}

export enum BookmarkType {
    Application = 1,
    User = 2
}