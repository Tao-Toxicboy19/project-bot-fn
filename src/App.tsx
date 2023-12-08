import { Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import HeroPage from './components/pages/HeroPage/HeroPage';
import OrderPage from "./components/pages/OrderPage/OrderPage";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { restoreLogin } from "./store/slices/loginSlice";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import { roleAsync } from "./store/slices/roleSlice";

type Props = {}

export default function App({ }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(restoreLogin())
    dispatch(roleAsync())
  }, []);

  return (
    <div >
      <Header />
      <main>
        <Routes>

          <Route path="/" element={<HeroPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

        </Routes>
      </main>
    </div>
  )
}