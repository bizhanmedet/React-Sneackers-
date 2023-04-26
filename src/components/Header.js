import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router, } from 'react-router-dom';
import Favorites from '../pages/Favorites';
import AppContext from '../context';

function Header(props) {

    const { cartItems } = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/image 4.png" alt="Logotype" />
                    <div>
                        <h3 className="text-uppercase">React Sneackers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p"><img width={18} height={18} src="/img/basket.svg" alt="Корзина" />
                    <span>{totalPrice} тг.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="mr-20 cu-p" width={18} height={18} src="/img/heart.svg" alt="Закладки" />
                    </Link>
                </li>
                <li>
                <Link to="/orders">
                        <img className="mr-20 cu-p" width={18} height={18} src="/img/user.svg" alt="Пользователь" />
                    </Link>
                </li>
            </ul>
        </header>
        );

}

export default Header;