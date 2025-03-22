import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useCart } from "../../context/CartContext";

const CartItem = ({ id, name, price, quantity, imageUrl }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-4 pl-4">
        <div className="flex items-center">
          <img src={imageUrl} alt={name} className="w-16 h-16 object-contain mr-4" />
          <span className="font-medium text-gray-800">{name}</span>
        </div>
      </td>
      <td className="py-4 text-center">${price}</td>
      <td className="py-4">
        <div className="flex justify-center">
          <div className="flex items-center border rounded">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <FaMinus size={16} />
            </button>
            <span className="px-4 py-1 text-center w-10">{quantity.toString().padStart(2, '0')}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <FaPlus size={16} />
            </button>
          </div>
        </div>
      </td>
      <td className="py-4 text-center font-medium">${(price * quantity).toFixed(2)}</td>
      <td className="py-4 text-center">
        <button
          onClick={() => removeFromCart(id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <RxCross1 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;