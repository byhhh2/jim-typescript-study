/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { css } from '@emotion/react';
import NumButton from './NumButton';

function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>('');

  const addValue = (value: string | number) => {
    if (displayValue.length <= 21) {
      if (typeof value === 'string') {
        if (value === '=') {
          try {
            setDisplayValue(`${eval(displayValue)}`);
          } catch (error) {
            setDisplayValue('');
            alert('불가능한 계산입니다.');
          }
        } else if (value === '.') {
          setDisplayValue(displayValue + value);
        } else {
          setDisplayValue(displayValue + ' ' + value + ' ');
        }
      } else {
        setDisplayValue(displayValue + `${value}`);
      }
    } else {
      alert('20자리까지 입력 가능합니다.');
    }
  };

  const createRow = (arr: any[]) => {
    return arr.map((data: string | number, index: number) => (
      <NumButton text={data} addValue={addValue} key={index} />
    ));
  };

  return (
    <div css={container}>
      <h1>영화의 계산기</h1>

      <div css={display}>{displayValue}</div>

      <div>
        <div css={row}>{createRow([9, 8, 7, '*'])}</div>
        <div css={row}>{createRow([6, 5, 4, '+'])}</div>
        <div css={row}>{createRow([3, 2, 1, '-'])}</div>
        <div css={row}>{createRow([0, '.', '=', '/'])}</div>
      </div>

      <div>
        <button css={btn_clear} onClick={() => setDisplayValue('')}>
          clear
        </button>
      </div>
    </div>
  );
}

export default Calculator;

const container = css`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 30px 2px gray;
  background-color: white;
  width: 600px;
  height: 800px;
  border-radius: 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const row = css`
  display: flex;
  flex-direction: row;
`;

const display = css`
  width: 440px;
  height: 70px;
  margin-bottom: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 30px;
  color: gray;
`;

const btn_clear = css`
  width: 440px;
  height: 110px;
  background-color: black;
  color: white;
  border-width: 0px;
  font-size: 25px;
  font-family: 'GmarketSansBold';
  cursor: pointer;
`;
