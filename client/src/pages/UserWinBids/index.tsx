/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useSnack } from '../../context/useSnack';
import NavBar from '../../Components/Common/NavBar';
import Footer from '../../Components/Common/Footer';
import ProductCard from '../../Components/Common/ProductCard';

interface itemProp {
  image: string,
  description: string,
  name: string,
  auc_amount: number,
  is_open: Boolean,
  end_date: Date,
  id: number
}

const UserWinBids : React.FC = () => {
  const [winBids, setWinBids] = useState([]);
  const { showSnack } = useSnack();
  console.log(winBids);

  const productList = winBids && winBids.map((product: itemProp) => (
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
    const getWinBids = async (): Promise<void> => {
      try {
        const result = await axios.get('/api/user/win');
        if (result && result.data) {
          setWinBids(result.data.data);
        }
      } catch (err: any) {
        showSnack(err.response.data.message, 'error');
      }
    };
    getWinBids();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ width: '1000px', margin: '9rem auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
        >
          <Typography variant="h4">Win Products</Typography>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
        }}
        >
          {productList}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserWinBids;
