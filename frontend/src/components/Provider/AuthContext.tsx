
import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth';
import { AuthState } from '../../redux/reducers/authReducer';

import { State } from "../../redux/rootReducer"

export const AuthContextProvider: React.FC = ({ children }) => {

    const auth = useSelector<State, AuthState>(state => state.auth)

    console.log(auth)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [GetUser, {loading}]= useLazyQuery(gql`
        {
            getUser
        }
    `, {
        onCompleted: (data) => {
            if(data.getUser){
                dispatch({
                    type: "SET_LOGGEDIN",
                    payload: {
                        isLoggedIn: true
                    }
                })
                navigate("/app")
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect( () => {
        if(!auth.jwt){
            GetUser()
        }
        
    }, [GetUser,auth.jwt])

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}