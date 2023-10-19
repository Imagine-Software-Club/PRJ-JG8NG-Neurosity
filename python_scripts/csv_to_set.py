import tkinter as tk
from tkinter import filedialog, simpledialog, messagebox
import mne
import pandas as pd

standard_1020_coords = {
    "Fp1": (92, 72), "Fp2": (92, 108), "F7": (92, 36), "F3": (92, 54),
    "Fz": (90, 90), "F4": (92, 126), "F8": (92, 144), "T7": (92, 18),
    "C3": (90, 45), "Cz": (90, 90), "C4": (90, 135), "T8": (92, 162),
    "P7": (92, 0), "P3": (92, 36), "Pz": (90, 90), "P4": (92, 144),
    "P8": (92, 180), "O1": (80, 45), "Oz": (90, 90), "O2": (80, 135),
    "AFz": (90, 90), "CPz": (90, 90), "POz": (90, 90), "F5": (92, 45),
    "F6": (92, 135), "FT7": (92, 27), "FC3": (92, 63), "FCz": (90, 90),
    "FC4": (92, 117), "FT8": (92, 153), "C5": (90, 18), "C6": (90, 162),
    "TP7": (92, 9), "CP3": (90, 36), "CPz": (90, 90), "CP4": (90, 144),
    "TP8": (92, 171), "P5": (92, 18), "P6": (92, 162), "PO5": (80, 27),
    "PO3": (80, 54), "PO4": (80, 126), "PO6": (80, 153)
}

#Checks if you added file extension to the output file name
def output_filename_parser(filename, input_file):
    if filename:
        print('yes')
        if filename.split('.')[-1] != 'set':
            filename = filename + '.set'
            return filename
        return filename
    else:
        
        filename = input_file.split('.')[0] + '.set'
        print(input_file.split('.')[0])
        return filename

def select_input_file():
    filename = filedialog.askopenfilename(title="Select Input CSV File", filetypes=[("CSV files", "*.csv")])
    input_file_var.set(filename)

def select_output_directory():
    directory = filedialog.askdirectory(title="Select Output Directory")
    output_dir_var.set(directory)

def run_conversion():
    input_file = input_file_var.get()
    output_file_name = output_name_var.get()
    output_directory = output_dir_var.get()

    if not input_file:
        messagebox.showerror("Error", "Please select an input file.")
        return

    if not output_file_name:
        output_file_name = output_filename_parser(None, input_file)

    if not output_directory:
        messagebox.showerror("Error", "Please select an output directory.")
        return

    output_file_path = f"{output_directory}/{output_file_name}.set"
    df = pd.read_csv(input_file)
    info = mne.create_info(ch_names=list(df.columns.tolist()), sfreq=256, ch_types='eeg')
    raw = mne.io.RawArray(df.T.values * 1e-6, info)  # Data in MNE is typically in V, hence multiply by 1e-6 to convert from uV
    channel_names = list(df.columns.tolist())
    
    #Setting coordinates for channel, thats why we have 1020_coords dict
    # It tells EEGLAB in MATLAB where our channels are for the spectra maps
    channel_coords = [standard_1020_coords[ch] for ch in channel_names]
    montage = mne.channels.make_standard_montage('standard_1020')
    raw.set_montage(montage, match_case=True)

    messagebox.showinfo("Success", f"File saved to {output_file_path}")
    raw.export(output_file_path, fmt='eeglab')
''''
def main(args):
    
    global standard_1020_coords
    try:
        df = pd.read_csv(args.input_file)
    except:
        print('Could not find the file path you provided')
    
    #Loading our dataframe into raw array format
    info = mne.create_info(ch_names=list(df.columns.tolist()), sfreq=256, ch_types='eeg')
    raw = mne.io.RawArray(df.T.values * 1e-6, info)  # Data in MNE is typically in V, hence multiply by 1e-6 to convert from uV
    channel_names = list(df.columns.tolist())
    
    #Setting coordinates for channel, thats why we have 1020_coords dict
    # It tells EEGLAB in MATLAB where our channels are for the spectra maps
    channel_coords = [standard_1020_coords[ch] for ch in channel_names]
    montage = mne.channels.make_standard_montage('standard_1020')
    raw.set_montage(montage, match_case=True)

    #Exporting our data
    
    output_file = output_filename_parser(args.output_file, args.input_file)
    
        
    raw.export(output_file, fmt='eeglab')


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="")

    parser.add_argument("--input_file", type=str, required=True
                    ,help="Path to the file. Make sure its relative to this script")
    
    parser.add_argument("--output_file", type=str, required=False,
                        help="Path to the output file. If empty output file name will be same as input but .set")
    
    args = parser.parse_args()
    main(args)
    '''
root = tk.Tk()
root.title("EEG File Converter")

# Variables for storing user input
input_file_var = tk.StringVar()
output_name_var = tk.StringVar()
output_dir_var = tk.StringVar()

# Create and place widgets
tk.Label(root, text="Input CSV File:").pack(pady=10)
tk.Entry(root, textvariable=input_file_var, width=50).pack(pady=5)
tk.Button(root, text="Browse", command=select_input_file).pack(pady=5)

tk.Label(root, text="Output File Name (without extension):").pack(pady=10)
tk.Entry(root, textvariable=output_name_var, width=50).pack(pady=5)

tk.Label(root, text="Output Directory:").pack(pady=10)
tk.Entry(root, textvariable=output_dir_var, width=50).pack(pady=5)
tk.Button(root, text="Browse", command=select_output_directory).pack(pady=5)

tk.Button(root, text="Run Conversion", command=run_conversion).pack(pady=20)

# Start the application
root.mainloop()