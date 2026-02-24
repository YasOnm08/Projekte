cd ollama-bin
start /b ollama.exe serve
timeout 5
ollama.exe pull qwen2-math:1.5b
ollama.exe pull starcoder2
ollama.exe pull llama3.2

ollama.exe pull wizard-math
ollama.exe pull starcoder2:7b
ollama.exe pull llama3.1