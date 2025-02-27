import styles from "./Lojista.module.css"
import ProdutoLojista from "../../components/ProdutoLojista/ProdutoLojista"
import { Link, useNavigate } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { alteraFirstFetched, fetchProdutos } from "../../reduxFeatures/lojista";
import LojistaInfo from "../../components/Lojista/LojistaInfo";
import LojistaInfo_Editar from "../../components/Lojista/LojistaInfo_Editar";

function Lojista() {
    const [editando, setEditando] = useState(false);

    const lojista = useSelector( state => state.lojista );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(lojista.firstFetched == false ){
        dispatch(fetchProdutos({_id: lojista._id, token: lojista.token}))
    }

    return (
        <main>
        {
            lojista != null  ? (
                <div className={styles.loja}>
                    <div className={styles.info}>
                    {   editando == false ? 
                    (<LojistaInfo lojista={lojista} setEditando={setEditando}/>) : 
                    (<LojistaInfo_Editar lojista={lojista} setEditando={setEditando}/>)
                    }
                </div>

                <h1>Produtos</h1>
                <Link to="/cadastroProduto">
                    <button className={styles.botaoCadastro}>Cadastrar Produto</button>
                </Link>
                {lojista.produtos.length != 0 ? (
                    <div className={styles.campo_produtos}>
                        {lojista.produtos.map((prod) => <ProdutoLojista produto={prod} key={prod._id}/>)}
                    </div>
                ) : (<div>Não há produtos registrados</div>)}
                </div>
            ) : <>{() => {navigate("/error")}}</>
        }
        </main>
        
    )
}
export default connect()(Lojista)