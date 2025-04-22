import { getProdsCategory } from '@/features/Dashboard/Products/api/services.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductsCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProdsCategory(categoryId);
            console.log(response);
            setProducts(response.data.products);
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className='py-16 px-6 bg-gray-50 min-h-screen'>
            <h2 className='text-4xl font-extrabold text-center text-teal-700 mb-10'>
                Productos de la Categoría
            </h2>
            {products?.length > 0 ? (
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className='bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all'
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className='w-full h-60 object-cover rounded-lg mb-4'
                            />
                            <div className='flex flex-col gap-2'>
                                <h3 className='text-2xl font-semibold text-gray-800'>{product.name}</h3>
                                <p className='text-gray-600 text-sm'>
                                    {product.description || 'Sin descripción disponible.'}
                                </p>
                                <div className='mt-4'>
                                    <p className='text-teal-600 font-bold text-lg'>${product.price}</p>
                                    <p className='text-sm text-gray-500'>Stock: {product.stock}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center text-red-500 font-medium'>No hay productos para esta categoría.</p>
            )}
        </div>
    );
}

export default ProductsCategory;
