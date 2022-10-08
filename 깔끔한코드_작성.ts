// 깔끔한 코드를 작성해보자!!

{
  /**
   * @desc의도를 나타내는 변수를 사용하자
   */

  /**
   * Bad Code
   */
  const users: Map<string, number> = new Map()
  for (const keyValue of users) {
  }

  /**
   * Good Code
   */
  for (const [id, userNum] of users) {
  }
}

{
  /**
   * @desc
   * 불필요한 prefix는 피해라..
   */

  /**
   * Bad Code
   */
  type Car1 = {
    [t in 'carMake' | 'carModel' | 'carColor']: string
  }

  /**
   * Good Code
   */
  type Car2 = {
    [t in 'make' | 'model' | 'color']: string
  }
}

{
  /**
   * @desc
   * Optional Parameter는 최대한 지양하자
   */

  /**
   * Bad Code
   */
  function loadPage(count?: number) {
    // method 1
    // const loadCount = count !== undefined ? count : 10
    // method 2
    // const loadCount = count ? count : 10
    // method 3
    // const loadCount = count ?? 10
  }

  /**
   * Good Code
   */
  function loadPage2(count = 10) {}
}

{
  /**
   * @desc
   * Object.assign 혹은 구조분해를 사용해여 기본객체를 만들어라
   */

  /**
   * Bad Code
   */
  type MenuConfig = { title?: string; body?: string; buttonText?: string; cancellable?: boolean }

  function createMenu(config: MenuConfig) {
    config.title = config.title || 'Foo'
    config.body = config.body || 'Bar'
    config.buttonText = config.buttonText || 'Baz'
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true

    // ...
  }

  createMenu({ body: 'Bar' })

  /**
   * Good Code
   */
  type MenuConfig2 = { title?: string; body?: string; buttonText?: string; cancellable?: boolean }

  function createMenu2(config: MenuConfig) {
    const menuConfig = Object.assign(
      {
        title: 'Foo',
        body: 'Bar',
        buttonText: 'Baz',
        cancellable: true,
      },
      config
    )

    // ...
  }

  createMenu2({ body: 'Bar' })
}

{
  /**
   * @desc
   * 함수 매개변수를 플래그로 사용하지 말아라 -> 함수를 쪼개자 역할은 1개씩
   */

  /**
   * Bad Code
   */
  function shwoMeTheMoney(name: string, isRapper: boolean) {
    if (isRapper) {
      return `${name} is not rapper amount : 5000`
    }

    return `${name} is rapper amount : 10000`
  }

  /**
   * Good Code
   */

  function ShowMeTheMoneyFromRapper() {
    return `${name} is rapper amount : 10000`
  }

  function ShowMeTheMoneyFromNotRapper() {
    return `${name} is not rapper amount : 5000`
  }
}

{
  /**
   * @desc
   * Side Effect를 피하자...
   * Ex) 선언형 프로그래밍 아닌 -> 함수형 프로그래밍 형태로 짜자..(최대한)
   */
}

{
  /**
   * @desc
   * 조건문은 최대한 지양하자
   */
  /**
   * Bad Code
   */
  //   class Airplane {
  //     private type: string
  //     // ...
  //     getCruisingAltitude() {
  //       switch (this.type) {
  //         case '777':
  //           return this.getMaxAltitude() - this.getPassengerCount()
  //         case 'Air Force One':
  //           return this.getMaxAltitude()
  //         case 'Cessna':
  //           return this.getMaxAltitude() - this.getFuelExpenditure()
  //         default:
  //           throw new Error('Unknown airplane type.')
  //       }
  //     }
  //     private getMaxAltitude(): number {
  //       // ...
  //     }
  //   }
  /**
   * Good Code
   * 상속과 오버라이딩 형태를 사용하면 if 문을 지양할 수 있다.
   * 함수는 한가지의 일만 사용해야 하는 성격을 파괴하기 때문에 해당 특성을 잘 사용하자
   */
  //   abstract class Airplane {
  //     protected getMaxAltitude(): number {
  //       // shared logic with subclasses ...
  //     }
  //     // ...
  //   }
  //   class Boeing777 extends Airplane {
  //     // ...
  //     getCruisingAltitude() {
  //       return this.getMaxAltitude() - this.getPassengerCount()
  //     }
  //   }
  //   class AirForceOne extends Airplane {
  //     // ...
  //     getCruisingAltitude() {
  //       return this.getMaxAltitude()
  //     }
  //   }
  //   class Cessna extends Airplane {
  //     // ...
  //     getCruisingAltitude() {
  //       return this.getMaxAltitude() - this.getFuelExpenditure()
  //     }
  //   }
}

{
  /**
   * @desc
   * use Iterator
   * use Generator
   * Stream과 같이 사용되는 데이터 콜렉션을 사용할때는 Generator와 Iterable Programming으로 사용하자
   *
   * Props
   * - 피호출자가 접근할 아이템 수를 결정한다는 의미에서 -> 피호출자와 generator 구현으로 분리할수 있다 (뭔 소리임)
   * - 지연 실행, 아이템은 요구에 의해 스트림 처리 될수 있다.
   * - for of 구문을 사용할 수 있다.
   * - itertor pattern을 사용할 수 있다
   */

  /**
   * Bad Code
   */
  function fibo(n: number): number[] {
    if (n === 1) return [0]
    if (n === 2) return [0, 1]

    const items: number[] = [0, 1]
    while (items.length < n) {
      items.push(items[items.length - 2] + items[items.length - 1])
    }
    return items
  }

  console.log(fibo(10).reduce((acc, cur) => acc + cur, 0))

  /**
   * Good Code
   */
  function* fibo2(): IterableIterator<number> {
    let [a, b] = [0, 1]

    while (true) {
      yield a
      ;[a, b] = [b, a + b]
    }
  }

  function print(n: number) {
    let i = 0
    let result = 0
    for (const fib of fibo2()) {
      if (i++ === n) break
      result += fib
    }
    return result
  }

  console.log(print(10))
}

{
  /**
   * @desc
   * 불변성을 선호하자
   */

  /**
   * Bad Code
   */
  interface Config {
    host: string
    port: string
    db: string
  }

  const c: Config = {
    host: '123',
    port: '123',
    db: '123',
  }

  c.db = 'db' // possible change

  /**
   * Good Code
   */
  interface ReadOnlyConfig {
    readonly host: string
    readonly port: string
    readonly db: string
  }

  const rc: ReadOnlyConfig = {
    host: '123',
    port: '123',
    db: '123',
  }

  // rc.db = 'db' // impossible
}

{
  /**
   * @desc
   * 메서드 체이닝을 사용하자 !!!
   * 근데 -> 메서드 체이닝을 사용한다는것은 -> StateFul한 객체를 만들게 된다. -> 이를 유의하자
   */
}
/**
 * Reference
 * https://davidamos.dev/the-rule-of-six/
 */
