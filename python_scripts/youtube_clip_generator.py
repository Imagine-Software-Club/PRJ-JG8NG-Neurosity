from pytube import YouTube
from moviepy.editor import VideoFileClip


def download_video(youtube_url, output_filename):
    # Create a YouTube object using the provided URL, with OAuth authentication enabled
    yt = YouTube(youtube_url, use_oauth=True, allow_oauth_cache=True)

    # Filter and retrieve all progressive streams (streams that contain both video and audio)
    yt_stream = yt.streams.filter(progressive=True, file_extension='mp4').all()

    # Download the highest quality stream and save it with the specified filename
    yt_stream[-1].download(filename=output_filename)


def extract_clip_from_video(start_time, end_time, filename):
    clip = VideoFileClip(filename)

    # Extract a subclip from the specified start time to end time
    extract = clip.subclip(start_time, end_time)
    
    extract.write_videofile("result.mp4")

    clip.close()


if __name__ == "__main__":
    youtube_url = "https://www.youtube.com/watch?v=UK5cu3LJ9qk"
    start_time = "00:01:00"
    end_time = "00:01:15"
    output_filename = "cr7.mp4"

    download_video(youtube_url, output_filename)
    extract_clip_from_video(start_time, end_time, output_filename)
