import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

export default function Login() {
    // form의 데이터를 관리
    const [email, setEmail] = useState(''); //기본값을 빈 문자열로 설정
    const [password, setPassword] = useState('');
    const { error, isPending, login } = useLogin();

    const handleData = (event) => {
        if (event.target.type === 'email') {
            setEmail(event.target.value);
        } else if (event.target.type === 'password') {
            setPassword(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Submit 기본 이벤트 블락 -> 페이지 리로딩 방지
        console.log(email, password);
        login(email, password);
    };
    return (
        <form className={styles.login_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>로그인</legend>
                <label htmlFor="myEmail ">Email : </label>
                <input type="email" id="myEmail" required value={email} onChange={handleData} />

                <label htmlFor="myPassWord ">Password : </label>
                <input type="password" id="myPassWord" required value={password} onChange={handleData} />

                {!isPending && (
                    <button type="submit" className={styles.btn}>
                        로그인
                    </button>
                )}
                {isPending && <strong>로그인 진행중입니다...</strong>}
                {error && <strong>{error}</strong>}
            </fieldset>
        </form>
    );
}
