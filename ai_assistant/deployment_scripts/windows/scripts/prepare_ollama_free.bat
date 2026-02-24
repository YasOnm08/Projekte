cd ollama-bin
start /b ollama.exe serve
timeout 5
ollama.exe pull qwen2-math:1.5b
ollama.exe pull qwen2.5-coder:1.5b
ollama.exe pull phi3.5

ollama.exe pull mathstral
ollama.exe pull qwen2.5-coder
ollama.exe pull qwen2.5