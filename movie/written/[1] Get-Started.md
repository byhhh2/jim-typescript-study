## β Get Started

### π νμ μΆλ‘ 

- tsλ jsκΈ°λ°μ μΈμ΄
- μ μ  νμμ μ§μ
- tsμμ λ³μ μμ±κ³Ό λμμ νΉμ  κ°μ ν λΉν  κ²½μ°, tsλ κ·Έ κ°μ ν΄λΉ λ³μμ νμμΌλ‘ μ¬μ©

### π νμ μ μ

- tsλ λμ  μΈμ΄
  - λͺλͺ λμμΈ ν¨ν΄μ μλμΌλ‘ νμμ μ κ³΅ν¨μ μμ΄ μ΄λ €μμ΄ μμ μ μλ€.
  - μ΄λ° κ²½μ°μ tsλ νμ λͺμ κ°λ₯
  - κ°μ²΄μ ννλ₯Ό λͺμμ μΌλ‘ λνλ΄κΈ° μν΄μλ `interface` λ‘ μ μΈ

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
//interfaceλ‘ class μ μΈ

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
//interfaceλ‘ ν¨μ λ§€κ°λ³μ & λ¦¬ν΄κ° λͺμ

interface User {
  name: string;
  id: number;
}

function deleteUser(user: User): User {
  //...
}
```

- jsμ μμ νμ
  - `boolean`
  - `bigint`
  - `null`
  - `number`
  - `string`
  - `symbol`
  - `object`
  - `undefined`
- tsμ μΆκ° νμ
  - `any` : λ¬΄μμ΄λ  νμ©
  - `void` : `undefined` λ₯Ό λ¦¬ν΄νκ±°λ λ¦¬ν΄κ° μμ

### π νμ κ΅¬μ±

- μ¬λ¬ νμμ μ΄μ©ν΄ μ νμ μμ±

- Unions

  - νμμ΄ μ¬λ¬ νμ μ€ νλ μΌ μ μμ
  - μμ

    - `type MyBool = true | false;`
    - `type WindowStates = "open" | "closed"; // λ¦¬ν°λ΄ μ§ν©`
    - `string` κ³Ό `array` κ΅¬λΆ

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
  - λ°°μ΄ μμ κ°μ μ€λͺ
  - `type StringArray = Array<string>;`

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

//Typeμ stringμΌλ‘ μ€μ ν€μ backpackμ μΈ
declare const backpack: Backpack<string>;

// objectμ νμμ string
const object = backpack.get();

// @errors: 2345, νμμ΄ stringμ΄λ―λ‘ numberμ λ¬νλ©΄ μ€λ₯
backpack.add(23);
```

### π κ΅¬μ‘°μ  νμ μμ€ν

- tsμ ν΅μ¬ μμΉ, νμ κ²μ¬κ° κ°μ΄ μλ ννμ μ§μ€ (κ΅¬μ‘°μ  νμ΄ν)
- λ κ°μ²΄κ° κ°μ ννλ₯Ό κ°μ§λ©΄ κ°μ κ²μΌλ‘ κ°μ£Ό
- ν΄λμ€μ κ°μ²΄λ λ§μ°¬κ°μ§

```typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
// μ¬κΈ°μ pointλ PointνμμΌλ‘ μ μΈλ μ  μμ§λ§ pointμ Pointμ ννλ₯Ό λΉκ΅ν΄ κ°μ ννλΌκ³  νλ¨λμ΄ ν΅κ³Ό
const rect = { x: 33, y: 3, width: 30, height: 80 };
// νν μΌμΉλ κ°μ²΄μ νλμ νμ μ§ν©λ§ νμ
printPoint(rect); // "33, 3"
printPoint(point); // "12, 26"
```
