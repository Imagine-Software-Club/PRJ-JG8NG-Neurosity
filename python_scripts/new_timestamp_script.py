import pandas as pd
import sys
import os

def user_time_df(input_df, user_input_date):
    user_date = pd.to_datetime(user_input_date, utc=True)
    print(user_date)
    newtime = pd.to_datetime(input_df['timestamp'], unit='ms', utc=True) - user_date
    return newtime

if len(sys.argv) < 3:
    print("Usage: python script.py input_file.csv '2024-03-11 12:00:00'")
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
df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
df.insert(4, 'new_timestamp', user_time_df(df, sys.argv[2]))

# Save new dataframe to output file and print to console 
df.to_csv(output_file, index=False)
print(f"Output file saved as: {output_file}")