import React from "react";

export type NewsCardProps = {
    data: {
        title: string,
        content: string,
        image: string,
        category: string,
        author: string,
        createdAt: string
    }
}

export function NewsCard(props: NewsCardProps)
{
    return (
        <div className="news-card">
            <img src={props.data.image} alt="" className="news-card__image"/>
            <ul className="news-card__list">
                <li className="news-card__list__item news-card__category">{props.data.category}</li>
                <li className="news-card__list__item news-card__author">by {props.data.author}</li>
            </ul>
            <div className="news-card__title">{props.data.title}</div>
            <div className="news-card__sub-content">{props.data.content}</div>
        </div>
    );
}