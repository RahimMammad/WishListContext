import React from 'react';
import { useWishlist } from '../../context/WishListContext';

const Cart = ({ product }) => {
  const { wishList, addWish } = useWishlist();
  const isWished = wishList.includes(product.id);

  return (
    <div className='text-center shadow-xl rounded-md pb-8'>
      <img className='mx-auto max-h-[300px] rounded-md' src={product.image} alt="" />
      <div className='mb-6'>
        <p className='mt-4 mb-3'>{product.category}</p>
        <h4 className='max-w-[80%] mx-auto mb-3'>{product.title}</h4>
        <span>${product.price}.99</span>
        <i onClick={() => addWish(product.id)} style={{ marginLeft: "20px", cursor: "pointer", color: isWished ? "red" : "black" }} className="fa-regular fa-heart"></i>
      </div>
    </div>
  );
};

export default Cart;
