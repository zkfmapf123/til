/**
 * @title use unknown instead of "any"
 * @desc unknwon + type guard
 */
const exmapleUseUnkownInsteadOfAny = async () => {
  interface IAdminUser {
    token: string
  }

  function isAdminUser(object: unknown): object is IAdminUser {
    if (object !== null && typeof object === 'object') {
      return 'token' in object
    }

    return false
  }

  const response = await fetch('https://users/v1')

  // 1. Bad Code
  const user = await response.json() // Proimse<any>

  // 2. Not Bad
  const impliUser: IAdminUser = await response.json()
  const optionalToken = impliUser?.token

  // 3. Good Code
  const unknownUser: unknown = await response.json()
  if (isAdminUser(unknownUser)) {
    const verifyToken = unknownUser.token
  }
}

/**
 * @title use "is" operator
 * is operator를 사용해서 분류..
 */
const use_IS_operator = () => {
  // Interface
  interface Pet {
    species: 'cat' | 'dog'
  }

  // Class
  class Cat implements Pet {
    species: 'cat' | 'dog' = 'cat'

    meow() {
      //...
    }
  }

  // Class
  class Dog implements Pet {
    species: 'cat' | 'dog' = 'dog'

    wang() {
      //...
    }
  }

  function petIsCat(pet: Pet): pet is Cat {
    return pet.species === 'cat'
  }

  function petIsDog(pet: Pet): pet is Dog {
    return pet.species === 'dog'
  }

  // Bad Code
  const cat = new Cat()
  cat.meow() as unknown as Cat

  // Good Code
  const dog = new Dog()
  if (petIsDog(dog)) {
    dog.wang()
  }

  if (petIsCat(dog)) {
    dog.meow()
  }
}

/**
 * @tiele use satisfies operator
 * @version typescript_4.94
 */
export const useSatisfiesOperator = () => {
  interface ICustomImage {
    data: string
    width: number
    height: number
  }

  type UserImage = string | ICustomImage

  interface IUser {
    name: string
    image: UserImage
  }

  // Bad Code
  const badUser: IUser = {
    name: 'leedonggyu',
    image: 'image-url',
  }

  const goodUser: IUser = {
    name: 'leedonggyu',
    image: 'image-url',
  } satisfies IUser
}
