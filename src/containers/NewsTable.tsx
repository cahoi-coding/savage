import React, {Component} from 'react';

import {db, NEWSPAPERS_COLLECTION, storage} from 'services/firebase-config';
import {collection, getDocs, doc, deleteDoc, addDoc} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import {Link} from 'react-router-dom';

// import {v4} from 'uuid';

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
        let image = document.querySelector('#image').files[0];
        console.log(image.name);

        console.log(storage);

        let imageRef = ref(storage, `images/${ image.name }`);

        let isUploaded = false;

        // const aaa = await uploadBytes(imageRef, image);
        uploadBytes(imageRef, image).then( async (snapp) => {
            const url = await getDownloadURL(snapp.ref);
            // const url = 'abc';
            // console.log(url)
            // @ts-ignore
            const newNewspaper = {title: document.querySelector('#title').value, content: document.querySelector('#content').value, image: url, category: document.querySelector('#category').value, author: document.querySelector('#author').value};

            await addDoc(this.newspapersCollectionRef, newNewspaper);

            const newspapers = await this.getNewspapers();
            this.setState({
                newspapersList: [...newspapers],
                isLoaded: true,
                newNewspaper: {}
            })


            // @ts-ignore
            document.querySelector('#image').value = '';
            // @ts-ignore
            document.querySelector('#title').value = '';
            // @ts-ignore
            document.querySelector('#content').value = '';
            // @ts-ignore
            document.querySelector('#category').value = '';
            // @ts-ignore
            document.querySelector('#author').value = '';
        })

    }

    displayForm()
    {
        return (
            // @ts-ignore
            <div>
                <form  action="">
                    <label htmlFor="">
                        <span>image</span>
                        <input id={'image'} type="file"/>
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
                    <button onClick = {() => this.sendData()} className="add" type="button">add new</button>
                </form>
                <Link className="add" to='/' >Home</Link>
            </div>

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