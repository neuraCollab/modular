import React from 'react';
import { Map, Placemark } from '@pbe/react-yandex-maps';

const Maps = () => {
    return (
        <div>
            My awesome application with maps!
            <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
        </div>
    );
}

export default Maps;