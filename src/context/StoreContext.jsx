import { createContext, useEffect, useState } from "react";
import { getFoodList } from "../assets/assets1";
import Swal from "sweetalert2";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5201/api/Product")
                .then(response => {
                    console.dir(response.data);
                    Swal.fire({
                        text: 'Succeed!',
                        icon: 'success'
                    });
                    setFoodList(response.data);
                })
                .catch(error => {
                    Swal.fire({
                        text: error,
                        icon: 'error'
                    });
                    setFoodList([]);
                })
        };
        fetchData();
    }, []);

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.id == item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        < StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider >
    )

}

export default StoreContextProvider