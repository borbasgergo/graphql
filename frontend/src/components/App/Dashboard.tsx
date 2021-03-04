import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';


export const Dashboard: React.FC = () => {
    
    const [GetChannels, {data}] = useLazyQuery(gql`

        {
            getChannels { id, name }
        }
        
    `, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        GetChannels()
    }, [GetChannels])


    /*if(data){
        return (
            data.getChannels.map( (ch: any) => (
                <div key={ch.id}>
                    { ch.name }
                </div>
            ))
        )
    }*/
    return (
        <div>
            {
                data ? (
                    data.getChannels.map( (ch: any) => (
                        <div key={ch.id}>
                            { ch.name }
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}