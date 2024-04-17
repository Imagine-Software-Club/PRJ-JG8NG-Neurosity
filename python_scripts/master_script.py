import subprocess

def main():
    # movie_path = input("Enter path to the movie file: ")
    # file_path = input("Enter path to the focus data file: ")
    # starting_time = input("Enter date and time: ")

    movie_path = "../js/basics/data/Doctor Who - S 3 E 10 - Blink.mp4"
    file_path = "../js/basics/data/drwhos3e10_ken_focus.csv"
    starting_time = "2024-04-17 19:46:43" # remember to change the date to today's date or else the script won't run

    print("Cleaning data...")
    cleaned_csv_path = subprocess.check_output(["python", "clean_timestamp.py", file_path, starting_time]).strip()

    print("Generating timestamps...")
    timestamps_list = subprocess.check_output(["python", "timestamp_generator_count.py", cleaned_csv_path]).decode().strip().split("\r\n")

    print("Extracting clips...")
    for timestamps in timestamps_list:
        starting_timestamp, ending_timestamp = timestamps.split()
        subprocess.run(["python", "video_segment_script.py", movie_path, starting_timestamp, ending_timestamp])

if __name__ == "__main__":
    main()