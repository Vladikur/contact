import React from 'react';
import ContactCard from "../components/ContactCard";

const Contacts: React.FC = () => {
    const contacts = [
        {
            id: 1,
            contactName: 'Илья Суховерхов',
            tel: '999 999 99',
            email: 'ilya@mail.ru',
            tags: ['Семья', 'Брат']
        },
        {
            id: 2,
            contactName: 'Кот',
            tel: '9349 999 99',
            email: 'cat@mail.ru',
            tags: ['Семья', 'Животное']
        },
        {
            id: 3,
            contactName: 'Констанин Константинопольский',
            tel: '9349 999 239',
            email: 'kostya@mail.ru',
            tags: ['Работа']
        },
        {
            id: 4,
            contactName: 'Кофеварка',
            tel: '934999 99',
            email: 'coffe@mail.ru',
            tags: ['Работа']
        }
    ]
    return (
        <main>
            <div className="container">
                <div className="page-head">
                    <h1>Контакты</h1>
                </div>

                <div className="contacts-list">
                    {
                        contacts.map(({id, contactName, tel, email, tags}) =>
                            <ContactCard
                                key={id}
                                contactName={contactName}
                                tel={tel}
                                email={email}
                                tags={tags}
                            />
                        )
                    }
                </div>
            </div>
        </main>
    );
}

export default Contacts
