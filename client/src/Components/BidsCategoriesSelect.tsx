import React, {useState, useEffect} from "react"
import {
  FormLabel,
  FormControl,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import axios from "axios"
import {useSnack} from "../context/useSnack"

interface Prop {
  setCategoryId: any
  selectedCategory: any
  setPage: any
}

const BidsCategoriesSelect: React.FC<Prop> = ({
  setCategoryId,
  selectedCategory,
  setPage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    Number(selectedCategory) || 0
  )
  const [categories, setCategories] = useState([])
  const {showSnack} = useSnack()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchCategories = async (): Promise<void> => {
      try {
        const data = await axios.get("/api/categories")
        setCategories(data.data.categoriesData)
      } catch (err: any) {
        showSnack(err?.response?.data?.message, "error")
      }
    }
    fetchCategories()

    return (): void => {
      source.cancel()
    }
  }, [])

  return (
    <FormControl component="fieldset" className="filter-container">
      <FormLabel className="filter-title">Categories</FormLabel>
      <List aria-label="main mailbox folders" className="list-container">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0)
            setCategoryId(undefined)
            setPage(1)
          }}>
          <ListItemText primary="All" />
        </ListItemButton>
        {categories.length
          ? categories.map((item: any, i) => (
              <ListItemButton
                selected={selectedIndex === i + 1}
                onClick={(event) => {
                  handleListItemClick(event, i + 1)
                  setCategoryId(item.id)
                  setPage(1)
                }}>
                <ListItemText key={item.name} primary={item.name} />
              </ListItemButton>
            ))
          : null}
      </List>
    </FormControl>
  )
}

export default BidsCategoriesSelect
