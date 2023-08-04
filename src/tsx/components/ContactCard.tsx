import React from 'react';
import {Tag} from "../../store/tagsReducer";
import AppButton from "../elements/AppButton";



interface ContactCardProps {
    id: number;
    contactName: string;
    tel: string;
    tags: Tag[];
    email: string;
    deleteContact: (id: number) => void
    redactContact: (id: number) => void
}

const ContactCard: React.FC<ContactCardProps> = ({
                                                     id,
                                                     contactName,
                                                     tel,
                                                     tags,
                                                     email,
                                                     deleteContact,
                                                     redactContact
                                                 }) => {

    const handleDeleteContact = () => {
        deleteContact(id)
    }

    const handleRedactContact = () => {
        redactContact(id)
    }

    return (
        <div className="contact-card">
            <div className="contact-card__content">
                <h3 className="contact-card__name">{contactName}</h3>

                <div className="contact-card__contacts">
                    <div>
                        <span>email: </span>
                        <a className="contact-card__link" href={`mailto:${email}`}>{email}</a>
                    </div>

                    <div>
                        <span>телефон: </span>
                        <a className="contact-card__link" href={`tel:${tel}`}>{tel}</a>
                    </div>
                </div>

                <div className="contact-card__tags">
                    {
                        tags.map((tag) =>
                            <div key={tag.code} className="contact-card__tag">{tag.name}</div>
                        )
                    }
                </div>
            </div>

            <div className="contact-card__buttons">
                <AppButton type="button" isAccent onClick={handleDeleteContact}>Удалить</AppButton>
                <AppButton type="button" onClick={handleRedactContact}>Редактировать</AppButton>
            </div>
        </div>
    );
}

export default ContactCard
