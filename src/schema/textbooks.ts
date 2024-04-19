export interface TextbookSchema {
    id: number;
    course_id: number;
    title: string;
    title_long: string;
    isbn: string;
    isbn13: string;
    publisher: string;
    pages: number;
    image: string;
    created_at: string;
    temp_content: string;
}

export interface TextbooksRows extends Array<TextbookSchema> {};