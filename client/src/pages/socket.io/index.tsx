import React, {useEffect, useCallback, useMemo} from 'react';
import {io} from 'socket.io-client';
import {format} from 'date-fns';
import axios from 'axios';
import Button from '@mui/material/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/useAuth';
import {useSnack} from '../../context/useSnack';

const socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

interface Props {
  children: any;
  priceBids: number;
  setPriceBids: any;
}

const BtnSocket: React.FC<Props> = ({children, priceBids, setPriceBids}) => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const {showSnack} = useSnack();

  const {id} = useParams();
  console.log('priceBids=--=-', {priceBids, id});

  // Memoize the price data to avoid unnecessary re-renders
  const priceData = useMemo(() => {
    if (priceBids !== undefined && priceBids) {
      return {
        user_id: user?.id,
        room: id,
        amount: priceBids,
        date: format(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss'),
      };
    }
    return null;
  }, [priceBids, user?.id, id]);

  const sendPrice = useCallback(async () => {
    if (priceData) {
      console.log('priceData -=->', priceData);
      await socket.emit('sendPrice', priceData);
      // No need for getProduct here as server will send receivePrice
    }
  }, [priceData]);

  const getProduct = useCallback(async (): Promise<any> => {
    try {
      const getProductData = await axios.get(`/api/product/${id}`);
      setPriceBids(getProductData.data.data.auc_amount);
    } catch (err: any) {
      showSnack(err.response.data.message, 'error');
    }
  }, [id, setPriceBids, showSnack]);

  useEffect(() => {
    console.log('id=--=-', id);

    // Ensure socket is connected
    if (socket.connected) {
      socket.emit('joinRoom', id);
      getProduct();
    } else {
      const handleConnect = () => {
        console.log('Socket connected, joining room:', id);
        socket.emit('joinRoom', id);
        getProduct();
      };

      socket.on('connect', handleConnect);

      return () => {
        socket.off('connect', handleConnect);
      };
    }
  }, [id, getProduct]);

  useEffect(() => {
    const handleReceivePrice = (data: any) => {
      console.log('Received price update:', data);
      if (data && data.amount && data.amount !== priceBids) {
        setPriceBids(data.amount);
      }
    };

    socket.on('receivePrice', handleReceivePrice);

    return () => {
      socket.off('receivePrice', handleReceivePrice);
    };
  }, [setPriceBids, priceBids]);

  return (
    <div>
      <Button
        type="button"
        size="small"
        className="icon-btn"
        onClick={() => {
          if (!user) {
            navigate('/signin');
            return;
          }
          sendPrice();
          // Remove getProduct() as receivePrice will handle the update
        }}>
        {children}
      </Button>
    </div>
  );
};

export default BtnSocket;
