import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import styles from "./Signup.module.css";

export default function Signup() {
    // form의 데이터를 관리
    const [email, setEmail] = useState(""); //기본값을 빈 문자열로 설정
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const { error, isPending, signup } = useSignup();

    const handleData = (event) => {
        if (event.target.type === "email") {
            setEmail(event.target.value);
        } else if (event.target.type === "password") {
            setPassword(event.target.value);
        } else if (event.target.type === "text") {
            setDisplayName(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Submit 기본 이벤트 블락 -> 페이지 리로딩 방지
        console.log(email, password, displayName);
        signup(email, password, displayName);
    };
    return (
        <form className={styles.signup_form} onSubmit={handleSubmit}>
            <fieldset>
                <legend>회원가입</legend>
                <label htmlFor="myEmail ">Email : </label>
                <input
                    type="email"
                    id="myEmail"
                    required
                    value={email}
                    onChange={handleData}
                />

                <label htmlFor="myPassWord ">Password : </label>
                <input
                    type="password"
                    id="myPassWord"
                    required
                    value={password}
                    onChange={handleData}
                />

                <label htmlFor="myNickName ">Nickname : </label>
                <input
                    type="text"
                    id="myNickName"
                    required
                    value={displayName}
                    onChange={handleData}
                />

                <button type="submit" className={styles.btn}>
                    회원가입
                </button>
            </fieldset>
        </form>
    );
}
