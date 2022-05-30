import React from "react";

import {Header} from 'components/Header';
import {NewsCard} from 'components/NewsCard';
import {NewsCardContainer} from 'containers/NewsCardContainers';

export function Home(props: any)
{
    return (
        <div id="home" className="home">
            <Header/>
            <NewsCardContainer/>
        </div>
    );
}