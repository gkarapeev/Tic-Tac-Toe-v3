export function writeStateToStorage(state) {
    localStorage.setItem("ticTacToeState", JSON.stringify(state));
}