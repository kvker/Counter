type MainData = {
  games : Game[],
}

type Game = {
  name : string,
  children : SubGame[],
  completed : boolean,
}

type SubGame = {
  name : string,
  players : Player[],
}

type Player = {
  name : string,
  score : number,
}