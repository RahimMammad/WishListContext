import React, { createContext, useContext, useState } from "react";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]); // Initialize wishList with an empty array

  const addWish = (productId) => {
    setWishList((prevWishList) => {
      if (prevWishList.includes(productId)) {
        return prevWishList.filter((id) => id !== productId);
      } else {
        return [...prevWishList, productId];
      }
    });
  };

  const wishListContextValue = {
    wishList,
    addWish,
  };

  return (
    <WishListContext.Provider value={wishListContextValue}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishListProvider");
  }
  return context;
};
