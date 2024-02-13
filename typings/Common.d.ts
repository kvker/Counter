type MainData = {
  games: Game[],
}

type Game = {
  name : string,
  children : SubGame[],
  completed: boolean,
}

type SubGame = {
  name : string,
  players : Player[],
  history : HistoryItem[],
}

type HistoryItem = {
  timestamp : number,
  player : Player,
  score : number,
}

type Player = {
  name : string,
}