import React, { useState, useMemo, useCallback } from "react";

function FilterableList() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", category: "Electronics", price: 100 },
    { id: 2, name: "Item 2", category: "Furniture", price: 200 },
    { id: 3, name: "Item 3", category: "Electronics", price: 150 },
    { id: 4, name: "Item 4", category: "Clothing", price: 50 },
    { id: 5, name: "Item 5", category: "Furniture", price: 300 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Memoized filtered and sorted items
  const filteredAndSortedItems = useMemo(() => {
    let filteredItems = items;

    // Apply category filter
    if (selectedCategory) {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Apply sorting
    const sortedItems = filteredItems.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    return sortedItems;
  }, [items, selectedCategory, sortOrder]); // Recalculate only when dependencies change

  // Handle category selection change
  const handleCategoryChange = useCallback((event) => {
    setSelectedCategory(event.target.value);
  }, []);

  // Handle sort order change
  const handleSortChange = useCallback(() => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  }, []);

  return (
    <div className="filterable-list">
      <h1>Filterable and Sortable List</h1>

      <div>
        <label>
          Filter by Category:
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
          </select>
        </label>
      </div>

      <div>
        <button onClick={handleSortChange}>
          Sort by Price in {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <ul>
        {filteredAndSortedItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span> - <span>{item.category}</span> - $
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterableList;
