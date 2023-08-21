import { User } from "./user";

export interface Review {
    _id: string;
    order_id: string;
    product_id: string;
    review_id: string;
    review_score: number;
    review_creation_date: Date;
    review_answer_timestamp: Date;
    customer_id: User;
    review_content: string;

}