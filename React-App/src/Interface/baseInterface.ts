// Defines TypeScript interfaces for `Category` and `Product` entities.
// Used throughout the application for type safety and consistency.

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    categoryId: number;
    name: string;
    storeLocation: string;
    postCode: number;
    price: number;
    isAvailable: boolean;
    sku: number;
}