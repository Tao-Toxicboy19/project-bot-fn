import { Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import HeroPage from './components/pages/HeroPage/HeroPage';
import LoginPage from "./components/pages/LoginPage/LoginPage";

type Props = {}

export default function App({ }: Props) {

  return (
    <div >
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}