import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSnack} from '../../context/useSnack';
import './Style.css';

const socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

const HistoryProduct: React.FC = () => {
  const {id} = useParams();
  const {showSnack} = useSnack();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHistory = useCallback(async (): Promise<any> => {
    if (isLoading) return; // Avoid multiple requests

    setIsLoading(true);
    try {
      const result = await axios.get(`/api/product/${id}/history`);
      if (result && result.data) {
        // Update history only if data is different
        setHistory((prevHistory) => {
          const newHistory = result.data.data;
          // Simple comparison to ensure data has changed
          if (JSON.stringify(prevHistory) !== JSON.stringify(newHistory)) {
            return newHistory;
          }
          return prevHistory;
        });
      }
    } catch (error) {
      showSnack(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [id, showSnack, isLoading]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    getHistory();

    return () => {
      source.cancel();
    };
  }, [id, getHistory]);

  // Socket listener to update history when receiving new bid
  useEffect(() => {
    const handleReceivePrice = (data: any) => {
      console.log('History: Received price update, refreshing history:', data);
      if (data && data.room === id) {
        // Update history when receiving new bid
        // Add small delay to ensure server saved data
        setTimeout(() => {
          getHistory();
        }, 200); // Increase delay slightly to ensure data is saved
      }
    };

    socket.on('receivePrice', handleReceivePrice);

    return () => {
      socket.off('receivePrice', handleReceivePrice);
    };
  }, [id, getHistory]);

  return (
    <div className="conatiner-table">
      <Typography variant="h6" sx={{margin: '15px', fontWeight: 'bold'}}>
        Auctions History
      </Typography>
      {history.length ? (
        <TableContainer component={Paper} className="history-table" sx={{maxHeight: '50vh', overflowY: 'scroll'}}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Bid</TableCell>
                <TableCell align="center">User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row: any): any => (
                <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell component="th" scope="row" className="date-space" align="center">
                    {row.date}
                  </TableCell>
                  <TableCell align="center" className="date-space">
                    {row.amount}
                  </TableCell>
                  <TableCell align="center" className="date-space">
                    {row.user.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{textAlign: 'center'}} color="text.secendary">
          No bids for this product
        </Typography>
      )}
    </div>
  );
};

export default HistoryProduct;
