import React from 'react';
import {useAppDispatch} from "../../hook";
import {loginUser, User} from "../../store/userReducer";
import Field from "../elements/Field";

const SignIn:React.FC = () => {
    const dispatch = useAppDispatch()
    const [nameError, setNameError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget
        const data = new FormData(form);
        const name = String(data.get('name'))
        const password = String(data.get('password'))

        setNameError(!name ? 'Заполните это поле' : '')
        setPasswordError(!password ? 'Заполните это поле' : '')

        if (name && password) {
            const user: User = {
                name,
                password
            }

            // @ts-ignore
            dispatch(loginUser(user))
        }
    };

    return (
        <main>
            <div className="container">
                <div className="sign-in">
                    <div className="sign-in__inner">
                        <h1 className="sign-in__title">Вход</h1>

                        <form onSubmit={handleSubmit}>
                            <Field name="name" label="Имя" type="text" error={nameError}/>
                            <Field name="password" label="Пароль" type="password" error={passwordError}/>
                            <button type="submit" className="btn">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn
