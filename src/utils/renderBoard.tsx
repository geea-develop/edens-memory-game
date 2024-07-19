import { Square } from "../components/square";
import { CommonFunctionInput } from "../types";
import { boardClickHandler } from "./handleClicks";

export const renderBoard = ({
    size,
    isClickEnabled,
    firstSelectedSquare,
    secondSelectedSquare,
    squaresMap,
    setFirstSelectedSquare,
    setSecondSelectedSquare,
    chosenImages,
    handleOnClickCallback,
}: {
    size: number;
    isClickEnabled: boolean;
    chosenImages: string[];
    handleOnClickCallback?: () => void;
} & CommonFunctionInput) => {
    let imageIndex = 0;
    const board = [];

    for (let row = 0; row < size; row++) {
        const rowSquares = [];

        for (let col = 0; col < size; col++) {
            const squareId = `${row}-${col}`;
            const square = (
                <Square
                    clickable={isClickEnabled}
                    sizeClass={size === 4 ? "big" : "small"}
                    displayClass="hidden"
                    handleClick={(id: string) =>
                        boardClickHandler({
                            id,
                            firstSelectedSquare,
                            secondSelectedSquare,
                            squaresMap,
                            setFirstSelectedSquare,
                            setSecondSelectedSquare,
                        })
                    }
                    handleOnClick={handleOnClickCallback}
                    key={squareId}
                    id={squareId}
                    image={chosenImages[imageIndex++] || ""}
                />
            );
            squaresMap.set(squareId, { square });
            rowSquares.push(square);
        }

        board.push(<div key={row}>{rowSquares}</div>);
    }

    return board;
};
