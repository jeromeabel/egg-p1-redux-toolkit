import { useSelector, useDispatch } from 'react-redux';
import { getNumItems } from './cartSlice';

const Cart = () => {
  const products = useSelector((state) => state.products.products);
  const items = useSelector((state) => state.cart.items);
  const nbItems = useSelector(getNumItems);

  return (
    <div>
      <h2>Cart : {nbItems}</h2>
      <hr />
      {Object.entries(items).map(([id, quantity]) => (
        <p>
          {products[id].name}- {quantity}
        </p>
      ))}
    </div>
  );
};

export default Cart;
