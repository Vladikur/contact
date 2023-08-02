import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import TagsService from "../utils/TagsService";

export type Tag = {
    name: string;
    code: string;
}

export type TagsState = {
    data: Tag[] | [];
    isLoading: boolean;
    error: string | null;
}

const initialState: TagsState = {
    data: [],
    isLoading: false,
    error: '',
}

export const getTags = createAsyncThunk<
    Tag[],
    void
    >(
    'getTags',
    async function(_, {rejectWithValue}) {
        try {
            const response = await TagsService.getTags()

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

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTags.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(getTags.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    },
})

export default tagsSlice
