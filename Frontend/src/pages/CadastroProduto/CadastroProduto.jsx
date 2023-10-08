import styles from "./CadastroProduto.module.css"
import { cadastrarProduto } from "../../reduxFeatures/lojista"
import { useNavigate } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

 function CadastroProduto(){
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const lojista   = useSelector( state => state.lojista)
    
    let [img, setImg]               = useState();
    let [categoria, setCategoria]   = useState("");
    let [descricao, setDescricao]   = useState("");
    let [preco, setPreco]           = useState("");
    let [detalhes, setDetalhes]     = useState("");
    
    function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        data.append('file', img[0]);
        data.append('categoria', categoria);
        data.append('descricao', descricao);
        data.append('preco', preco);
        data.append('detalhes', detalhes);
        data.append('idLojista', lojista._id);
        
        dispatch(cadastrarProduto({data: data}));
        navigate("/lojista");
    }
    

    return(
        <main>
            {lojista != null ?
             (
                <section className={styles.cadastro_produto}>
                    
                    <div className={styles.form_box}>
                            <form action="" className={styles.formulario_produto} encType="multipart/form-data">
                                <h1>Cadastro de Produto</h1>
                                <div className={styles.campo_form}>
                                    <div>
                                        <select id="categoria"
                                        className={styles.input_text}
                                        value = {categoria}
                                        onChange={ (e) => {setCategoria(e.target.value)} }
                                        required>
                                            <option value="">Selecione a categoria do produto</option>
                                            <option value="placas graficas">Placas Gráficas</option>
                                            <option value="armazenamento">Armazenamento</option>
                                            <option value="memoria">Memória</option>
                                            <option value="gabinete">Gabinete</option>
                                            <option value="cooler">Cooler</option>
                                            <option value="monitor">Monitor</option>
                                            <option value="periferico">Periférico</option>
                                            <option value="fonte">Fonte</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input 
                                        id="descricao" 
                                        type="text" 
                                        placeholder="Descricao" 
                                        className={styles.input_text} 
                                        value = {descricao}
                                        onChange={ (e) => {setDescricao(e.target.value)} }
                                        required/>
                                    </div>
                                    <div>
                                        <input 
                                        id          ="preco" 
                                        type        ="number" 
                                        placeholder ="Preço" 
                                        className   ={styles.input_text} 
                                        value       = {preco}
                                        onChange    ={ (e) => {setPreco(e.target.value)} }
                                        required/>
                                    </div>
                                </div>
                                <div className={styles.flexivel}>
                                    <div className={styles.campo_desc}>
                                        <label htmlFor="detalhes">Detalhes</label>
                                        <textarea 
                                        id          ="detalhes" 
                                        name        ="detalhes"
                                        cols        ="36" 
                                        rows        ="4"
                                        value       = {detalhes}
                                        onChange    ={ (e) => {setDetalhes(e.target.value)} }
                                        ></textarea>
                                    </div>

                                    <div className={styles.campo_img}>
                                        <label htmlFor="img" className={styles.drop_container}>
                                            <span className={styles.drop_title}>Clique ou solte aqui o arquivo.</span>
                                            <input 
                                            id          ="img" 
                                            type        ="file" 
                                            className   ={styles.images} 
                                            accept      ="image/*" 
                                            onChange    ={ (e) => {setImg(e.target.files)} }
                                            required/>
                                        </label>
                                    </div>
                                </div>
                                <div id={styles.btn_div}>
                                    <button onClick={handleSubmit}>Cadastrar Produto</button>
                                </div>
                            </form>
                    </div>
                </section>
            ):useEffect(()=>{navigate("/error")})}
    </main>
    )
}

export default connect()(CadastroProduto)