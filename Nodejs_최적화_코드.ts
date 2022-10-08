import fs from 'fs'
/**
 * Nodejs 성능 규칙
 */

{
  /**
   * @desc
   * 동기코드를 피하자
   * - Nodejs는 단일 스레드다 하나의 작업 자체가 무거우면 뒷 작업을 할 수가 없다.
   * - 많은 파일 시스템작업 같은 경우에는 성능에따라 잘 동기코드를 사용해야 한다
   */

  // Good: write files asynchronously
  fs.writeFile('message.txt', 'Hello Node', function (err) {
    console.log("It's saved and the server remains responsive!")
  })

  // BAD: write files synchronously
  fs.writeFileSync('message.txt', 'Hello Node')
  console.log("It's saved, but you just blocked ALL requests!")
}

{
  /**
   * @desc
   * - 정적자원을 nodejs에서 저장하지 않는다.
   * - CDN 이나 NginX로 처리한다
   */
}

{
  /**
   * @desc
   * - gzip 사용
   * - 많은 서버와 클라이언트 요청과 응답을 압축하기 위해 Gzip을 사용한다
   * - 클라이언텡 응답하든 원격서버에 요청을 보내든, 충분히 사용가능하다
   */
}

{
  /**
   * @desc
   * - 세션같은 경우에 -> Express 단에 저장하지 않는 편이 좋다 -> 메모리 증가
   * - 사용자가 증가한다면, Redis 같은 외부 저장소에 저장해야한다.
   */
}

{
  /**
   * @desc
   * V8 JavaScript 사용
   * - V8 JavaScript 엔진 은 Node.js 를 지탱 하여 ECMA-262 제5 판 에서 지정 한 ECMAScript 를 실현 합 니 다.클 라 이언 트 라 이브 러 리 대신 표준 V8 JavaScript 함수 로 직접 사용 하면 성능 이 현저히 향상 되 었 음 을 발견 할 수 있 습 니 다.
   */
}
