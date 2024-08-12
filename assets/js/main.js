let citySelect = document.getElementById("cities-select");

let cities = [
  {
    arName: "طنطا",
    isoName:"Tanta"
  },{
    arName: "المحلة الكبري",
    isoName:"El Mahalla El Kobra"
  }, {
    arName: "دمنهور",
    isoName:"Damanhour "
  },{
    arName: "المنصورة",
    isoName:"El Mansoura"
  },{
    arName: "القاهرة",
    isoName:"	Cairo"
  },
];


for (let city of cities) {
  const content = `<option>${city.arName}</option>`
  citySelect.innerHTML += content
}

citySelect.addEventListener("change", () => {
  console.log(citySelect.value)
  document.querySelector("h1").innerHTML = citySelect.value;
  let cityName = "";
  for (let city of cities) {
    if (city.arName === citySelect.value) {
      cityName = city.isoName;
    }
  }
  showData(cityName)
})

function showData(pram="Tanta") {
  let params = {
  country: "EG",
  city: pram
}
  axios.get('http://api.aladhan.com/v1/timingsByCity/:date', {
    params: params
  })
  .then(function (response) {
    // timing
    console.log(response.data.data.date.hijri.weekday.ar);
    const timing = response.data.data.timings;
    const date = response.data.data.date.readable;
    const weekDay = response.data.data.date.hijri.weekday.ar;
    const day =  weekDay + "  -  " + date ;

    fillTime("date", day );
    fillTime("fajr", timing.Fajr);
    fillTime("sunrise", timing.Sunrise);
    fillTime("dhuhr", timing.Dhuhr);
    fillTime("asr", timing.Asr);
    fillTime("maghrib", timing.Maghrib);
    fillTime("isha", timing.Isha);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}
showData();

function fillTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
