/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

type NumButtonProps = {
  text: number | string;
  addValue: (value: string | number) => void;
};

const NumButton = ({ text, addValue }: NumButtonProps) => {
  return (
    <div css={container}>
      <button css={btn} onClick={() => addValue(text)}>
        {text}
      </button>
    </div>
  );
};

const container = css`
  background-color: white;
  width: 110px;
  height: 110px;
`;

const btn = css`
  border-width: 0px;
  width: 110px;
  height: 110px;
  background-color: white;
  font-size: 25px;
  font-family: 'GmarketSansBold';

  &:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

export default NumButton;
