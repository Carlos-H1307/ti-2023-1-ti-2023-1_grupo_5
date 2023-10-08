import styles from "./ProdutoLojista.module.css"
import { Link } from "react-router-dom"

const ProdutoLojista = ({produto}) => {
    return(
        <div className={styles.produtoLojista}>
            <div className={styles.produtoLojista_campo_img}>
                <Link to={`/produtos/${produto._id}`}>
                    <img src={produto.img} alt='' className={styles.produto_lojista_imagem} />
                </Link>

            </div>
            <div className={styles.produto_lojista_info}>
                <div className={styles.produtoLojista_campo_info}>
                    <Link to={`/produtos/${produto._id}`}>
                        <div className={styles.produto_lojista_descricao}>{produto.descricao}</div>
                    </Link>
                    <div className={styles.produto_lojista_detalhes}>{produto.detalhes}</div>
                    <div className={styles.produto_lojista_preco}>R$: {produto.preco}</div>
                </div>
                <Link to={`/editarProduto/${produto._id}`} >
                    <button className={styles.produto_lojista_botao_editar}>
                        Editar
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProdutoLojista