import React, {useEffect} from "react"
import {io} from "socket.io-client"
import {format} from "date-fns"
import axios from "axios"
import Button from "@mui/material/Button"
import {useParams, useNavigate} from "react-router-dom"
import {useAuth} from "../../context/useAuth"
import {useSnack} from "../../context/useSnack"

const socket = io("https://techbids-backend.onrender.com")

interface Props {
  children: any
  priceBids: number
  setPriceBids: any
}

const BtnSocket: React.FC<Props> = ({children, priceBids, setPriceBids}) => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const {showSnack} = useSnack()

  const {id} = useParams()

  const sendPrice: any = async () => {
    if (priceBids !== undefined || !priceBids) {
      const priceData = {
        user_id: user.id,
        room: id,
        amount: priceBids,
        date: format(new Date(Date.now()), "yyyy-MM-dd HH:mm:ss"),
      }
      await socket.emit("sendPrice", priceData)
    }
  }

  const getProduct = async (): Promise<any> => {
    try {
      const getProductData = await axios.get(`/api/product/${id}`)
      setPriceBids(getProductData.data.data.auc_amount)
    } catch (err: any) {
      showSnack(err.response.data.message, "error")
    }
  }

  useEffect(() => {
    socket.emit("joinRoom", id)
    getProduct()
    socket.on("receivePrice", (data) => {
      setPriceBids(data.amount)
    })
  }, [socket])

  return (
    <div>
      <Button
        type="button"
        size="small"
        className="icon-btn"
        onClick={() => {
          if (!user) {
            navigate("/signin")
            return
          }
          sendPrice()
          getProduct()
        }}>
        {children}
      </Button>
    </div>
  )
}

export default BtnSocket
