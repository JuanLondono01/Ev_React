import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import axios from 'axios';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user ? user.role : null;
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Verificar si el usuario está logueado y tiene el rol correcto
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

    return (
        <div className='flex min-h-screen'>
            {/* Mobile Toggle Button */}
            <button 
                onClick={toggleSidebar}
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/80 rounded-md'
                aria-label='Toggle sidebar'
            >
                {isOpen ? (
                    <HiX size={24} color='white' />
                ) : (
                    <HiMenu size={24} color='white' />
                )}
            </button>

            {/* Sidebar */}
            <div 
                className={`fixed lg:static w-[300px] h-screen bg-black flex flex-col transition-all duration-300 z-40
                    ${isOpen ? 'left-0' : '-left-full'} lg:left-0`}
            >
                <h2 className='text-3xl text-center font-semibold text-white py-4'>Dashboard</h2>
                <List className='flex-1 overflow-y-auto'>
                    <div className='flex flex-col justify-evenly gap-2 text-xl py-2 pl-6 h-full'>
                        <Link to='/' onClick={() => setIsOpen(false)}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                        Inicio
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to='' onClick={() => setIsOpen(false)}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                        Usuarios
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to='Roles' onClick={() => setIsOpen(false)}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                        Roles
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {role === 1 && (
                            <Link to='Company' onClick={() => setIsOpen(false)}>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                            Compañía
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )}
                        <Link to='Products' onClick={() => setIsOpen(false)}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                        Productos
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to='Categories' onClick={() => setIsOpen(false)}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemContent sx={{ color: 'gray', '&:hover': { color: 'white' } }}>
                                        Categorías
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </div>
                </List>
                <Button
                    onClick={logout}
                    sx={{
                        position: 'sticky',
                        bottom: '1rem',
                        margin: '0 auto',
                        width: '80%',
                        mb: 2,
                    }}
                    color='danger'
                >
                    Cerrar Sesión
                </Button>
            </div>

            {/* Main Content */}
            <div className='flex-1 overflow-x-hidden'>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;