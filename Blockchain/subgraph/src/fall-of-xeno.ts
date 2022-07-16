import { BigInt } from "@graphprotocol/graph-ts"
import {
  FallOfXeno,
  GameEnded,
  GameStarted,
  SeasonEnded,
  SeasonStarted
} from "../generated/FallOfXeno/FallOfXeno"
import { Player, Season, Score } from "../generated/schema"


export function handleSeasonStarted(event: SeasonStarted): void {
  const season = new Season(event.params.season.toString())
  season.active = true
  season.save()
}
export function handleSeasonEnded(event: SeasonEnded): void {
  let season = Season.load(event.params.season.toString())
  if (!season) {
    season = new Season(event.params.season.toString())
  }
  season.firstPlace = event.params.firstPlace.toHexString()
  season.secondPlace = event.params.secondPlace.toHexString()
  season.thirdPlace = event.params.thirdPlace.toHexString()

  season.firstScore = event.params.firstScore
  season.secondScore = event.params.secondScore
  season.thirdScore = event.params.thirdScore

  const firstPrice = FallOfXeno.bind(event.address).playerEarningPerSeason(
    event.params.season,
    event.params.firstPlace
  );
  const secondPrice = FallOfXeno.bind(event.address).playerEarningPerSeason(
    event.params.season,
    event.params.secondPlace
  );
  const thirdPrice = FallOfXeno.bind(event.address).playerEarningPerSeason(
    event.params.season,
    event.params.thirdPlace
  );

  season.firstPrice = firstPrice
  season.secondPrice = secondPrice
  season.thirdPrice = thirdPrice
  season.active = false
  season.save()
}

export function handleGameStarted(event: GameStarted): void {
  let player = Player.load(event.params.player.toHexString())
  if (!player) {
    player = new Player(event.params.player.toHexString())
  }
  player.save()
}

export function handleGameEnded(event: GameEnded): void {
  let player = Player.load(event.params.player.toHexString())
  if (!player) {
    player = new Player(event.params.player.toHexString())
  }
  player.save()

  let playerScore = Score.load(
    event.params.player.toHexString() + "-" + event.params.season.toString()
  );

  if (!playerScore) {
    playerScore = new Score(
      event.params.player.toHexString() + "-" + event.params.season.toString()
    );
  }

  playerScore.season = event.params.season.toString()
  playerScore.player = event.params.player.toHexString()
  if (!playerScore.score || event.params.totalScore > playerScore.score!) {
    playerScore.score = event.params.totalScore
  }
  playerScore.save()
}
