import { getCategories } from '@/features/Dashboard/Categories/api/services.js';
import { addProduct, deleteProduct, getProducts } from '@/features/Dashboard/Products/api/services.js';
import EditProductModal from '@/features/Dashboard/Products/Components/EditProduct.jsx';
import { Button, Input, Modal, ModalDialog, ModalClose, Typography, Table, Select, Option } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Products() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        imageUrl: ' ',
    });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [viewProduct, setViewProduct] = useState(null); // Para mostrar los detalles de la compañía seleccionada en el modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data.categories);
    };

    const fetchProducts = async () => {
        const response = await getProducts();

        setProducts(response.data.products);
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addProduct(productData);

            if (response.status === 201) {
                Swal.fire({
                    title: 'Producto agregado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                setProductData({ name: '', price: '', description: '', stock: '', category: '' });
                setAddOpen(false);
                fetchProducts();
            }
        } catch {
            Swal.fire({
                title: 'Error al agregar el producto',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleEditClick = (id) => {
        setCurrentProductId(id);
        setEditOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteProduct(id);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Producto eliminado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchProducts();
            }
        } catch {
            Swal.fire({
                title: 'Error al eliminar el producto',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    const handleViewClick = (product) => {
        setViewProduct(product);
    };

    return (
        <div className='w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6'>
            <div className='py-2 flex justify-end'>
                <Button onClick={() => setAddOpen(true)} className='w-full sm:w-auto'>
                    Agregar nuevo producto
                </Button>
            </div>

            {/* Tabla de productos para pantallas grandes */}
            <div className='overflow-x-auto hidden sm:block'>
                <Table variant='outlined' size='lg' stripe='odd' hoverRow stickyHeader className='min-w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Nombre</th>
                            <th className='px-4 py-2 text-left'>Precio</th>
                            <th className='px-4 py-2 text-left'>Descripción</th>
                            <th className='px-4 py-2 text-left'>Stock</th>
                            <th className='px-4 py-2 text-left'>Categoría</th>
                            <th className='px-4 py-2 text-left'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className='border-t'>
                                <td className='px-4 py-2'>{product.id}</td>
                                <td className='px-4 py-2'>{product.name}</td>
                                <td className='px-4 py-2'>{product.price}</td>
                                <td className='px-4 py-2'>{product.description}</td>
                                <td className='px-4 py-2'>{product.stock}</td>
                                <td className='px-4 py-2'>{product.category?.name}</td>
                                <td className='px-4 py-2 flex gap-4'>
                                    <CiEdit
                                        color='blue'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleEditClick(product.id)}
                                    />
                                    <CiTrash
                                        color='red'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleDelete(product.id)}
                                    />
                                    <FaEye
                                        color='green'
                                        size={30}
                                        cursor='pointer'
                                        onClick={() => handleViewClick(product)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Tabla para móviles con solo el nombre y un ícono de ojo */}
            <div className='sm:hidden mt-6'>
                {products.map((product) => (
                    <div key={product.id} className='flex justify-between items-center border-t py-4'>
                        <span>{product.name}</span>
                        <div className='flex gap-4'>
                            <FaEye size={24} color='green' cursor='pointer' onClick={() => handleViewClick(product)} />
                            <CiEdit
                                color='blue'
                                size={24}
                                cursor='pointer'
                                onClick={() => handleEditClick(product.id)}
                            />
                            <CiTrash color='red' size={24} cursor='pointer' onClick={() => handleDelete(product.id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Agregar */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)}>
                <ModalDialog>
                    <ModalClose />
                    <Typography level='h4' fontWeight='lg'>
                        Agregar nuevo producto
                    </Typography>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <Input name='name' placeholder='Nombre' value={productData.name} onChange={handleChange} />
                        <Input name='price' placeholder='Precio' value={productData.price} onChange={handleChange} />
                        <Input
                            name='description'
                            placeholder='Descripción'
                            value={productData.description}
                            onChange={handleChange}
                        />
                        <Input name='stock' placeholder='Stock' value={productData.stock} onChange={handleChange} />
                        <Select
                            name='category'
                            placeholder='Categoría'
                            value={productData.category}
                            onChange={(event, newValue) => setProductData((prev) => ({ ...prev, category: newValue }))}>
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            name='imageUrl'
                            placeholder='Url de la imagen'
                            value={productData.imageUrl}
                            onChange={handleChange}
                        />
                        <Button type='submit'>Agregar</Button>
                    </form>
                </ModalDialog>
            </Modal>

            {/* Modal para ver los detalles del producto */}
            <Modal open={viewProduct !== null} onClose={() => setViewProduct(null)}>
                <ModalDialog>
                    <ModalClose />
                    {viewProduct && (
                        <>
                            <Typography level='h4' fontWeight='lg'>
                                Detalles de {viewProduct.name}
                            </Typography>
                            <div className='mt-4'>
                                <p>
                                    <strong>ID:</strong> {viewProduct.id}
                                </p>
                                <p>
                                    <strong>Precio:</strong> {viewProduct.price}
                                </p>
                                <p>
                                    <strong>Descripción:</strong> {viewProduct.description}
                                </p>
                                <p>
                                    <strong>Stock:</strong> {viewProduct.stock}
                                </p>
                                <p>
                                    <strong>Categoría:</strong> {viewProduct.category?.name}
                                </p>
                            </div>
                        </>
                    )}
                </ModalDialog>
            </Modal>

            {/* Modal Editar */}
            <EditProductModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                productId={currentProductId}
                onProductUpdated={fetchProducts}
            />
        </div>
    );
}

export default Products;
