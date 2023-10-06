import styles from './Btn.module.css';

const Btn = ({ Text, onClick, type }) => {
  return (
    <button type={type} onClick={onClick}>
        {Text}
    </button>
  );
};

export default Btn;