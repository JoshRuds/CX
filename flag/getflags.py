import os, json
folder = "flags"
files = [f"{folder}/{f}" for f in os.listdir(folder) if f.endswith(".png")]
json.dump(files, open("images.json", "w"))
