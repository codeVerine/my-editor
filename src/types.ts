export enum FORMATTING_TYPES {
    BOLD = 'BOLD',
    UNDERLINE = 'UNDERLINE',
    COLOR = 'COLOR',
    LINK = 'LINK',
    PARAGRAPH = 'PARAGRAPH'
}

export interface Meta {
    id: string;
    type: Omit<FORMATTING_TYPES, 'PARAGRAPH'>;
    start: number;
    end: number;
    href?: string;
}

export interface Paragraph {
    id: string;
    formattings: Meta[];
    text: string;
    type: FORMATTING_TYPES.PARAGRAPH
}

export type Article  = Paragraph[];





