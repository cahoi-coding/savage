import React from "react";

export function Header(props: any)
{
    return (
        <header className="header">
            <div className="header__logo" id="logo">Haters, May Mo</div>
            <ul className="header__nav">
                <li className="header__nav__item"><a href="" className="header__nav__link">home</a></li>
                <li className="header__nav__item"><a href="" className="header__nav__link">blog</a></li>
                <li className="header__nav__item"><a href="" className="header__nav__link">podcast</a></li>
                <li className="header__nav__item"><a href="" className="header__nav__link">setting</a></li>
            </ul>
        </header>
    );
}