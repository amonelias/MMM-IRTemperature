#!/usr/bin/env python3
#
# Read data(temperatures) from GY906/MLX90614
#
# By amonelias https://github.com/amonelias
# MIT Licensed.

import sys
from smbus2 import SMBus
from mlx90614 import MLX90614

if __name__ == "__main__":
    if ((len(sys.argv) > 1) and ((int(sys.argv[1]) == 0) or (int(sys.argv[1]) == 1))):
        bus = SMBus(int(sys.argv[1]))
        sensor = MLX90614(bus, address=0x5A)
        if len(sys.argv) == 2:
            print(sensor.get_ambient())
            print(sensor.get_object_1())
        elif sys.argv[2] == "ambient":
            print(sensor.get_ambient())
        elif sys.argv[2] == "object":
            print(sensor.get_object_1())
        else:
            print(sensor.get_ambient())
            print(sensor.get_object_1())
        bus.close()
    else:
         print("Error invalid arguments. Call: python3 readTemp.py I2C-bus ambient/object")
