//Librarys
import axios from "axios";
//Librarys
import { useEffect, useState } from "react";

interface ResponseData {
  prayerTimings?: PrayerTimings | null;
  errorMessage: string;
  isLoading: boolean;
}

export interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function usePrayerTime(cityNmae: string): ResponseData {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [prayerTimings, setPrayerTimings] = useState<PrayerTimings>({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // console.log("The city name has been chnaged, this log is from the hock");
    const fetchPrayerTime = async () => {
      const country: string = "SA";
      // const city: string = "buraydah";

      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${cityNmae}`
        );

        setPrayerTimings((prev) => ({
          ...prev,
          Fajr: response.data.data.timings.Fajr,
          Dhuhr: response.data.data.timings.Dhuhr,
          Asr: response.data.data.timings.Asr,
          Maghrib: response.data.data.timings.Maghrib,
          Isha: response.data.data.timings.Isha,
        }));
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("unknown error occurred");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayerTime();
  }, [cityNmae]);

  return { prayerTimings, errorMessage, isLoading };
}
