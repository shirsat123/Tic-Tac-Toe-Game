import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(null));

  function nextPlayer() {
    return data.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  const nextPlayerPlaying = nextPlayer();
  const winner = calculateWinner(data);

  function squareSelected(square) {
    if (winner) return;
    const temp = [...data];
    temp[square] = nextPlayerPlaying;
    setData(temp);
  }

  function resetGame() {
    setData(Array(9).fill(null));
  }

  function status() {
    return winner
      ? `Winner ${winner} `
      : data.every(Boolean)
      ? `Start game`
      : `Next Player : ${nextPlayerPlaying}`;
  }

  function squareData(square) {
    return (
      <div className="col" onClick={() => squareSelected(square)}>
        {data[square]}
      </div>
    );
  }

  function calculateWinner(data) {
    const ans = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    for (let i = 0; i < ans.length; i++) {
      const [x, y, z] = ans[i];
      // console.log(data[x], data[y], data[z], "jk");

      if (data[x] && data[x] === data[y] && data[y] === data[z]) {
        return data[x];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{`${status()}`}</div>
      <div className="box">
        <div className="row">
          {squareData(0)}
          {squareData(1)}
          {squareData(2)}
        </div>
        <div className="row">
          {squareData(3)}
          {squareData(4)}
          {squareData(5)}
        </div>
        <div className="row">
          {squareData(6)}
          {squareData(7)}
          {squareData(8)}
        </div>
      </div>
      <br />
      <button onClick={resetGame}> Reset game</button>
    </>
  );
};
