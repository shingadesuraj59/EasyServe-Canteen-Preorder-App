import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [canteenInfo, setCanteenInfo] = useState([]);
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const URL =import.meta.env.VITE_BACKEND_URL || "https://easy-serve-backend.vercel.app";
 
    const location = useLocation(); // Get the current route

    

    const fetchFoodList = async () => {
        const response = await axios.get(URL + "/api/food/list");
        if (response.data.success) {
            setFoodList(response.data.data);
        }
    };

    const fetchCanteenInfo = async () => {
        try {
            const response = await axios.get(URL+'/api/canteen/display-canteen');
            setCanteenInfo(response.data.canteen);
        } catch (err) {
            console.error("Error fetching canteen info:", err);
        }
    };



    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(URL+"/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(URL+"/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(URL+"/api/cart/get", {}, { headers: { token } });
            setCartItem(response.data.data);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };
    

    useEffect(() => {
        async function loadData() {
            fetchFoodList();
            fetchCanteenInfo();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);


    

    // Clear the cart when navigating to the home page
    useEffect(() => {
        if (location.pathname === "/") {
            setCartItem({});
        }
    }, [location.pathname]);

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        URL,
        canteenInfo,
        fetchCanteenInfo 
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;