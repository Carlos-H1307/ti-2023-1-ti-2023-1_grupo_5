import {createStore, createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom";
const initialGeral = {
    fetched: false,
    produto: null,
    produtos: null
};
const url = 'http://localhost:3000';

export const fetchProdutos = createAsyncThunk('geral/fetchProdutos', 
    async (query) => {
        let q = "";
        if(query){
            q = query;
        }

        try {
            let res = await fetch(url + '/produtos' + q );
            res = await res.json();
            return res;        
        } catch (error) {
            console.error(error);
        }
        
    }    
)

export const fetchProduto = createAsyncThunk('geral/fetchProduto', 
    async ({_id}) => {
        try {
            let res = await fetch(url + '/produtos/' + _id);
            res = await res.json();
            return res;        
        } catch (error) {
            console.error(error);
        }

    }    
)


export const getProdutosNovidades = createAsyncThunk('geral/getProdutosNovidades', 
    async () => {
        try {
            let res = await fetch(url + '/produtos/novidades', { method:'GET' });
            res = await res.json();
            return res;
        } catch (error) {
            console.error(error);
        }        
    }    
)

export const geralSlice = createSlice({
    name: "geral",
    initialState: initialGeral,
    reducers: {
        alteraFetched: (state, action) => alteraFetchedReducer(state, action.payload),
    },
    extraReducers: {
        [fetchProdutos.fulfilled]: (state, action) => fulfillfetchProdutosReducer(state, action.payload),
        [fetchProdutos.pending]: (state, action) => pendingProdutosReducer(state, action.payload),
        [fetchProduto.fulfilled]: (state, action) => fulfillfetchProdutoReducer(state, action.payload),
        [fetchProduto.pending]: (state, action) => pendingProdutoReducer(state, action.payload),
        [getProdutosNovidades.fulfilled]: (state, action) => fulfillfetchGetProdutosNovidadesReducer(state, action.payload),
        [getProdutosNovidades.pending]: (state, action) => pendingGetProdutosNovidadesReducer(state, action.payload),
    }
})

function alteraFetchedReducer(state, conta){
    return state;
}

function pendingProdutoReducer(state, payload){
    let s = {
        produto: 'pending',
        produtos: null,
        fetched:true
    };
    state = s;
    return state;
}

function fulfillfetchProdutoReducer(state, payload){
    let s = {
        produto: payload,
        produtos: null,
        fetched:true
    };
    state = s;
    return state;
}

function pendingProdutosReducer(state, payload){
    let s = {
        produto: null,
        produtos: 'pending',
        fetched:  false,
    }
    state = s;
    return state;
}

function fulfillfetchProdutosReducer(state, payload){
    let prod = payload;

    if( prod.length == 0 ){
        prod = null;
    }

    let s = {
        produto: null,
        produtos: prod,
        fetched:  false,
        msg: "Não há produtos cadastrados."
    };

    state = s;
    return state;
}

function pendingGetProdutosNovidadesReducer(state, payload){
    state = {produtosNovidades: 'pending'};
    return state;
}

function fulfillfetchGetProdutosNovidadesReducer(state, payload){
    state = {produtosNovidades: payload};
    return state;
}


export default geralSlice.reducer;
export const { alteraFetched } = geralSlice.actions;