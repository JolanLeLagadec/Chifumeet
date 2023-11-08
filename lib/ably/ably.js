import Ably from 'ably/promises';

let ably;

if (process.env.ABLY_API_KEY) {
  ably = new Ably.Realtime.Promise({ key: process.env.ABLY_API_KEY });
} else {
  console.error('ABLY_API_KEY is not defined');
}

export default ably;