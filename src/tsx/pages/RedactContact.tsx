import React from 'react';
import AppField from "../elements/AppField";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getTags, Tag} from "../../store/tagsReducer";
import {Contact, redactContact} from "../../store/contactsReducer";
import {useNavigate, useParams} from "react-router-dom";
import AppCheckbox from "../elements/AppCheckbox";
import AppButton from "../elements/AppButton";

const RedactContact: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [chosenTags, setChosenTags] = React.useState<string[]>([])
    const dispatch = useAppDispatch()
    const {data: tags} = useAppSelector(state => state.tags)
    const {data: contacts} = useAppSelector(state => state.contacts)
    const contact: Contact = contacts.filter((contact) => contact.id === Number(id))[0]
    const [nameError, setNameError] = React.useState<string>('')
    const [emailError, setEmailError] = React.useState<string>('')
    const [telError, setTelError] = React.useState<string>('')

    React.useEffect(() => {
        dispatch(getTags())
    }, [])

    React.useEffect(() => {
        const tagsArr:string[] = []
        contact?.tags.forEach((tag) => {
            tagsArr.push(tag.code)
        })
        setChosenTags(tagsArr)
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget
        const data = new FormData(form);
        const chosenTagsArr: Tag[] = []
        const email = String(data.get('email'))
        const tel = String(data.get('tel'))
        const contactName = String(data.get('name'))

        setNameError(!contactName ? 'Заполните это поле' : '')
        setEmailError(!email ? 'Заполните это поле' : '')
        setTelError(!tel ? 'Заполните это поле' : '')

        if (contactName && email && tel) {
            tags.forEach((tagObj) => {
                if (chosenTags.includes(tagObj.code)) chosenTagsArr.push(tagObj)
            })

            const contactData: Contact = {
                id: Number(id),
                contactName,
                email,
                tel,
                tags: chosenTagsArr
            }

            dispatch(redactContact(contactData))
            navigate('/contact')
        }
    };

    const handleChangeTag = (e: any) => {
        const code = e.target.name
        const isChosen = e.target.checked
        let tagsArr: string[] = [...chosenTags]

        if (isChosen) {
            tagsArr.push(code)
            setChosenTags(tagsArr)
        } else {
            tagsArr = tagsArr.filter((tag) => tag !== code)
            setChosenTags(tagsArr)
        }
    }

    return (
        <main>
            <div className="container _center">
                <div className="page-head">
                    <h1>Редактировать контакт</h1>
                </div>


                <form className="form" onSubmit={handleSubmit} noValidate>
                    <AppField value={contact?.contactName} name="name" label="ФИО" error={nameError} type="text"/>
                    <AppField value={contact?.email} name="email" label="Email" error={emailError} type="email"/>
                    <AppField value={contact?.tel} name="tel" label="Телефон" error={telError} type="tel"/>
                    <div className="form__checkboxes">
                        {
                            tags.map(({code, name}) =>
                                <AppCheckbox
                                    key={code} code={code}
                                    checked={chosenTags.includes(code)}
                                    name={name}
                                    handleChangeTag={handleChangeTag}
                                />
                            )
                        }
                    </div>
                    <AppButton type="submit">Сохранить</AppButton>
                </form>
            </div>
        </main>
    );
}

export default RedactContact
