import { useContext, createContext, useState } from "react";
import { USER_INFO, USER_INFO_DATA } from "../reactQueryProvider/QueryKeys";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(USER_INFO) || "");
  let userInfoData = localStorage.getItem(USER_INFO_DATA)
  const [userInfo, setUserInfo] = useState(userInfoData ? JSON.parse(userInfoData) : '');
  const navigate = useNavigate();
  const loginAction = async (data, userInfo) => {
    try {
      setToken(data.token);
      setUserInfo(data.token);
      setUserInfo(userInfo);
      localStorage.setItem(USER_INFO, data.token);
      localStorage.setItem(USER_INFO_DATA, JSON.stringify(userInfo));
      setTimeout(() => {
        navigate("/");
      }, 800)
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = (queryClient) => {
    setToken("");
    setUserInfo("")
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(USER_INFO_DATA);
    queryClient.removeQueries();
    navigate("/login");
  };

  const getUserInfo = () => {
    let userInfoData = localStorage.getItem(USER_INFO_DATA) || userInfo
    if (typeof userInfoData === 'string') {
      return JSON.parse(userInfoData)
    }
    return {}
  };
  return (
    <AuthContext.Provider value={{ token, logOut, loginAction, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
