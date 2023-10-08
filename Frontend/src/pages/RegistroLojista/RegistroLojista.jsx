import Swal from "sweetalert2";
import React, { useState } from "react";
import Imput from "../../components/Imput/Imput";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Usuario/useAuth";
import styles from "./RegistroLojista.module.css";
import verificaEmail from "./verificaEmail";
//import registrarLojista from "./registrarLojista";
import {useDispatch} from "react-redux";
import { registrarLojista } from "../../reduxFeatures/lojista";

const RegistroLojista = () => {
  
  let [msg, setMsg] = useState([]);
  let [emailOk, setEmailOk] = useState(false);
  let [error, setError] = useState("");
  let [cnpj, setCnpj] = useState("");
  let [nome, setNome] = useState("");
  let [endereco, setEndereco] = useState("");
  let [email, setEmail] = useState("");
  let [tel, setTel] = useState("");
  let [senha, setSenha] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function verificarCampos(emailOk, setError){
    let cnpj = document.getElementById("cnpj");
    let nome = document.getElementById("nome");
    let endereco = document.getElementById("endereco");
    let email = document.getElementById("email");
    let tel = document.getElementById("tel");
    let senha1 = document.getElementById("senha1");
    //XX.XXX.XXX/0001-XX length == 18
    if(cnpj.value.length != 18){
        //cnpj.focus();  n funcionou :(
        return setError("O cnpj deve ter o formato XX.XXX.XXX/0001-XX.");
    }
    if(nome.value.length < 3){
        return setError("O nome deve conter ao menos 3 caracteres.");
    }
    if(endereco.value.length < 4){
        return setError("O endereço deve conter ao menos 4 caracteres.");
    }
    if(tel.value.length != 8){
        return setError("O telefone deve conter ao menos 8 caracteres.");
    }
    if(senha1.value.length < 3){
        return setError("A senha deve conter ao menos 3 caracteres");
    }
    
    const lojista = {
        cnpj: cnpj.value,
        nome: nome.value,
        endereco: endereco.value,
        email: email.value,
        telefone: tel.value,
        senha: senha1.value
    }

    if(emailOk == true){
      //cadastrarLojista(lojista);
      dispatch(registrarLojista(lojista));
      setError("");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Loja cadastrada!.',
        showConfirmButton: false,
        timer: 1500
      })
      return true;
    }else{
      alert("E-mail inválido.");
    }
}

function cadastrarLojista(lojista){
    fetch("http://localhost:3000/lojistas", {
    method: 'POST',    
    headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(lojista)
    })
}
  

 return (
    <main>
      <div id={styles.registro_lojista_body}>
        <form onSubmit={ (e) => {e.preventDefault()} }>
          <div>
            <label htmlFor="cnpj">Cnpj:</label>
            <input className={styles.inputForm} type="text" name="cnpj" id="cnpj" placeholder="Digite o cnpj (XX.XXX.XXX/0001-XX)" value={cnpj} onChange={(e) => {setCnpj(e.target.value)}} />
          </div>

          <div>
            <label htmlFor="nome">Nome:</label>
            <input className={styles.inputForm} type="text" name="nome" id="nome" placeholder="Digite o nome da loja" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
          </div>

          <div>
            <label htmlFor="endereco">Endereço:</label>
            <input className={styles.inputForm} type="text" name="endereco" id="endereco" value={endereco} onChange={(e) => {setEndereco(e.target.value)}} />
          </div>
          
          <div>
            <label htmlFor="email">E-mail</label>
            <div style={{color: msg[1]}}>{msg[0]}</div>
            <input className={styles.inputForm} type="email" name="email" id="email" placeholder="Digite o email da loja" value={email} onBlur={()=>{verificaEmail(email, setEmailOk, setMsg)}} onChange={(e) => {setEmail(e.target.value)}}/>
          </div>

          <div>
            <label htmlFor="tel">Telefone:</label>
            <input className={styles.inputForm} type="number" name="telefone" id="tel" placeholder="Digite o telefone" value={tel} onChange={(e) => {setTel(e.target.value)}}/>
          </div>        
          
          <div>
            <label htmlFor="senha1">Senha:</label>
            <input className={styles.inputForm} type="password" name="senha" id="senha1" placeholder="********" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
          </div>
          
          <div style={{color: "#f00"}}>{error}</div>

          <button id={styles.btnAlt} onClick={() => {
            if(verificarCampos(emailOk, setError) == true){
              navigate("/login");
            }
          }}>Cadastrar</button>
        </form>

      </div>
    </main>
 )
};

export default RegistroLojista;