import { addRole, deleteRole, getRoles } from '@/features/Dashboard/Roles/api/services.js';
import EditRoleModal from '@/features/Dashboard/Roles/Components/EditRole.jsx';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Table } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';

function Roles() {
    const [roleData, setRoleData] = useState({ name: '', description: '' });
    const [roles, setRoles] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentRoleId, setCurrentRoleId] = useState(null);
    const [viewRole, setViewRole] = useState(null); // Para mostrar los detalles del rol seleccionado en el modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addRole(roleData);
            
            if (response.status === 201) {
                Swal.fire({
                    title: 'Rol agregado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setRoleData({ name: '', description: '' });
                setAddOpen(false);
                fetchRoles();
            }
        } catch {
            Swal.fire({
                title: 'Error al agregar el rol',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleEditClick = (id) => {
        setCurrentRoleId(id);
        setEditOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteRole(id);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Rol eliminado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchRoles();
            }
        } catch {
            Swal.fire({
                title: 'Error al eliminar el rol',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleViewClick = (role) => {
        setViewRole(role);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6'>
            <div className='py-2 flex justify-end'>
                <Button onClick={() => setAddOpen(true)} className='w-full sm:w-auto'>
                    Agregar nuevo rol
                </Button>
            </div>

            {/* Tabla de roles para pantallas grandes */}
            <div className="overflow-x-auto hidden sm:block">
                <Table variant='outlined' size='lg' stripe='odd' hoverRow stickyHeader className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Nombre</th>
                            <th className='px-4 py-2 text-left'>Descripción</th>
                            <th className='px-4 py-2 text-left'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} className='border-t'>
                                <td className='px-4 py-2'>{role.id}</td>
                                <td className='px-4 py-2'>{role.name}</td>
                                <td className='px-4 py-2'>{role.description}</td>
                                <td className='px-4 py-2 flex gap-4'>
                                    <CiEdit
                                        color='blue'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleEditClick(role.id)}
                                    />
                                    <CiTrash
                                        color='red'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleDelete(role.id)}
                                    />
                                    <FaEye
                                        color='green'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleViewClick(role)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Tabla para móviles con solo el nombre y un ícono de ojo */}
            <div className="sm:hidden mt-6">
                {roles.map((role) => (
                    <div key={role.id} className="flex justify-between items-center border-t py-4">
                        <span>{role.name}</span>
                        <div className="flex gap-4">
                            <FaEye
                                size={24}
                                color="green"
                                cursor="pointer"
                                onClick={() => handleViewClick(role)}
                            />
                            <CiEdit
                                color="blue"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleEditClick(role.id)}
                            />
                            <CiTrash
                                color="red"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleDelete(role.id)}
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
                        Agregar nuevo rol
                    </Typography>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <Input name='name' placeholder='Nombre' value={roleData.name} onChange={handleChange} />
                        <Input
                            name='description'
                            placeholder='Descripción'
                            value={roleData.description}
                            onChange={handleChange}
                        />
                        <Button type='submit'>Agregar</Button>
                    </form>
                </ModalDialog>
            </Modal>

            {/* Modal para ver los detalles del rol */}
            <Modal open={viewRole !== null} onClose={() => setViewRole(null)}>
                <ModalDialog>
                    <ModalClose />
                    {viewRole && (
                        <>
                            <Typography level='h4' fontWeight='lg'>
                                Detalles de {viewRole.name}
                            </Typography>
                            <div className='mt-4'>
                                <p><strong>ID:</strong> {viewRole.id}</p>
                                <p><strong>Descripción:</strong> {viewRole.description}</p>
                            </div>
                        </>
                    )}
                </ModalDialog>
            </Modal>

            {/* Modal Editar */}
            <EditRoleModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                roleId={currentRoleId}
                onRoleUpdated={fetchRoles}
            />
        </div>
    );
}

export default Roles;
