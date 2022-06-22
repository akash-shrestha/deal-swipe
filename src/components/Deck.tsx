import { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styles from "../styles.module.css";
import products from "../products";
import Card from "./Card";

const cards = products;

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (cardsIndex: number) => ({
  x: 0,
  y: cardsIndex * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: cardsIndex * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [interestedList, setInterestedList] = useState<Array<string>>([]);

  const handleLastSwipe = () => {
    window.alert("Interested Products:\n" + interestedList);
    setInterestedList([]);
  };

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (cardsIndex) => ({
    ...to(cardsIndex),
    from: from(cardsIndex),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((cardsIndex) => {
        if (index !== cardsIndex) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit

        if (isGone) {
          if (xDir === 1) {
            setInterestedList([
              ...interestedList,
              `\n• ${cards[cardsIndex].name}`,
            ]);
          }
          if (cardsIndex === 0) {
            setTimeout(handleLastSwipe, 500);
          }
        }

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((cardsIndex) => to(cardsIndex));
        }, 600);
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once.

  return (
    <>
      {props.map(({ x, y, rot, scale }, cardsIndex) => (
        <animated.div className={styles.deck} key={cardsIndex} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(cardsIndex)}
            style={{
              transform: interpolate([rot, scale], trans),
            }}
          >
            <Card cardsIndex={cardsIndex} cards={cards} />
          </animated.div>
        </animated.div>
      ))}
    </>
  );
}

export default Deck;
