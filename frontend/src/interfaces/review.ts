import type { Jobpost } from "./jobpost"
import type { Ratingscore } from "./ratingscore";

export interface Review {
    id: number;
    job_post_id: number;
    job_post?: Jobpost;
    rating_score_id: number;
    rating_score?: Ratingscore;
    comment: string;
    datetime: Date;
}

export interface CreateReviewRequest {
    rating_score_id: number;
    rating_score?: Ratingscore;
    job_post_id: number;
    employer_id: number;
    comment: string;
}

export interface FindReviewRequest {
    job_post_id: number;
    employer_id?: number;
}