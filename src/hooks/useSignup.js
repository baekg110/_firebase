import { useState } from "react";
import { appAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    // 에러 정보 저장
    const [error, setError] = useState(null);

    // 서버 통신 상태 저장
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = (email, password, displayName) => {
        setError(null); // 아직 에러가 없다
        setIsPending(true); // 통신 진행 중

        // 비밀번호 기반 계정 만들기(문서 참고)
        createUserWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                if (!user) {
                    throw new Error("회원가입에 실패했습니다");
                }

                // 사용자 프로필 업데이트
                updateProfile(appAuth.currentUser, { displayName })
                    .then(() => {
                        dispatch({ type: "login", payload: user });
                        setError(null);
                        setIsPending(false);
                    })
                    .catch((err) => {
                        setError(err.message);
                        setIsPending(false);
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                // 네트워크 오류
                setError(err.message);
                setIsPending(false);
            });
    };
    return { error, isPending, signup };
};
