import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='bg-purple-600 text-white py-8 px-6'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Información de la empresa */}
                <div>
                    <h2 className='text-xl font-semibold text-sky-300 mb-2'>Caninos SABS</h2>
                    <p className='text-sm text-gray-300'>
                        Plataforma web para visualizar y gestionar la información de la empresa. Descubre nuestros
                        productos, servicios y categorías de forma eficiente y atractiva.
                    </p>
                </div>

                {/* Navegación rápida */}
                <div>
                    <h3 className='text-lg font-medium text-sky-300 mb-2'>Enlaces rápidos</h3>
                    <ul className='space-y-1 text-sm text-gray-300'>
                        <li>
                            <Link to={'/'} className='hover:text-sky-300 transition'>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to={'/Products'} className='hover:text-sky-300 transition'>
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link to={'/Categories'} className='hover:text-sky-300 transition'>
                                Categorías
                            </Link>
                        </li>
                        <li>
                            <Link to={'/AboutUs'} className='hover:text-sky-300 transition'>
                                Quiénes somos
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contacto o redes sociales */}
                <div>
                    <h3 className='text-lg font-medium text-sky-300 mb-2'>Contáctanos</h3>
                    <p className='text-sm text-gray-300'>Correo: contacto@caninossabs.com</p>
                    <p className='text-sm text-gray-300'>Teléfono: 3123456789</p>
                    <div className='flex space-x-4 mt-3'>
                        <a href='#' className='hover:text-sky-300 transition'>
                            Facebook
                        </a>
                        <a href='#' className='hover:text-sky-300 transition'>
                            Instagram
                        </a>
                        <a href='#' className='hover:text-sky-300 transition'>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div className='mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400'>
                © 2025 Caninos SABS. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
