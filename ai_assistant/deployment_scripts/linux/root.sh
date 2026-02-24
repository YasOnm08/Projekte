#!/bin/bash

apt install npm nodejs python3-full ffmpeg libgtk-3-0t64 libnotify4 libnss3 libxss1 libasound2t64 build-essential cmake -y
if ! ollama; then
    curl -fsSL https://ollama.com/install.sh | sh
fi
systemctl enable ollama --now