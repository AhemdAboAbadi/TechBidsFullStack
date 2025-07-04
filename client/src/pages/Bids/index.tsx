/* eslint-disable camelcase */
import React, {useState, useEffect} from "react"
import {useLocation} from "react-router-dom"
import axios from "axios"
import {Pagination, Skeleton} from "@mui/material"
import BidsStatusCheckBox from "../../Components/BidsStatusCheckBox"
import BidsDetailsPriceBar from "../../Components/BidsDetailsPriceBar"
import BidsCategoriesSelect from "../../Components/BidsCategoriesSelect"
import ProductCard from "../../Components/Common/ProductCard"
import Footer from "../../Components/Common/Footer"
import NavBar from "../../Components/Common/NavBar"
import {useSnack} from "../../context/useSnack"
import "./style.css"

interface itemProp {
  image: string
  description: string
  name: string
  auc_amount: number
  is_open: Boolean
  end_date: Date
  id: number
}

const Bids: React.FC = () => {
  const location = useLocation()
  const {showSnack} = useSnack()
  const query = new URLSearchParams(location.search)
  const search = query.get("name")

  const [price, setPrice] = useState<number[]>([0, 10000])
  const [categoryId, setCategoryId] = useState(query.get("categoryId"))
  const [status, setStatus] = useState("all")
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value)
  }

  useEffect(() => {
    setPage(1)
    setSearchValue(search)
  }, [search])

  useEffect(() => {
    setIsLoading(true)
    const source = axios.CancelToken.source()
    let url = `/api/products?minPrice=${price[0]}&maxPrice=${price[1]}`
    const fetchProducts = async (): Promise<void> => {
      try {
        setProducts([])
        if (categoryId) {
          url += `&categoryId=${categoryId}`
        }
        if (status !== "all") {
          url += `&status=${status}`
        }
        if (page > 1) {
          url += `&page=${page}`
        }
        if (searchValue) {
          url += `&search=${searchValue}`
        }
        const data = await axios.get(url)
        setProducts(data.data.productData)
        setCount(data.data.count)
        setIsLoading(false)
      } catch (err: any) {
        showSnack(err.response.data.message, "error")
      }
    }
    fetchProducts()
    return (): void => {
      source.cancel()
    }
  }, [price, categoryId, status, page, searchValue])

  return (
    <>
      <NavBar />
      <div className="bids-container">
        <div className="filters-container">
          <BidsCategoriesSelect
            setPage={setPage}
            setCategoryId={setCategoryId}
            selectedCategory={query.get("categoryId")}
          />
          <BidsDetailsPriceBar
            setPage={setPage}
            price={price}
            setPrice={setPrice}
          />
          <BidsStatusCheckBox
            setPage={setPage}
            status={status}
            setStatus={setStatus}
          />
        </div>
        <div className="side-container">
          <div className="card-container">
            {isLoading &&
              Array.from(new Array(3)).map(() => (
                <Skeleton variant="rectangular" width="30%" height={300} />
              ))}
            {!isLoading &&
              (products.length ? (
                products.map((item: itemProp) => (
                  <ProductCard
                    image={item.image}
                    description={item.description}
                    title={item.name}
                    price={item.auc_amount}
                    closed={!item.is_open}
                    endTime={new Date(item.end_date)}
                    id={item.id}
                  />
                ))
              ) : (
                <img
                  alt="no data"
                  src="https://miro.medium.com/max/1400/1*VYtKX_1QzcszNycjldry5A.png"
                />
              ))}
          </div>
          {count > 6 ? (
            <Pagination
              count={Math.ceil(count / 6)}
              page={page}
              onChange={handleChange}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Bids
