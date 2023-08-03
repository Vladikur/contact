import React from 'react';
import Field from "../elements/Field";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getTags, Tag} from "../../store/tagsReducer";
import {Contact, redactContact} from "../../store/contactsReducer";
import {useNavigate, useParams} from "react-router-dom";

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
        setTelError(!email ? 'Заполните это поле' : '')

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


                <form className="form" onSubmit={handleSubmit}>
                    <Field value={contact?.contactName} name="name" label="ФИО" error={nameError} type="text"/>
                    <Field value={contact?.email} name="email" label="Email" error={emailError} type="email"/>
                    <Field value={contact?.tel} name="tel" label="Телефон" error={telError} type="tel"/>
                    <div className="form__checkboxes">
                        {
                            tags.map((tag) =>
                                <label key={tag.code} className="checkbox">
                                    <input checked={chosenTags.includes(tag.code)} type="checkbox" name={tag.code} hidden onChange={handleChangeTag} />
                                    <span>{tag.name}</span>
                                </label>
                            )
                        }
                    </div>
                    <button type="submit" className="btn">Сохранить</button>
                </form>
            </div>
        </main>
    );
}

export default RedactContact
