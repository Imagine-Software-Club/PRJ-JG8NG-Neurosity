import sys
import os
from moviepy.editor import VideoFileClip
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip

def parse_time(time_str):
    #Accepts hh:mm:ss format
    if ':' in time_str:
        parts = time_str.split(':')
        seconds = int(parts[-1]) + int(parts[-2]) * 60
        if len(parts) == 3:
            seconds += int(parts[0]) * 3600
        return seconds
    else:
        return int(time_str)

def generate_output_filename(source_video):
    base_name = os.path.splitext(source_video)[0]  
    extension = os.path.splitext(source_video)[1]  
    output_file = f"{base_name}_edited{extension}"
    
    # Check if the file already exists
    counter = 1
    while os.path.exists(output_file):
        output_file = f"{base_name}_edited({counter}){extension}"
        counter += 1
    
    return output_file

def clip_video(source_video, start_time, end_time):
    try:
        # Get start and end times
        start_time_seconds = parse_time(start_time)
        end_time_seconds = parse_time(end_time)

        clip = VideoFileClip(source_video)
        
        # Check if start and end times are within the video duration
        if start_time_seconds < 0 or end_time_seconds > clip.duration:
            print("Error: start or end time is out of range.")
            return
        
        # Generate output file name
        output_file = generate_output_filename(source_video)
        
        # Use ffmpeg_extract_subclip to get video segment
        ffmpeg_extract_subclip(source_video, start_time_seconds, end_time_seconds, targetname=output_file)
        print(f"Clip saved as {output_file}")
        
    # Print error if no video was found
    except FileNotFoundError:
        print("Error: The video file was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python3 myscript.py <video_file> <start_time> <end_time>")
        sys.exit(1)
    
    video_file, start_time, end_time = sys.argv[1], sys.argv[2], sys.argv[3]
    
    clip_video(video_file, start_time, end_time)
