import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ContactsService from "../utils/ContactsService";
import {Tag} from "./tagsReducer";

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
    isLoading: false,
    error: '',
}

export const getContacts = createAsyncThunk<
    Contact[],
    void
    >(
    'getContacts',
    async function(_, {rejectWithValue}) {
        try {
            const response = await ContactsService.getContacts()

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
        builder.addCase(getContacts.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(getContacts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    },
})

export default contactsSlice
