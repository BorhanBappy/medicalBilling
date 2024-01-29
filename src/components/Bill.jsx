import  { useState } from 'react';

const BillingSystem = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const addItem = () => {
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: parseFloat(itemPrice) };
      setItems([...items, newItem]);
      setTotalPrice(totalPrice + newItem.price);
      setItemName('');
      setItemPrice('');
    }
  };

  const handlePrint = () => {
    // Implement printing logic (e.g., open a new window or use a print library)
    // This can depend on your specific requirements and the environment you're working in.
    // You might want to use a library like 'react-to-print' for printing in a React application.
    alert('Printing functionality goes here.');
  };

  return (
    <div>
      <h1 className='text-center text-5xl'>Billing System</h1>
      <form>
        <input
          type="text"
          placeholder='Add item'
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder='Add price'
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <button type="button" onClick={addItem}>
          Add
        </button>
      </form>

      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name}: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>

      <button type="button" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default BillingSystem;
