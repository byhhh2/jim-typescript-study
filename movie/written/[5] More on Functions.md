### ✔ More on Functions

how to write types that describe functions

### Function Type Expressions

- 구문적으로 화살표함수랑 비슷

```typescript
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

- `(fn: (a: string) => void)` : 이 부분을 통해 문자열 인지가 필요하고 반환값이 없는 함수가 필요하다는 것을 알 수 있다.
- 파라미터 타입이 지정안되어 있다면 암묵적으로 `any`타입

```typescript
type GreetFunction = (a: string) => void;
//type alias

function greeter(fn: GreetFunction) {
  // ...
}
```

### call signatures

- js에서는 함수는 callable과 동시에 속성을 가질 수 있다.
- 만약 함수 안 속성과 함께 call할 수 있는 어떤 값을 묘사하고 싶다면 call signature를 쓰면 된다.

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
  //number는 매개변수 타입, boolean은 리턴값 타입
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6));
}
```

### construct signatures

- js에서 함수는 `new`연산자로 호출될 수 있다.
- 이걸 constructors라고 부르는데 왜냐면 이게 새로운 객체를 만들기 때문임
- `new`를 call signatures앞에 붙여서 constructor signature로 쓸 수 있다.

```typescript
type SomeConstructor = {
  new (s: string): SomeObject; //any
};

function fn(ctor: SomeConstructor) {
  return new ctor('hello');
}
```

### generic Functions

- `any` 대신에 사용

```typescript
//any
function firstElement(arr: any[]) {
  return arr[0];
  //대부분 잘 작동하지만 any type을 반환 할 수도 있다.
}

//generic
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}
//input과 output사이의 링크를 만듦

// s is of type 'string'
const s = firstElement(['a', 'b', 'c']);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
```

### 타입 추론 (inference)

- ts는 타입을 지정안해도 알아서 추론한다.

```typescript
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
} //input 타입에 맞게 들어온 arr을 output 타입에 맞게 변환해서 return하는 함수

//arr의 타입은 srting이므로 n의 타입은 string, parseInt를 봤을때 output타입은 number임을 알 수 있음
const parsed = map(['1', '2', '3'], (n) => parseInt(n));
```

### constraints

- generic 함수를 쓸 때 타입을 제한할 수 있다.
- 둘 중 긴 값을 return하는 함수에서 `length`프로퍼티를 쓰기 위해 들어오는 `length`값이 `number`여야 한다고 제한

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
} //여기서 리턴 타입은 추론됨

// 배열은 length프로퍼티를 갖음
const longerArray = longest([1, 2], [1, 2, 3]);
// 문자열열은 length프로퍼티를 갖음
const longerString = longest('alice', 'bob');
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

### 매개변수 타입 구체화하기

```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], ['hello']);
//error -> string에 number타입을 할당할 수 없음

//타입을 구체화하기
const arr = combine<string | number>([1, 2, 3], ['hello']);
```

### 좋은 generic functions을 쓰는 방법

```typescript
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

- 두 함수는 같아 보이지만 첫번째함수가 더 나은 방법이다. ts는 두번째 방법을 택한다면 제약조건 타입을 사용하여 arr을 any타입으로 추론하기 때문이다.

- 함수의 매개변수 유형의 추론을 쉽게하려면 적은 수의 타입 매개변수를 사용해야한다.
- generic을 사용하는 것은 여러 타입을 연결하기 위한 것인 점을 기억해라

### 선택적 매개변수

- 매개변수의 갯수가 가변적일 때
- `?` 사용

```typescript
function f(x?: number) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}

f(); // OK
f(10); // OK

//기본값 제공도 가능
function f(x = 10) {
  // ...
}
```

- 콜백에는 일반적으로 선택적 매개변수를 사용하지 말 것

### function overloads

```typescript
//불가능 한 것
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

len(''); // OK
len([0]); // OK
len(Math.random() > 0.5 ? 'hello' : [0]); //문자열일지 배열일지 모르는 값은 불가능하다.
//이럴때는 그냥 오버로드 안하고 union써라
```

### 함수안에 `this`선언

- ?? 모르겠어요
- 아무튼 화살표 함수는 안된다.

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

### 나머지 매개변수

- 무제한의 인수를 취하는 함수

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
```

### 나머지 인수

- 무제한의 인수를 배열로

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```
