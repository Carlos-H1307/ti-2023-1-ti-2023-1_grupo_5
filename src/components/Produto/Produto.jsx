import styles from "./Produto.module.css"
import { Link } from "react-router-dom"
import adicionarAoCarrinho from "./adicionarAoCarrinho"

//import p from "../components/Dados"
import { useCarrinho } from "../../context/CarrinhoContext"

const Produto = ({produto}) => {
    const carrinho = useCarrinho()
    const prod = produto
    function add(){
        carrinho.addCarrinho(prod)
        adicionarAoCarrinho(1, prod)
    }
    return(
        <div className={styles.novidades_produto}>
            
            <Link to={`/produtos/${produto.id}`}>
                <img src={produto.img} alt='' className={styles.novidade_produto_imagem} />
            </Link>
            <Link to={`/produtos/${produto.id}`}>
                <div className={styles.novidade_produto_descricao}>{produto.descricao}</div>
            </Link>
            <div className={styles.preco}>R$ {produto.preco}</div>
            <div className={styles.metodo_pagamento}>À vista no pix</div>
            
            <button className={styles.novidade_produto_botao} onClick={add}>Comprar</button>

        </div>
        
    )
}

export default Produto

{/*
export default function Produto(params) {
    const carrinho = useContext(CarrinhoContext)
    const add = Produto => () => {
        carrinho.addCarrinho(Produto)
    }
    return (
        <div className={styles.novidades_produto}>
            <pre>{JSON.stringify(carrinho, null,2)}</pre>
            <a> <Link to="/ProdutoSimples" >
            <img src={params.produto.img} alt={params.produto.tipo} className={styles.novidade_produto_imagem} />
            <div className={styles.novidade_produto_descricao}>{params.produto.descricao}</div>
            <div className={styles.preco}>R$ {params.produto.preco}</div>
            <div className={styles.metodo_pagamento}>À vista no pix</div>
            
            </Link></a>
            <a>
                <button className={styles.novidade_produto_botao} onClick={add(Produto)}>Comprar</button>
            </a>
        </div>
    )
}

*/}