import { useSelector } from "react-redux"
import { loginSelector } from "../store/slices/loginSlice"
import { Navigate, Outlet } from "react-router-dom"

type Props = {}

export default function PublicRoute({ }: Props) {
    const loginReducer = useSelector(loginSelector)

    return (loginReducer.result?.accessToken) ? <Navigate to={'/order'} /> : <Outlet />
}