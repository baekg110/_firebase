import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { appAuth } from '../firebase/config';
// context 객체 생성
const AuthContext = createContext();

// context를 구독한 컴포넌트 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
    const authReducer = (state, action) => {
        switch (action.type) {
            case 'login':
                return { ...state, user: action.payload };
            case 'logout':
                return { ...state, user: null };
            case 'isAuthReady':
                return { ...state, user: action.payload, isAuthReady: true };
            default:
                return state;
        }
    };

    // Reducer Hook으로 유저정보 관리
    const [state, dispatch] = useReducer(authReducer, {
        // authReducer는 state값을 변경할 수 있다.
        user: null,
        isAuthReady: false, // 사용자 인증 정보 준비 여부
    });

    // Auth 객체 관찰자 설정
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({ type: 'isAuthReady', payload: user });
        });
        return unsubscribe; //unsubscribe();와 동일 기능
    }, []); //한번말 실행되도록 최적화([])

    console.log('user state : ', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* 회원정보가 없데이트 될 때마다 state를 변경 */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
