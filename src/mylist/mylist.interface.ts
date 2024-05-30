export enum ContentType {
    MOVIE = 'MOVIE',
    TV_SHOW = 'TV_SHOW',
};

export interface MyListQuery {
    contentType?: ContentType;
    limit?: number;
    offset?: number;
};