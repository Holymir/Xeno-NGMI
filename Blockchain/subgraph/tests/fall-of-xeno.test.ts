import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  GameEnded,
  GameStarted,
  SeasonEnded,
  SeasonStarted
} from "../generated/FallOfXeno/FallOfXeno"
import { Player, Season, Score } from "../generated/schema"
import { handleGameEnded, handleGameStarted, handleSeasonEnded, handleSeasonStarted } from "../src/fall-of-xeno"
import { beforeAll, describe, test, assert, newMockEvent, createMockedFunction } from "matchstick-as"

describe("SeasonStarted", () => {
  beforeAll(() => {
    const seasonStartedEvent = changetype<SeasonStarted>(newMockEvent())
    let seasonParam = new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)))
    seasonStartedEvent.parameters = []
    seasonStartedEvent.parameters.push(seasonParam)

    handleSeasonStarted(seasonStartedEvent)
  })

  test("Should create a new Season", () => {
    assert.entityCount("Season", 1)
    assert.fieldEquals("Season", "1", "active", "true")
  })
})

describe("SeasonEnded", () => {
  beforeAll(() => {
    const seasonEndedEvent = changetype<SeasonEnded>(newMockEvent())
    let seasonParam = new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)))
    let firstPlace = new ethereum.EventParam("firstPlace", ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000001")))
    let secondPlace = new ethereum.EventParam("secondPlace", ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000002")))
    let thirdPlace = new ethereum.EventParam("thirdPlace", ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000003")))
    let firstScore = new ethereum.EventParam("firstScore", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1000)))
    let secondScore = new ethereum.EventParam("secondScore", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(900)))
    let thirdScore = new ethereum.EventParam("thirdScore", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(800)))

    createMockedFunction(seasonEndedEvent.address, "playerEarningPerSeason", "playerEarningPerSeason(uint256,address):(uint256)")
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)), ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000001"))])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("45000000000000000000"))])

    createMockedFunction(seasonEndedEvent.address, "playerEarningPerSeason", "playerEarningPerSeason(uint256,address):(uint256)")
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)), ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000002"))])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("25000000000000000000"))])

    createMockedFunction(seasonEndedEvent.address, "playerEarningPerSeason", "playerEarningPerSeason(uint256,address):(uint256)")
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)), ethereum.Value.fromAddress(Address.fromString("0x0000000000000000000000000000000000000003"))])
      .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("15000000000000000000"))])

    seasonEndedEvent.parameters = [seasonParam, firstPlace, secondPlace, thirdPlace, firstScore, secondScore, thirdScore]

    handleSeasonEnded(seasonEndedEvent)
  })

  test("Should end the current Season", () => {
    assert.fieldEquals("Season", "1", "active", "false")
    assert.fieldEquals("Season", "1", "firstPlace", "0x0000000000000000000000000000000000000001")
    assert.fieldEquals("Season", "1", "secondPlace", "0x0000000000000000000000000000000000000002")
    assert.fieldEquals("Season", "1", "thirdPlace", "0x0000000000000000000000000000000000000003")
    assert.fieldEquals("Season", "1", "firstScore", "1000")
    assert.fieldEquals("Season", "1", "secondScore", "900")
    assert.fieldEquals("Season", "1", "thirdScore", "800")
    assert.fieldEquals("Season", "1", "firstPrice", "45000000000000000000")
    assert.fieldEquals("Season", "1", "secondPrice", "25000000000000000000")
    assert.fieldEquals("Season", "1", "thirdPrice", "15000000000000000000")
  })
})
