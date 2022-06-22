import Deck from "./components/Deck";
import styles from "./styles.module.css";

export default function App() {
  return (
    <div className={`flex fill center ${styles.container}`}>
      <Deck />
    </div>
  );
}
