/**
 * ts-node 타입추론.ts
 * Condition type
 * @referene
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
 */

function describePerson(person: {
  name: string
  age: number
  hobbies: [string, string] // tuple
}) {
  return `${person.name} is ${person.age} years old and love ${person.hobbies.join(' and  ')}.`
}

const donggyu = {
  name: 'leedonggyu',
  age: 29,
  hobbies: ['exercise', 'computer'],
}

// describePerson(donggyu) // [stirng, string] -> string[]
// 적절한 자동완성을 위해서 개체 자체의 대한 유형검사를 진행한다.

/**
 * 조건부 유형 extends
 */

type StringFromType<T> = T extends string ? 'string' : never

const str1: StringFromType<'donggyu'> = 'string'
const str2: StringFromType<'jeahyock'> = 'string'
// const str3: StringFromType<1> never

type ExtendsStringFromType<T> = T extends string ? 'string' : T extends boolean ? 'boolean' : T extends number ? 'number' : never

const str: ExtendsStringFromType<'1'> = 'string'
const num: ExtendsStringFromType<1> = 'number'
const bool: ExtendsStringFromType<true> = 'boolean'
// const obj : ExtendsStringFromType<{}> never

/**
 * 제네릭 활용
 */
type Ext<T, K> = T extends K ? T : never

const _name: Ext<'leedonggyu', string> = 'leedonggyu'
// const _age: Ext<1, string> never

/**
 * Condition type -> use function
 */
type AllFunctions<T> = (...args: T[]) => T

const func1: AllFunctions<string> = (...args) => {
  return 'string'
}

const func2: AllFunctions<number> = (...args) => {
  return 1
}

/**
 * use ReturnType
 */
type A = ReturnType<() => void>
type B = ReturnType<() => { a: string; b: number; c: boolean }>

type ReturnParams<T> = T extends (...args: any[]) => infer R ? R : any

/**
 * infer 타입을 추론
 */
// first argument type
type FirstArgumentType<T> = T extends (firstArgument: infer K, ...args: any) => any ? K : any
type firstArguType = FirstArgumentType<(name: string, age: number) => void>

// seconds argument type
type SecondArgumentType<T> = T extends (first: any, seconds: infer K, ...args: any) => any ? K : any
type secondsArguType = SecondArgumentType<(name: string, age: number) => string>

/**
 * Example
 */
export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S

export type CamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<Extract<K, string>>]: T[K]
}

export type RecurCamelCase<T> = T extends readonly any[]
  ? { [K in keyof T]: RecurCamelCase<T[K]> }
  : T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<Extract<K, string>>]: RecurCamelCase<T[K]>
    }
  : T
