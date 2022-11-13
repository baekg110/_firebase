import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true);

        signOut(appAuth)
            .then(() => {
                // Sign-out successful.
                // 유저 정보 변경 - context를 관리하는 dispatch 함수를 실행
                dispatch({ type: 'logout' });
                setError(null);
                setIsPending(false);
            })
            .catch((error) => {
                // An error happened.
                setError(error.message);
                setIsPending(false);
            });
    };

    return { error, isPending, logout };
};
