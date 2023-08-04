import React from 'react';
import {SearchData} from "../../store/contactsReducer";
import AppField from "../elements/AppField";
import AppRadio from "../elements/AppRadio";

interface SearchFormProps {
    handleSearch: (searchData: SearchData) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({handleSearch}) => {
    const [optionValue, setOptionValue] = React.useState<string>('contact-name')
    const [inputValue, setInputValue] = React.useState<string>('')

    React.useEffect(() => {
        const searchData: SearchData = {
            inputValue,
            optionValue
        }

        handleSearch(searchData)
    }, [inputValue, optionValue])

    const onOptionChange = (e: any) => {
        setOptionValue(e.target.value)
    }

    const onInputChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <AppField label="Поиск" handleChange={onInputChange} />

            <div className="search-form__radios">
                <AppRadio
                    label="по имени"
                    name="search-on"
                    value="contact-name"
                    checked={optionValue === "contact-name"}
                    onOptionChange={onOptionChange}
                />
                <AppRadio
                    label="по почте"
                    name="search-on"
                    value="email"
                    checked={optionValue === "email"}
                    onOptionChange={onOptionChange}
                />
                <AppRadio
                    label="по телефону"
                    name="search-on"
                    value="tel"
                    checked={optionValue === "tel"}
                    onOptionChange={onOptionChange}
                />
                <AppRadio
                    label="по тегам"
                    name="search-on"
                    value="tags"
                    checked={optionValue === "tags"}
                    onOptionChange={onOptionChange}
                />
            </div>
        </form>
    );
}

export default SearchForm
