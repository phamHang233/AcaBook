export interface Order {
    // id: 25,
    _id: string,
    product_id: string,
    price: number,
    product_category_name: string,
    customer_id: string,
    order_purchase_timestamp: Date,
}