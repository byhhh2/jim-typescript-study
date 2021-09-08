## ✔ Narrowing

### type guard

- `typeof padding === "number"`
- type이 축소된다.

### Truthiness narrowing

- js에서 if문 안이 항상 `boolean` 타입을 가짓 것이라고 기대하지 않는다.
- 만약 if문 안 type이 `number`라면 `0`, `null`, `undefined`, `""` 등을 제외하고 `true`로 강제 변환
- `Boolean()`함수나 `!!`(이중 부울 부정)을 통해 부울로 강제 변환도 가능. 전자는 Boolean type, 후자는 true type

- 이것을 통해 `null`값이나 `undefined`값을 예방할 수 있음

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === 'string') {
    console.log(strs);
  }
}
//여기에는 문제가 있는데 빈 문자열 케이스는 해결 못함
//매개 변수를 아래와 같이 나누면 가능
/*
    values: number[] | undefined,
    factor: number
*/
//또는 true, false가 아닌 null로 묶기 (undefined도 걸러짐)
/*
    if (strs !== null) {
*/
```

### `in` operator narrowing

- `"value" in x` 에서 x가 union 타입이면 value는 타입을 결정해주는 역할
- `true`를 반환하면 `x`에서 `value`는 선택이거나 필수속성이며, `false`를 반환하면 선택이거나 없는 속성

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim();
    //animal : Fish
  }

  return animal.fly();
  //animal : Bird
}
```

- 만약 사람이라면 swim과 fly 둘다 (선택적으로) 가능

```typescript
//? 선택 속성, 해당 속성이 존재하지 않을 수도 있음을 표현

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ('swim' in animal) {
    animal;
    //(parameter) animal: Fish | Human
  } else {
    animal;
    //(parameter) animal: Bird | Human
  }
}
```

### `instanceof` narrowing

- `instanceof`는 어떤 값이 다른 값의 객체인지 아닌지를 판단

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    //(parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    //(parameter) x: string
  }
}
```

### Assignments

- ts는 오른쪽에 무엇이 할당되느냐에 따라 왼쪽의 타입을 축소시킨다.

```typescript
let x = Math.random() < 0.5 ? 10 : 'hello world!';
//let x: string | number;

x = 1;
console.log(x);
//let x: number;

x = 'goodbye!';
console.log(x);
//let x: string;
//number를 할당한 이후에도 string 할당 가능
```

- string을 먼저 할당한 후 number를 할당할 수 있는 이유는 ts는 항상 타입을 선언된 타입으로 체크하기 때문이다.

### Control flow analysis

- = 도달할 수 있냐

```typescript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return new Array(padding + 1).join(' ') + input;
  }
  return padding + input;
}
// 이 함수에서 만약 padding이 number라면 return padding + input 부분은 도달하지 못할 것
```

- ts에서는 type guard에 따라 변수가 분석되면 control flow가 나눠졌다가 다시 합쳐진다. 변수는 각 포인트마다 다른 타입으로 관찰된다.

```typescript
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);
  //let x: boolean;

  if (Math.random() < 0.5) {
    x = 'hello';
    console.log(x);
    //let x: string;
  } else {
    x = 100;
    console.log(x);
    //let x: number;
  }

  return x;
  //let x: string | number;
}
```

### using type predicates

- 사용자 정의 타입 보호
- 코드 전체에서 타입이 변경되는 방식보다는 직접적으로 제어하고 싶을 때

- `parameterName is Type` parameterName이 Type타입이면 `true`반환 (parameterName은 현재 함수의 매개변수 이름이어야함)

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
//Fish 타입이면 true 반환, 아니면 false 반환

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
```

### Discriminated(구분된) unions

- 단순한 type들 말고, 대부분 js에서 개발자는 더 복잡한 구조체를 다뤄야 할 때가 있다.

```typescript
// kind는 원인지 사각형인지 구별하는 타입
interface Shape {
  kind: 'circle' | 'square';
  radius?: number; //? : 있을 수도 있고 없을 수 도 있다
  sideLength?: number;
}

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
    //Object is possibly 'undefined'.
  }
  //이 때 만약 strictNullChecks라면  ts는 오류를 발생시킨다.
  // 이경우에 !를 shape.radius에 붙여줌으로 써 radius는 null이 아니라는 것을 알려줘야한다.
  // return Math.PI * shape.radius! ** 2;
}
```

- 만약 `!`를 붙여준다고 해도 코드를 옮긴다면 에러가 발생할 수 있다.
- 문제는 타입 체커가 kind에 따라 어떤 속성이 나올지 모른다는 것이다. circle이면 radius고.. 이런거

```typescript
//shape 정의 방법 바꾸기

interface Circle {
  kind: 'circle';
  radius: number;
}

interface Square {
  kind: 'square';
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
    //(parameter) shape: Circle
  }
}
```

- 여기서 중요한 것은 ts에게 kind에서 Circle과 Square가 다른 독립된 타입이라는 것을 알려주는 것이다.

### `never` type

- narrowing을 하면서 우리는 union의 옵션들을 줄여나간다. 모든 가능성을 제거하면 아무것도 남지 않는다. 이럴때 `never` 타입을 사용할 수 있다.

### Exhaustiveness checking

완전한

- `never`를 사용하여 `switch` statement에서 완전한 checking이 가능함

```typescript
interface Triangle {
  //new member
  kind: 'triangle';
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      //Type 'Triangle' is not assignable to type 'never'. (error)
      return _exhaustiveCheck;
  }
}
```
