from __future__ import annotations
from typing import List, Tuple

import pandas as pd
import argparse

def calc_zscore(df: pd.DataFrame) -> pd.DataFrame:
    df['zscore'] = (df['probability'] - df['probability'].mean())/df['probability'].std()
    return df

def find_intervals(df: pd.DataFrame, zscore_threshold: float) -> List[Tuple[str, str]]:
    threshold_passed = df['zscore'] >= zscore_threshold
    intervals: List[Tuple[str, str]] = []

    start = None
    for i in range(len(threshold_passed)):
        if threshold_passed[i]:
            if start is None:
                start = i
                continue
            if i == len(threshold_passed) - 1:
                intervals.append((df.iat[start, df.columns.get_loc('time')], df.iat[i, df.columns.get_loc('time')]))
        else:
            if start is not None:
                intervals.append((df.iat[start, df.columns.get_loc('time')], df.iat[i-1, df.columns.get_loc('time')]))
                start = None

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
    parser.add_argument('--threshold', '-t', type=float, default="0.4", help="zscore_threshold")
    parser.add_argument('--mininterval', '-m', type=int, default="6", help="min_interval in seconds")

    args = parser.parse_args()

    df: pd.DataFrame = pd.read_csv(args.filename)
    df = calc_zscore(df)
    df['probability'] = df['probability'].rolling(args.window, center=True).mean()

    intervals: List[Tuple[str, str]] = find_intervals(df, args.threshold)

    for interval in intervals:
        if interval[1] - interval[0] >= args.mininterval:
            starting_timestamp = convert_seconds_to_timestamp(interval[0])
            ending_timestamp = convert_seconds_to_timestamp(interval[1])
            print(starting_timestamp, ending_timestamp)


if __name__ == "__main__":
    main()