import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { login } from './api/services.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setIsError(true);
            setError('Por favor, complete todos los campos');
            return;
        }

        try {
            setLoading(true);
            const response = await login(formData);
            if (!response || response.status !== 200) {
                throw new Error('Credenciales inválidas');
            }

            const userRes = await axios.get('http://localhost:3030/login/verify', {
                withCredentials: true,
            });

            const user = userRes.data.user;
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role !== 1 && user.role !== 4) {
                navigate('/', { replace: true });
            } else {
                navigate('/Dashboard', { replace: true });
            }

            setIsError(false);
        } catch (err) {
            console.error(err);
            setIsError(true);
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full max-w-md mx-auto mt-20 border flex flex-col gap-6 p-8 rounded-md shadow-md bg-white md:mb-73 lg:mb-[10.55rem] mb-20'>
            <h1 className='text-4xl text-center font-semibold'>Iniciar Sesión</h1>
            <Input
                name='email'
                value={formData.email}
                variant='soft'
                placeholder='Correo electrónico'
                type='email'
                size='lg'
                onChange={handleChange}
                required
            />
            <Input
                name='password'
                value={formData.password}
                variant='soft'
                placeholder='Contraseña'
                type='password'
                size='lg'
                onChange={handleChange}
                required
            />
            {isError && <p className='text-red-500 text-center'>{error}</p>}
            <Button type='submit' loading={loading} disabled={loading}>
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
        </form>
    );
}

export default Login;
