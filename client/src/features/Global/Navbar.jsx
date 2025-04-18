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
        <nav className='bg-black text-white sticky top-0 z-50 shadow-lg'>
            <div className='flex justify-between items-center px-6 md:px-20 h-16'>
                <Link
                    to='/'
                    className='text-2xl uppercase font-bold hover:text-sky-300 transition duration-200 flex items-center gap-4 lg:text-2xl md:text-xl'>
                    <img className='h-10' src='../../../public/icon-white.svg' alt='Logo' />
                    Caninos SABS
                </Link>

                {/* Botón hamburguesa (visible en mobile) */}
                <button
                    className='md:hidden text-white text-3xl'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label='Toggle menu'>
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>

                {/* Menú normal (desktop) */}
                <ul className='hidden md:flex gap-10 text-lg items-center lg:text-xl md'>
                    <li>
                        <Link className='hover:text-sky-300 transition' to='/'>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition' to='/AboutUs'>
                            Quiénes Somos
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition' to='/Products'>
                            Nuestros Productos
                        </Link>
                    </li>
                    <li>
                        <Link className='hover:text-sky-300 transition' to='/Categories'>
                            Nuestras Categorías
                        </Link>
                    </li>
                    <li>
                        {!user ? (
                            <Link className='hover:text-sky-300 transition' to='/Login'>
                                Login
                            </Link>
                        ) : role === 1 || role === 4 ? (
                            <Link className='hover:text-sky-300 transition' to='/Dashboard'>
                                Dashboard
                            </Link>
                        ) : (
                            <Button onClick={logout} color='danger' size='sm'>
                                Cerrar Sesión
                            </Button>
                        )}
                    </li>
                </ul>
            </div>

            {/* Menú desplegable (mobile) */}
            {isOpen && (
                <ul className='md:hidden flex flex-col gap-4 px-6 py-4 bg-black text-white text-base shadow-md'>
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
                        ) : role === 1 || role === 4 ? (
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
                                size='sm'>
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
