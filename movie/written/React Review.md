### useRef

- 특정 DOM 선택
- `ref` 사용

```javascript
import React, { useState, useRef } from 'react';

// ..

const nameInput = useRef(); /*useRef(initialValue)*/

const onReset = () => {
  //reset 버튼을 누르면 input창이 focus되게
  setInputs({
    name: '',
    nickname: '',
  });
  nameInput.current.focus();
};

// ..

<input
  name="name"
  placeholder="이름"
  onChange={onChange}
  value={name}
  ref={nameInput} //ref
/>;
```
