document.addEventListener('DOMContentLoaded', () => {

    /**
     * Base de datos simulada del catálogo de productos.
     */
    const products = [
        { id: 1, name: "Laptop Pro M2", price: 3500.00, icon: "💻", desc: "16GB RAM, 512GB SSD. Ideal para programar." },
        { id: 2, name: "Teclado Mecánico", price: 250.50, icon: "⌨️", desc: "Switches red silenciosos, layout en español." },
        { id: 3, name: "Mouse Inalámbrico", price: 120.00, icon: "🖱️", desc: "Sensor óptico 10000 DPI, diseño ergonómico." },
        { id: 4, name: "Monitor Curvo 27\"", price: 850.00, icon: "🖥️", desc: "Panel IPS, 144Hz, 1ms de respuesta." },
        { id: 5, name: "Auriculares Noise", price: 450.00, icon: "🎧", desc: "Cancelación de ruido activa, 20h de batería." },
        { id: 6, name: "Silla Ergonómica", price: 599.99, icon: "💺", desc: "Soporte lumbar ajustable, reclinable 180°." },
        { id: 7, name: "Webcam 4K Ultra", price: 320.00, icon: "📷", desc: "Autoenfoque inteligente y micrófono dual." },
        { id: 8, name: "Micrófono Studio", price: 290.00, icon: "🎙️", desc: "Condensador cardioide para streaming/podcasts." }
    ];

    let cart = []; 

    const catalogContainer = document.querySelector('#catalog-container');
    const cartContainer = document.querySelector('#cart-container');
    const emptyMessage = document.querySelector('#empty-message');
    const totalPriceElement = document.querySelector('#total-price');

    /**
     * Formatea un valor numérico a moneda local (Soles Peruanos - PEN).
     * @param {number} amount - El valor a formatear.
     * @returns {string} String formateado (ej. "S/ 1,200.00").
     */
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(amount);
    };

    /**
     * Construye e inyecta el catálogo de productos en el DOM de forma dinámica.
     */
    function renderCatalog() {
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const icon = document.createElement('div');
            icon.classList.add('product-icon');
            icon.textContent = product.icon;

            const title = document.createElement('h3');
            title.textContent = product.name;

            const desc = document.createElement('p');
            desc.classList.add('product-desc');
            desc.textContent = product.desc;

            const price = document.createElement('p');
            price.classList.add('product-price');
            price.textContent = formatCurrency(product.price);

            const addButton = document.createElement('button');
            addButton.classList.add('btn');
            addButton.textContent = 'Agregar al carrito';
            addButton.addEventListener('click', () => addToCart(product.id));

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(price);
            card.appendChild(addButton);
            
            catalogContainer.appendChild(card);
        });
    }

    /**
     * Incorpora un producto al carrito o incrementa su cantidad si ya existe.
     * @param {number} productId - Identificador único del producto.
     */
    function addToCart(productId) {
        const existingCartItem = cart.find(item => item.id === productId);
        
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            const productData = products.find(p => p.id === productId);
            cart.push({ ...productData, quantity: 1 });
        }
        
        updateCartUI();
    }

    /**
     * Modifica la cantidad de un ítem en el carrito, garantizando un mínimo de 1 unidad.
     * @param {number} productId - Identificador único del producto.
     * @param {number} amount - Valor a incrementar o decrementar.
     */
    function changeQuantity(productId, amount) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += amount;
            if (item.quantity < 1) item.quantity = 1;
        }
        
        updateCartUI();
    }

    /**
     * Remueve un producto del carrito y actualiza la vista.
     * @param {number} productId - Identificador único del producto a eliminar.
     */
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    /**
     * Sincroniza el DOM con el estado actual del arreglo 'cart'.
     * Maneja la renderización de ítems, totales y estados de vacío.
     */
    function updateCartUI() {
        const currentNodes = cartContainer.querySelectorAll('.cart-item');
        currentNodes.forEach(node => node.remove());

        if (cart.length === 0) {
            emptyMessage.classList.remove('hidden');
            totalPriceElement.textContent = formatCurrency(0);
            return;
        } else {
            emptyMessage.classList.add('hidden');
        }

        let total = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const itemRow = document.createElement('div');
            itemRow.classList.add('cart-item');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('cart-item-info');
            
            const titleEl = document.createElement('h4');
            titleEl.textContent = item.name;
            
            const subtotalEl = document.createElement('p');
            subtotalEl.textContent = `${formatCurrency(item.price)} x ${item.quantity} = ${formatCurrency(subtotal)}`;
            
            infoDiv.appendChild(titleEl);
            infoDiv.appendChild(subtotalEl);

            const controlsDiv = document.createElement('div');
            controlsDiv.classList.add('cart-item-controls');

            const minusBtn = document.createElement('button');
            minusBtn.textContent = '-';
            minusBtn.classList.add('qty-btn');
            if (item.quantity === 1) minusBtn.disabled = true;
            minusBtn.addEventListener('click', () => changeQuantity(item.id, -1));

            const qtySpan = document.createElement('span');
            qtySpan.textContent = item.quantity;
            qtySpan.style.fontWeight = 'bold';

            const plusBtn = document.createElement('button');
            plusBtn.textContent = '+';
            plusBtn.classList.add('qty-btn');
            plusBtn.addEventListener('click', () => changeQuantity(item.id, 1));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('btn-danger');
            deleteBtn.addEventListener('click', () => removeFromCart(item.id));

            controlsDiv.appendChild(minusBtn);
            controlsDiv.appendChild(qtySpan);
            controlsDiv.appendChild(plusBtn);
            controlsDiv.appendChild(deleteBtn);

            itemRow.appendChild(infoDiv);
            itemRow.appendChild(controlsDiv);
            cartContainer.appendChild(itemRow);
        });

        totalPriceElement.textContent = formatCurrency(total);
    }

    renderCatalog();
});