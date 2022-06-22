import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBookmark } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles.module.css";

const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.plane}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      <button className={styles.bookmark}>
        <FontAwesomeIcon className={styles.bookmark} icon={faBookmark} />
      </button>
    </div>
  );
};

export default Buttons;
