import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import {Box} from "@mui/material"
import Typography from "@mui/material/Typography"
import HardwareIcon from "@mui/icons-material/Hardware"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import {useNavigate} from "react-router-dom"
import {Timer} from "../Timer"
import "./style.css"

interface ProductCardProps {
  image: string
  description: string
  title: string
  price: number
  closed: boolean
  endTime: Date
  id: number
}

const ProductCard: any = ({
  image,
  description,
  title,
  price,
  closed,
  endTime,
  id,
}: ProductCardProps): any => {
  const navigate = useNavigate()

  const handleClick = (productId: number): void => {
    navigate(`/product/${productId}`)
  }

  return (
    <Card
      onClick={() => handleClick(id)}
      className="product-card"
      sx={{
        maxWidth: "30%",
        marginBottom: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        cursor: "pointer",
      }}>
      {closed && (
        <Box
          sx={{
            color: "white",
            backgroundColor: "black",
            textAlign: "center",
            padding: "0.5rem",
            borderRadius: "5px",
            position: "absolute",
            marginTop: "0.8rem",
            fontSize: "0.7rem",
            top: 0,
            left: 0,
          }}>
          Ended Auction
        </Box>
      )}
      <CardMedia component="img" height="140" image={image} alt="product" />
      <CardContent>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            alignItems: "center",
          }}
          variant="h6"
          component="div">
          {title}
          {closed ? (
            <RemoveRedEyeOutlinedIcon
              onClick={() => handleClick(id)}
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "50%",
                padding: "4px",
                marginLeft: "10px",
              }}
            />
          ) : (
            <HardwareIcon
              onClick={() => handleClick(id)}
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "50%",
                padding: "4px",
                marginLeft: "10px",
              }}
            />
          )}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          sx={{
            fontWeight: "600",
          }}>
          {closed ? "Sold for :" : "Current Bid :"}
          {price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${description.slice(0, 70)} ...`}
        </Typography>
      </CardContent>
      <CardActions>
        <Timer futureDate={endTime} isTimeUp={closed} />
      </CardActions>
    </Card>
  )
}

export default ProductCard
