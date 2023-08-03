import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hook";
import {removeContact, searchContact, SearchData} from "../../store/contactsReducer";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import { debounce } from 'throttle-debounce';
import ContactCard from "../components/ContactCard";
import Preloader from "../elements/Preloader";
import SearchForm from "../components/SearchForm";


const Contacts: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {data: contacts, isLoading} = useAppSelector(state => state.contacts)

    const getDebounceContacts = debounce(500, (searchData: SearchData) => {
        dispatch(searchContact(searchData))
    });

    const getContacts = (searchData: SearchData) => {
        getDebounceContacts(searchData)
    }

    const handleDeleteContact = (id: number) => {
        dispatch(removeContact(id))
    }

    const handleRedactContact = (id: number) => {
        navigate(`/redact-contact/${id}`)
    }

    return (
        <main>
            <div className="container">
                <div className="page-head">
                    <h1>Контакты</h1>
                </div>

                <SearchForm handleSearch={getContacts}/>

                <div className="contacts-list">
                    {
                        isLoading
                            ?
                            <Preloader />
                            :
                            <React.Fragment>
                                {
                                    !contacts.length
                                        ?
                                        <h3>Нет результатов</h3>
                                        :
                                        contacts.map(({id, contactName, tel, email, tags}) =>
                                            <ContactCard
                                                key={id}
                                                id={id}
                                                contactName={contactName}
                                                tel={tel}
                                                email={email}
                                                tags={tags}
                                                deleteContact={handleDeleteContact}
                                                redactContact={handleRedactContact}
                                            />
                                    )
                                }
                            </React.Fragment>
                    }
                </div>
            </div>
        </main>
    );
}

export default Contacts
