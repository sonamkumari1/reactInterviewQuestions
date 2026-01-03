// src/components/CartItem.jsx
import React from "react";

export default function CartItem({ item, dispatch }) {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded shadow">
      <div className="flex-1">
        <h5 className="font-medium">{item.name}</h5>
        <p className="text-sm text-gray-600">
          ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => dispatch({ type: "DEC", id: item.id })}
          className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
        >
          –
        </button>

        <span className="px-2">{item.qty}</span>

        <button
          onClick={() => dispatch({ type: "INC", id: item.id })}
          className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>

        <button
          onClick={() => dispatch({ type: "REMOVE", id: item.id })}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
