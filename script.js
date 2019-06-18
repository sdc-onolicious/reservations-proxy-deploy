import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 250,
  duration: "3m",
  // rps: 200,
};

// GET REQUESTS

const getRestaurant = (id) => {
  return http.get(`http://localhost:3000/restaurants/${id}/reservations`);
};

export default function() {
  let res = getRestaurant(Math.ceil(Math.random()*10000000));
  check(res, {
    "success": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};

// POST REQUESTS

// const postReservation = (restaurant_id) => {
//   const url = `http://localhost:3000/restaurants/${restaurant_id}/reservations`;
//   const payload = JSON.stringify({
//     restaurant_id: restaurant_id,
//     reservation_date: "2019-06-29",
//     reservation_time: "7:30 PM",
//     guests: 4
//     });
//   var params = { headers: { 'Content-Type': 'application/json' } };
//   return http.post(url, payload, params);
// };

// export default function() {
//   let res = postReservation(Math.ceil(Math.random()*10000000));
//   check(res, {
//     "success": (r) => r.status === 201,
//     "transaction time OK": (r) => r.timings.duration < 2000
//   });
// };

// 95% GET, 5% POST

// export default function () {
//   let res;
//   const num = Math.random();
//   const restaurant_id = Math.ceil(Math.random()*10000000);
//   if (num < 0.95) {
//     res = getRestaurant(restaurant_id);
//   } else {
//     res = postReservation(restaurant_id);
//   }

//   check(res, {
//     "is status 200, 201": (r) => (r.status === 200 || r.status === 201),
//     "is status 500": (r) => r.status === 500,
//     "transaction time OK": (r) => r.timings.duration < 2000,
//   });
// };