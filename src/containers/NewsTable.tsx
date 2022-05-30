import React, {Component} from 'react';

import {db, NEWSPAPERS_COLLECTION} from 'services/firebase-config';
import {collection, getDocs, doc, deleteDoc, addDoc} from 'firebase/firestore'

import NewsRow from 'components/Row';
import {NewsCard} from "../components/NewsCard";

export class NewsTable extends Component<any, any>
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

    public async deleteNewspaper(id: string)
    {
        const newspaperDoc = doc(db, NEWSPAPERS_COLLECTION, id);
        const a = await deleteDoc(newspaperDoc);
        // await this.componentDidMount();
        const newspapers = await this.getNewspapers();
        this.setState({
            newspapersList: [...newspapers],
            isLoaded: true
        })
    }

    public async componentDidMount()
    {
        const newspapers = await this.getNewspapers();
        this.setState({
            newspapersList: [...newspapers],
            isLoaded: true,
            newNewspaper: {}
        })
    }

    // private callback(id: string)
    // {
    //     return {
    //         delete: this.deleteNewspaper(id)
    //     };
    // }

    async sendData()
    {
        // @ts-ignore
        const newNewspaper = {title: document.querySelector('#title').value, content: document.querySelector('#content').value, image: document.querySelector('#image').value, category: document.querySelector('#category').value, author: document.querySelector('#author').value};
        await addDoc(this.newspapersCollectionRef, newNewspaper);
        const newspapers = await this.getNewspapers();
        this.setState({
            newspapersList: [...newspapers],
            isLoaded: true,
            newNewspaper: {}
        })
        return undefined;
    }

    displayForm()
    {
        return (
            // @ts-ignore
            <form onSubmit={()=>this.sendData()} action="">
                <label htmlFor="">
                    <span>image</span>
                    <input id={'image'} type="text"/>
                </label>
                <label htmlFor="">
                    <span>title</span>
                    <input id={'title'} type="text"/>
                </label>
                <label htmlFor="">
                    <span>content</span>
                    <input id={'content'} type="text"/>
                </label>
                <label htmlFor="">
                    <span>author</span>
                    <input id={'author'} type="text"/>
                </label>
                <label htmlFor="">
                    <span>category</span>
                    <input id={'category'} type="text"/>
                </label>
                <button className="add" type="submit">add new</button>
            </form>
        );
    }

    render()
    {
        return (
        <div className={'table-container'}>
            <table>
                <thead>

                </thead>
                <tbody>
                {
                    this.state.newspapersList.map((data: any, index: number) =>
                        {return <NewsRow delete={this.deleteNewspaper.bind(this, data.data.id)}  key={index} data={data.data}/>;}
                    )
                }
                </tbody>
            </table>
            {this.displayForm()}
        </div>
    );
    }
}