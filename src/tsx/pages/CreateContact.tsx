import React from 'react';
import Field from "../elements/Field";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getTags, Tag} from "../../store/tagsReducer";
import {addContact, Contact} from "../../store/contactsReducer";
import {useNavigate} from "react-router-dom";

const CreateContact: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {data: tags} = useAppSelector(state => state.tags)
    const [chosenTags, setChosenTags] = React.useState<Tag[]>([])
    const [nameError, setNameError] = React.useState<string>('')
    const [emailError, setEmailError] = React.useState<string>('')
    const [telError, setTelError] = React.useState<string>('')

    React.useEffect(() => {
        dispatch(getTags())
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget
        const data = new FormData(form);
        const contactName = String(data.get('name'))
        const email = String(data.get('email'))
        const tel = String(data.get('tel'))

        setNameError(!contactName ? 'Заполните это поле' : '')
        setEmailError(!email ? 'Заполните это поле' : '')
        setTelError(!email ? 'Заполните это поле' : '')

        if (contactName && email && tel) {
            const contact: Contact = {
                id: Number(new Date()),
                contactName,
                email,
                tel,
                tags: chosenTags
            }

            dispatch(addContact(contact))
            navigate('/contact')
        }
    };

    const handleChangeTag = (e: any) => {
        const code = e.target.name
        const isChosen = e.target.checked
        const tagObject: Tag = tags.filter((tag) => tag.code === code)[0]
        let tagsArr: Tag[] = [...chosenTags]

        if (isChosen) {
            tagsArr.push(tagObject)
            setChosenTags(tagsArr)
        } else {
            tagsArr = tagsArr.filter((tag) => tag.code !== code)
            setChosenTags(tagsArr)
        }
    }

    return (
        <main>
            <div className="container _center">
                <div className="page-head">
                    <h1>Создать контакт</h1>
                </div>


                <form className="form" onSubmit={handleSubmit}>
                    <Field name="name" label="ФИО" error={nameError} type="text"/>
                    <Field name="email" label="Email" error={emailError} type="email"/>
                    <Field name="tel" label="Телефон" error={telError} type="tel"/>
                    <div className="form__checkboxes">
                        {
                            tags.map((tag) =>
                                <label key={tag.code} className="checkbox">
                                    <input type="checkbox" name={tag.code} hidden onChange={handleChangeTag} />
                                    <span>{tag.name}</span>
                                </label>
                            )
                        }
                    </div>
                    <button type="submit" className="btn">Создать</button>
                </form>
            </div>
        </main>
    );
}

export default CreateContact
