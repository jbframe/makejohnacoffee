import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Axios from 'axios';
import Link from 'next/link'


export default function ts() {
  // interfaces
  // https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
  interface User {
    name: string;
    id: number;
  }

  const user: User = {
    name: "Hayes",
    id: 0
  };

  // composing types
  type MyStrings = "0" | number;

  interface User2 {
    name: string;
    id: MyStrings;
  }

  const user2: User2 = {
    name: "Hayes",
    id: 5
  };

  const user3 = {
    name: "Hayes",
    id: 5
  };


  console.log(user3)

  return (
    <React.Fragment>

    </React.Fragment>)
};
