import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";


const CartItem = ({ id, name, price, quantity, imageUrl }) => {
    const { updateQuantity } = useCart();
  
    const handleIncrease = () => {
      updateQuantity(id, quantity + 1);
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        updateQuantity(id, quantity - 1);
      }
    };
  
    return (
      <div className="flex items-center py-4 border-b border-gray-200">
        <div className="flex items-center flex-1">
          <img src={imageUrl} alt={name} className="w-16 h-16 object-contain mr-4" />
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        <div className="w-24 text-right text-gray-800">${price}</div>
        <div className="w-32 mx-4">
          <div className="flex items-center border rounded">
            <button 
              onClick={handleDecrease}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <FaMinus size={16} />
            </button>
            <span className="px-4 py-1 text-center">{quantity.toString().padStart(2, '0')}</span>
            <button 
              onClick={handleIncrease}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <FaPlus size={16} />
            </button>
          </div>
        </div>
        <div className="w-24 text-right font-medium text-gray-800">${(price * quantity).toFixed(2)}</div>
      </div>
    );
  };
  
  export default CartItem;