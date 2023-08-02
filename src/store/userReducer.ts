import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import AuthService from "../utils/AuthService";

export type User = {
    id?: number;
    name?: string;
    password?: string;
}

export type UserState = {
    data: User;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: {},
    isAuth: true,
    isLoading: true,
    error: '',
}

export const loginUser = createAsyncThunk<
    void,
    User,
    {
        extra: {
            jwt: string
        }
    }>(
    'loginUser',
    async function(user, {rejectWithValue}) {
        try {
            const response = await AuthService.login(user)

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            localStorage.setItem('token', response.data.accessToken)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk<
    void,
    void,
    {
        extra: {
            jwt: string
        }
    }
    >(
    'logoutUser',
    async function(_, {rejectWithValue}) {
        try {
            const response = await AuthService.logout()

            if (response.data.status !== 'success') {
                const error = response.data.errors[0].message
                throw new Error(error)
            }

            localStorage.removeItem('token')
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setUserData(state, action: PayloadAction<User>) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isLoading = false
            state.isAuth = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false
            state.isAuth = false
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
    },
})

export default userSlice
export const {setIsAuth, setUserData, setIsLoading} = userSlice.actions
