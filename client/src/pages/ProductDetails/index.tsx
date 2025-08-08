import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HardwareIcon from '@mui/icons-material/Hardware';
import HistoryProduct from '../../Components/HistoryProduct';
import Timer from '../../Components/Common/Timer';
import NavBar from '../../Components/Common/NavBar';
import {useSnack} from '../../context/useSnack';
import './Style.css';
import BtnSocket from '../socket.io';
import Footer from '../../Components/Common/Footer';

const ProductDetails: React.FC = () => {
  const [priceBids, setPriceBids] = useState<number>(50);

  const {id} = useParams();
  const {showSnack} = useSnack();
  const [data, setData] = useState({
    image: '',
    name: '',
    auc_start_amount: '',
    auc_inc_amount: '',
    end_date: null,
    description: '',
    is_open: true,
    is_used: false,
    auc_amount: '',
    user: {
      name: '',
    },
  });

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getProduct = async (): Promise<any> => {
      try {
        const result = await axios.get(`/api/product/${id}`);

        if (result && result.data) {
          setData(result.data.data);
        }
      } catch (error) {
        showSnack(error, 'error');
      }
    };
    getProduct();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="product-details-page-container">
      <NavBar />
      <div className="main-content">
        <Typography
          sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            paddingLeft: '13%',
            margin: '10vh 0 4vh',
          }}>
          {data.name}
        </Typography>
        <div className="product-container">
          <div className="product-image">
            <img src={data.image} alt={data.image} className="img-pro" />
          </div>
          <div className="card-product">
            {data.name ? (
              <Card>
                <CardContent>
                  <div className="price">
                    <Typography sx={{fontSize: '24px', fontWeight: 'bold'}} gutterBottom className="current-bid">
                      {data.is_open ? 'Current Bid :' : 'Sold for :'}
                      {priceBids}$
                    </Typography>
                    <Button className="open-btn" size="small">
                      {data.is_open ? 'open' : 'close'}
                    </Button>
                  </div>
                  <Typography variant="subtitle2">Owner :{data.user.name}</Typography>
                  <Typography variant="subtitle1" className="date">
                    Time Left :
                  </Typography>
                  <Typography sx={{width: '85%', margin: '5px 0'}}>{data.end_date && <Timer futureDate={new Date(data.end_date)} />}</Typography>
                  <Typography className="date">{`Auction ends: ${data.end_date}`}</Typography>
                  {data?.is_open && (
                    <CardActions>
                      <BtnSocket priceBids={priceBids} setPriceBids={setPriceBids}>
                        Bid for +{data.auc_inc_amount}
                        $
                        <HardwareIcon sx={{marginLeft: '10px'}} />
                      </BtnSocket>
                    </CardActions>
                  )}
                  <Typography variant="subtitle2" className="item-condition">
                    item Condition :<span>{data.is_used ? 'Used' : 'Not Used'}</span>
                  </Typography>

                  <Typography variant="subtitle2" className="content-title">
                    Description
                  </Typography>
                  <Typography variant="body2" className="content-text">
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              'No Data'
            )}
          </div>
        </div>
        <HistoryProduct />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
