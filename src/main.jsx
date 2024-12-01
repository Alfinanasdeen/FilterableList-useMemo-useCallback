import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './FilterableList.css'
import FilterableList from './FilterableList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterableList />
  </StrictMode>,
)
