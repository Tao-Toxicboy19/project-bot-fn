import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { server, TOKEN } from "../../utils/constants/constants";
import { httpClient } from "../../utils/httpClient";

type Orders = {
    id: string
    symbol: string
    amount: number
    price: number
    status: string
    leverage: number
    timeframe: string
    created_at: Date
    updated_at: Date
    usersId: string
    keysId: string
}

type ordersState = {
    result: Orders[]
    loading: boolean
    error: boolean
}

const initiaValues: ordersState = {
    result: [],
    loading: false,
    error: false
}


export const ordersAsync = createAsyncThunk(
    'orders/ordersAsync',
    async () => {
        try {
            const token = localStorage.getItem(TOKEN)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const result = await httpClient.get<Orders[]>(server.ORDER_URL, config)
            return result.data
        } catch (error) {
            throw error
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ordersAsync.fulfilled, (state: ordersState, action: PayloadAction<Orders[]>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        });

        builder.addCase(ordersAsync.rejected, (state: ordersState) => {
            state.result = []
            state.loading = false
            state.error = true
        });

        builder.addCase(ordersAsync.pending, (state: ordersState) => {
            state.result = []
            state.loading = true
            state.error = false
        });
    },
})

export const { } = ordersSlice.actions
export const ordersSelector = (store: RootState) => store.ordersReducer;
export default ordersSlice.reducer;