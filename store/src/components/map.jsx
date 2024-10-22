import React from 'react'

const Map = (
    {
        selectedLocation
    }
) => {
    return (
        <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?q=${selectedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            frameBorder="0"
            allowFullScreen
            ></iframe>
    )
}

export default Map