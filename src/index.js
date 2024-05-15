import './style.css'

async function getTemp(location) {
    const weatherContent = document.getElementById('weatherInfo').childNodes
    try
    {
        const apiResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=811bb19131c6404cb67182115241405&q=${location}&aqi=no`, {mode: 'cors'})
        const data = await apiResponse.json()
        console.log(data)
        weatherContent[0].textContent = `${data.location.country}`
        weatherContent[1].textContent = `${data.location.name}, ${data.location.region}`

        if (data.current.temp_f != data.current.feelslike_f)
        {
            weatherContent[2].textContent = `${data.current.temp_f}°F, feels like ${data.current.feelslike_f}°F`
        }
        else
        {
            weatherContent[2].textContent = `${data.current.temp_f}°F`
        }

        weatherContent[3].textContent = `${data.current.condition.text}, ${(data.current.is_day ? "day time" : "night time")}`
    }
    catch (err)
    {
        for (let child of weatherContent)
        {
            child.textContent = ""
        }
        weatherContent[0].textContent = "City does not exist"
    }
    return 'error'
}

function locationSubmitted(e)
{
    e.preventDefault()

    const location = document.getElementById('City').value
    getTemp(location)
}


const form = document.getElementById('locationForm')
form.addEventListener('submit', locationSubmitted)