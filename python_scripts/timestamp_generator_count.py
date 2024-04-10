from __future__ import annotations
from typing import List, Tuple

import pandas as pd
import argparse

def calc_zscore(df: pd.DataFrame) -> pd.DataFrame:
    df['zscore'] = (df['probability'] - df['probability'].mean())/df['probability'].std()
    return df

def number_in_intervals(number, intervals):
    for start, end in intervals:
        if start <= number <= end:
            return True
    return False

def find_intervals(df: pd.DataFrame, numintervals: int, intervalsize: float) -> List[Tuple[str, str]]:

    intervals: List[Tuple[str, str]] = []
    df = df.sort_values(by=['probability'], ascending=False)

    i = 0
    while len(intervals) < numintervals:
        time = df.iat[i, df.columns.get_loc('time')]
        if not number_in_intervals(time, intervals):
            intervals.append((time - intervalsize/2, time + intervalsize/2))
        i+=1

    return intervals

def convert_seconds_to_timestamp(seconds: float):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = int(seconds % 60)

    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

def main() -> None:

    parser = argparse.ArgumentParser(description="Accept command line argument.")
    parser.add_argument('filename')  
    parser.add_argument('--window', '-w', type=int, default="200", help="Window Size")
    parser.add_argument('--numintervals', '-n', type=int, default="5", help="numintervals")
    parser.add_argument('--intervalsize', '-s', type=int, default="30", help="intervalsize in seconds")

    args = parser.parse_args()

    df: pd.DataFrame = pd.read_csv(args.filename)
    df = calc_zscore(df)
    df['probability'] = df['probability'].rolling(args.window, center=True).mean()

    intervals: List[Tuple[str, str]] = find_intervals(df, args.numintervals, args.intervalsize)

    for interval in intervals:
        starting_timestamp = convert_seconds_to_timestamp(interval[0])
        ending_timestamp = convert_seconds_to_timestamp(interval[1])
        print(starting_timestamp, ending_timestamp)

if __name__ == "__main__":
    main()