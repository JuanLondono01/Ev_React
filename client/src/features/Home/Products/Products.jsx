import { Card, CardActions, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
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
        <section className='py-20'>
            <div className='container mx-auto text-center'>
                <h2 className='text-3xl font-semibold mb-6'>Nuestros Productos</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full place-items-center'>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product.id}
                                className='bg-skyblue h-[400px] w-[350px] flex flex-col p-6 rounded-lg shadow-2xl shadow-blue-100 transition-transform transform hover:scale-105 justify-between hover:shadow-blue-300'>
                                <img src={product.imageUrl} alt={product.name} className='w-full h-1/2' />
                                <Typography level='title-lg'>{product.name}</Typography>
                                <Typography level='body-sm'>{product.description}</Typography>
                                <CardActions>{user && <Button>Comprar</Button>}</CardActions>
                            </Card>
                        ))
                    ) : (
                        <div className='col-span-full flex justify-center  '>
                            <p className='text-center text-red-400 text-lg'>No hay productos disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Products;
