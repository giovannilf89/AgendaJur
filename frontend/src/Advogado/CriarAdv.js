import React, { useState} from "react";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import { useNavigate } from "react-router-dom";
import './criar.estilo.css'

function CadAdv() {
  const navigation = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const iToken = localStorage.getItem("@tklogin2023");
  //   const token = JSON.parse(iToken);

  //   if (!token) {
  //     navigation("/");
  //     return;
  //   } else if (token) {
  //     async function verificaToken() {
  //       const resposta = await apiLocal.get("/ListarAdvToken", {
  //         headers: {
  //           // eslint-disable-next-line no-useless-concat
  //           Authorization: "Bearer " + `${token}`,
  //         },
  //       });
  //       if (resposta.data?.dados) {
  //         // PERGUNTAR PROF OU DANILO PORQUE ESTA VINDO NULO
  //         navigation("/");
  //         // alert("token invalido"); //testar se esta entrando nessa condicional
  //         return;
  //       }
  //       // console.log(resposta); // consulta a resposta da api
  //     }
  //     verificaToken();
  //   }
  // }, []);

  async function Cadastro(e) {
    e.preventDefault();
    // console.log(nome, email, password);
    if (!nome || !email || !password) {
      toast.warn("Existem campos em branco");
      return;
    }
    try {
      await apiLocal.post("/CriarAdv", {
        nome,
        email,
        password,
      });
      toast.success("Advogado cadastrado com sucesso");
      navigation("/dashboard");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }
  return (
    <div className="container-criar">
      <div>
        <h1>Cadastro Advogado</h1>
      </div>
      <div>
        <form onSubmit={Cadastro}>
          <label className="label-criar">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <br />
          <label className="label-criar">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="label-criar">Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <button onClick={() => navigation("/Dashboard")}>Voltar</button>
    </div>
  );
}

export default CadAdv;
