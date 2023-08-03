import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ContactsService from "../utils/ContactsService";
import {Tag} from "./tagsReducer";

export type SearchData = {
    inputValue: string;
    optionValue: string;
}

export type Contact = {
    id: number;
    contactName: string;
    tel: string;
    email: string;
    tags: Tag[];
}

export type ContactsState = {
    data: Contact[] | [];
    isLoading: boolean;
    error: string | null;
}

const initialState: ContactsState = {
    data: [],
    isLoading: true,
    error: '',
}

export const removeContact = createAsyncThunk<
    Contact[],
    number
    >(
    'removeContact',
    async function(id, {rejectWithValue}) {
        try {
            const response = await ContactsService.removeContact(id)

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const addContact = createAsyncThunk<
    Contact[],
    Contact
    >(
    'addContact',
    async function(contact, {rejectWithValue}) {
        try {
            const response = await ContactsService.addContact(contact)

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const redactContact = createAsyncThunk<
    Contact[],
    Contact
    >(
    'redactContact',
    async function(contact, {rejectWithValue}) {
        try {
            const response = await ContactsService.redactContact(contact)

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const searchContact = createAsyncThunk<
    Contact[],
    SearchData
    >(
    'searchContact',
    async function(searchParams, {rejectWithValue}) {
        try {
            const response = await ContactsService.searchContact(searchParams)

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            return response.data.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(removeContact.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(removeContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(removeContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(addContact.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(addContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(redactContact.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(redactContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(redactContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(searchContact.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(searchContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(searchContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    },
})

export default contactsSlice
