import { useState, useEffect } from "react";

export default function App() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  return (
    <>
      <Header></Header>
      <Main lat={lat} lng={lng} onSetLat={setLat} onSetLng={setLng}></Main>
    </>
  );
}
function Header() {
  return (
    <header>
      <Nav></Nav>
      <H1></H1>
      <Form></Form>
    </header>
  );
}
function Nav() {
  return (
    <nav>
      <img src="/assets/images/logo.svg" alt="logo" />
      <div id="nav__units">
        <img src="/assets/images/icon-units.svg" alt="units" />
        <p>Units</p>
        <img src="/assets/images/icon-dropdown.svg" alt="dropdown-icon" />
      </div>
    </nav>
  );
}
function H1() {
  return <h1>How's the sky looking today?</h1>;
}
function Form() {
  return (
    <form action="">
      <div id="icon-input">
        <img src="/assets/images/icon-search.svg" alt="serach-icon" />
        <input type="text" placeholder="Search for a place..." />
      </div>
      <button>Search</button>
    </form>
  );
}
function Main({ lat, lng, onSetLat, onSetLng }) {
  function handleLetLng(latitude, longitude) {
    onSetLat(latitude);
    onSetLng(longitude);
  }
  useEffect(
    function () {
      function getPosition() {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
      // eslint-disable-next-line
      async function Position() {
        try {
          const position = await getPosition();
          const { latitude, longitude } = position.coords;
          handleLetLng(latitude, longitude);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();
          // console.log(res);
          console.log(data);
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`,
          );
          const weatherData = await weatherRes.json();
          const current = weatherData.current;
          const currentUnits = weatherData.current_units;
          console.log(current, currentUnits);
        } catch (err) {
          console.error(err);
        }
      }
      // Position();
    },
    // eslint-disable-next-line
    [lat, lng],
  );
  return (
    <main>
      <MainLeft></MainLeft>
      <MainRight></MainRight>
    </main>
  );
}
function MainLeft() {
  return (
    <div id="main__left">
      <div id="city-country-temp">
        <div id="city-country">
          <h2 className="">Tokyo, Japan</h2>
          <p className="">Tuesday, Aug 23 2089</p>
        </div>
        <div className="sunny-img-temp">
          <img
            src="/assets/images/icon-sunny.webp"
            alt="weather-icon"
            width="150"
          />
          <h3 id="big-temp">20°</h3>
        </div>
      </div>
      <div id="feel-like" className="main__left-second-container-child">
        <p>Feels like</p>
        <p className="">18°</p>
      </div>
      <div id="humidity" className="main__left-second-container-child">
        <p>Humudity</p>
        <p className="">46%</p>
      </div>
      <div id="wind" className="main__left-second-container-child">
        <p>Wind</p>
        <p className="">14 km/h</p>
      </div>
      <div id="precipitation" className="main__left-second-container-child">
        <p>Precipitation</p>
        <p className="">0 mm</p>
      </div>
      <h4>Daily forecast</h4>
      <div id="tue" className="flex-col-center">
        <p>Tue</p>
        <img
          src="/assets/images/icon-rain.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>20°</p>
          <p>14°</p>
        </div>
      </div>
      <div id="wed" className="flex-col-center">
        <p>Wed</p>
        <img
          src="/assets/images/icon-drizzle.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>21°</p>
          <p>15°</p>
        </div>
      </div>
      <div id="thu" className="flex-col-center">
        <p>Thu</p>
        <img
          src="/assets/images/icon-sunny.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>24°</p>
          <p>14°</p>
        </div>
      </div>
      <div id="fri" className="flex-col-center">
        <p>Fri</p>
        <img
          src="/assets/images/icon-partly-cloudy.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>25°</p>
          <p>13°</p>
        </div>
      </div>
      <div id="sat" className="flex-col-center">
        <p>Sat</p>
        <img
          src="/assets/images/icon-storm.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>21°</p>
          <p>15°</p>
        </div>
      </div>
      <div id="sun" className="flex-col-center">
        <p>Sun</p>
        <img
          src="/assets/images/icon-snow.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>25°</p>
          <p>16°</p>
        </div>
      </div>
      <div id="mon" className="flex-col-center">
        <p>Mon</p>
        <img
          src="/assets/images/icon-overcast.webp"
          alt="weather-icon"
          width="40"
        />
        <div className="flex-row-space">
          <p>24°</p>
          <p>15°</p>
        </div>
      </div>
    </div>
  );
}
function MainRight() {
  return (
    <div id="main__right">
      <div id="hour-day">
        <p>Hourly forecast</p>
        <select id="select">
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
      </div>
      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-overcast.webp"
            alt="weather-icon"
            width="35"
          />
          <p>3pm</p>
        </div>
        <p>20°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-sunny.webp"
            alt="weather-icon"
            width="35"
          />
          <p>4pm</p>
        </div>
        <p>20°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-sunny.webp"
            alt="weather-icon"
            width="35"
          />
          <p>5pm</p>
        </div>
        <p>20°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-partly-cloudy.webp"
            alt="weather-icon"
            width="30"
          />
          <p>6pm</p>
        </div>
        <p>18°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-rain.webp"
            alt="weather-icon"
            width="35"
          />
          <p>7pm</p>
        </div>
        <p>18°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-partly-cloudy.webp"
            alt="weather-icon"
            width="30"
          />
          <p>8pm</p>
        </div>
        <p>17°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-drizzle.webp"
            alt="weather-icon"
            width="35"
          />
          <p>9pm</p>
        </div>
        <p>17°</p>
      </div>

      <div className="main__right-child-container">
        <div className="inner">
          <img
            src="/assets/images/icon-rain.webp"
            alt="weather-icon"
            width="35"
          />
          <p>10pm</p>
        </div>
        <p>10°</p>
      </div>
    </div>
  );
}
//  // eslint-disable-next-line
