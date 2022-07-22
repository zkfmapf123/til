/**
 * npm i runtypes
 * RunTypes
 * @reference https://github.com/pelotom/runtypes
 */

import { Tuple, Record, Number, Literal, Union, Static } from 'runtypes'

/**
 * common types
 */
{
  type Vector = [number, number, number] // tuple

  type Asteroid = {
    type: 'asteroid'
    location: Vector
    mass: number
  }

  type Planet = {
    type: 'planet'
    location: Vector
    mass: number
    population: number
    habitable: boolean
  }

  type Rank = 'captain' | 'first mate' | 'officer' | 'ensign'

  type CrewMember = {
    name: string
    age: number
    rank: Rank
    home: Planet
  }

  type Ship = {
    type: 'ship'
    location: Vector
    mass: number
    name: string
    crew: CrewMember[]
  }

  type SpaceObject = Asteroid | Planet | Ship
}

/**
 * use RunTypes
 */
{
  // tuple
  const Vector = Tuple(Number, Number, Number)

  const Asteroid = Record({
    type: Literal('asteroid'),
    location: Vector,
    mass: Number,
  })

  const Planet = Record({
    type: Literal('planet'),
    localStorage: Vector,
    // ...
  })

  const Rank = Union(Literal('captain'), Literal('first mate'), Literal('officer'))

  // more record
  const SpaceObject = Union(Asteroid, Planet)

  // const -> type으로 변환
  type Asteroid = Static<typeof Asteroid>
}

/**
 * more use
 */

const Fruits = Union(Literal('apple'), Literal('banana'), Literal('orange'))

// func
const myFavoriteFruit = Fruits.match(
  (apple) => `morning ${apple}`,
  (banana) => `afternoon ${banana}`,
  (orange) => `evening ${orange}`
)

console.log(myFavoriteFruit('apple'))
