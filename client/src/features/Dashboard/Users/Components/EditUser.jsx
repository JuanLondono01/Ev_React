import { useEffect, useState } from 'react';
import { Input, Modal, Option, Select, Sheet, Typography, Button } from '@mui/joy';
import { getUser, updateUser } from '@/features/Dashboard/Users/api/services.js';
import Swal from 'sweetalert2';
import { getRoles } from '@/features/Dashboard/Roles/api/services.js';
import { getCompanies } from '@/features/Dashboard/Company/api/services.js';
function EditUserModal({ open, onClose, userId, onUserUpdated }) {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        roleId: 1,
        companyId: 1,
    });
    const [roles, setRoles] = useState([]);
    const [companies, setCompanies] = useState([]);
    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
    };
    const fetchCompanies = async () => {
        const response = await getCompanies();
        setCompanies(response.data);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            const response = await getUser(userId);
            const user = response.data;
            setForm({
                fullName: user.fullName,
                email: user.email,
                password: '',
                roleId: user.role.id,
                companyId: user.company.id,
            });
        };
        fetchRoles();
        fetchCompanies();
        if (open) fetchUser();
    }, [userId, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(userId, form);
            if (response.status == 200) {
                Swal.fire({
                    title: 'Usuario actualizado con exito',
                    showConfirmButton: false,
                    timer: 1500,
                    icon: 'success',
                });
            }
        } catch {
            alert('ocurrio un error al actualizar el usuario');
        } finally {
            onUserUpdated();
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Sheet variant='outlined' sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                <Typography component='h2' level='h4' textColor='inherit' sx={{ fontWeight: 'lg', mb: 1 }}>
                    Editar usuario
                </Typography>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-4'>
                            <Input
                                name='fullName'
                                placeholder='Nombre Completo'
                                value={form.fullName}
                                onChange={handleChange}
                                size='lg'
                            />
                            <Input
                                name='email'
                                type='email'
                                placeholder='Correo Electrónico'
                                value={form.email}
                                onChange={handleChange}
                                size='lg'
                            />
                            <Input
                                name='password'
                                type='password'
                                placeholder='Nueva Contraseña (opcional)'
                                value={form.password}
                                onChange={handleChange}
                                size='lg'
                            />
                            <div>
                                <label>Rol</label>
                                <Select
                                    value={form.roleId}
                                    onChange={(_, value) => handleSelectChange('roleId', value)}
                                    size='lg'>
                                    {roles.map((rol) => (
                                        <Option key={rol.id} value={rol.id}>
                                            {rol.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <label>Compañía</label>
                                <Select
                                    value={form.companyId}
                                    onChange={(_, value) => handleSelectChange('companyId', value)}
                                    size='lg'>
                                    {companies?.map((comp) => (
                                        <Option value={comp.id} key={comp.id}>
                                            {comp.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <Button type='submit' size='lg'>
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                </div>
            </Sheet>
        </Modal>
    );
}

export default EditUserModal;
