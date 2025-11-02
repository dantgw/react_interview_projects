import { useState } from "react";

import "./LetterCard.css";

const LetterCard = (props: {
  letter: string;
  ans: string;
  reveal: boolean;
  index: number;
}) => {
  const cssClass = () => {
    if (props.reveal) {
      if (props.letter === props.ans[props.index]) {
        return "exact";
      } else if (props.ans.includes(props.letter)) {
        return "inWord";
      } else {
        return "notInWord";
      }
    } else {
      return "unrevealed";
    }
  };

  return <div className={`standard ${cssClass()}`}>{props.letter}</div>;
};

export default LetterCard;
