import { useEffect, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Button,
  ImageList,
  ImageListItem,
  Skeleton,
} from '@mui/material';
import Icon from '@mui/material/Icon';
import { useSnack } from '../../context/useSnack';
import './style.css';

interface itemsType {
  id: Number,
  image: string,
  name: string,
  productCount: Number,
}

const Header: FC = () => {
  const [categories, setCategories] = useState([]);

  const { showSnack } = useSnack();
  const navigate = useNavigate();

  const handleCategorySearch:any = (categoryId: Number) => {
    navigate(`/bids?categoryId=${categoryId}`);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchingTopCategories = async ():Promise<void> => {
      try {
        const data = await axios.get('/api/categories/top');
        setCategories(data.data.categoriesData);
      } catch (err: any) {
        if (err.name) {
          showSnack(err.response.data.message, 'error');
        }
      }
    };
    fetchingTopCategories();

    return ():void => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      <div className="cards-container">
        <div className="card-container">
          <Icon baseClassName="fas" className="fa-shipping-fast" />
          <div className="content-container">
            <Typography variant="h5" component="div">
              Fastest Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Efficiently unleash media
            </Typography>
          </div>
        </div>
        <div className="card-container">
          <Icon baseClassName="fas" className="fa-hand-holding-usd" />
          <div className="content-container">
            <Typography variant="h5" component="div">
              Instant Buying
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Podcasting operational
            </Typography>
          </div>
        </div>
        <div className="card-container">
          <Icon baseClassName="fas" className="fa-headset" />
          <div className="content-container">
            <Typography variant="h5" component="div">
              Call Center
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completely synergize
            </Typography>
          </div>
        </div>
      </div>

      {categories?.length
        ? (
          <ImageList className="img-container" variant="masonry" cols={2} gap={0}>
            {categories.map((item: itemsType) => (
              <ImageListItem className="a" key={item.image}>
                <img
                  src={item.image}
                  srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
                <div
                  className="img-content"
                >
                  <Typography variant="h6" color="white">
                    {item.name}
                  </Typography>
                  <Typography color="white">
                    {`${item.productCount} products`}
                  </Typography>
                  <Button variant="outlined" onClick={(): void => handleCategorySearch(item.id)}>VIEW MORE</Button>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        )
        : <Skeleton variant="rectangular" className="img-container" width="43%" height="50vh" />}
    </div>
  );
};

export default Header;
