import React, { useState } from 'react';
import DropdownSelectMenu from './DropdownSelectMenu';
import RadioButtonGroup from './RadioButtonGroup';
import NumberInput from './NumberInput';
import Fares from './fares.json';
import './App.css';

function App() {

  /* ZONES */

  // List of zones
  const zones = [
    { value: 1, label: 'Zone 1' },
    { value: 2, label: 'Zone 2' },
    { value: 3, label: 'Zone 3' },
    { value: 4, label: 'Zone 4' },
  ];

  // Add 5th zone

  // Storage for selected zone
  const [selectedZone, setSelectedZone] = useState(0);

  const zoneFunc = (value) => {
    console.log(value);
    setSelectedZone(value);
  }


  /* TYPE */

  // List of types of travel
  const type = [
    { value: 'weekday', label: 'Weekdays only' },
    { value: 'evening_weekend', label: 'Weekend days only' },
    { value: 'anytime', label: 'Anytime'}
  ];

  // Storage for selected type
  const [selectedType, setSelectedType] = useState('');

  // Handler for selected type
  const rideFunc = (value) => {
    console.log(value);
    setSelectedType(value);
  }


  /* PURCHASE */

  // List of purchase options
  const farePurchase = [
    { value: 'advance_purchase', label: 'Station Kiosk' },
    { value: 'onboard_purchase', label: 'Onboard'},
  ]

  // Storage for selected purchase type
  const [selectedPurchase, setSelectedPurchase] = useState('');

  // Handler for purchase type
  const purchaseFunc = (value) => {
    console.log(value);
    setSelectedPurchase(value);
  }


  /* TRIPS */
  
  // Storage for trips
  const [selectedTrips, setSelectedTrips] = useState(1);

  // Handler for trips
  const tripFunc = (value) => {
    console.log(value);
    setSelectedTrips(value);
  }
  

  /* Retriving price from JSON */

  const [price, setPrice] = useState(null);


  const fetchData = () => {
    try {
      console.log(Fares);
      const zoneList = Fares.zones;
      console.log(zoneList);
      console.log(selectedZone);
      const zone = zoneList.filter((zoneData) => 
          zoneData.zone == selectedZone);
      console.log(zone);
      const zoneItem = zone[0];
      const fare = zoneItem.fares.filter((fareData) => 
          fareData.type == selectedType && 
          fareData.purchase == selectedPurchase && 
          fareData.trips == selectedTrips);
      console.log(fare);
      if (fare.length > 0) {
        setPrice(fare[0].price);
      } else {
        setPrice(null);
      }
        
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Don't forget to do the calculations if the fare is under 10 but
  // greater than 1. Just multiply the price by the trip amount
  // And set temp trip amount to 1 to retrieve the correct price

  return (
    <div className="App">
      <h1>Regional Rail Fare</h1>

      <p>Where are you going?</p>
      <DropdownSelectMenu options={zones} changeFunc={zoneFunc} />
    
      <p>When are you riding?</p>
      <DropdownSelectMenu options={type} changeFunc={rideFunc} />

      <p>Where will you purchase the fare?</p>
      <RadioButtonGroup options={farePurchase} changeFunc={purchaseFunc} />

      <p>How many rides will you need?</p>
      <NumberInput changeFunc={tripFunc}/>

      <button onClick={fetchData}>Calculate Price</button>
      {price !== null ? (<p>Price: ${price}</p>) : 
        <p>It is not possible to purchase a fare with these options. 
            Please adjust your selection and try again.</p>}
    </div>
  );
}

export default App;
