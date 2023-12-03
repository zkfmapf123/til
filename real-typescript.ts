// Example
{
  interface ChatMessage {
    id: string
    messageType: string // "image" || "PlainText"
    imageUrl: string | null
    plainText: string | null
  }

  const chat: ChatMessage = {
    id: '1',
    messageType: 'PlainText',
    imageUrl: null,
    plainText: '안녕하세요?',
  }

  // Bad Pattern
  // 1. abc를 사용해도 허용이된다
  // 2. plainText를 사용해도 허용이 된다
  const badExampleChat: ChatMessage = {
    id: '1',
    messageType: 'abc',
    imageUrl: null,
    plainText: null,
  }
}

// 1. Good Pattern
// use Union Type
{
  type ChatMessage = ImageChatMessageType | PlainTextMessageType

  interface ImageChatMessageType {
    id: string
    type: 'image'
    imageUrl: string
  }

  interface PlainTextMessageType {
    id: string
    type: 'PlainText'
    plainText: string
  }

  // 알아서 타입을 매칭해준다.
  const plainChat: ChatMessage = {
    id: '1',
    type: 'PlainText',
    plainText: '123',
  }

  const imageChat: ChatMessage = {
    id: '2',
    type: 'image',
    imageUrl: '123',
  }
}

// 2. use pattern matching
// use ts-pattern
// typescript에서도 Typesafe를 유지해보자..
import { match } from 'ts-pattern'
{
  type ChatMessage = ImageChatMessageType | PlainTextMessageType

  interface ImageChatMessageType {
    id: string
    type: 'image'
    imageUrl: string
  }

  interface PlainTextMessageType {
    id: string
    type: 'PlainText'
    plainText: string
  }

  // 알아서 타입을 매칭해준다.
  const plainChat: ChatMessage = {
    id: '1',
    type: 'PlainText',
    plainText: '123',
  }

  const sendNotification = (chatMessage: ChatMessage) => {
    match(chatMessage)
      .with({ type: 'image' }, (message: string) => {
        console.log('image >> ', message)
      })
      .with({ type: 'PlainText' }, (message: string) => {
        console.log('plaintext >> ', message)
      })
      .exhaustive()
  }
  sendNotification(plainChat)
}
