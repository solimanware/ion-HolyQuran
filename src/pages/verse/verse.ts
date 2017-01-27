export interface Verse {
    aindex: string,
    index: number,
    text: string,
    bismillah?: string,
    isSelected?: boolean
}

export interface VerseParams {
    suraIndex: number,
    suraName: string,
    verseIndex?: number
}

export interface VerseDetail {
    aindex: string,
    index: number,
    ajuz: number,
    juz: number,
    name: string,
    aya: Array<Verse>
}