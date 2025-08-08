/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, {useState, useEffect} from 'react';
import {Typography, Button} from '@mui/material';
import axios from 'axios';
import {useSnack} from '../../context/useSnack';
import NavBar from '../../Components/Common/NavBar';
import Footer from '../../Components/Common/Footer';
import AddProductModal from '../../Components/AddProductModal';
import ProductCard from '../../Components/Common/ProductCard';

interface itemProp {
  image: string;
  description: string;
  name: string;
  auc_amount: number;
  is_open: Boolean;
  end_date: Date;
  id: number;
}

const UserProducts: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const {showSnack} = useSnack();
  console.log(products);

  const productList =
    products &&
    products.map((product: itemProp) => (
      <ProductCard
        key={product.id}
        image={product.image}
        description={product.description}
        title={product.name}
        price={product.auc_amount}
        closed={!product.is_open}
        endTime={new Date(product.end_date)}
        id={product.id}
      />
    ));

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProducts = async (): Promise<void> => {
      try {
        const result = await axios.get('/api/user/products');
        if (result && result.data) {
          setProducts(result.data.data);
        }
      } catch (err: any) {
        showSnack(err?.response?.data?.message, 'error');
      }
    };
    getProducts();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="user-products-page-container">
      <AddProductModal open={open} setOpen={setOpen} />
      <NavBar />
      <div className="main-content">
        <div style={{width: '1000px', margin: '9rem auto'}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
            <Typography variant="h4">My Products</Typography>
            <Button variant="contained" type="button" onClick={() => setOpen(true)} sx={{mb: 2, mt: 2}}>
              Add Product
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {productList}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProducts;
