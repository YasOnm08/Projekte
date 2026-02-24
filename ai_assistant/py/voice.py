import io
from faster_whisper import WhisperModel
from pydub import AudioSegment


class VoiceRecognition:
    @staticmethod
    def recognition(audio):
        # Read the audio file into a BytesIO buffer
        audio_buffer = io.BytesIO(audio.read())

        # Load the audio file using pydub
        audio_segment = AudioSegment.from_file(audio_buffer, format="ogg")

        # Export the audio to a WAV format in a BytesIO buffer
        wav_io = io.BytesIO()
        audio_segment.export(wav_io, format="wav")
        wav_io.seek(0)  # Reset the buffer pointer to the start

        # Load the Whisper model
        model_size = "base"  # Specify the model size
        model = WhisperModel(model_size, device="cpu", compute_type="int8")

        # Transcribe the audio
        segments, _ = model.transcribe(wav_io)
        transcription = ""

        # Combine the transcribed segments into a single string
        for segment in segments:
            transcription += segment.text + " "
        
        result = transcription.strip()  # Strip any leading/trailing whitespace
        return result
