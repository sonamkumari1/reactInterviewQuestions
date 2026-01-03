// src/components/ProductList.jsx
import { useReducer } from "react";
import { cartReducer } from "./cartReducer";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 2999 },
  { id: 2, name: "Smart Watch", price: 4999 },
  { id: 3, name: "Bluetooth Speaker", price: 1999 },
];

export default function ProductList({ onAdd }) {
  return (
    <div className="space-y-4">
      {PRODUCTS.map(product => (
        <div
          key={product.id}
          className="flex justify-between items-center p-4 bg-white rounded shadow"
        >
          <div>
            <h4 className="font-semibold">{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
          <button
            onClick={() => onAdd(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}
