import Buttons from "./Buttons";
import styles from "../styles.module.css";

type Props = {
  cards: any;
  cardsIndex: number;
};

const Card = ({ cards, cardsIndex }: Props) => {
  return (
    <>
      <img className={styles.image} src={cards[cardsIndex].image}></img>
      <div className={styles.details}>
        <p className={styles.name}>{cards[cardsIndex].name}</p>
        <div className={styles.brandAndButtons}>
          <p className={styles.brand}>{cards[cardsIndex].brand}</p>
          <Buttons />
        </div>
        <p className={styles.price}>Rs. {cards[cardsIndex].price}</p>
        <p className={styles.oldPrice}>Rs. {cards[cardsIndex].oldPrice}</p>
        <p className={styles.descriptionTitle}>Details:</p>
        <p className={styles.description}>{cards[cardsIndex].description}</p>
      </div>
    </>
  );
};

export default Card;
