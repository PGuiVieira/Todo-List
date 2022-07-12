import { TbClipboardText } from 'react-icons/tb';
import styles from './TodoEmpty.module.scss';

export function TodoEmpty() {
  return (
    <div className={styles.container}>
      <TbClipboardText size="56" />
      <p>
        Você ainda não tem tarefas cadastradas <br />
        <span>Crie tarefas e organize seus itens a fazer</span>
      </p>
    </div>
  );
}
