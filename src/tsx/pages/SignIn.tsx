import React from 'react';
import {useAppDispatch} from "../../hook";
import {loginUser, User} from "../../store/userReducer";
import Field from "../elements/Field";

const SignIn:React.FC = () => {
    const dispatch = useAppDispatch()

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const user: User = {
            name: '1',
            password: '2'
        }

        // @ts-ignore
        dispatch(loginUser(user))
    };

    return (
        <main>
            <div className="container">
                <div className="sign-in">
                    <div className="sign-in__inner">
                        <h1 className="sign-in__title">Вход</h1>

                        <form onSubmit={handleSubmit}>
                            <Field name="name" label="Имя" type="text"/>
                            <Field name="password" label="Пароль" type="password"/>
                            <button type="submit" className="btn">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn
