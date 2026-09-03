from pytubefix import YouTube
import sys
try:
  yt = YouTube('https://youtu.be/fHT41aunTkw', use_po_token=True)
  stream = yt.streams.filter(only_audio=True).first()
  stream.download(output_path='fotos', filename='bg_music.mp3')
  print('SUCCESS')
except Exception as e:
  print(f'ERROR: {e}')

