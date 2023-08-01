import React from 'react';
import Field from "../elements/Field";

const CreateContact: React.FC = () => {
    return (
        <main>
            <div className="container">
                <div className="page-head">
                    <h1>Создать контакт</h1>

                    <form className="form">
                        <Field name="name" label="ФИО"/>
                        <Field name="email" label="Email"/>
                        <Field name="tel" label="Телефон"/>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CreateContact
