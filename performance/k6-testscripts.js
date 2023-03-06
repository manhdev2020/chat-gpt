import { Httpx } from 'https://jslib.k6.io/httpx/0.0.1/index.js';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
//Error Rate is an object for representing a custom metric keeping track of
//the failures
export const errorRate = new Rate('errors');
//create httpx session
const session = new Httpx({
  baseURL: 'http://localhost:8647/api',
  timeout: 10000, // 10s timeout.
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmhrbWFAZ21haWwuY29tIiwiaWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1NDExMTUwLCJleHAiOjE2NzcyMTExNTB9.cKR2PNGlR91i5xTj77o-_E61idK_VVN6H47lfebQESY';

session.addHeaders({
  Authorization: `Bearer ${token}`, //auth token
  'User-Agent': 'My k6 custom user agent', //user agent, any suitable name
  'Content-Type': 'application/json',
});

// export default function helthCheck() {
//   let res = session.get('/health-check');

//   //check response for 200 and response within 1000ms
//   check(res, {}) || errorRate.add(1);

//   if (res.status === 200) {
//     let resp = JSON.parse(res.body);
//     console.log('response:', JSON.stringify(resp)); //prints the result, optional
//   } else console.log(res.body); //this will help to know the error details on console. optional
// }

export default function getAllUser() {
  let res = session.get('/users');

  //check response for 200 and response within 1000ms
  check(res, {}) || errorRate.add(1);

  if (res.status === 200) {
    let resp = JSON.parse(res.body);
    console.log('response:', JSON.stringify(resp)); //prints the result, optional
  } else console.log(res.body); //this will help to know the error details on console. optional
}

