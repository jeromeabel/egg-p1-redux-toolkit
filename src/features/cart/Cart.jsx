import { useSelector, useDispatch } from 'react-redux';
import { getNumItems, getTotalPrice } from './cartSlice';

const Cart = () => {
  const products = useSelector((state) => state.products.products);
  const items = useSelector((state) => state.cart.items);
  const nbItems = useSelector(getNumItems);
  const totalPrice = useSelector(getTotalPrice);

  return (
    <div>
      <h2>Cart : {nbItems}</h2>
      <hr />
      <ul>
        {Object.entries(items).map(([id, quantity]) => (
          <li key={products[id].id}>
            {products[id].name}- {quantity}
          </li>
        ))}
      </ul>
      <p>TOTAL : {totalPrice}€ </p>
    </div>
  );
};

export default Cart;
