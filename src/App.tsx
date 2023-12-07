import Header from "./components/layouts/Header/Header";
import HeroPage from './components/pages/HeroPage/HeroPage';

type Props = {}

export default function App({ }: Props) {

  return (
    <div >
      <Header />
      <main>
        <HeroPage />
      </main>
    </div>
  )
}