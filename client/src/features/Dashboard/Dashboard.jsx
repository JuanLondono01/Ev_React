import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user ? user.role : null;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    if (!user || (role !== 1 && role !== 4)) {
        return <Navigate to='/' replace />;
    }

    const logout = async () => {
        localStorage.removeItem('user');
        await axios.get('http://localhost:3030/login/logout', { withCredentials: true });
        navigate('/', { replace: true });
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { to: '/', label: 'Inicio' },
        { to: '', label: 'Usuarios' },
        { to: 'Roles', label: 'Roles' },
        { to: 'Company', label: 'Compañía', show: role === 1 },
        { to: 'Products', label: 'Productos' },
        { to: 'Categories', label: 'Categorías' },
    ];

    return (
        <div className='flex min-h-screen bg-neutral-100'>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/80 rounded-md'
                aria-label='Toggle sidebar'>
                {isOpen ? <HiX size={24} color='white' /> : <HiMenu size={24} color='white' />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static w-72 h-screen bg-black text-white flex flex-col z-40 transition-all duration-300 ${
                    isOpen ? 'left-0' : '-left-full'
                } lg:left-0`}>
                <h2 className='text-3xl font-bold text-center py-6 border-b border-white/20'>Dashboard</h2>
                <nav className='flex-1 p-6 overflow-y-auto space-y-2'>
                    {navItems.map(
                        ({ to, label, show = true }) =>
                            show && (
                                <Link
                                    key={label}
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className='block px-4 py-2 text-lg text-gray-300 hover:text-white hover:bg-white/10 rounded transition'>
                                    {label}
                                </Link>
                            )
                    )}
                </nav>
                <button
                    onClick={logout}
                    className='bg-red-600 hover:bg-red-700 text-white font-semibold mx-6 mb-6 py-2 rounded transition'>
                    Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main className='flex-1 overflow-x-hidden'>
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;
