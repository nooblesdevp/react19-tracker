import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
    //   rgb: "rgb(204, 16, 52)",
    //   half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
    //   rgb: "rgb(125, 215, 29)",
    //   half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
    //   rgb: "rgb(251, 68, 67)",
    //   half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
};

//function sort data
export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
}

//function numeral
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circle on the tmap with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") => 
    data.map((country, key) => (
        <Circle
        key={country.countryInfo._id}
            center={[country.countryInfo.lat, country.countryInfo.long]}   
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container" key={country.countryInfo._id} >
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="info-name" >{country.country} </div>
                    <div className="info-confirmed"> Cases: {numeral(country.cases).format('0,0')} </div>
                    <div className="info-recovered"> Recovered: {numeral(country.recovered).format('0,0')} </div>
                    <div className="info-deaths"> Deaths: {numeral(country.deaths).format('0,0')} </div>
                </div>
            </Popup>

        </Circle>
    ))
