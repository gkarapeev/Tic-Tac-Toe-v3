import React, { useReducer } from "react";
import "./App.css";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import Board from "../Board/Board";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import appReducer from "../../reducers/appReducer";
import { initialState } from "../../data/data";
import { PLAYER_X, PLAYER_O } from '../../utilities/enums';

export const Dispatch = React.createContext();
export const State = React.createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <Dispatch.Provider value={dispatch}>
      <State.Provider value={state}>
        <div className="App">
          <Header />
          <div className="game-body">
            <PlayerPanel player={PLAYER_X}/>
            <Board squares={state.squares} />
            <PlayerPanel player={PLAYER_O}/>
          </div>
          <Footer />
        </div>
      </State.Provider>
    </Dispatch.Provider>
  );
}

export default App;
