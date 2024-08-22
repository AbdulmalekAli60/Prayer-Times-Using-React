//MUI Library
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//MUI Library

//React
import { useEffect, useState } from "react";
//React

//My Components
import PrayersCards from "./PrayersCards";
import usePrayerTime, { PrayerTimings } from "../hocks/usePrayerTime";
//My Components

//Other Libraries
import moment from "moment";
import "moment/locale/ar-sa";
moment.locale("ar-sa");
//Other Libraries

interface City {
  cityDisplayName: string;
  cityEnglishName: string;
}

export default function MainContent() {
  const [selectedCity, setSelectedCity] = useState<City>({
    //defult values
    cityDisplayName: "الرياض",
    cityEnglishName: "Riyadh",
  });

  const [timeAndDate, setTimeAndDate] = useState<string>();

  const [nextPrayerIndex, setNextPrayerIndex] = useState<any>(2);
  const [remaining, setReamining] = useState<any>("");
  //Time to next Prayer
  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const setupCountdownTimer = () => {
    const momentNow = moment(); //current Time

    let prayerIndex = null;
    //converting isha string "time" to moment object so i can check isAfter
    if (
      momentNow.isAfter(moment(prayerTimings?.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimings?.Dhuhr, "hh:mm"))
    ) {
      // console.log("next Prayer is Dhur ");
      prayerIndex = 1;
      // NextPrayer = "Dhur";
    } else if (
      momentNow.isAfter(moment(prayerTimings?.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimings?.Asr, "hh:mm"))
    ) {
      // console.log("next Prayer is Asr ");
      prayerIndex = 2;

      // NextPrayer = "Asr";
    } else if (
      momentNow.isAfter(moment(prayerTimings?.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimings?.Maghrib, "hh:mm"))
    ) {
      // console.log("next Prayer is Maghrib ");
      prayerIndex = 3;

      // NextPrayer = "Maghrib";
    } else if (
      momentNow.isAfter(moment(prayerTimings?.Maghrib, "hh:mm")) &&
      momentNow.isBefore(moment(prayerTimings?.Isha, "hh:mm"))
    ) {
      // console.log("next Prayer is Isha ");
      prayerIndex = 4;

      // NextPrayer = "Isha";
    } else {
      momentNow.isAfter(moment(prayerTimings?.Isha, "hh:mm")) &&
        momentNow.isBefore(moment(prayerTimings?.Fajr, "hh:mm"));

      // console.log("next Prayer is Fajr ");
      prayerIndex = 0;

      // NextPrayer = "Fajr";
    }
    setNextPrayerIndex(prayerIndex);

    //Now we know what is the next prayer time is, we  can set the timer
    const nextPrayerObject = prayersArray[prayerIndex].key;
    const nextPrayerTime =
      prayerTimings?.[nextPrayerObject as keyof PrayerTimings] ?? undefined;
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(moment(nextPrayerIndex, "hh:mm")).diff(
      momentNow
    );

    if (remainingTime < 0) {
      const midNightDiff = moment("23:59:59", "hh:mm:99").diff(momentNow);

      const fajrToMidNightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiff = midNightDiff + fajrToMidNightDiff;

      remainingTime = totalDiff;
    }

    const durationReamingTime = moment.duration(remainingTime);
    setReamining(
      `${durationReamingTime.seconds()} : ${durationReamingTime.minutes()} : ${durationReamingTime.hours()} `
    );
  };
  //Time to next Prayer

  useEffect(() => {
    const updateTimeAndDate = () => {
      const today = moment();
      setTimeAndDate(today.format("MMMM D YYYY | h:mm"));
    };

    updateTimeAndDate(); // Initial update
    const timer = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(timer);
  }, []);

  const avilableCities = [
    {
      id: 1,
      cityDisplayName: "الرياض",
      cityEnglishName: "Riyadh",
    },
    {
      id: 2,

      cityDisplayName: "بريدة",
      cityEnglishName: "Buraydah",
    },
    {
      id: 3,

      cityDisplayName: "جدة",
      cityEnglishName: "Jeddah",
    },
  ];

  const prayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Maghrib",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];

  const handleCityNameChange = (event: SelectChangeEvent) => {
    const selectedEnglishName = event.target.value;
    const selectedCity = avilableCities.find(
      (city) => city.cityEnglishName === selectedEnglishName
    );
    if (selectedCity) {
      setSelectedCity(selectedCity);
    }
    // console.log("the selected city is: ", englishName);
  };

  const { prayerTimings, errorMessage, isLoading } = usePrayerTime(
    selectedCity.cityEnglishName
  );
  if (isLoading) {
    return <div>Loading</div>;
  } else {
    // console.log(prayerTimings);
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <>
      {/* Top */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{timeAndDate}</h2>
            <h1>{selectedCity.cityDisplayName}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remaining}</h1>
          </div>
        </Grid>
      </Grid>
      {/* === Top === */}

      <Divider
        variant="middle"
        style={{ borderColor: "white", opacity: "0.1" }}
      />

      {/* Cards */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "2rem" }}
      >
        <PrayersCards
          prayerNmae="الفجر"
          time={prayerTimings?.Fajr}
          image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
        />

        <PrayersCards
          prayerNmae="الظهر"
          time={prayerTimings?.Dhuhr}
          image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
        />
        <PrayersCards
          prayerNmae="العصر"
          time={prayerTimings?.Asr}
          image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <PrayersCards
          prayerNmae="المغرب"
          time={prayerTimings?.Maghrib}
          image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />

        <PrayersCards
          prayerNmae="العشاء"
          time={prayerTimings?.Isha}
          image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
        />
      </Stack>
      {/* Cards */}

      {/* Select */}
      <Stack direction="row" justifyContent={"center"}>
        <FormControl style={{ width: "30%", marginTop: "2rem" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity.cityEnglishName}
            label="City"
            onChange={handleCityNameChange}
            style={{ color: "white" }}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem key={city.id} value={city.cityEnglishName}>
                  {city.cityDisplayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* Select */}
    </>
  );
}
