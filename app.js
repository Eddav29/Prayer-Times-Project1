function prayerTimes(year, month, latitude, longitude) {
  const endpoint = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=4`;

  fetch(endpoint)
    .then((response) => response.json())
    .then(function (response) {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[today].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");

      // Create thead element and its row
      let thead = document.createElement("thead");
      let theadRow = thead.insertRow();

      // Create th elements for thead
      let thName = document.createElement("th");
      let thTime = document.createElement("th");
      thName.innerHTML = "Name";
      thTime.innerHTML = "Time";

      // Append th elements to thead row
      theadRow.appendChild(thName);
      theadRow.appendChild(thTime);

      // Append thead to table
      table.appendChild(thead);

      let tableTbody = document.createElement("tbody");

      for (i in data) {
        let row = tableTbody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tableTbody.appendChild(row);
      }
      table.appendChild(tableTbody);
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
  const latitude = -6.2088; // Jakarta latitude
  const longitude = 106.8456; // Jakarta longitude

  prayerTimes(
    new Date().getFullYear(),
    new Date().getMonth(),
    latitude,
    longitude
  );
  alert("posisi tidak dapat diakses, menggunakan lokasi Jakarta");
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
