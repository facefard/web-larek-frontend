export interface Product {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  price: number | null;
}

export interface ProductApiType {
  getProductItem: (id: string) => Promise<Product>;
  getProductList: () => Promise<Product[]>;
  orderProduct: (order: Order) => Promise<OrderResult>;
}

export interface OrderedProduct extends Product {
  quantity: number;
  total: number;
}

export interface ShippingAddress {
  payment: string;
  address: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface Order extends ShippingAddress, ContactInfo {
  total: number;   
  items: string[];
}

export interface OrderResult {
  id: string;
  total: number;
}

export interface AllInfo {
  catalog: Product[];
  basket: Product[];
  preview: string | null;
  delivery: ShippingAddress| null;
  contact: ContactInfo | null;
  order: Order | null;
  loading: boolean;
}

export type FormError = Partial<Record<keyof Order, string>>;

export interface CardType extends Product{
  titleBtn?:string;
  index?:string;
}

export interface CardClick {
  onClick: (event: MouseEvent) => void;
}

export interface ModalType {
  content: HTMLElement;
}

export interface PageType {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface BasketModalView {
  items: HTMLElement[];
  total: number;
}

export interface FormModalView {
  valid: boolean;
  errors: string[];
}

export interface SuccessClick {
  onClick: () => void;
}

export interface SuccessType {
  total: number;
}

export type CatalogChangeEvent = {
  catalog: Product[]
};