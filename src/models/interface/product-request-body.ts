export interface ProductRequestBody {
    id?: number;
    description: string;
    price: number;
    categoryId: number;
    supplierId: number;
}