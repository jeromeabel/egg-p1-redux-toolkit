import { useSelector, useDispatch } from 'react-redux';
import {
  getNumItems,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from './cartSlice';

const Cart = () => {
  const products = useSelector((state) => state.products.products);
  const items = useSelector((state) => state.cart.items);
  const nbItems = useSelector(getNumItems);
  const totalPrice = useSelector(getTotalPrice);

  const dispatch = useDispatch();

  function handleInputQuantity(e, id) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
    console.log(`UPDATE : ${id} - ${quantity}`);
  }

  return (
    <div>
      <h2>Cart : {nbItems}</h2>
      <hr />
      <ul>
        {Object.entries(items).map(([id, quantity]) => (
          <li key={products[id].id}>
            {products[id].name} ||||
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleInputQuantity(e, id)}
            />
            ||||
            <button onClick={() => dispatch(removeFromCart(id))}>X</button>
          </li>
        ))}
      </ul>
      <p>TOTAL : {totalPrice}€ </p>
    </div>
  );
};

export default Cart;
