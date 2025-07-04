import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSnack } from '../../context/useSnack';
import './Style.css';

const HistoryProduct : React.FC = () => {
  const { id } = useParams();
  const { showSnack } = useSnack();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const getHsitory = async (): Promise<any> => {
      try {
        const result = await axios.get(`/api/product/${id}/history`);
        if (result && result.data) {
          setHistory(result.data.data);
        }
      } catch (error) {
        showSnack(error, 'error');
      }
    };
    getHsitory();

    return () => {
      source.cancel();
    };
  });
  return (

    <div className="conatiner-table">
      <Typography variant="h6" sx={{ margin: '15px', fontWeight: 'bold' }}>Auctions History</Typography>
      {history.length ? (
        <TableContainer component={Paper} className="history-table" sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Bid</TableCell>
                <TableCell align="center">User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row:any):any => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="date-space" align="center">{row.date}</TableCell>
                  <TableCell align="center" className="date-space">{row.amount}</TableCell>
                  <TableCell align="center" className="date-space">{row.user.name}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : <Typography sx={{ textAlign: 'center' }} color="text.secendary">No bids for this product</Typography>}

    </div>
  );
};

export default HistoryProduct;
