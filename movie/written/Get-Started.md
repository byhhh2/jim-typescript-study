## ✔ Get Started

### 📌 타입 추론

- ts는 js기반의 언어
- 정적 타입을 지원
- ts에서 변수 생성과 동시에 특정 값을 할당할 경우, ts는 그 값을 해당 변수의 타입으로 사용

### 📌 타입 정의

- ts는 동적 언어
  - 몇몇 디자인 패턴은 자동으로 타입을 제공함에 있어 어려움이 있을 수 있다.
  - 이런 경우에 ts는 타입 명시 가능
  - 객체의 형태를 명시적으로 나타내기 위해서는 `interface` 로 선언

```typescript
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: 'Hayes',
  id: 0,
};
```

```typescript
//interface로 class 선언

interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount('Murphy', 1);
```

```typescript
//interface로 함수 매개변수 & 리턴값 명시

interface User {
  name: string;
  id: number;
}

function deleteUser(user: User): User {
  //...
}
```

- js의 원시 타입
  - `boolean`
  - `bigint`
  - `null`
  - `number`
  - `string`
  - `symbol`
  - `object`
  - `undefined`
- ts의 추가 타입
  - `any` : 무엇이든 허용
  - `void` : `undefined` 를 리턴하거나 리턴값 없음

### 📌 타입 구성

- 여러 타입을 이용해 새 타입 작성

- Unions

  - 타입이 여러 타입 중 하나 일 수 있음
  - 예시

    - `type MyBool = true | false;`
    - `type WindowStates = "open" | "closed"; // 리터럴 집합`
    - `string` 과 `array` 구분

    ```typescript
    function wrapInArray(obj: string | string[]) {
      //string or array
      if (typeof obj === 'string') {
        return [obj];
      } else {
        return obj;
      }
    }
    ```

- Generics
  - 배열 안의 값을 설명
  - `type StringArray = Array<string>;`

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

//Type을 string으로 설정헤서 backpack선언
declare const backpack: Backpack<string>;

// object의 타입은 string
const object = backpack.get();

// @errors: 2345, 타입이 string이므로 number전달하면 오류
backpack.add(23);
```

### 📌 구조적 타입 시스템

- ts의 핵심 원칙, 타입 검사가 값이 있는 형태에 집중 (구조적 타이핑)
- 두 객체가 같은 형태를 가지면 같은 것으로 간주
- 클래스와 객체도 마찬가지

```typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
// 여기서 point는 Point타입으로 선언된 적 없지만 point와 Point의 형태를 비교해 같은 형태라고 판단되어 통과
const rect = { x: 33, y: 3, width: 30, height: 80 };
// 형태 일치는 객체의 필드의 하위 집합만 필요
printPoint(rect); // "33, 3"
printPoint(point); // "12, 26"
```
