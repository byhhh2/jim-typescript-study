## Everyday Types

### 원시 타입

- `string`
- `number`
- `boolean`

### 배열

- `number[]` : `[1, 2, 3]`
  - = `Array<number>` : generics
- `string[]` : 문자열 배열

### any

- 특정 값으로 인해 검사 오류가 발생하는 것을 원하지 않을 때
- 해당 값에 대해 임의의 속성에 접근 할 수 있고 함수인 것 처럼 호출 할 수 있다.. 무엇이든 할 수 있다.
- 코드상의 특정 라인에 문제가 없다고 ts에 알림

### 변수에 대한 타입 표기

- 변수의 타입을 명시 가능
- 대부분 타입 표기 불필요. ts가 추론하기 때문

### 함수

- 매개변수 타입 표기
- 반환 타입 표기

```typescript
declare function greet(name: string): void;
```

### 익명함수

- ts가 해당 함수가 어떻게 호출될지 알아낼 수 있으면 해당 함수의 매개 변수에 자동으로 타입 부여

```typescript
const names = ['Alice', 'Bob', 'Eve'];

// 함수에 대한 문맥적 타입 부여
names.forEach(function (s) {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
  // 매개변수 s에 타입이 표기 되어 있지 않았음에도 불구하고 s의 타입을 추론 (문맥적 타입 부여)
});
```

### 객체 타입

- 객체로 타입 표기 가능

```typescript
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
} //프로퍼티 구분에 ,또는 ; 사용 가능

printCoord({ x: 3, y: 7 });
```

### 옵셔널 프로퍼티

- 프로퍼티 이름 뒤에 `?` 를 사용
- 인자로 넘겨주지 않아도 런타임 오류가 발생하지 않고, 존재하지 않는 프로퍼티에 접근 하였을 때 `undefined` 값을 얻게 된다.

```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}

// 둘 다 OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });

//값이 undefined일 떄에도 안전한 사용
console.log(obj.last?.toUpperCase());
//last값이 존재하면 함수 실행
```

### 유니언

- 표시한 타입 조합에 사용된 타입 중 무엇이든 하나를 타입으로 가질 수 있다.
- 만약 유니언 타입이 `number | string`이라면 `string` 타입에만 유효한 메서드는 사용 할 수 없다. (ex, `toUpperCase()`)
  - 해결하고 싶다면 `if (typeof id === "string)` , `Array.isArray` 등을 사용

### 타입 별칭

- `type`

```typescript
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

//use
//function printCoord(pt: Point) {
```

### 인터페이스

- 객체 타입을 만드는 방법
- 타입 별칭과 인터페이스의 차이점
  - 타입은 새 프로퍼티를 추가하도록 개방될 수 없지만, 인터페이스는 확장 가능
  - 타입은 교집합을 통해 확장가능, 생성된 뒤 바꾸는 건 불가능

```typescript
//interface 확장

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

```typescript
//type 확장

type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: Boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

### 타입 단언

- ts보다 개발자가 타입에 대한 정보를 더 잘 아는 경우
- 코드상에 `document.getElementById`가 사용되는 경우 ts 는 `HTMLElement` 중에서 무언가가 반환된다는 것만을 알지만 개발자는 `HTMLCanvasElement`등이 반환된다는 사실을 안다.
- 불가능한 강제 변환은 방지됨

```typescript
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
// ==
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
```

### 리터럴 타입

```typescript
const constantString = 'Hello World';
// const constantString: "Hello World"
// const는 변경 불가하기 때문
```

- 리터럴 타입은 그다지 쓸모가 없는데 유니언가 함께 사용하면 유용하게 쓸 수 있음

```typescript
function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}

printText('Hello, world', 'left');

//숫자 리터럴
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

### 객체와 리터럴 추론

- 객체를 사용해 변수를 초기화 하면 해당 객체의 프로퍼티는 이후에 값이 변화 될 수 있다고 가정됨

```typescript
const obj = { counter: 0 };
obj.counter = 1;

// 이건 오류가 나지 않음
// obj.counter는 number 타입을 가지지, 0 리터럴 타입을 가질 수 없다는 의미이다. => 왜냐면 객체의 프로퍼티는 이후에 값이 변화 될 수 있다고 가정되니깐

const req = { url: 'https://example.com', method: 'GET' };
handleRequest(req.url, req.method);

//handleRequest()에 method인자가 "GET" | "POST" 타입만 가질 수 있다면 이는 오류가 발생
//req.method는 string 타입이지 "GET" 타입으로 추론되지 않기 때문이다.

// 수정 1:
const req = { url: 'https://example.com', method: 'GET' as 'GET' };
// 수정 2:
handleRequest(req.url, req.method as 'GET');
// 수정 3:
const req = { url: 'https://example.com', method: 'GET' } as const; //객체 전체를 리터럴 타입으로 변경
handleRequest(req.url, req.method);
```

### `null` 과 `undefined`

- `strictNullChecks` 옵션을 설정하면 `null`과 `undefined`에 접근 불가하지만(값을 null인지 undefined인지 검사해야함), 설정하지 않는다면 접근 가능

### 타입 단언 (`!`)

- 명시적인 검사를 하지 않고 `null`과 `undefined`를 제거
- 표현식 뒤에 `!`를 작성하면 해당 값이 `null` 또는 `undefined`가 아니라고 타입 단언
- `console.log(x!.toFixed())`

### 열거형

- ts가 제공하는 기능 중 하나

```typescript
// 숫자 열거형

enum Direction {
  Up = 1,
  Down, //2
  Left, //3
  Right, //4
} //초기화 하지 않으면 0,1 ...

console.log(Direction.Up); //1

//문자열 열거형
//숫자와 다르게 자동-증가 기능 없음
//직렬화에 이점 (연속적인 데이터로 변환하는 것)
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

- 열거형 멤버를 타입처럼 사용가능하다.

### 역매핑

- 열거형 값에서 열거형 이름으로

```typescript
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

### 이외 잘 안쓰는 원시 타입

- `bigint`
  - 큰 정수 다루기 위함
- `symbol`
  - 고유한 참조값 생성
