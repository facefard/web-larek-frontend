import { Api, ApiListResponse } from './base/api';
import { Order, OrderResult, Product, ProductApiType } from "../types";

export class WebApi extends Api implements ProductApiType {
    readonly cdn: string;
    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductItem(id: string): Promise<Product> {
        return this.get(`/product/${id}`).then(
            (item: Product) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    getProductList(): Promise<Product[]> {
        return this.get('/product').then((data: ApiListResponse<Product>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image                
            }))
        );        
    }

    orderProduct(order: Order): Promise<OrderResult> {
        return this.post('/order', order).then(
            (data: OrderResult) => data
        );
    }
}