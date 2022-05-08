import sys, json

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()

    return json.loads(lines[0])

def main():
    lines = read_in()


    from matplotlib import pyplot as plt
    import fastf1
    import fastf1.plotting

    fastf1. plotting.setup_mpl()

    session = fastf1.get_session(lines[1], lines[3], lines[2])

    session.load()
    fast = session.laps.pick_driver(lines[0]).pick_fastest()
    car_data = fast.get_car_data()
    t = car_data['Time']
    vCar = car_data['Speed']

    fig, ax = plt.subplots()
    ax.plot(t, vCar, label='Fast')
    ax.set_xlabel('Time')
    ax.set_ylabel('Speed [Km/h]')
    ax.set_title(lines[0])
    ax.legend()
    plt.show()

# Start process
if __name__ == '__main__':
    main()
