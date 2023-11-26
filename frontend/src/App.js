import Rotas from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fundo from "../src/images/fundo.jpg";
function App() {
  return (
    <div>
      <div className="fundo">
        <img src={fundo} alt="Descrição da imagem" />
      </div>
      <Rotas />
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
