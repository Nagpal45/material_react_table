import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import fuzzysearch from "fuzzysearch"; 
import { DatePicker } from "@mui/x-date-pickers";

const FilterPanel = ({ filters, setColumnFilters, data }) => {
    console.log(data);
  const [searchText, setSearchText] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subcategoryFilters, setSubcategoryFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [dateRange, setDateRange] = useState([null, null]);

  const { name, category, subcategory, price, createdAt } = filters;

  const initialFilters = {
    name: name || "",
    category: category || [],
    subcategory: subcategory || [],
    price: price || [0, Infinity],
    createdAt: createdAt || [null, null],
    };

    useState(() => {
        setSearchText(initialFilters.name);
        setCategoryFilters(initialFilters.category);
        setSubcategoryFilters(initialFilters.subcategory);
        setPriceRange(initialFilters.price);
        setDateRange(initialFilters.createdAt);
    }, [initialFilters]);



  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const newFilters = event.target.value;
    setCategoryFilters(newFilters);
  };

  const handleSubcategoryChange = (event) => {
    const newFilters = event.target.value;
    setSubcategoryFilters(newFilters);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleSubmit = () => {
    console.log(searchText, categoryFilters, subcategoryFilters, priceRange, dateRange);
    console.log(typeof searchText)
    const updatedFilters = {
      name: fuzzysearch(
        searchText,
        data.map((row) => {
            console.log(row.name);
             row.name;
        })
      ), 
      category: categoryFilters.length > 0 ? categoryFilters : undefined,
      subcategory:
        subcategoryFilters.length > 0 ? subcategoryFilters : undefined,
      price: priceRange,
      createdAt: dateRange,
    };
    setColumnFilters(updatedFilters);
  };

  const categories = [...new Set(data.map((item) => item.category))]; 
  const subcategories = [...new Set(data.flatMap((item) => item.subcategory))]; 

  return (
    <div>
      <h2>Filters</h2>
      <TextField
        label="Search Name (Fuzzy)"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        fullWidth
      />
      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          multiple
          value={categoryFilters}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {categoryFilters.length > 0 && (
        <FormControl sx={{ mt: 2 }}>
          <InputLabel id="subcategory-label">Subcategory</InputLabel>
          <Select
            labelId="subcategory-label"
            multiple
            value={subcategoryFilters}
            onChange={handleSubcategoryChange}
          >
            <MenuItem value="">All Subcategories</MenuItem>
            {subcategories
              .filter((subcategory) =>
                categoryFilters.some((category) =>
                  subcategory.startsWith(category)
                )
              )
              .map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="price-label">Price Range</InputLabel>
        <Slider
          labelId="price-label"
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={Math.min(...data.map((row) => row.price))} 
          max={Math.max(...data.map((row) => row.price))} 
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="date-range-label">Created At</InputLabel>
        <DatePicker
          label="Date Range"
          value={dateRange}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>

      <Button variant="contained" onClick={handleSubmit}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
