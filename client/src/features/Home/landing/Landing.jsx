import React from 'react';
import bannerImage from '../../../assets/imgs/banner.jpg';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <>
            {/* Hero */}
            <section id='hero' className='bg-purple-700/60 py-12 md:py-20'>
                <div className='container mx-auto text-center flex flex-col items-center gap-4 md:gap-6 px-4 text-white'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Bienvenidos a Caninos SABS</h1>
                    <p className='text-base md:text-lg max-w-2xl'>
                        Tu solución confiable para la venta y servicio de productos para perros. Descubre nuestros productos,
                        servicios y mucho más.
                    </p>
                    <img
                        src={bannerImage}
                        alt='Banner Caninos SABS'
                        className='w-full max-w-5xl h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-xl'
                    />
                    <Link
                        to='/AboutUs'
                        className='text-base md:text-lg mt-2 md:mt-4 border border-white rounded-lg px-4 md:px-6 py-2 bg-transparent text-white hover:bg-white hover:text-black transition-colors'>
                        Conoce más sobre nosotros
                    </Link>
                </div>
            </section>

            {/* Productos */}
            <section id='productos' className='py-12 md:py-20 bg-purple-100'>
                <div className='container mx-auto px-4 text-center max-w-4xl shadow-md rounded-lg p-6 md:p-8'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-3 md:mb-4'>Nuestros Productos</h2>
                    <p className='text-sm sm:text-base text-gray-700 mb-4 md:mb-6'>
                        Encuentra una gran variedad de productos para el cuidado, alimentación y entretenimiento de tus
                        mascotas. Desde alimentos premium hasta juguetes y accesorios especializados.
                    </p>
                    <Link
                        to='/Products'
                        className='text-sm sm:text-base border border-purple-700 rounded-lg px-4 md:px-5 py-1 md:py-2 bg-purple-700 text-white hover:bg-transparent hover:text-purple-700 transition-colors'>
                        Ver productos
                    </Link>
                </div>
            </section>

            {/* Servicios */}
            <section id='servicios' className='py-12 md:py-20 bg-purple-200'>
                <div className='container mx-auto px-4 text-center max-w-4xl shadow-md rounded-lg p-6 md:p-8 bg-white'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-3 md:mb-4'>Nuestros Servicios</h2>
                    <p className='text-sm sm:text-base text-gray-700 mb-4 md:mb-6'>
                        Ofrecemos servicios especializados para el bienestar de tu mascota, incluyendo asesoría personalizada,
                        grooming, consultas y más.
                    </p>
                    <Link
                        to='/Services'
                        className='text-sm sm:text-base border border-purple-700 rounded-lg px-4 md:px-5 py-1 md:py-2 bg-purple-700 text-white hover:bg-transparent hover:text-purple-700 transition-colors'>
                        Ver servicios
                    </Link>
                </div>
            </section>

            {/* Categorías */}
            <section id='categorias' className='py-12 md:py-20 bg-purple-100'>
                <div className='container mx-auto px-4 text-center max-w-4xl shadow-md rounded-lg p-6 md:p-8'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-3 md:mb-4'>Categorías</h2>
                    <p className='text-sm sm:text-base text-gray-700 mb-4 md:mb-6'>
                        Explora nuestras categorías para encontrar fácilmente lo que necesitas: salud, nutrición, entretenimiento,
                        higiene y más.
                    </p>
                    <Link
                        to='/Categories'
                        className='text-sm sm:text-base border border-purple-700 rounded-lg px-4 md:px-5 py-1 md:py-2 bg-purple-700 text-white hover:bg-transparent hover:text-purple-700 transition-colors'>
                        Explorar categorías
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Landing;
