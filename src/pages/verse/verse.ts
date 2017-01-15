export interface Verse {
    aindex: string,
    index: number,
    text: string
}

export interface VerseParams {
    suraIndex: number,
    suraName: string,
    verseIndex?: number
}