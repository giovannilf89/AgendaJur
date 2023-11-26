import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiLocal from "../API/apiLocal/api";
import "./inicio.css";


export default function Inicio() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const iToken = localStorage.getItem("@tklogin2023");
    const token = JSON.parse(iToken);
    // console.log(token);
    if (!token) {
      navigation("/");
      return;
    } else if (token) {
      async function verificaToken() {
        const resposta = await apiLocal.get(`/ListarAdvToken`, {
          headers: {
            // eslint-disable-next-line no-useless-concat
            Authorization: "Bearer " + `${token}`,
          },
        });
        if (resposta.data.dados) {
          navigation("/");
          return;
        } else if (resposta.data.id) {
          navigation("/Dashboard");
        }
      }
      verificaToken();
    }
  }, [navigation]);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Existem campos em branco");
      return;
    }
    try {
      const resposta = await apiLocal.post("/Login", {
        email,
        password,
      });
      if (resposta.data.id) {
        const token = resposta.data.token;
        localStorage.setItem("@tklogin2023", JSON.stringify(token));
        toast.success("Login efetuado com sucesso");
        navigation("/Dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  }

  return (
    <div className="container">
      <div>
        <form className="formulario" onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Enviar</button>
          <h2 className="cadastre">
            <Link to="/CriarAdv">Cadastre-se aqui</Link>
          </h2>
        </form>
      </div>
    </div>
  );
}
