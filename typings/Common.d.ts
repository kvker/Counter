type Game = {
  name : string,
  children : SubGame[],
}

type SubGame = {
  name : string,
  history : HistoryItem[],
}

type HistoryItem = {
  timestamp : number,
  user : User,
  score : number,
}

type User = {
  name : string,
}