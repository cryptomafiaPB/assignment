export interface Users {
    id: string;
    name: string;
    email: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number;
        };
    };
    accessToken: string;
}

export interface Page {
    id: string;
    name: string;
}

export interface PageStats {
    page_follows: number;
    page_post_engagements: number;
    page_fans: number;
    page_views_total: number;
}