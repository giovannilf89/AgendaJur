
import Rotas from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Rotas />
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;