/**
 * @doc
 * Utility Type 만들어보기
 */
interface Example {
  name: string
  age: number
  personality: string
}

//////////////////////////////////////////// Utility Type ////////////////////////////////////////
{
  /**
   * @Utility Partial
   * name?
   * age?
   * personality
   */
  type _Partial<T> = {
    [K in keyof T]?: T[K]
  }

  const simpleIntro: _Partial<Example> = {
    name: 'leedonggyu',
    age: 29,
  }
}

{
  /**
   * @Utility Readonly
   */
  type _Readonly<T> = {
    readonly [K in keyof T]: T[K]
  }
}

{
  /**
   * @Uility Record
   */

  type Friends = 'leedonggyu' | 'kimhyeonchol' | 'limjeahyock' | 'sinjunghyoen'

  type _Record<T extends keyof any, K> = {
    [P in T]: K
  }

  //   type FriendRecord = Record<Friends, Example>
  //   type PartitlaFriendRecord = Partial<FriendRecord>

  type _PartialRecord<T extends keyof any, K> = {
    [P in T]?: K
  }

  const f: _PartialRecord<Friends, Example> = {
    leedonggyu: {
      age: 29,
      name: 'leedonggyu',
      personality: 'good',
    },
  }
}

{
  /**
   * @Utility Pick
   */

  type _Pick<T, K extends keyof T> = {
    [P in K]: T[K]
  }

  const ex: _Pick<Example, 'age' | 'name'> = {
    age: 29,
    name: '123',
  }
}

//////////////////////////////////////////// Utility Type ////////////////////////////////////////

{
  interface WordParamas<T extends string | number> {
    prefix: `${T}_prefix`
    postFix: `prefix_${T}_suffix`
    suffix: `suffix_${T}`
    word: T
  }

  const myWordParams: WordParamas<'leedonggyu'> = {
    prefix: 'leedonggyu_prefix',
    postFix: 'prefix_leedonggyu_suffix',
    suffix: 'suffix_leedonggyu',
    word: 'leedonggyu',
  }
}

{
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
}
