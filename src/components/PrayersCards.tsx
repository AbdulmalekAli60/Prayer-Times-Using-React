//MUI Library
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//MUI Library

interface Prayer {
  prayerNmae: string;
  time: string | undefined;
  image: string;
}

export default function PrayersCards({ prayerNmae, time, image }: Prayer) {
  return (
    <>
      <Card sx={{ width: "15vw" }}>
        <CardMedia sx={{ height: 140 }} image={image} />
        <CardContent>
          <h2 className="x">{prayerNmae}</h2>
          <Typography color="text.secondary" variant="h3">
            {time ?? "undefied"}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
