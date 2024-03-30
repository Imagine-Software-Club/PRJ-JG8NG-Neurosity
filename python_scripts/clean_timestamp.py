import pandas as pd
import sys
import os
from datetime import datetime

def user_time_df(input_df, user_datetime):
    # Convert input_df['timestamp'] to pd datetime
    input_df['timestamp'] = pd.to_datetime(input_df['timestamp'])

    # Convert user_datetime to pd datetime
    user_datetime = pd.to_datetime(user_datetime)

    # Return only the seconds float value of the difference (from dt datetime time delta object)
    time_diff_seconds = (input_df['timestamp'] - user_datetime).dt.total_seconds()

    return time_diff_seconds

if len(sys.argv) < 3:
    print("Usage: python script.py input_file.csv '2024-03-12 12:00:00 (UTC)'")
    sys.exit(1)

# Get name of input csv
input_file = sys.argv[1]

#Make output csv file
base_output_file = input_file.replace('.csv', '_new_timestamp.csv')

# Check if the output file already exists 
counter = 1
output_file = base_output_file
while os.path.exists(output_file):
    output_file = base_output_file.replace('.csv', f'_{counter}.csv')
    counter += 1

# Read in the data 
df = pd.read_csv(input_file)

# Data processing of timestamp column
df['timestamp'] = pd.to_datetime(df['timestamp'], format='mixed')
df.insert(4, 'time', user_time_df(df, pd.to_datetime(sys.argv[2])))

# Save new dataframe to output file and print to console 
df.to_csv(output_file, index=False)
print(f"Output file saved as: {output_file}")