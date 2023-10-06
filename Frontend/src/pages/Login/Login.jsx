import React, { useState } from "react";
import Imput from "../../components/Imput/Imput";
import Button from "../../components/Button/Button";
import * as C from "./Login.styled.jsx";
import { Link, useNavigate } from "react-router-dom";
import logar from "./logar";
import { useDispatch, connect, useSelector } from "react-redux";
import { logarContaCliente } from "../../reduxFeatures/conta";
import { logarContaLojista } from "../../reduxFeatures/lojista";
import styles from './Login.module.css';

const Login = () => {
  const [tipo, setTipo] = useState("cliente");
  const conta = useSelector(state => state.conta);
  const lojista = useSelector(state => state.lojista);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  function logar(e) {
    e.preventDefault();
    if (tipo === "cliente") {
      dispatch(logarContaCliente({ email: email, senha: senha })).then(res => {
        if(res.payload != null){
          navigate("/");
        }
      });
    } else {
      dispatch(logarContaLojista({ email: email, senha: senha })).then( res => {
        if(res.payload != null){
          navigate("/");
        }
      });
    }
  }
  function alternarTipo() {
    let btn = document.getElementById("btnAlt");
    if (tipo === "cliente") {
      btn.innerHTML = "Lojista";
      setTipo("lojista");
    } else {
      btn.innerHTML = "Cliente";
      setTipo("cliente");
    }
  }
  return (
    <div>
      <C.Container>
          <C.Label></C.Label>
          <C.Content>
            <form action="" onSubmit={logar}>
              <Imput
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
              <Imput
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
              <C.labelError>{error}</C.labelError>
              <button id="btnAlt" className={styles.btnAlternar} type="button" value={"cliente"} onClick={alternarTipo}>Cliente</button>
              <Button Text="Entrar" type="submit" onClick={logar} />
            </form>
            <C.LabelLogin>
              Não tem uma conta?
              <C.Strong>
                {
                  tipo === "cliente" ? (
                      <Link to="/registro">&nbsp;Registre-se como cliente</Link>
                    )
                    :
                    (
                      <Link to="/registroLojista">&nbsp;Registre-se como lojista</Link>
                    )
                }
              </C.Strong>
            </C.LabelLogin>
          </C.Content>
        </C.Container>
    </div>
  );
};

export default connect()(Login);