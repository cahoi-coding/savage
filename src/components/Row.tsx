import React from 'react';

export type NewsRowProps = {
    data: {
        id: string
        title: string,
        content: string,
        image: string,
        category: string,
        author: string,
        createdAt: string
    },
    delete: any
}

export default function NewsRow(props: any)
{
    function deleteAbc(id: number)
    {
        props.delete(props.data.id);
        console.log(123)
        return undefined;
    }

    // @ts-ignore
    return (
        <tr className="news-row">
            <td><img src={props.data.image} alt=""/></td>
            <td>{props.data.category}</td>
            <td>{props.data.author}</td>
            <td>{props.data.title}</td>
            <td>{props.data.content}</td>
            <td><button onClick={() => deleteAbc(props.data.id)} className="delete">delete</button></td>
            <td><button className="update">update</button></td>
        </tr>
    );
}