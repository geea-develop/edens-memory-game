import "./css/App.css";
import { Board } from "./components/board";
import { chooseImages } from "./utils/images";
import { SquareMapContext } from "./context";
import { useCallback, useEffect, useState } from "react";
import { SizeSelector } from "./components/sizeSelector";
import { GameModeSelector } from "./components/gameModeSelector";
import { Counter } from "./components/counter";
import { Timer } from "./components/timer";

function App() {
    const [getSelectedSize, setSelectedSize] = useState<number | null>(null);
    const [shouldShowBoard, setShouldShowBoard] = useState(false);
    const [getImages, setImages] = useState<string[] | null>(null);
    const [isGameModeSelected, setIsGameModeSelected] = useState(false);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(Date.now());
    const [clicks, setClicks] = useState(0);
    const [squaresMap] = useState(new Map());

    useEffect(() => {
        if (getSelectedSize) {
            setShouldShowBoard(true);
            setImages(chooseImages(getSelectedSize));
        }
    }, [getSelectedSize]);

    const handleUpdate = useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    const handleOnClickCallback = useCallback(() => {
        let interval: NodeJS.Timer;
        if (clicks === 0) {
            setTimer(Date.now());
            if (counter === 0) {
                interval = setInterval(() => setTimer(Date.now()), 1000);
            }
        }
        setClicks(clicks + 1);
        return () => {
            setClicks(0);
            setTimer(Date.now());
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [clicks, counter]);

    return (
        <div className="App">
            {!isGameModeSelected && (
                <GameModeSelector
                    setIsGameModeSelected={setIsGameModeSelected}
                />
            )}
            {!getSelectedSize && isGameModeSelected && (
                <SizeSelector setSelectedSize={setSelectedSize} />
            )}
            {shouldShowBoard && getSelectedSize && getImages && (
                <SquareMapContext.Provider value={squaresMap}>
                    <button
                        className="big-button"
                        onClick={() => window.location.reload()}
                    >
                        🔄
                    </button>
                    <Board
                        size={getSelectedSize}
                        chosenImages={getImages}
                        handleUpdate={handleUpdate}
                        handleOnClickCallback={handleOnClickCallback}
                    />
                    <Counter counter={counter} />
                    <Timer timer={timer} />
                </SquareMapContext.Provider>
            )}
        </div>
    );
}

export default App;
