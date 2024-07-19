import { useState, useContext, useCallback } from "react";
import "../css/Board.css";
import { SquareMapContext } from "../context";
import { useMatchCheckerEffect } from "../hooks/matchChecker";
import { renderBoard } from "../utils/renderBoard";
import { Nullable, SelectedSquare } from "../types";
import { useCompletedCheckerEffect } from "../hooks/completedChecker";

type Props = {
    size: number;
    chosenImages: string[];
    handleUpdate: CallableFunction;
    handleOnClickCallback?: CallableFunction;
};

export const Board = (props: Props) => {
  const squaresMap = useContext(SquareMapContext);
  const [isClickEnabled, setClickEnabled] = useState(true);
  const [change, setChange] = useState(0);
  const [getFirstSelectedSquare, setFirstSelectedSquare] =
      useState<Nullable<SelectedSquare>>(null);

  const [getSecondSelectedSquare, setSecondSelectedSquare] =
      useState<Nullable<SelectedSquare>>(null);

  const handleChange = useCallback(() => {
    setChange(change+1)
    props.handleUpdate();
  }, [change, props])

  useCompletedCheckerEffect({
     change, squaresMap,
  });
  
  useMatchCheckerEffect({
      firstSelectedSquare: getFirstSelectedSquare,
      secondSelectedSquare: getSecondSelectedSquare,
      squaresMap,
      setClickEnabled,
      setFirstSelectedSquare,
      setSecondSelectedSquare,
      handleChange,
  });

  const handleOnClickCallback = useCallback(() => {
    if (typeof props.handleOnClickCallback === 'function') {
      props.handleOnClickCallback();
    }
  }, [props]);

  const board = renderBoard({
      size: props.size,
      isClickEnabled,
      firstSelectedSquare: getFirstSelectedSquare,
      secondSelectedSquare: getSecondSelectedSquare,
      squaresMap,
      setFirstSelectedSquare,
      setSecondSelectedSquare,
      chosenImages: props.chosenImages,
      handleOnClickCallback,
  });

  return <div className="board">{board}</div>;
};
