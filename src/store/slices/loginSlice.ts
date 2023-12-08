import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { server, TOKEN } from "../../utils/constants/constants";
import { httpClient } from "../../utils/httpClient";
import { FieldType } from "../../type/user.type";

interface Token {
    accessToken: string;
}

type loginState = {
    result: Token | null
    loading: boolean
    error: boolean
}

const initiaValues: loginState = {
    result: null,
    loading: false,
    error: false
}


export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async (data: FieldType) => {
        try {
            const result = await httpClient.post<Token>(server.LOGIN_URL, data);
            if (result.data.accessToken) {
                localStorage.setItem(TOKEN, result.data.accessToken)
            }
            return result.data;
        } catch (error) {
            throw error;
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: initiaValues,
    reducers: {
        logout: (state: loginState) => {
            localStorage.removeItem(TOKEN);
            state.result = null;
            state.loading = false;
            state.error = false;
        },
        setTokens: (state: loginState, action: PayloadAction<Token>) => {
            const token = localStorage.getItem(TOKEN);
            if (token) {
                state.result = action.payload;
                state.loading = false;
                state.error = false;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state: loginState, action: PayloadAction<Token>) => {
            state.result = action.payload;
            state.loading = false;
            state.error = false
        });

        builder.addCase(loginAsync.rejected, (state: loginState) => {
            state.result = null;
            state.loading = false;
            state.error = true
        });

        builder.addCase(loginAsync.pending, (state: loginState) => {
            state.result = null
            state.loading = true;
            state.error = false
        });
    },
})

export const { logout, setTokens } = loginSlice.actions
export const loginSelector = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;