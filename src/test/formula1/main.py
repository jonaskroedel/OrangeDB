import sys, json
import matplotlib.pyplot as plt
import pandas as pd
from timple.timedelta import strftimedelta
import fastf1
import fastf1.plotting
from fastf1.core import Laps

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def f1():
    try:
        lines = read_in()
        # fastf1.Cache.enable_cache('../../../cache')

        session = fastf1.get_session(lines[1], lines[2], lines[3])
        session.load()

        drivers = pd.unique(session.laps['Driver'])

        return drivers
    except:
        error = ['An error occured']
        return error

def main():
    #get our data as an array from read_in()
    f1data = f1()

    print(f1data)

# Start process
if __name__ == '__main__':
    main()
