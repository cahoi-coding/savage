import React, {useState, useEffect} from 'react';
import {NewsCard, NewsCardProps} from "../components/NewsCard";

import {db, NEWSPAPERS_COLLECTION} from 'services/firebase-config';
import {collection, getDocs} from 'firebase/firestore';


export function NewsCardContainer(props: any)
{
    const [newspapers, setNewspapers] = useState([]);
    const newspapersCollectionRef = collection(db, NEWSPAPERS_COLLECTION);

    useEffect(()=>
    {
        async function getNewspapers()
        {
            const data = await getDocs(newspapersCollectionRef);
            const datum = data.docs.map(doc =>
                (
                    {...doc.data(), id: doc.id}
                )
            )
            // @ts-ignore
            setNewspapers(datum);
        }
        getNewspapers();
    }, [])

    const renderNewsCards = newspapers.map(function (data, index) {
        return <NewsCard key={index} data={data}/>
    })

    return (
        <div className="news-card__container--primary">
            {renderNewsCards}
            {renderNewsCards}
            {renderNewsCards}
            {renderNewsCards}
            {renderNewsCards}
            {renderNewsCards}
        </div>
    );
}