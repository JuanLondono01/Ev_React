import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:3030/products');
            setProducts(response.data.products);
        };
        fetchProducts();
    }, []);

    return (
        <section className='py-20 bg-gradient-to-t from-purple-300 to-purple-700 text-white h-screen'>
            <div className='container mx-auto text-center px-6'>
                <h2 className='text-4xl font-extrabold mb-8 text-white'>Nuestros Productos</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className='bg-white h-[450px] w-[350px] flex flex-col p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-blue-300 transition-all'>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className='w-full h-2/3 object-cover rounded-lg mb-4'
                                />
                                <h4 className='text-2xl font-semibold text-gray-800 mb-2'>{product.name}</h4>
                                <p className='text-gray-600 mb-4'>{product.description}</p>
                                <div className='flex justify-center'>
                                    {user ? (
                                        <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition duration-300'>
                                            Comprar
                                        </button>
                                    ) : (
                                        <button className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300'>
                                            Inicia sesión para comprar
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full'>
                            <p className='text-center text-red-400 text-lg'>
                                No hay productos disponibles en este momento.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Products;
