//MUI Library
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//MUI Library

//My Components
import PrayersCards from "./PrayersCards";
import usePrayerTime from "../hocks/usePrayerTime";

//My Components

export default function MainContent() {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
  };

  const { prayerTimings, errorMessage, isLoading } = usePrayerTime();
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
            <h2>4:20 | 9 2023 سبتمر</h2>
            <h1>مكة المكرمة</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة العصر</h2>
            <h1>15:45:9</h1>
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
            // value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>الرياض</MenuItem>
            <MenuItem value={20}>بريدة</MenuItem>
            <MenuItem value={30}>جدة</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* Select */}
    </>
  );
}
