import { Model } from "./base/Model";
import { FormError, AllInfo, Product, ShippingAddress, ContactInfo, Order } from "../types";

export class OtherFunctions extends Model<AllInfo> {
    basket: Product[]=[];
    catalog: Product[];
    loading: boolean;
    order: Order = {
        payment: 'online',    
        address: '',
        email: '',
        phone: '',
        total: 0,  
        items: []
    };
    preview: string | null;
    formErrors: FormError = {};

    setPreview(item: Product) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }
    
    setItems(items: Product[]) {
        this.catalog = items;
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    addItem(item: Product){
        if(!this.basket.includes(item)){
            this.basket.push(item);
            this.updateBasket();
        }
    }

    removeItem(item: Product) {
        this.basket = this.basket.filter((itm) => itm.id != item.id);
		this.updateBasket();               
    }

    updateBasket(){
        this.emitChanges('basket:changed', this.basket);
        this.emitChanges('counter:changed', this.basket);
    }

    cleanBasket() {
        this.basket = [];
        this.updateBasket();
    }

    cleanOrder() {
        this.order ={
            payment: '',    
            address: '',
            email: '',
            phone: '',
            total: 0,  
            items: []
        }
    }
 
    setShipping(field: keyof ShippingAddress, value: string) {
        this.order[field] = value;

        if (this.validationShipping()) {
            this.events.emit('shipping:ok', this.order);
        }
    }


    setContacts(field: keyof ContactInfo, value: string) {
        this.order[field] = value;
        if (this.validationContacts()) {
            this.events.emit('contacts:ok', this.order);            
        }
    }

    getTotal(): number {
        return this.basket.reduce((total, item) => total + item.price, 0);
    }

    validationContacts(){
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = ' ';
        }
        if (!this.order.phone) {
            errors.phone = ' ';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validationShipping(){
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = ' ';
        }

        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }    
}

export const PayChange:{[key:string]:string}={
    card: 'online',
    cash: 'cash',
}