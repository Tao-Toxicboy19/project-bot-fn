import { Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import HeroPage from './components/pages/HeroPage/HeroPage';
import OrderPage from "./components/pages/OrderPage/OrderPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

type Props = {}

export default function App({ }: Props) {

  return (
    <div >
      <Header />
      <main>
        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/" element={<HeroPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<OrderPage />} />
          </Route>

        </Routes>
      </main>
    </div>
  )
}