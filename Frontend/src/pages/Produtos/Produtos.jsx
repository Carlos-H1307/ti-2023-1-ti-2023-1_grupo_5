import React, { useEffect, useState } from 'react';
import styles from "./Produto.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProdutos } from '../../reduxFeatures/geral';
import Produto from "../../components/Produto/Produto"
import Loading from '../../components/Loading/Loading';

export default function Produtos(){
  const state = useSelector(state => state.geral);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProdutos());
  }, []);
  return (
    <>
      {
        state.produtos === 'pending' ?
        ( <Loading></Loading> ) :
        (
          <main>
            <div  className={styles.produto}>
              {
                (state.produtos != null) ?
                (
                  <>{state.produtos.map( p => (<Produto produto={p} key={p._id}/>) )}</>
                ) : 
                (
                  <div>{state.msg}</div>
                )
              }
            </div>
          </main>
        )
      }
    </>
  )
}
