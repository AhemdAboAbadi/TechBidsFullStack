/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Button, Checkbox, Dialog,
  DialogActions, DialogContent,
  DialogTitle, FormControlLabel, Select, MenuItem,
  Slide, TextField, TextareaAutosize, InputLabel,
} from '@mui/material';
import axios from 'axios';
import { TransitionProps } from '@mui/material/transitions';
import './style.css';
import { useSnack } from '../../context/useSnack';

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const AddProductModal : any = (
  { open, setOpen } : { open: boolean, setOpen: Function },
) : any => {
  const { showSnack } = useSnack();
  const [product, setProduct] = useState<any>({
    name: '',
    category_id: '',
    auc_amount: '',
    auc_inc_amount: '',
    end_date: '',
    image: '',
    is_used: false,
    description: '',
  });

  const [categories, setCategories] = useState([]);

  const categoriesList = categories.map((category: any) => (
    <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
  ));

  const addProduct = async () : Promise<any> => {
    try {
      await axios.post('/api/products', {
        ...product,
      });

      showSnack('product added succesfully !', 'success');
      setOpen(false);
      setProduct({});
    } catch (err) {
      showSnack('Some thing went wrong', 'error');
    }
  };

  const getCategories = async () : Promise<any> => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data.categoriesData);
    } catch (err) {
      showSnack('Some Thing Went Wrong', 'error');
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    getCategories();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <div className="add-product-container">
          <div className="add-product-form-input">
            <TextField
              label="Name"
              size="medium"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div className="add-product-form-input ">
            <InputLabel style={{ marginBottom: '0.25rem' }} id="product-category">Category</InputLabel>
            <Select
              labelId="product-category"
              fullWidth
              label="Hello world"
              onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
            >
              {categoriesList}
            </Select>
          </div>
          <div className="add-product-form-input">
            <TextField
              label="Start Price"
              size="medium"
              type="number"
              value={product.auc_amount}
              onChange={(e) => setProduct({ ...product, auc_amount: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div className="add-product-form-input">
            <TextField
              label="Increment Amount"
              size="medium"
              value={product.auc_inc_amount}
              type="number"
              onChange={(e) => setProduct({ ...product, auc_inc_amount: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>

          <div className="add-product-form-input">
            <TextField
              label="End Date"
              type="datetime-local"
              value={product.end_date}
              fullWidth
              onChange={(e) => setProduct({ ...product, end_date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="add-product-form-input">
            <TextField
              label="image"
              size="medium"
              value={product.image}
              type="text"
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div className="add-product-form-input">
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={(e) => setProduct({ ...product, is_used: e.target.checked })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              )}
              label="Is Used"
            />
          </div>
          <div className="add-product-form-input">
            <TextareaAutosize
              maxRows={7}
              minRows={5}
              value={product.description}
              aria-label="maximum height"
              placeholder="Description"
              style={{ width: '100%', padding: '0.5rem' }}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => addProduct()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
