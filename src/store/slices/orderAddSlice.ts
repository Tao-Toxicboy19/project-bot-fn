import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { server, TOKEN } from "../../utils/constants/constants";
import { httpClient } from "../../utils/httpClient";

type order = {
    id: string
    symbol: string
    amount: number
    price: null
    status: null
    leverage: number
    timeframe: string
    created_at: Date
    updated_at: Date
    usersId: string
    keysId: string
}

type orderState = {
    result: order | null
    loading: boolean
    error: boolean
}

type FieldType = {
    symbol?: string
    timeframe?: string
    amount?: number
    leverage?: number
}

const initiaValues: orderState = {
    result: null,
    loading: false,
    error: false
}


export const ordersAddAsync = createAsyncThunk(
    'ordersAdd/ordersAddAsync',
    async (values: FieldType) => {
        try {
            const token = localStorage.getItem(TOKEN)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const result = await httpClient.post<order>(server.ORDER_URL, values, config)
            return result.data
        } catch (error) {
            throw error
        }
    }
)

const ordersAddSlice = createSlice({
    name: 'ordersAdd',
    initialState: initiaValues,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ordersAddAsync.fulfilled, (state: orderState, action: PayloadAction<order>) => {
            state.result = action.payload
            state.loading = false
            state.error = false
        })

        builder.addCase(ordersAddAsync.rejected, (state: orderState) => {
            state.result = null
            state.loading = false
            state.error = true
        })

        builder.addCase(ordersAddAsync.pending, (state: orderState) => {
            state.result = null
            state.loading = true
            state.error = false
        })
    },
})

export const { } = ordersAddSlice.actions
export const ordersAddSelector = (store: RootState) => store.ordersAddReducer
export default ordersAddSlice.reducer