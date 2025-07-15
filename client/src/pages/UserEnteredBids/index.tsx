/* eslint-disable camelcase */
import React, {useState, useEffect} from "react"
import {Typography} from "@mui/material"
import axios from "axios"
import {useSnack} from "../../context/useSnack"
import NavBar from "../../Components/Common/NavBar"
import Footer from "../../Components/Common/Footer"
import ProductCard from "../../Components/Common/ProductCard"

interface itemProp {
  image: string
  description: string
  name: string
  auc_amount: number
  is_open: Boolean
  end_date: Date
  id: number
}

const UserWinBids: React.FC = () => {
  const [enteredBids, setEnteredBids] = useState([])
  const {showSnack} = useSnack()
  console.log(enteredBids)

  const productList =
    enteredBids &&
    enteredBids.map((product: itemProp) => (
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
    ))

  useEffect(() => {
    const source = axios.CancelToken.source()
    const getEnteredBids = async (): Promise<void> => {
      try {
        const result = await axios.get("/api/user/bids")
        if (result && result.data) {
          setEnteredBids(result.data.data)
        }
      } catch (err: any) {
        showSnack(err?.response?.data?.message, "error")
      }
    }
    getEnteredBids()
    return () => {
      source.cancel()
    }
  }, [])

  return (
    <>
      <NavBar />
      <div style={{width: "1000px", margin: "9rem auto"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
          <Typography variant="h4">Entered Bids</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
          {productList}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserWinBids
