import { addCategory, deleteCategory, getCategories } from '@/features/Dashboard/Categories/api/services.js';
import EditCategoryModal from '@/features/Dashboard/Categories/Components/EditCategory.jsx';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Table } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Categories() {
    const [categoryData, setCategoryData] = useState({ name: '', description: '' });
    const [categories, setCategories] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [viewCategory, setViewCategory] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data.categories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCategory(categoryData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Categoría agregada con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setCategoryData({ name: '', description: '' });
                setAddOpen(false);
                fetchCategories();
            }
        } catch {
            Swal.fire({
                title: 'Error al agregar la categoría',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleEditClick = (id) => {
        setCurrentCategoryId(id);
        setEditOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteCategory(id);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Categoría eliminada con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchCategories();
            }
        } catch {
            Swal.fire({
                title: 'Error al eliminar la categoría',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleViewClick = (category) => {
        setViewCategory(category);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6'>
            <div className='py-2 flex justify-end'>
                <Button onClick={() => setAddOpen(true)} className='w-full sm:w-auto'>
                    Agregar nueva categoría
                </Button>
            </div>

            {/* Tabla de categorías para pantallas grandes */}
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
                        {categories.map((category) => (
                            <tr key={category.id} className='border-t'>
                                <td className='px-4 py-2'>{category.id}</td>
                                <td className='px-4 py-2'>{category.name}</td>
                                <td className='px-4 py-2'>{category.description}</td>
                                <td className='px-4 py-2 flex gap-4'>
                                    <CiEdit
                                        color='blue'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleEditClick(category.id)}
                                    />
                                    <CiTrash
                                        color='red'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleDelete(category.id)}
                                    />
                                    <FaEye
                                        color='green'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleViewClick(category)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Tabla para móviles */}
            <div className="sm:hidden mt-6">
                {categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center border-t py-4">
                        <span>{category.name}</span>
                        <div className="flex gap-4">
                            <FaEye
                                size={24}
                                color="green"
                                cursor="pointer"
                                onClick={() => handleViewClick(category)}
                            />
                            <CiEdit
                                color="blue"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleEditClick(category.id)}
                            />
                            <CiTrash
                                color="red"
                                size={24}
                                cursor="pointer"
                                onClick={() => handleDelete(category.id)}
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
                        Agregar nueva categoría
                    </Typography>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <Input name='name' placeholder='Nombre' value={categoryData.name} onChange={handleChange} />
                        <Input
                            name='description'
                            placeholder='Descripción'
                            value={categoryData.description}
                            onChange={handleChange}
                        />
                        <Button type='submit'>Agregar</Button>
                    </form>
                </ModalDialog>
            </Modal>

            {/* Modal Ver detalles */}
            <Modal open={viewCategory !== null} onClose={() => setViewCategory(null)}>
                <ModalDialog>
                    <ModalClose />
                    {viewCategory && (
                        <>
                            <Typography level='h4' fontWeight='lg'>
                                Detalles de {viewCategory.name}
                            </Typography>
                            <div className='mt-4'>
                                <p><strong>ID:</strong> {viewCategory.id}</p>
                                <p><strong>Descripción:</strong> {viewCategory.description}</p>
                            </div>
                        </>
                    )}
                </ModalDialog>
            </Modal>

            {/* Modal Editar */}
            <EditCategoryModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                categoryId={currentCategoryId}
                onCategoryUpdated={fetchCategories}
            />
        </div>
    );
}

export default Categories;
