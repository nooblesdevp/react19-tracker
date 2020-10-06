import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import "leaflet/dist/leaflet.css"
import numeral from 'numeral'

import './App.scss';
import './MobileResponsive.scss'
import InfoBox from './Components/InfoBox/InfoBox';
import Map from './Components/Map/Map'
import Table from './Components/Table/Table'
import LineGraph from './Components/LineGraph/LineGraph'
import {sortData, prettyPrintStat } from './util'

import SocialLink from './Components/Social/SocialLink'

function App() {
  const [ countries, setCountries ] = useState ([])
  const [country, setCountry ] = useState ("worldwide")
  const [countryInfo, setCountryInfo] = useState ({})
  const [tableData, setTableData ] = useState ([])
  const [mapCenter, setMapCenter ] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom ] = useState (3)
  const [mapCountries, setMapCountries] = useState([])
  
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch ('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])
   
  //Get Data from api country
  useEffect(() => {
    const getCountriesData = async () => {
     await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);
  // console.log(casesType);

  //handle Change Country
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    // setCountry(countryCode)

    const url = countryCode ==='worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    
    await fetch(url)
    .then((respone) => respone.json())
    .then((data) => {

      setCountry(countryCode)
      setCountryInfo(data)

      if (countryCode === 'worldwide')
        {setMapCenter({ lat: 34.80746, lng: -40.4796 });
        setMapZoom(3)}
      else {setMapCenter([data.countryInfo.lat, data.countryInfo.long]); 
        setMapZoom(4)};  
      // countryCode === "worldwide"
      //     ? setMapCenter([34.80746, -40.4796])
      //     : setMapCenter([data.countryInfo.lat
      //     , data.countryInfo.long]);
    })
  }
  
  return (
    <div className="app ">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onClick={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value} >{country.name} </MenuItem>
                ))
              }
            </Select>
          </FormControl>     
        </div>
        <div className="app__stats">
          <InfoBox 
          isRed
          active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
          title="Coronavirus Cases"
          cases={prettyPrintStat (countryInfo.todayCases)} 
          total={numeral(countryInfo.cases).format("0,0")}/>

          <InfoBox 
         
          active={casesType === "recovered"}
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          cases={prettyPrintStat (countryInfo.todayRecovered)} 
          total={numeral (countryInfo.recovered).format("0,0")}/>

          <InfoBox 
           isRed
          active={casesType === "deaths"}
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          cases={prettyPrintStat (countryInfo.todayDeaths)} 
          total={numeral (countryInfo.deaths).format("0,0")}/>
        </div>
      <Map
        casesType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
      />
        <SocialLink/>
        </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Case by Country</h3>
          <Table countries={tableData}/>
            <h3 className="app__graphTitle" >Worldwide New {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card> 
    </div>
  );
}

export default App;
