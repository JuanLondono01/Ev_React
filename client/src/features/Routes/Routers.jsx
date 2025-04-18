import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.jsx';
import Users from '../Dashboard/Users/Users.jsx';
import Roles from '../Dashboard/Roles/Roles.jsx';
import Company from '../Dashboard/Company/Company.jsx';
import Products from '../Dashboard/Products/Products.jsx';
import ProductsHome from '../Home/Products/Products.jsx';
import Categories from '../Dashboard/Categories/Categories.jsx';
import CategoryList from '@/features/Home/Categories/components/Categories.jsx';
import AboutUs from '../Home/AboutUs/About.jsx';
import Home from '../Home/Home.jsx';
import Landing from '../Home/landing/Landing.jsx';
import CategoriesHome from '../Home/Categories/CategoriesHome.jsx';
import Login from '../login/Login.jsx';
import ProductsCategory from '@/features/Home/Categories/components/ProductsCategory.jsx';
import Footer from '@/features/Global/Footer.jsx';
function Routers() {
    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Home />}>
                    <Route index element={<Landing />} />
                    <Route path='AboutUs' element={<AboutUs />} />
                    <Route path='Products' element={<ProductsHome />} />
                    <Route path='Categories' element={<CategoriesHome />}>
                        <Route index element={<CategoryList />} />
                        <Route path='Products/:categoryId' element={<ProductsCategory />} />
                    </Route>
                    <Route path='Login' element={<Login />} />
                </Route>

                {/* Protected Routes */}
                <Route path='/Dashboard' element={<Dashboard />}>
                    <Route index element={<Users />} />
                    <Route path='Roles' element={<Roles />} />
                    <Route path='Company' element={<Company />} />
                    <Route path='Products' element={<Products />} />
                    <Route path='Categories' element={<Categories />} />
                </Route>
            </Routes>
        </>
    );
}

export default Routers;
