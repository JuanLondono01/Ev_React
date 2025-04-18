import { getCompany, updateCompany } from '@/features/Dashboard/Company/api/services.js';
import { Button, Input, Modal, ModalDialog, ModalClose, Textarea, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditCompanyModal({ open, onClose, companyId, onCompanyUpdated }) {
    const [formData, setFormData] = useState({ name: '', nit: '', address: '', phone: '', email: '' });

    useEffect(() => {
        if (companyId) {
            const fetchCompany = async () => {
                try {
                    const response = await getCompany(companyId);
                    console.log(response);

                    setFormData({
                        name: response.data.name,
                        nit: response.data.nit,
                        address: response.data.address,
                        phone: response.data.phone,
                        email: response.data.email,
                    });
                } catch (error) {
                    console.error('Error al obtener la compañía:', error);
                }
            };
            fetchCompany();
        }
    }, [companyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateCompany(companyId, formData);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Compañía actualizada',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onClose();
                onCompanyUpdated();
            }
        } catch (error) {
            console.error('Error al actualizar la compañía:', error);
            Swal.fire({
                title: 'Error al actualizar la compañía',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <ModalClose />
                <Typography level='h4' fontWeight='lg'>
                    Editar compañía
                </Typography>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                    <Input name='name' placeholder='Nombre' value={formData.name} onChange={handleChange} />
                    <Input name='nit' placeholder='NIT' value={formData.nit} onChange={handleChange} />
                    <Input name='address' placeholder='Direccion' value={formData.address} onChange={handleChange} />
                    <Input name='phone' placeholder='Telefono' value={formData.phone} onChange={handleChange} />
                    <Input name='email' placeholder='Correo' value={formData.email} onChange={handleChange} />
                    <Button type='submit'>Guardar cambios</Button>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default EditCompanyModal;
