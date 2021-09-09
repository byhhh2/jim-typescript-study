## React With TS

### `useState`

```typescript
const [count, setCount] = useState<number>(0);
//generics 생략가능
```

- generics은 상태가 `null`일 수도 있고 아닐 수도 있을 때 사용하면 좋다.

```typescript
type Information = { name: string; description: string };
const [info, setInformation] = useState<Information | null>(null);
```

### `useReducer`

- 컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.

#### ruducer

- 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환

```typescript
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState; //새로운 상태
}
```

- `useReducer`의 사용법

```typescript
const [state, dispatch] = useReducer(reducer, initialState);
//state : 컴포넌트에서 사용할 수 있는 상태
//dispatch : 액션을 발생시키는 함수
//reducer : reducer 함수
//initialState : 초기 상태

//사용
dispatch({ type: 'INCREMENT' });
```

- 예시 코드 (숫자를 증가시키고 감소시키는)

```typescript
import React, { useReducer } from 'react';

type Action = { type: 'INCREASE' } | { type: 'DECREASE' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
```
