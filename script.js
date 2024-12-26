
const API_URL = 'https://fakestoreapi.com/products';


const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = ''; 
        
        products.forEach(product => {
            const productCard = `
                <div class="bg-white p-4 rounded shadow-lg">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover mb-4 rounded">
                    <h3 class="text-xl font-semibold mb-2">${product.title}</h3>
                    <p class="text-gray-700 mb-2">${product.description}</p>
                    <p class="text-lg font-bold mb-4">$${product.price}</p>
                    <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${product.id}">Delete</button>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });

        
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.getAttribute('data-id');
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });
                if (result.isConfirmed) {
                    await deleteProduct(productId);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


const addProduct = async (product) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const newProduct = await response.json();
        
        const productContainer = document.getElementById('productContainer');
        const productCard = `
            <div class="bg-white p-4 rounded shadow-lg">
                <img src="${newProduct.image}" alt="${newProduct.title}" class="w-full h-40 object-cover mb-4 rounded">
                <h3 class="text-xl font-semibold mb-2">${newProduct.title}</h3>
                <p class="text-gray-700 mb-2">${newProduct.description}</p>
                <p class="text-lg font-bold mb-4">$${newProduct.price}</p>
                <button class="bg-red-500 text-white px-4 py-2 rounded delete-btn" data-id="${newProduct.id}">Delete</button>
            </div>
        `;
        productContainer.innerHTML += productCard;
        
        document.querySelector('.delete-btn[data-id="' + newProduct.id + '"]').addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                await deleteProduct(productId);
            }
        });
    } catch (error) {
        console.error('Error adding product:', error);
    }
};


const deleteProduct = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        
        document.querySelector(`.delete-btn[data-id="${id}"]`).closest('.bg-white').remove();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};


const initializeEventListeners = () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const addProductForm = document.getElementById('addProductForm');
    const addProductModal = document.getElementById('addProductModal');
    
    addProductBtn.addEventListener('click', () => {
        addProductModal.classList.remove('hidden');
    });
    
    closeModalBtn.addEventListener('click', () => {
        addProductModal.classList.add('hidden');
    });

    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newProduct = {
            title: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
        };
        await addProduct(newProduct);
        addProductModal.classList.add('hidden');
        addProductForm.reset();
    });
};


document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    initializeEventListeners();
});
