import React from "react";
import { Link, Route, useHistory } from "react-router-dom";
import './Header.css';
import logo from "../../images/logo.svg";
import Navigation from '../Navigation/Navigation.js';

function Header(props) {
    const currentPath = useHistory().location.pathname;
    const isMainPage = currentPath === "/";
    return(
        <header className="header"  id="header-id" style={{ backgroundColor: isMainPage && "#dddee3" }}>
            <div className="header__container">
                
                <Link to="/">
                    <img className="header__logo" src={logo} alt='логотип'/>
                </Link>

                <div className="header__buttons">
                    {props.loggedIn
                    ?
                    <Navigation/>
                    :
                    <Route path="/">
                        <Link to ="/signup">
                            <button className="header__button-reg" type="button">Регистрация</button>  
                        </Link>

                        <Link to="signin">
                        <button className="header__button-login" type="button">Войти</button>
                        </Link>
                    </Route>   
                    }

                </div>
            </div>
        </header>
    )
}

export default Header;
