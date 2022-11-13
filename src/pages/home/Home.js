import { useAuthContext } from '../../hooks/useAuthContext';
import DiaryForm from './DiaryForm';
import styles from './Home.module.css';

export default function Home() {
    const { user } = useAuthContext();

    return (
        <main className={styles.cont}>
            <aside className={styles.side_menu}>
                <DiaryForm uid={user.uid}></DiaryForm>
            </aside>
            <ul className={styles.content_list}>Diary list</ul>
        </main>
    );
}
