function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('long time data')
    }, 2000);
  })
}

async function getData() {
  let data = await takeLongTime()
  console.log(data);
}

getData()