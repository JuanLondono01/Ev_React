import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';
import { HiMenu, HiX } from 'react-icons/hi';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user ? user.role : null;

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/', { replace: true });
    };

    return (
        <nav className='bg-gradient-to-r from-purple-600 to-purple-700 text-white sticky top-0 z-50 shadow-xl shadow-purple-500/90'>
            <div className='flex justify-between items-center px-6 md:px-20 py-4'>
                <Link
                    to='/'
                    className='text-3xl font-extrabold text-white hover:text-sky-300 transition duration-300 flex items-center gap-4'>
                    <img className='h-12' src='../public/icons8-dog-park-96.png' alt='Logo' />
                    Caninos SABS
                </Link>

                {/* Botón hamburguesa (visible en mobile) */}
                <button
                    className='md:hidden text-white text-4xl transition duration-200'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label='Toggle menu'>
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>

                {/* Menú normal (desktop) */}
                <ul className='hidden md:flex gap-12 items-center text-lg'>
                    <li>
                        <Link className='hover:text-sky-300 transition duration-300' to='/'>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition duration-300' to='/AboutUs'>
                            Quiénes Somos
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition duration-300' to='/Products'>
                            Nuestros Productos
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition duration-300' to='/Categories'>
                            Nuestras Categorías
                        </Link>
                    </li>
                    <li>
                        {!user ? (
                            <Link className='hover:text-sky-300 transition duration-300' to='/Login'>
                                Login
                            </Link>
                        ) : role === 1 || role === 2 ? (
                            <Link className='hover:text-sky-300 transition duration-300' to='/Dashboard'>
                                Dashboard
                            </Link>
                        ) : (
                            <Button onClick={logout} color='danger' size='sm' className='transition duration-300'>
                                Cerrar Sesión
                            </Button>
                        )}
                    </li>
                </ul>
            </div>

            {/* Menú desplegable (mobile) */}
            {isOpen && (
                <ul className='md:hidden flex flex-col gap-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-base shadow-lg'>
                    <li>
                        <Link onClick={() => setIsOpen(false)} to='/'>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setIsOpen(false)} to='/AboutUs'>
                            Quiénes Somos
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setIsOpen(false)} to='/Products'>
                            Nuestros Productos
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setIsOpen(false)} to='/Categories'>
                            Nuestras Categorías
                        </Link>
                    </li>
                    <li>
                        {!user ? (
                            <Link onClick={() => setIsOpen(false)} to='/Login'>
                                Login
                            </Link>
                        ) : role === 1 || role === 2 ? (
                            <Link onClick={() => setIsOpen(false)} to='/Dashboard'>
                                Dashboard
                            </Link>
                        ) : (
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                                color='danger'
                                size='sm'
                                className='transition duration-300'>
                                Cerrar Sesión
                            </Button>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
