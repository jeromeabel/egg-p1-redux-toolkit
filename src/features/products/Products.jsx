import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
// import DATA from './data';

const DATA = [
  { name: 'Lamp', price: 10, id: 1 },
  { name: 'Usb Key', price: 15, id: 2 },
  { name: 'Apple', price: 1, id: 3 },
  { name: 'Book', price: 12, id: 4 },
  { name: 'Rice', price: 2.5, id: 5 },
];

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts(DATA));
  }, []);

  const products = useSelector((state) => state.products.products);

  return (
    <section>
      <h2>Products</h2>
      {Object.values(products).map((item) => (
        <div key={item.id}>
          {item.name} : {item.price}€
          <button onClick={() => dispatch(addToCart(item.id))}>Add</button>
        </div>
      ))}
    </section>
  );
};

export default Products;
