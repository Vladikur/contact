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

    React.useEffect(() => {
        dispatch(getTags())
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget
        const data = new FormData(form);
        const contact: Contact = {
            id: Number(new Date()),
            contactName: String(data.get('name')),
            email: String(data.get('email')),
            tel: String(data.get('tel')),
            tags: chosenTags
        }

        dispatch(addContact(contact))
        navigate('/contact')
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
                    <Field name="name" label="ФИО"/>
                    <Field name="email" label="Email"/>
                    <Field name="tel" label="Телефон"/>
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
