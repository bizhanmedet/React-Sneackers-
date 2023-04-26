import React from 'react';
import Info from "../Info";
import AppContext from '../../context';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout (resolve, ms));

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState (null);
    const [isOrderComplete, setIsOrderComplete] = React.useState (false);
    const [isLoading, setIsLoading] = React.useState (false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const onClickOrder = async () => {
    try {
        setIsLoading(true);
        const {data} = await axios.post('https://6421558234d6cd4ebd706c7b.mockapi.io/orders', {
            items: cartItems
        });
        setOrderId (data.id);
        setIsOrderComplete(true);
        setCartItems([]);
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete('https://6407163677c1a905a0ecf46b.mockapi.io/cart/' + item.id);
            await delay(1000)
        }
    } catch (error) {
        alert ('Ошибка при создании заказа:(');
    }
        setIsLoading(false);
    };

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClose} className="cu-p removeBtn" src="/img/btn-remove.svg" alt="close" />
                </h2>

                {
                    items.length > 0 ? 
                    <div className="d-flex flex-column flex">
                        <div className="items">
                    {items.map((obj) => (
                        <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
                            <div
                                style={{ backgroundImage:`url(${obj.imageUrl}` }} className="cartItemImg"></div>
                            <div className="mr-20 flex ">
                                <p className="mb-5">
                                    {obj.title}
                                </p>
                                <b>{obj.price} тенге</b>
                            </div>
                            <img 
                            onClick={() => onRemove(obj.id)} className="removeBtn" 
                            src="/img/btn-remove.svg" 
                            alt="remove" />
                        </div>
                    ))}
                </div>
                <div className="cartTotalBlock">
                <ul>
                    <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>{totalPrice} тенге. </b>
                    </li>
                    <li className="d-flex">
                        <span>Налог 12%:</span>
                        <div></div>
                        <b>{Math.round(totalPrice / 100 * 12)} тенге.</b>
                    </li>
                </ul>

                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
            </div></div> :
                    (<Info 
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару  кроссовок, чтобы сделать заказ."} 
                    image={isOrderComplete ? "/img/complete.png" : "/img/empty-cart.png" }
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;