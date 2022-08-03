import { Eq } from './eq'

describe('fp-ts test', () => {
  it('eq-test', (done) => {
    const eqNumber: Eq<number> = {
      equals: (x, y) => x === y,
    }
    const isEq1 = eqNumber.equals(10, 20)
    const isEq2 = eqNumber.equals(20, 20)

    expect(isEq1).toBe(false)
    expect(isEq2).toBe(true)
    done()
  })

  it('eq-test use generic', (done) => {})
})
