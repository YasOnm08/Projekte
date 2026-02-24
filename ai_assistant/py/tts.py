import pyttsx3

class TTS:
    @staticmethod
    def gen_tts(text):
        engine = pyttsx3.init()
        engine.setProperty('rate', 70)
        engine.say(text)
        engine.runAndWait()
