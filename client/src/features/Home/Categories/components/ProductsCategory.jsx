import { getProdsCategory } from '@/features/Dashboard/Products/api/services.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductsCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProdsCategory(categoryId);
            console.log(response);
            
            setProducts(response.data.products)
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className='py-16 px-10 bg-neutral-100 min-h-screen'>
            <h2 className='text-3xl font-bold text-center mb-10'>Productos</h2>
            {products?.length > 0 ? (
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center'>
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className='bg-skyblue h-fit w-[350px] flex flex-col p-6 rounded-lg shadow-2xl shadow-blue-100 transition-transform transform hover:scale-105 justify-between hover:shadow-blue-300'>
                            <img src={product.imageUrl} alt={product.name} className='w-full h-60 object-cover' />
                            <div className='p-6 flex flex-col gap-2 flex-grow'>
                                <h3 className='text-xl font-semibold text-gray-800'>{product.name}</h3>
                                <p className='text-gray-600 text-sm flex-grow'>
                                    {product.description || 'Sin descripción disponible.'}
                                </p>
                                <div className='mt-4'>
                                    <p className='text-sky-600 font-bold text-lg'>${product.price}</p>
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
