// src/components/cartReducer.js
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.find(item => item.id === action.item.id);

      if (exists) {
        // already in cart → increase qty
        return state.map(item =>
          item.id === action.item.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      // new item → add with qty 1
      return [...state, { ...action.item, qty: 1 }];
    }

    case "INC": {
      return state.map(item =>
        item.id === action.id ? { ...item, qty: item.qty + 1 } : item
      );
    }

    case "DEC": {
      return state
        .map(item =>
          item.id === action.id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0); // remove if qty goes to 0
    }

    case "REMOVE": {
      return state.filter(item => item.id !== action.id);
    }

    default:
      return state;
  }
}
