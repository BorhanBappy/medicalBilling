import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";

const BillingSystem = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [discount, setDiscount] = useState(0);

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const tests = [
    { name: "Complete Blood Count (CBC)", price: 400.0 },
    { name: "Periferal Blood Film / PBF", price: 500.0 },
    {
      name: "Blood Circulating Total Eosinophil Count (TCE) / Eosinophil count (CEC/CE/TCE)",
      price: 400.0,
    },
    { name: "Reticulocyte Count (R/C count)", price: 550.0 },
    { name: "Platelet Count", price: 500.0 },
    // ... (continue the list with other tests)
  ];

  const suggestionList = tests.map((test) => test.name);

  const handleItemSelected = (selectedItem) => {
    const selectedTest = tests.find((test) => test.name === selectedItem);
    if (selectedTest) {
      setItemName(selectedItem);
      setItemPrice(selectedTest.price.toString());
    }
  };

  const addItem = () => {
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: parseFloat(itemPrice) };
      setItems([...items, newItem]);
      setItemName("");
      setItemPrice("");
    }
  };

  const calculateTotal = () => {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    return totalPrice - (totalPrice * discount) / 100;
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-5xl mb-8">Billing System</h1>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Add item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mr-2 p-2"
          list="itemSuggestions"
          onSelect={(e) => handleItemSelected(e.target.value)}
        />
        <datalist id="itemSuggestions">
          {suggestionList.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
        <input
          type="text"
          placeholder="Add price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="mr-2 p-2"
        />
        <button
          type="button"
          onClick={addItem}
          className="p-2 bg-blue-500 text-white"
        >
          Add
        </button>
      </form>

      <div className="mb-4" ref={componentRef}>
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name}: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Total Price</h2>
        <p>${calculateTotal().toFixed(2)}</p>
      </div>

      <label className="block mb-2">
        Discount (%):
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
          className="ml-2 p-2 border"
        />
      </label>

      <button
        type="button"
        onClick={handlePrint}
        className="p-2 bg-green-500 text-white"
      >
        Print
      </button>
    </div>
  );
};

export default BillingSystem;
