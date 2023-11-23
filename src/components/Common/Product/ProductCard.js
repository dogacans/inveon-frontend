import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineHeart} from 'react-icons/ai';
//Her bir ürünü temsil edecek
const ProductCard = ({product}) => {
        console.log(product)
        let dispatch=  useDispatch();

        const sepeteEkle = async(id) => {
            console.log("tıklandı");
            dispatch({type :"products/AddToCart",payload : {id}})
        }
        
        const favorilereEkle = async(id) => {
            console.log("tıklandı");
            dispatch({type :"products/addToFavorites",payload : {id}})
        }

    if (!product) {
        return <></>
    }
    return(
        <>
         <div className="product_wrappers_one">
            <div className="thumb">
                 <Link to={`/product-details-two/${product.productId}`} className="image">
                    <img src={product.imageUrls.split(";")[0]} alt={`${product.name} picture`}></img>
                    <img className="hover-image" src={product.imageUrls.split(";")[0]} alt={`${product.name} picture`} />
                 </Link>
                   <span className="badges">
                    <span className={(['yaz','yeni','satışta'][Math.round(Math.random()*2)])} >
                        {"label goes here"}
                    </span>
                   </span>
                   <div className="actions">
                     <a href="#!" className="action wishlist" title="Favorilere Ekle"
                      onClick={() => favorilereEkle(product.productId)} ><AiOutlineHeart />

                     </a>
                 </div>
                 <button type="button" className="add-to-cart offcanvas-toggle" 
                    onClick={() => sepeteEkle(product.productId)} >Sepete Ekle</button>
             </div>
             <div className="content">
                <h5 className="title">
                    <Link to={`/product-details-two/${product.productId}`}>{product.productId}</Link>
                </h5>
                <span className="price">
                    <span className="new">{product.price}TL</span>
                </span>
             </div>
               
            </div>
        </>
    )
}

export default ProductCard