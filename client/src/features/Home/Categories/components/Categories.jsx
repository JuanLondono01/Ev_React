import { getCategories } from '@/features/Dashboard/Categories/api/services.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col py-20 px-6'>
            <h1 className='capitalize text-4xl font-extrabold text-center mb-12 text-teal-700'>
                Categorías de Productos
            </h1>
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className='bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all'
                        >
                            <h3 className='text-2xl font-semibold text-gray-800 mb-4'>{category.name}</h3>
                            <p className='text-gray-600 mb-6'>{category.description}</p>
                            <div className='flex justify-center'>
                                <Link
                                    to={`Products/${category.id}`}
                                    className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition duration-300'
                                >
                                    Explorar
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center text-red-400 text-lg'>
                        No hay categorías para mostrar
                    </div>
                )}
            </section>
        </div>
    );
}

export default Categories;
