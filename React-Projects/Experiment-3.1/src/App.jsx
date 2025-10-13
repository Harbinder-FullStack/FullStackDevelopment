import './App.css'
import ProductCard from './components/ProductCard.jsx';

function App() {

  const product = [ {
    name: "Sample Product",
    price: 29.99,
    inStock: true
  },
  {
    name: "Sample Product",
    price: 29.99,
    inStock: true
  }
  ]
  return (
    <>
      <div className='app-container'>
        <h1>Harbinder</h1>
        { product.map((p, i) => <ProductCard key={i} props={p} />) }
      </div>
    </>
  )
}

export default App
