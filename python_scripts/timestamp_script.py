import pandas as pd
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python script.py input_file.csv")
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
df['timestamp'] = df['timestamp'] - df['timestamp'].min()
df['timestamp'] = df['timestamp'].dt.total_seconds().astype(int)
df['timestamp'] = pd.to_timedelta(df['timestamp'], unit='s')
df['timestamp'] = df['timestamp'].dt.components.apply(lambda x: f"{x.hours:02}:{x.minutes:02}:{x.seconds:02}", axis=1)

# Save new dataframe to output file and print to console 
df.to_csv(output_file, index=False)
print(f"Output file saved as: {output_file}")