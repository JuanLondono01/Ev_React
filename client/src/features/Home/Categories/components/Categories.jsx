import { getCategories } from '@/features/Dashboard/Categories/api/services.js';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/joy';
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
        <div className='min-h-screen bg-neutral-100 flex flex-col py-20 px-10'>
            <h1 className='capitalize text-3xl font-semibold text-center mb-12'>Categorías de productos</h1>
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <Card
                            key={category.id}
                            className='bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg'
                        >
                            <Typography level='title-lg' className='mb-2'>{category.name}</Typography>
                            <CardContent className='flex flex-col justify-between h-full'>
                                <Typography level='body-sm' className='mb-4'>{category.description}</Typography>
                                <CardActions>
                                    <Link to={`Products/${category.id}`}>
                                        <Button variant='soft' color='primary'>Explorar</Button>
                                    </Link>
                                </CardActions>
                            </CardContent>
                        </Card>
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
