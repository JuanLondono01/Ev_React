import React from 'react';
import mariaImage from '../../../assets/imgs/maria.webp';
import lauraImage from '../../../assets/imgs/laura.webp';
import juliana from '../../../assets/imgs/juliana.webp';
import banner from '../../../assets/imgs/bannerabout.avif';

const teamMembers = [
    {
        name: 'María González',
        email: 'maria@caninossabs.com',
        description: 'Fundadora y CEO de Caninos SABS. Apasionada por el bienestar animal y líder en innovación.',
        image: mariaImage,
    },
    {
        name: 'Laura Torres',
        email: 'laura@caninossabs.com',
        description: 'Responsable de marketing y comunicación. Ama conectar con la comunidad canina.',
        image: lauraImage,
    },
    {
        name: 'Juliana Ríos',
        email: 'juliana@caninossabs.com',
        description: 'Especialista en comportamiento canino. Se enfoca en la educación positiva y entrenamiento.',
        image: juliana,
    },
];

const AboutUs = () => {
    return (
        <>
            <section id='about-us' className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-20'>
                <div className='container mx-auto text-center px-6'>
                    {/* Quiénes Somos */}
                    <h2 className='text-4xl font-extrabold mb-6'>Quiénes Somos</h2>
                    <p className='text-lg max-w-3xl mx-auto mb-6'>
                        En Caninos SABS, nuestra misión es crear un vínculo más profundo entre los perros y sus
                        familias, mejorando su bienestar a través de productos innovadores y servicios de alta calidad.
                        Con años de experiencia en el sector, somos un equipo apasionado y comprometido con la salud y
                        felicidad de cada uno de nuestros peludos clientes.
                    </p>
                    <img
                        alt='Sobre Caninos SABS'
                        className='w-full h-96 object-cover rounded-lg shadow-2xl mb-8'
                        src={banner}
                    />
                    <p className='text-sm text-gray-200 mb-16'>
                        Desde nuestros inicios, nos hemos enfocado en ofrecer lo mejor para los perros, con un
                        enfoque ético, responsable y siempre buscando la innovación en cada uno de nuestros productos y
                        servicios.
                    </p>

                    {/* Historia */}
                    <div className='max-w-4xl mx-auto mb-16'>
                        <h3 className='text-2xl font-semibold mb-4'>Nuestra Historia</h3>
                        <p className='text-base text-gray-200 leading-relaxed'>
                            Caninos SABS fue fundada en 2015 por María González, una amante de los animales y una mujer
                            visionaria. La idea surgió tras notar la falta de opciones en el mercado para productos
                            naturales y de calidad para perros. Lo que comenzó como una pequeña tienda especializada en
                            el bienestar animal, pronto creció hasta convertirse en un referente a nivel nacional.
                        </p>
                        <p className='text-base text-gray-200 leading-relaxed mt-4'>
                            A lo largo de los años, hemos expandido nuestra oferta, incorporando servicios veterinarios,
                            entrenamiento especializado, asesoría nutricional y más. Nuestra empresa está respaldada por un
                            equipo de profesionales dedicados que trabajan para mejorar la vida de los perros y sus
                            familias, convirtiéndonos en aliados de confianza para todos aquellos que buscan lo mejor para
                            sus compañeros peludos.
                        </p>
                    </div>

                    {/* Misión y Visión */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20'>
                        <div className='bg-sky-300/80 p-6 rounded-xl shadow-xl'>
                            <h4 className='text-xl font-bold mb-2 text-white'>Nuestra Misión</h4>
                            <p className='text-base text-white'>
                                Brindar productos y servicios de alta calidad que contribuyan al bienestar y la
                                felicidad de los perros, fortaleciendo el vínculo entre ellos y sus familias. Nos
                                comprometemos a innovar continuamente en el cuidado canino y ser un referente ético en la
                                industria.
                            </p>
                        </div>
                        <div className='bg-sky-300/80 p-6 rounded-xl shadow-xl'>
                            <h4 className='text-xl font-bold mb-2 text-white'>Nuestra Visión</h4>
                            <p className='text-base text-white'>
                                Ser la empresa líder en soluciones integrales para el cuidado canino en Latinoamérica,
                                reconocida por su compromiso ético, innovación y amor por los animales. Queremos llegar a
                                cada rincón de la región, llevando nuestros productos y servicios a todas las familias
                                que buscan mejorar la vida de sus perros.
                            </p>
                        </div>
                    </div>

                    {/* Equipo */}
                    <h3 className='text-2xl font-semibold mb-8 text-white'>Nuestro Equipo</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className='bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center border-2 border-gray-200'>
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
                                <h4 className='text-xl font-semibold mb-1 text-black'>{member.name}</h4>
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
