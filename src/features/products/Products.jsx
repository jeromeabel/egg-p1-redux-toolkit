import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import DATA from './data';

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
