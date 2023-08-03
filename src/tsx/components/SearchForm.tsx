import React from 'react';
import Field from "../elements/Field";
import {SearchData} from "../../store/contactsReducer";

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
        <form name="search" className="search-form" onSubmit={onSubmit}>
            <Field label="Поиск" handleChange={onInputChange} />

            <div className="search-form__radios">
                <div className="radio">
                    <input type="radio" form="search" id="contact-name" name="search-on"
                           value="contact-name" checked={optionValue === "contact-name"} onChange={onOptionChange}/>
                    <label htmlFor="contact-name">по имени</label>
                </div>
                <div className="radio">
                    <input type="radio" form="search" id="email" name="search-on"
                           value="email" checked={optionValue === "email"} onChange={onOptionChange}/>
                    <label htmlFor="email">по почте</label>
                </div>
                <div className="radio">
                    <input type="radio" form="search" id="tel" name="search-on"
                           value="tel" checked={optionValue === "tel"} onChange={onOptionChange}/>
                    <label htmlFor="tel">по телефону</label>
                </div>
                <div className="radio">
                    <input type="radio" form="search" id="tags" name="search-on"
                           value="tags" checked={optionValue === "tags"} onChange={onOptionChange}/>
                    <label htmlFor="tags">по тегам</label>
                </div>
            </div>
        </form>
    );
}

export default SearchForm
