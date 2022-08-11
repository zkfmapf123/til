import _ from 'lodash'
/**
 * nodemon --exec ts-node 5.iterator_pipe.ts
 */

{
  // js -> loop

  const result = [1, 2, 3, 4, 5]
    .filter((item) => item > 3)
    .map((item) => item + 10)
    .reduce((total, cur) => total + cur, 0)

  //   console.log(result)

  /**
   * 단점
   * - 배열에서만 사용가능하다
   * - lazy한 방법이 아니다 -> 과도한 CPU 및 메모리 사용이 발생할 수 있다.
   */
}

{
  // better solution -> Iterator
  const nums = [1, 2, 3, 4, 5]

  function* map<T, K>(src: T[], op: (o: T) => K) {
    for (const v of src) {
      yield op(v)
    }
  }

  function* filter<T, K>(src: T[], op: (o: T) => K) {
    for (const v of src) {
      if (op(v)) {
        yield v
      }
    }
  }

  // map
  const m = map(nums, (num) => num + 20)
  for (const iter of m[Symbol.iterator]()) {
    console.log(iter)
  }

  // filter
  const f = filter(nums, (num) => num % 2 === 0)
  for (const iter of f[Symbol.iterator]()) {
    console.log(iter)
  }
}

{
  const numbers = [1, 2, 3, 4, 5]
  /**
   * not used pipe
   */
  numbers
    .filter((item) => item % 2 === 0)
    .map((item) => item + 10)
    .reduce((total, cur) => total + cur, 0)

  console.log(numbers)

  /**
   * used pipe
   */
  function pipe(args: any, ...fns: Function[]) {
    return fns.reduce((v, fn) => fn(v), args)
  }

  function* filter<T, K>(src: T[], fn: (v: T) => K) {
    for (const _ of src) {
      if (fn(_)) {
        yield _
      }
    }
  }

  function* map<T, K>(src: T[], fn: (v: T) => K) {
    for (const _ of src) {
      yield fn(_)
    }
  }

  const result = pipe(
    numbers,
    filter((item) => item % 2 === 0),
    map((item) => item + 10)
  )
}
