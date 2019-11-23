import React, { useReducer, useEffect } from "react";
import "./App.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import Board from "../Board/Board";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import appReducer from "../../reducers/appReducer";
import { initialState } from "../../data/data";
import { PLAYER_X, PLAYER_O } from "../../utilities/enums";
import { LOAD_STATE } from "../../actions/actions";
import useEffectOnce from "../../utilities/useEffectOnce";
import { writeStateToStorage } from "../../utilities/utilities";

export const Dispatch = React.createContext();
export const State = React.createContext();

function App() {
  // Initialize state
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from LocalStorage
  useEffectOnce(() => {
    const rawData = localStorage.getItem("ticTacToeState");
    rawData && dispatch({ type: LOAD_STATE, payload: JSON.parse(rawData) });
  });

  // Save state changes to LocalStorage
  useEffect(() => {
    writeStateToStorage(state);
  }, [state]);

  return (
    <Dispatch.Provider value={dispatch}>
      <State.Provider value={state}>
        <div className="App">
          <Header />
          <div className="game-body">
            <PlayerPanel player={PLAYER_X} stats={state.stats.PLAYER_X} />
            <Board squares={state.squares} />
            <PlayerPanel player={PLAYER_O} stats={state.stats.PLAYER_O} />
          </div>
          <Footer />
        </div>
      </State.Provider>
    </Dispatch.Provider>
  );
}

export default App;
