#!/bin/bash

chmod +x root.sh
pkexec ./root.sh
npm install
npm run build

cd py
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt

ollama pull qwen2-math:1.5b
ollama pull qwen2.5-coder:1.5b
ollama pull phi3.5

ollama pull mathstral
ollama pull qwen2.5-coder
ollama pull qwen2.5

ollama pull qwen2-math:1.5b
ollama pull starcoder2
ollama pull llama3.2

ollama pull wizard-math
ollama pull starcoder2:7b
ollama pull llama3.1

cd ..
chmod +x run.sh