# zamg-measurment-collector

This repository collects the raw hourly ZAMG weather data and commits them to this repository with Github actions.

It is collected from https://www.zamg.ac.at/ogd/ which updates every hour.


The data can be found in the `./data` directory and contains the raw data in daily files.


## Description of csv fields

- `Station` Internal ZAMG station id. You can find a full list [here](https://www.zamg.ac.at/cms/en/documents/climate/doc_metnetwork/zamg-observation-points).
- `Name` Name of the measurement station
- `Höhe m` Sea Level
- `Datum` Date
- `Zeit` Time
- `T °C` Temperature
- `TP °C` Dew Point
- `RF %` Humidity
- `WR °` Wind Bearing
- `WG km/h` Wind Speed
- `WSR °` Top Wind Bearing
- `WSG km/h` Top Wind Speed
- `N l/m²` Precipitation
- `LDred hPa` Pressure at Sea Level
- `LDstat hPa` Pressure
- `SO %` Sun Last Hour

This description has been derived from the [home-assistant.io ZAMG component](https://github.com/home-assistant/core/blob/dev/homeassistant/components/zamg/sensor.py) as [official documentation](https://www.data.gv.at/katalog/dataset/zamg_meteorologischemessdatenderzamg) is insufficent.
