import './scss/styles.scss';

import { ProductApi } from './components/base/WebApi';
import { ProductRenderer } from './components/base/card';
import { Modal } from './components/base/modals';

// Создаем экземпляры классов
const productApi = new ProductApi();
const productRenderer = new ProductRenderer();

// Получаем данные с сервера и рендерим продукты
productApi.fetchProducts()
    .then(products => {
        products.forEach(product => {
            const productElement = productRenderer.renderProduct(product);
            // Добавляем элемент продукта в контейнер на странице
            document.querySelector('.gallery').appendChild(productElement);
        });
    })
    .catch(error => {
        console.error('Failed to fetch products:', error);
    });

const modal = new Modal();