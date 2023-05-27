import GoogleMapReact from 'google-map-react'

export const AboutUs = () => {
  const defaultProps = {
    center: {
      lat: 32.0852997,
      lng: 34.7818064,
    },
    zoom: 10,
  }

  const places = [
    { lat: 32.0852997, lng: 34.7818064, text: 'Tel Aviv' },
    { lat: 32.016499, lng: 34.750278, text: 'Bat Yam' },
    { lat: 32.437408, lng: 34.925621, text: 'Hadera' },
  ]

  const apiIsLoaded = (map, maps, places) => {
    return places.map(place => {
      return new maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map,
        title: place.text,
      })
    })
  }

  return (
    <>
      <div style={{ height: '800px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC5npTxFk7UL7btXdc70lyEfjwH8Mhet5g' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        />
      </div>
      <div>
        <h1>Our store addresses:</h1>
        <ul className="our-store flex row clean-list">
          <li>
            HaBarzel 22,
            <br />
            Ever HaYarkon,
            <br />
            Tel Aviv-Yafo
          </li>
          <li>
            Yeuda Halevi 26,
            <br />
            Givat Shemuel,
            <br />
            Hadera
          </li>
          <li>
            Zalman Shazar 7,
            <br />
            Hod HaSharon,
            <br />
            Bat Yam
          </li>
        </ul>
      </div>
    </>
  )
}
