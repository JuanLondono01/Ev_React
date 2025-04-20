import { addUser, deleteUser, getUsers } from './api/services.js';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Table, Select, Option } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditUserModal from '@/features/Dashboard/Users/Components/EditUser.jsx';
import { getRoles } from '@/features/Dashboard/Roles/api/services.js';
import { getCompanies } from '@/features/Dashboard/Company/api/services.js';

function Users() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
        roleId: '',
        companyId: '',
    });
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [viewUser, setViewUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
    };

    const fetchCompanies = async () => {
        const response = await getCompanies();
        setCompanies(response.data);
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addUser(userData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Usuario agregado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setUserData({
                    fullName: '',
                    email: '',
                    password: '',
                    roleId: '',
                    companyId: '',
                });
                setAddOpen(false);
                fetchUsers();
            }
        } catch {
            Swal.fire({
                title: 'Error al agregar el usuario',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleEditClick = (id) => {
        setCurrentUserId(id);
        setEditOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Usuario eliminado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchUsers();
            }
        } catch {
            Swal.fire({
                title: 'Error al eliminar el usuario',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleViewClick = (user) => {
        setViewUser(user);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6'>
            <div className='py-2 flex justify-end'>
                <Button onClick={() => setAddOpen(true)} className='w-full sm:w-auto'>
                    Agregar nuevo usuario
                </Button>
            </div>

            {/* Tabla de usuarios para pantallas grandes */}
            <div className='overflow-x-auto hidden sm:block'>
                <Table variant='outlined' size='lg' stripe='odd' hoverRow stickyHeader className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Nombre Completo</th>
                            <th className='px-4 py-2 text-left'>Correo</th>
                            <th className='px-4 py-2 text-left'>Rol</th>
                            <th className='px-4 py-2 text-left'>Compañía</th>
                            <th className='px-4 py-2 text-left'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className='border-t'>
                                <td className='px-4 py-2'>{user.id}</td>
                                <td className='px-4 py-2'>{user.fullName}</td>
                                <td className='px-4 py-2'>{user.email}</td>
                                <td className='px-4 py-2'>{user.role.name}</td>
                                <td className='px-4 py-2'>{user.company.name}</td>
                                <td className='px-4 py-2 flex gap-4'>
                                    <CiEdit
                                        color='blue'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleEditClick(user.id)}
                                    />
                                    <CiTrash
                                        color='red'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleDelete(user.id)}
                                    />
                                    <FaEye
                                        color='green'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleViewClick(user)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Tabla para móviles */}
            <div className='sm:hidden mt-6'>
                {users.map((user) => (
                    <div key={user.id} className='flex justify-between items-center border-t py-4'>
                        <span>{user.fullName}</span>
                        <div className='flex gap-4'>
                            <FaEye size={24} color='green' cursor='pointer' onClick={() => handleViewClick(user)} />
                            <CiEdit color='blue' size={24} cursor='pointer' onClick={() => handleEditClick(user.id)} />
                            <CiTrash color='red' size={24} cursor='pointer' onClick={() => handleDelete(user.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Agregar */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)}>
                <ModalDialog>
                    <ModalClose />
                    <Typography level='h4' fontWeight='lg'>
                        Agregar nuevo usuario
                    </Typography>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <Input
                            name='fullName'
                            placeholder='Nombre Completo'
                            value={userData.fullName}
                            onChange={handleChange}
                        />
                        <Input
                            type='email'
                            name='email'
                            placeholder='Correo Electrónico'
                            value={userData.email}
                            onChange={handleChange}
                        />
                        <Input
                            type='password'
                            name='password'
                            placeholder='Contraseña'
                            value={userData.password}
                            onChange={handleChange}
                        />
                        <Select
                            name='roleId'
                            placeholder="Rol"
                            value={userData.roleId}
                            onChange={(event, newValue) => setUserData((prev) => ({ ...prev, roleId: newValue }))}>
                            {roles.map((role) => (
                                <Option key={role.id} value={role.id}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            name='companyId'
                            placeholder='Compañía'
                            value={userData.companyId}
                            onChange={(event, newValue) => setUserData((prev) => ({ ...prev, companyId: newValue }))}>
                            {companies.map((comp) => (
                                <Option key={comp.id} value={comp.id}>
                                    {comp.name}
                                </Option>
                            ))}
                        </Select>
                        <Button type='submit'>Agregar Usuario</Button>
                    </form>
                </ModalDialog>
            </Modal>

            {/* Modal para ver los detalles del usuario */}
            <Modal open={viewUser !== null} onClose={() => setViewUser(null)}>
                <ModalDialog>
                    <ModalClose />
                    {viewUser && (
                        <>
                            <Typography level='h4' fontWeight='lg'>
                                Detalles de {viewUser.fullName}
                            </Typography>
                            <div className='mt-4'>
                                <p>
                                    <strong>ID:</strong> {viewUser.id}
                                </p>
                                <p>
                                    <strong>Correo:</strong> {viewUser.email}
                                </p>
                                <p>
                                    <strong>Rol:</strong> {viewUser.role.name}
                                </p>
                                <p>
                                    <strong>Compañía:</strong> {viewUser.company.name}
                                </p>
                            </div>
                        </>
                    )}
                </ModalDialog>
            </Modal>

            {/* Modal de edición */}
            <EditUserModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                userId={currentUserId}
                onUserUpdated={fetchUsers}
            />
        </div>
    );
}

export default Users;
