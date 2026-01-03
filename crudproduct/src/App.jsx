import InfiniteScroll from "./components/InfiniteScroll";
import TodoApp from "./components/TodoApp";
import { ThemeProvider } from "./Darkmode/ThemeContext";
import Toggle from "./Darkmode/Toggle";
import ModalApp from "./model/ModalApp";
import MultiStepForm from "./multistepform/MultiStepForm";
import Cart from "./shoppingcart/Cart";

export default function App() {
  return (
  
    
    <ThemeProvider>
          {/* <TodoApp /> */}
          {/* <InfiniteScroll /> */}
           {/* <MultiStepForm /> */}
           {/* <ModalApp /> */}
           {/* <Cart /> */}
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <Toggle />
      </div>
    </ThemeProvider>
   
  );
}
