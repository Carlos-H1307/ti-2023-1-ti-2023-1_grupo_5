import { useNavigate } from "react-router-dom";
import styles from "./LojistaInfo.module.css"
import stylesBtn from "../Button/btn/Btn.module.css";
import { deletarLojista } from "../../reduxFeatures/lojista";
import { useDispatch } from "react-redux";
import Btn from "../Button/btn/Btn";
import Swal from "sweetalert2";

export default function LojistaInfo({ lojista , setEditando}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function deletar(){
        Swal.fire({
            title: 'Tens certeza?',
            text: "Deseja deletar esta loja?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletarLojista());
                navigate("/");
              Swal.fire(
                'Deletada!',
                'Sua lcoja foi deletada.',
                'success'
              )
            }
          })
    }
    return (
        <div className={styles.campo_info}>
            <h1>Loja - {lojista.nome}</h1>
            <div>Endereço: {lojista.endereco}</div>
            <div>CNPJ: {lojista.cnpj}</div>
            <div>Telefone: {lojista.telefone}</div>
            <div>E-mail: {lojista.email}</div>
            <div className={styles.campo_btn}>
                <button id={styles.btn_editar} className={styles.btn} Text={"Editar"} onClick={() => setEditando(true)}>Editar conta</button>
                <button id={styles.btn_deletar} className={styles.btn} Text={"Deletar"} onClick={deletar}>Deletar conta</button>
            </div>
        </div>
    )
} 