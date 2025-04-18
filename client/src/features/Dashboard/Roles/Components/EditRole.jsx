import { Modal, Sheet, Typography, Input, Textarea, Button } from '@mui/joy';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getRole, updateRole } from '@/features/Dashboard/Roles/api/services.js';

function EditRoleModal({ open, onClose, roleId, onRoleUpdated }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        const fetchRole = async () => {
            if (!roleId) return;
            const response = await getRole(roleId);
            const role = response.data;
            setForm({
                name: role.name,
                description: role.description,
            });
        };
        if (open) fetchRole();
    }, [roleId, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateRole(roleId, form);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Rol actualizado con éxito',
                    showConfirmButton: false,
                    timer: 1500,
                    icon: 'success',
                });
            }
        } catch {
            Swal.fire({
                title: 'Error al actualizar el rol',
                showConfirmButton: false,
                timer: 1500,
                icon: 'error',
            });
        } finally {
            onRoleUpdated();
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Sheet variant='outlined' sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                <Typography level='h4' fontWeight='lg'>Editar Rol</Typography>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                    <Input
                        name='name'
                        placeholder='Nombre del rol'
                        value={form.name}
                        onChange={handleChange}
                    />
                    <Textarea
                        name='description'
                        placeholder='Descripción del rol'
                        value={form.description}
                        onChange={handleChange}
                    />
                    <Button type='submit'>Guardar cambios</Button>
                </form>
            </Sheet>
        </Modal>
    );
}

export default EditRoleModal;
