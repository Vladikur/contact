import React from 'react';

interface ContactCardProps {
    contactName: string;
    tel: string;
    tags: string[];
    email: string;
}

const ContactCard: React.FC<ContactCardProps> = ({contactName, tel, tags, email }) => {
    return (
        <div className="contact-card">
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
                        <div key={tag} className="contact-card__tag">{tag}</div>
                    )
                }
            </div>
        </div>
    );
}

export default ContactCard
