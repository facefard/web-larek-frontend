import { API_URL } from "../../utils/constants";

export class ProductApi {
  async fetchProducts(): Promise<any[]> {
      try {
          const response = await fetch(`${API_URL}/product`);
          if (!response.ok) {
              throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          if (data && Array.isArray(data.items)) {
              console.log('Received products:', data.items); // Выводим данные о продуктах в консоль
              return data.items;
          } else {
              throw new Error('Invalid data format: missing "items" field');
          }
      } catch (error) {
          console.error('Failed to fetch products:', error);
          return [];
      }
  }
}