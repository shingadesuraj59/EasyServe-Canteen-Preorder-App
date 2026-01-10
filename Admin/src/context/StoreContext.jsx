import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [canteenToken, setCanteenToken] = useState(() => localStorage.getItem("canteenToken") || "");
  const [canteenName,setCanteenName] = useState("");
  
  const url =import.meta.env.BACKEND_URL || "https://easy-serve-backend.vercel.app";  


  
  const contextValue = { canteenToken, setCanteenToken,canteenName,setCanteenName,url };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;