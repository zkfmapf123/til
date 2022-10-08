import { alias, deserialize, serializable, serialize } from 'serializr'
/**
 * serializer
 * ts-node 4.serializer.ts
 */

class UserModel {
  @serializable(alias('user_email')) userEmail: string
  @serializable(alias('user_password')) userPassword: string
  @serializable(alias('user_name')) userName: string

  constructor(data: any = {}) {
    this.userEmail = data['user_email']
    this.userPassword = data['user_password']
    this.userName = data['user_name']
  }

  serialize() {
    return serialize(this)
  }
}

const data = {
  user_email: 'zkfmapf123@naver.com',
  user_password: '12345678',
  user_name: 'leedonggyu',
}

const user = new UserModel(data)
// dese..
console.log(user)

// se..
console.log(user.serialize())
