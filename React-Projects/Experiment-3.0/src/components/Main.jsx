import ProductCard from "../../../Experiment-3.1/src/components/ProductCard.jsx";

function Main() {
    const product = [
        {name: "Wireless Mouse",price: 25.99,inStock: true},
        {name: "Keyboard",price: 45.50,inStock: false},
        {name: "Monitor",price: 199.99,inStock: true}
    ];
    return (
        <main >
            <h2>Product List</h2>
            <div className="main-container">
                {
                    product.map(
                        (prod, index) => (
                            <ProductCard key={index} name={prod.name} price={prod.price} inStock={prod.inStock} />
                        )
                    )
                }
            </div>
        </main>
    );
}
export default Main;