import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Textarea, Select, Option } from '@mui/joy';
import { getProduct, updateProduct } from '@/features/Dashboard/Products/api/services.js';
import { getCategories } from '@/features/Dashboard/Categories/api/services.js';
import Swal from 'sweetalert2';

function EditProductModal({ open, onClose, productId, onProductUpdated }) {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        imageUrl: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (open && productId) {
                try {
                    const [productRes, categoryRes] = await Promise.all([getProduct(productId), getCategories()]);
                    const product = productRes.data.product;
                    setProductData({
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        categoryId: product.categoryId,
                        imageUrl: product.imageUrl,
                    });
                    setCategories(categoryRes.data.categories);
                } catch (error) {
                    console.error('Error al obtener producto o categorías:', error);
                }
            }
        };

        fetchData();
    }, [open, productId]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? Number(value) : value;
        setProductData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProduct(productId, productData);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Producto actualizado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                onProductUpdated(); // refrescar lista de productos
                onClose(); // cerrar modal
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el producto.',
                icon: 'error',
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <ModalClose />
                <Typography level='h4'>Editar producto</Typography>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                    <Input
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        placeholder='Nombre del producto'
                        required
                    />
                    <Textarea
                        name='description'
                        value={productData.description}
                        onChange={handleChange}
                        placeholder='Descripción del producto'
                    />
                    <Input
                        type='number'
                        name='stock'
                        value={productData.stock}
                        onChange={handleChange}
                        placeholder='Cantidad'
                    />
                    <Input
                        type='number'
                        name='price'
                        value={productData.price}
                        onChange={handleChange}
                        placeholder='Precio'
                    />
                    <Select
                        name='categoryId'
                        value={productData.categoryId}
                        onChange={(_, value) => setProductData((prev) => ({ ...prev, categoryId: value }))}>
                        {categories.map((cat) => (
                            <Option key={cat.id} value={cat.id}>
                                {cat.name}
                            </Option>
                        ))}
                    </Select>
                    <div>
                        <label>Url de la imagen</label>
                        <Input
                            name='imageUrl'
                            value={productData.imageUrl}
                            onChange={handleChange}
                            placeholder='URL de imagen'
                        />
                    </div>
                    <Button type='submit'>Actualizar producto</Button>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default EditProductModal;
