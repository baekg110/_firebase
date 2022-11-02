import { createContext, useReducer } from "react";

// context 객체 생성
const AuthContext = createContext();

// context를 구독한 컴포넌트 묶음 범위 설정
const AuthContextProvider = ({ children }) => {
    const authReducer = (state, action) => {
        switch (action.type) {
            case "login":
                return { ...state, user: action.payload };
            default:
                return state;
        }
    };

    // Reducer Hook으로 유저정보 관리
    const [state, dispatch] = useReducer(authReducer, {
        // authReducer는 state값을 변경할 수 있다.
        user: null,
    });
    console.log("user state : ", state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* 회원정보가 없데이트 될 때마다 state를 변경 */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
