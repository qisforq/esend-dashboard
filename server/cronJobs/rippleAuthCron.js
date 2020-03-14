// const schedule = require('node-schedule');
const { getRippleAuthToken } = require('../services/rippleCalls');

// let num = 0

getRippleAuthToken()
.then(token => {  
  module.exports = token
})
.catch(e => console.error(e))
// ^^execute once immediately to get auth token right away

setInterval(async () => {
  try {
    module.exports = await getRippleAuthToken();
  } catch(e) {
    console.error(e)
  }
  // num++
  // module.exports = num
  // ^^ uncomment to test
}, 55 * 60 * 1000)
// 55 * 60 * 1000 = 55 minutes in milliseconds




// NOTE: Decided not to use CRON job, and instead use setInterval, since setInterval can do any interval like 59 minutes. If you need Cron jobs again, reinstall node-schedule and uncomment the code below:

// schedule.scheduleJob('0,30 * * * *', async (fireDate) => {
//   // '*/30 * * * *' means every 30 minutes. 
//   // '0,30 * * * *' means every minute 0 and 30 (which means it'll run immediately and then every 30 min)
//   // Check https://crontab.guru/ to double check syntax if changing. 
//   // Note: having CRON job run at an interval that is not a factor of 60 is complicated, and requires saving the time of the last execution, then rescheduling the job to that time + the interval to wait before next execution.
//   console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date())
//   getRippleAuthToken();
// })