import {
    getCategory,
    updateCategory,
} from '@/features/Dashboard/Categories/api/services.js';
import {
    Button,
    Input,
    Modal,
    ModalDialog,
    ModalClose,
    Textarea,
    Typography,
} from '@mui/joy';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditCategoryModal({ open, onClose, categoryId, onCategoryUpdated }) {
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        if (categoryId) {
            const fetchCategory = async () => {
                const response = await getCategory(categoryId);
                console.log(response);
                
                setFormData({
                    name: response.data.category.name,
                    description: response.data.category.description,
                });
            };
            fetchCategory();
        }
    }, [categoryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateCategory(categoryId, formData);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Categoría actualizada',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onClose();
                onCategoryUpdated();
            }
        } catch {
            Swal.fire({
                title: 'Error al actualizar la categoría',
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
                <Typography level='h4' fontWeight='lg'>Editar categoría</Typography>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                    <Input
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Nombre'
                    />
                    <Textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Descripción'
                    />
                    <Button type='submit'>Guardar cambios</Button>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default EditCategoryModal;
