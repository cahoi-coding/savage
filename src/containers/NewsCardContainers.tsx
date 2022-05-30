import React, {Component, useState, useEffect, ReactNode} from 'react';
import {NewsCard, NewsCardProps} from "../components/NewsCard";

import {db, NEWSPAPERS_COLLECTION} from 'services/firebase-config';
import {collection, getDocs} from 'firebase/firestore';

// interface NewsCardContainerState {
//     newspapersList: [NewsCardProps],
//     isLoaded: boolean
// }

// function NewsCardContainerStateConstructor(): NewsCardContainerState
// {
//     // @ts-ignore
//     return {newspapersList: [], isLoaded: false}
// }

export class NewsCardContainer extends Component<any, any>
{
    private readonly newspapersCollectionRef;

    public constructor(props: any)
    {
        super(props);

        this.state = {
            // @ts-ignore
            newspapersList: [],
            isLoaded: false
        }

        this.getNewspapers = this.getNewspapers.bind(this);
        this.newspapersCollectionRef = collection(db, NEWSPAPERS_COLLECTION);
    }

    public async getNewspapers()
    {
        const newspapersDocs = await getDocs(this.newspapersCollectionRef);

        return newspapersDocs.docs.map( (doc) => {
            return {
                data: {...doc.data(), id: doc.id}
            };
        });
    }

    public async componentDidMount()
    {
        const newspapers = await this.getNewspapers();
        this.setState({
            newspapersList: [...newspapers],
            isLoaded: true
        })
    }

    render()
    {
        return (
            <div className="news-card__container--primary">
                {
                    this.state.newspapersList.map((data: any, index: number) =>
                        {return <NewsCard key={index} data={data.data}/>;}
                    )
                }
            </div>
        );
    }
}