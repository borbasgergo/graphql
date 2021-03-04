import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


export const Home: React.FC = () => {


    const [password, setPassword] = useState<string>("")

    const [email, setEmail] = useState<string>("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LoginQL = gql`
        mutation loginMutation($email: String!, $password: String!) {
            login(data: {
                password: $password,
                email: $email
            }) {
                accessToken
            }
        }

    `;
    

    const [LoginMutation, { error }] = useMutation(LoginQL, { 
        variables: {email: email, password: password}, 
        onCompleted: (data) => {
            console.log(data.login.accessToken)
            localStorage.setItem("jwt", data.login.accessToken)

            dispatch({
                type: "ADD_USER",
                payload: {
                    jwt: data.login.accessToken,
                    isLoggedIn: true
                }
            })

            navigate("/app")
            
        },
        onError: () => {
            console.log("ERROR")
        }
    })

    const Login = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        
        
        LoginMutation().finally(() => {
            setPassword("")
            setEmail("")
        })
        
    }


    return (
        <div>
            { error ? <div>{error.message}</div> : null}
            <form onSubmit={(e) => Login(e) }>
                <input type="email" value={email} placeholder="email" onChange={ (e) => setEmail(e.target.value) } />
                <input type="password" value={password} placeholder="password" onChange={ (e) => setPassword(e.target.value) }/>
            
                <input type="submit" name="submit" value="log in"/>
            </form>
        </div>
    )
}