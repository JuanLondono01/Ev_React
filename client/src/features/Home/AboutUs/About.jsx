import React from 'react';
import Navbar from '../../Global/Navbar.jsx';
import mariaImage from '../../../assets/imgs/maria.webp';
import lauraImage from '../../../assets/imgs/laura.webp';
import juliana from '../../../assets/imgs/juliana.webp';
import natalia from '../../../assets/imgs/natalia.webp';
import banner from '../../../assets/imgs/aboutBanner.webp';
import carlos from '../../../assets/imgs/carlos.webp';
import andres from '../../../assets/imgs/andres.webp';
import fernando from '../../../assets/imgs/fernando.webp';
import santiago from '../../../assets/imgs/santiago.webp';

const teamMembers = [
    {
        name: 'María González',
        email: 'maria@caninossabs.com',
        description: 'Fundadora y CEO de Caninos SABS. Apasionada por el bienestar animal y líder en innovación.',
        image: mariaImage,
    },
    {
        name: 'Carlos Ramírez',
        email: 'carlos@caninossabs.com',
        description: 'Veterinario jefe con más de 10 años de experiencia en salud canina.',
        image: carlos,
    },
    {
        name: 'Laura Torres',
        email: 'laura@caninossabs.com',
        description: 'Responsable de marketing y comunicación. Ama conectar con la comunidad canina.',
        image: lauraImage,
    },
    {
        name: 'Andrés Mejía',
        email: 'andres@caninossabs.com',
        description:
            'Encargado de logística y distribución. Garantiza que los productos lleguen a tiempo y en perfecto estado.',
        image: andres,
    },
    {
        name: 'Juliana Ríos',
        email: 'juliana@caninossabs.com',
        description: 'Especialista en comportamiento canino. Se enfoca en la educación positiva y entrenamiento.',
        image: juliana,
    },
    {
        name: 'Fernando López',
        email: 'fernando@caninossabs.com',
        description: 'Entrenador canino apasionado y dedicado.',
        image: fernando,
    },
    {
        name: 'Natalia Duarte',
        email: 'natalia@caninossabs.com',
        description: 'Atención al cliente. Siempre dispuesta a ayudar con una sonrisa y amor por los animales.',
        image: natalia,
    },
    {
        name: 'Santiago Vega',
        email: 'santiago@caninossabs.com',
        description: 'Fotógrafo y creador de contenido. Captura los mejores momentos de nuestros peludos clientes.',
        image: santiago,
    },
];

const AboutUs = () => {
    return (
        <>
            <section id='about-us' className='bg-white text-black py-20'>
                <div className='container mx-auto text-center px-4'>
                    {/* Quiénes Somos */}
                    <h2 className='text-3xl font-bold mb-6'>Quiénes Somos</h2>
                    <p className='text-lg max-w-3xl mx-auto mb-6'>
                        Caninos SABS es una empresa dedicada al cuidado y bienestar de los perros. Con años de
                        experiencia, ofrecemos productos y servicios de calidad para nuestros amigos peludos.
                    </p>
                    <img
                        alt='Sobre Caninos SABS'
                        className='w-full h-96 object-cover rounded-lg shadow-lg mb-8'
                        src={banner}
                    />
                    <p className='text-sm text-gray-600 mb-16'>
                        Nuestra misión es mejorar la calidad de vida de los perros a través de productos innovadores y
                        servicios de confianza.
                    </p>

                    {/* Historia */}
                    <div className='max-w-4xl mx-auto mb-16'>
                        <h3 className='text-2xl font-semibold mb-4'>Nuestra Historia</h3>
                        <p className='text-base text-gray-700 leading-relaxed'>
                            Caninos SABS nació del amor incondicional por los animales y el deseo de crear un impacto
                            positivo en sus vidas. Fundada en 2015 por María González, la empresa comenzó como una
                            pequeña tienda local especializada en productos naturales para perros. Con el tiempo, fuimos
                            expandiendo nuestros servicios, incluyendo asesoría veterinaria, entrenamiento y cuidado
                            integral. Hoy, somos una referencia nacional en el sector, comprometidos con la calidad, la
                            innovación y el bienestar animal.
                        </p>
                    </div>

                    {/* Misión y Visión */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20 text-white'>
                        <div className='bg-sky-300/80 p-6 rounded-xl shadow-md'>
                            <h4 className='text-xl font-bold mb-2'>Nuestra Misión</h4>
                            <p className='text-base'>
                                Brindar productos y servicios de alta calidad que contribuyan al bienestar y la
                                felicidad de los perros, fortaleciendo el vínculo entre ellos y sus familias.
                            </p>
                        </div>
                        <div className='bg-sky-300/80 p-6 rounded-xl shadow-md'>
                            <h4 className='text-xl font-bold mb-2'>Nuestra Visión</h4>
                            <p className='text-base'>
                                Ser la empresa líder en soluciones integrales para el cuidado canino en Latinoamérica,
                                reconocida por su compromiso ético, innovación y amor por los animales.
                            </p>
                        </div>
                    </div>

                    {/* Equipo */}
                    <h3 className='text-2xl font-semibold mb-8'>Nuestro Equipo</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-200'>
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={`Foto de ${member.name}`}
                                        className='w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-sky-300'
                                    />
                                ) : (
                                    <div className='w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center text-white text-xl font-semibold'>
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                                <h4 className='text-xl font-bold mb-1'>{member.name}</h4>
                                <p className='text-sm text-gray-600 mb-2'>{member.email}</p>
                                <p className='text-gray-700 text-sm'>{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
