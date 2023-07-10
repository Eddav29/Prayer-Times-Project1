function prayerTimes(year, month, latitude, longitude) {
  const endpoint = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`;

  fetch(endpoint)
    .then((response) => response.json())
    .then(function (response) {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[today].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");
      let tableTbody = document.createElement("tbody");
      //console.log(response.data[today]);

      for (i in data) {
        //membuat table dam agar tr tidak double
        let row = tableTbody.insertRow();
        //membuat 2 kolom
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tableTbody.appendChild(row);
      }
      table.appendChild(tableTbody);
      //memasukkan ke table ke div id app
      app.appendChild(table);
    });
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; //supaya tidak mengakses indeks 0 yang tidak ada apa apa
  prayerTimes(currentYear, currentMonth, latitude, longitude);
}

function error() {
  alert("posisi tidak dapat diakses");
}

function userLocation() {
  if (!navigator.geolocation) {
    alert(
      "GeoLocation tidak didukung didalam browser anda, silahkan gunakan browser lain"
    );
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function index() {
  let app = document.getElementById("app");
  let h3 = document.createElement("h3");
  h3.innerHTML = "Prayer Times";

  app.appendChild(h3);

  userLocation();
}

index();
