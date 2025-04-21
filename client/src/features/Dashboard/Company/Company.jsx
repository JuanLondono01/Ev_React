import { addCompany, deleteCompany, getCompanies } from '@/features/Dashboard/Company/api/services.js';
import EditCompanyModal from '@/features/Dashboard/Company/Components/EditCompany.jsx';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Table } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiTrash} from 'react-icons/ci';
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';

function Companies() {
    const [companyData, setCompanyData] = useState({ name: '', nit: '', address: '', phone: '', email: '' });
    const [companies, setCompanies] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(null);
    const [viewCompany, setViewCompany] = useState(null); // Para mostrar los detalles de la empresa seleccionada en el modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCompanies = async () => {
        const response = await getCompanies();
        setCompanies(response.data);
        
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCompany(companyData);
            
            if (response.status === 201) {
                Swal.fire({
                    title: 'Compañía agregada con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setCompanyData({ name: '', nit: '', address: '', phone: '', email: '' });
                setAddOpen(false);
                fetchCompanies();
            }
        } catch {
            Swal.fire({
                title: 'Error al agregar la compañía',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleEditClick = (id) => {
        setCurrentCompanyId(id);
        setEditOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteCompany(id);
            
            if (response.status === 204) {
                Swal.fire({
                    title: 'Compañía eliminada con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch {
            Swal.fire({
                title: 'Error al eliminar la compañía',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        } finally{
            fetchCompanies()
        }
    };

    const handleViewClick = (company) => {
        setViewCompany(company);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6'>
            {/* Botón para agregar una nueva compañía */}
            <div className='py-2 flex justify-end'>
                <Button onClick={() => setAddOpen(true)} className='w-full sm:w-auto'>
                    Agregar nueva compañía
                </Button>
            </div>

            {/* Tabla de compañías para pantallas grandes */}
            <div className="overflow-x-auto hidden sm:block">
                <Table variant='outlined' size='lg' stripe='odd' hoverRow stickyHeader className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Nombre</th>
                            <th className='px-4 py-2 text-left'>Dirección</th>
                            <th className='px-4 py-2 text-left'>Teléfono</th>
                            <th className='px-4 py-2 text-left'>Correo</th>
                            <th className='px-4 py-2 text-left'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id} className='border-t'>
                                <td className='px-4 py-2'>{company.id}</td>
                                <td className='px-4 py-2'>{company.name}</td>
                                <td className='px-4 py-2'>{company.address}</td>
                                <td className='px-4 py-2'>{company.phone}</td>
                                <td className='px-4 py-2'>{company.email}</td>
                                <td className='px-4 py-2 flex gap-4'>
                                    <CiEdit
                                        color='blue'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleEditClick(company.id)}
                                    />
                                    <CiTrash
                                        color='red'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleDelete(company.id)}
                                    />
                                    <FaEye
                                        color='green'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleViewClick(company)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Tabla para móviles con solo el nombre y un ícono de ojo */}
            <div className="sm:hidden mt-6">
                {companies.map((company) => (
                    <div key={company.id} className="flex justify-between items-center border-t py-4">
                        <span>{company.name}</span>
                        <div className="flex gap-4">
                            <FaEye
                                size={24}
                                color="green"
                                cursor="pointer"
                                onClick={() => handleViewClick(company)}
                            />
                            <CiEdit
                                color="blue"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleEditClick(company.id)}
                            />
                            <CiTrash
                                color="red"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleDelete(company.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Agregar */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)}>
                <ModalDialog>
                    <ModalClose />
                    <Typography level='h4' fontWeight='lg'>
                        Agregar nueva compañía
                    </Typography>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <Input name='name' placeholder='Nombre' value={companyData.name} onChange={handleChange} />
                        <Input name='nit' placeholder='NIT' value={companyData.nit} onChange={handleChange} />
                        <Input
                            name='address'
                            placeholder='Dirección'
                            value={companyData.address}
                            onChange={handleChange}
                        />
                        <Input name='phone' placeholder='Teléfono' value={companyData.phone} onChange={handleChange} />
                        <Input name='email' placeholder='Correo' value={companyData.email} onChange={handleChange} />
                        <Button type='submit'>Agregar</Button>
                    </form>
                </ModalDialog>
            </Modal>

            {/* Modal para ver los detalles de la empresa */}
            <Modal open={viewCompany !== null} onClose={() => setViewCompany(null)}>
                <ModalDialog>
                    <ModalClose />
                    {viewCompany && (
                        <>
                            <Typography level='h4' fontWeight='lg'>
                                Detalles de {viewCompany.name}
                            </Typography>
                            <div className='mt-4'>
                                <p><strong>ID:</strong> {viewCompany.id}</p>
                                <p><strong>Dirección:</strong> {viewCompany.address}</p>
                                <p><strong>Teléfono:</strong> {viewCompany.phone}</p>
                                <p><strong>Correo:</strong> {viewCompany.email}</p>
                                <p><strong>NIT:</strong> {viewCompany.nit}</p>
                            </div>
                        </>
                    )}
                </ModalDialog>
            </Modal>

            {/* Modal Editar */}
            <EditCompanyModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                companyId={currentCompanyId}
                onCompanyUpdated={fetchCompanies}
            />
        </div>
    );
}

export default Companies;
