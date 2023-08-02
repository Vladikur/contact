import React from 'react';
import ContactCard from "../components/ContactCard";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getContacts} from "../../store/contactsReducer";

const Contacts: React.FC = () => {
    const dispatch = useAppDispatch()
    const {data: contacts} = useAppSelector(state => state.contacts)

    React.useEffect(() => {
        dispatch(getContacts())
    }, [])

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
