import python_weather
import asyncio


class Weather:
    @staticmethod
    def getweather(unit_type, city):
        # Define an inner asynchronous function
        async def fetch_weather(unit_type):
            if unit_type == "imperial":
                unit_type = python_weather.IMPERIAL
            elif unit_type == "metric":
                unit_type = python_weather.METRIC

            async with python_weather.Client(unit=unit_type) as client:
                weather = await client.get(city)

                # Collect weather data
                data = {
                    "temperature": weather.temperature,
                    "humidity": weather.humidity,
                    "unit": str(weather.unit),
                    "datetime": weather.datetime,
                    "coordinates": weather.coordinates,
                    "country": weather.country,
                    "description": weather.description,
                    "feels_like": weather.feels_like,
                    "kind": str(weather.kind),
                    "local_population": weather.local_population,
                    "locale": str(weather.locale),
                    "location": weather.location,
                    "precipitation": weather.precipitation,
                    "pressure": weather.pressure,
                    "region": weather.region,
                    "ultraviolet": str(weather.ultraviolet),
                    "visibility": weather.visibility,
                    "wind_direction": str(weather.wind_direction),
                    "wind_speed": weather.wind_speed,
                }

                return data

        # Run the asynchronous function and return the result
        return asyncio.run(fetch_weather(unit_type))
