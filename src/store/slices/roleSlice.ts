import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { server, TOKEN } from "../../utils/constants/constants";
import { httpClient } from "../../utils/httpClient";

export type Payload = {
    userId: string
    keyId: string
    username: string
    iat: number
    exp: number
}

type roleState = {
    result: Payload | null
    loading: boolean
    error: boolean
}

const initiaValues: roleState = {
    result: null,
    loading: false,
    error: false
}


export const roleAsync = createAsyncThunk(
    'role/roleAsync',
    async () => {
        try {
            const token = localStorage.getItem(TOKEN)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const result = await httpClient.post<Payload>(server.CURRENT_URL, {}, config);
            return result.data;
        } catch (error) {
            throw error
        }
    }
);

const roleSlice = createSlice({
    name: 'role',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(roleAsync.fulfilled, (state: roleState, action: PayloadAction<Payload>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(roleAsync.rejected, (state: roleState) => {
            state.result = null
            state.loading = false
            state.error = true
        });

        builder.addCase(roleAsync.pending, (state: roleState) => {
            state.result = null
            state.loading = true
            state.error = false
        });
    },
})

export const { } = roleSlice.actions
export const roleSelector = (store: RootState) => store.roleReducer;
export default roleSlice.reducer;