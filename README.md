# MMM-IRTemperature
A MagicMirror² module to read and display the data of the GY906/MLX90614 Sensor. 

## Dependencies

- [smbus2](https://pypi.org/project/smbus2/)

- [mlx90614](https://pypi.org/project/PyMLX90614/)

## Installation
1. Navigate to the `/modules` folder of you MagicMirror²
2. Clone this repository using the following command: `git clone https://github.com/amonelias/MMM-IRTemperatures.git`
3. Install dependencies using the following command: `pip3 install smbus2 PyMLX90614`

## Config

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>refreshTime</code></td>
      <td><strong>Default: 10000</strong><br>Time interval to read data in miliseconds<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>i2cbus</code></td>
      <td><strong>Default: 1</strong><br>I2cbus number of the sensor<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>fontSize</code></td>
      <td><strong>Default: "medium"</strong><br>Options: <code>"small", "medium", "large"</code><br><br><strong>Type:</strong> <code>string</code></td>
    </tr>
  </tbody>
</table>

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
  {
    module: 'MMM-IRTemperatures',
    position: 'top_right', // any possible region
    config: {
      refreshTime: 10000,
      i2cbus: 1,
      fontSize: "medium",
    },
  },
```

## Update
Navigate to the folder of the module in the `/modules` folder and get the latest version using the command `git pull`.
