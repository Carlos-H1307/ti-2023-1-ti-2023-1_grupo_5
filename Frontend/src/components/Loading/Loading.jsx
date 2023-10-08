import styles from './Loading.module.css';
import styles2 from '../../Global.module.css';
function Loading(){ 
    return(
        <main>
            <div className={styles2.loading}>
                <div class={styles.lds_ellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </main>
    )
}

export default Loading