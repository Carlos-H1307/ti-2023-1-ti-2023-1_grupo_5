import React, { useEffect, useState } from "react"
import styles from "./Produto.module.css"
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { adicionarProduto } from "../../reduxFeatures/conta";
import { fetchProduto } from "../../reduxFeatures/geral";
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";

/*
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  footer: '<a href="">Why do I have this issue?</a>'
})
*/

function Produto_detalhes(){
    const {produtoId}   = useParams();
    const dispatch      = useDispatch();
    let state           = useSelector( state => state.geral );
    let conta           = useSelector( state => state.conta );

    let prod            = state.produto;

    useEffect(() => { dispatch(fetchProduto({_id: produtoId})) }, []);

    return (
        <>
            {
                state.produto === 'pending' ? 
                ( <Loading></Loading> ) :
                (
                    <main>
                        <div className={styles.produto_body}>
                        {
                            prod == null || prod == undefined ? (<></>) : 
                            (
                                    <div className={styles.produto_container}>
                                        <div className={styles.campo_img}>
                                            <img src={prod.img}/>
                                        </div>
                                        <div className={styles.campo_desc}>
                                            <div className={styles.campo_desc1}>
                                                <h1 className={styles.descricao}>{prod.descricao}</h1>
                                                <div className={styles.detalhes1}>{prod.detalhes}</div>
                                            </div>
                                            <div>
                                                <div className={styles.preco}>R${prod.preco}</div>
                                                <button 
                                                className={styles.botao_comprar}  
                                                onClick={() => {
                                                if(conta != null){
                                                    dispatch(adicionarProduto({produto: prod}));
                                                }else{
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Faça login',
                                                        text: 'Você precisa estar logado para realizar esta operação.',
                                                    });
                                                }}}>
                                                    Adicionar ao carrinho
                                                </button>
                                            </div>
                                        </div>
                                
                                
                                    </div>
                                
                                )
                            }
                        </div>
                    </main>
                )
            }
        </>

    )
}


export default connect()(Produto_detalhes)
