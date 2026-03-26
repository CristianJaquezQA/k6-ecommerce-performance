import http from 'k6/http';
import { RefinedResponse, ResponseType } from 'k6/http';

const BASE_URL = 'https://dummyjson.com';

export function getProducts(): RefinedResponse<ResponseType> {
  return http.get(`${BASE_URL}/products`);
}

export function getProductById(id: number): RefinedResponse<ResponseType> {
  return http.get(`${BASE_URL}/products/${id}`);
}

export function searchProducts(query: string): RefinedResponse<ResponseType> {
  return http.get(`${BASE_URL}/products/search?q=${query}`);
}

export function getCart(userId: number): RefinedResponse<ResponseType> {
  return http.get(`${BASE_URL}/carts/${userId}`);
}