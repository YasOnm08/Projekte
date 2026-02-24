"use client"
import React, { useEffect, useRef, useState } from "react";
import ConversationFrontend from '../components/ConversationFrontend';
import InputFrontend from "../components/InputFrontend";
import { sendToVoiceRecognition } from "./voice_backend"
import axios from "axios";
import { updateMessage, useChatHistory } from '../hooks/useChatHistory';
import { getWeather } from "./weather";
import { changeHistory, getHistory } from "./database";

const InputOutputBackend: React.FC = () => {
  //#region variables
  type Message = {
    role: string
    content: string
  }

  // Define state variables for user preferences and messages
  const [chatHistory, setChatHistory] = useChatHistory()
  const [preferredCurrency, setPreferredCurrency] = useState<string>("USD");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("english");
  const [timeFormat, setTimeFormat] = useState<string>("24-hour");
  const [preferredMeasurement, setPreferredMeasurement] = useState<string>("metric");
  const [timeZone, setTimeZone] = useState<string>("GMT");
  const [dateFormat, setDateFormat] = useState<string>("DD-MM-YYYY");
  const [messages, setMessages] = useState<Message[]>([]);
  const [myBoolean, setMyBoolean] = useState<boolean>(false);
  const [systemMessage, setSystemMessage] = useState<string>("You are a helpful assistant")
  const [weatherData, setWeatherData] = useState<string>("")
  const [weatherTriggered, setWeatherTriggered] = useState<boolean>(false)
  const [chatHistoryTriggered, setChatHistoryTriggered] = useState<boolean>(false)
  const apiURL = new URL("http://localhost:5000/interstellar_ai/api/ai_create")
  if (typeof window !== 'undefined') {
    apiURL.hostname = window.location.hostname;
  } else {
    apiURL.hostname = "localhost"
  }

  //#region useEffect
  useEffect(() => {
    setMessages(chatHistory.chats[chatHistory.selectedIndex].messages)
  }, [chatHistory.selectedIndex])


  useEffect(() => {
    // Get the current chat's messages
    const currentMessages = chatHistory.chats[chatHistory.selectedIndex].messages || [];

    // If the selected chat has messages, set them
    if (currentMessages.length > 0) {
      setMessages(currentMessages);
    } else if (currentMessages.length === 0) {
      // When creating a new chat and no messages exist yet, set default messages
      addMessage("system", systemMessage)
      addMessage("assistant", "Hello! How can I help you?")
    }
  }, [chatHistory, chatHistory.selectedIndex, systemMessage]);

  // Update messages when any of the settings change
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setPreferredCurrency(localStorage.getItem("preferredCurrency") || "USD");
      setPreferredLanguage(localStorage.getItem("preferredLanguage") || "english");
      setTimeFormat(localStorage.getItem("timeFormat") || "24-hour");
      setPreferredMeasurement(localStorage.getItem("preferredMeasurement") || "metric");
      setTimeZone(localStorage.getItem("timeZone") || "GMT");
      setDateFormat(localStorage.getItem("dateFormat") || "DD-MM-YYYY");
      setMyBoolean(localStorage.getItem('myBoolean') === 'true');
      getWeatherHere()
      getChatHistory()
    }
  }, [])

  useEffect(() => {
    const username = localStorage.getItem("accountName")
    const password = localStorage.getItem("accountPassword")
    if (username && password && chatHistoryTriggered) {
      changeHistory(username, password, chatHistory)
    }
  }, [chatHistory])

  //#region functions
  const getWeatherHere = async () => {
    setWeatherData(await getWeather({ "unit_type": preferredMeasurement, "city": localStorage.getItem("weatherInfo") || "New York" }))
    setWeatherTriggered(true)
  }

  const getChatHistory = async () => {
    const username = localStorage.getItem("accountName")
    const password = localStorage.getItem("accountPassword")
    if (username && password) {
      const tempChatHistory = await getHistory(username, password)
      if (tempChatHistory && typeof tempChatHistory == "object") {
        setChatHistory(tempChatHistory)
      }
    }
    setChatHistoryTriggered(true)
  }
  //#region system-prompt
  useEffect(() => {

    const measurementString = (preferredMeasurement == "Metric")
      ? "All measurements follow the metric system. Refuse to use any other measurement system."
      : "All measurements follow the imperial system. Refuse to use any other measurement system.";

    const newSystemMessage = myBoolean
      ? `You are operating in the timezone: ${timeZone}. Use the ${timeFormat} time format and ${dateFormat} for dates. 
      ${measurementString} 
      The currency is ${preferredCurrency}. 
      Communicate in the language specified by the user (country code: ${preferredLanguage}), and only in this language.
      You are only able to change language if the user specifically states you must. 
      Do not answer in multiple languages or multiple measurement systems under any circumstances other than the user requesting it.
      These are the currently newest Weather infos for the region. Only for the case when the user asks about anything weather related, 
      you can use the following data to help the user: ${weatherData}. If there is nothing there say there is no data`
      : `You are a helpful assistant.`;
    setSystemMessage(newSystemMessage)
  }, [preferredCurrency, preferredLanguage, timeFormat, preferredMeasurement, timeZone, dateFormat, myBoolean, weatherTriggered]);

  useEffect(() => {
    const messageIndex = 0 // system prompt is the first so index 0
    updateMessage(messageIndex, systemMessage)
  }, [systemMessage])

  //#region more variables and functions
  const conversationRef = useRef<HTMLDivElement>(null)
  const [copyClicked, setCopyClicked] = useState(false)
  const [accessToken, setAccessToken] = useState("")
  const postWorkerRef = useRef<Worker | null>(null)
  const getWorkerRef = useRef<Worker | null>(null)
  const [inputMessage, setInputMessage] = useState<string>("")
  const [inputDisabled, setInputDisabled] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  //#region chat functions
  useEffect(() => {
    getNewToken()

    postWorkerRef.current = new Worker(new URL("./threads/PostWorker.ts", import.meta.url))

    postWorkerRef.current.onmessage = (event) => {
      const status = event.data.status
      if (status == 200) {
        setInputDisabled(false)
        endGetWorker()
      } else if (status == 500) {
        setInputDisabled(false)
        if (getWorkerRef.current) {
          addMessage("assistant", "There was an Error with the AI response")
          getWorkerRef.current.postMessage("terminate")
          getWorkerRef.current.terminate()
        }
      }
    }

    return () => {
      if (postWorkerRef.current) {
        postWorkerRef.current.terminate()
      }
      if (getWorkerRef.current) {
        getWorkerRef.current.postMessage("terminate")
        getWorkerRef.current.terminate()
      }
    }
  }, [])

  const getNewToken = () => {
    axios.get(apiURL.href)
      .then(response => {
        setAccessToken(response.data.access_token)
      })
      .catch(error => {
        console.log("error:", error.message);

      })
  }

  const startGetWorker = () => {
    if (!getWorkerRef.current) {
      getWorkerRef.current = new Worker(new URL("./threads/GetWorker.ts", import.meta.url))

      let windowname = "localhost"
      if (typeof window !== 'undefined') {
        windowname = window.location.hostname
      } else {
        windowname = "localhost"
      }

      getWorkerRef.current.postMessage({ action: "start", access_token: accessToken, windowname })

      addMessage("assistant", "")
      getWorkerRef.current.onmessage = (event) => {
        const data = event.data

        if (event.data == "error") {
          console.log("Error getting ai message.")
        } else {
          editLastMessage(data.response)
        }
      }

      getWorkerRef.current.onerror = (error) => {
        console.error("Worker error:", error)
      }
    }
  }

  const endGetWorker = () => {
    if (getWorkerRef.current) {
      getWorkerRef.current.postMessage({ action: "terminate" })
      getWorkerRef.current.terminate()
      getWorkerRef.current = null
    }
  }

  const editLastMessage = (newContent: string) => {
    if (newContent == "") {
      newContent = "Generating answer..."
    }
    const messageIndex = chatHistory.chats[chatHistory.selectedIndex].messages.length - 1
    updateMessage(messageIndex, newContent)
  };

  const addMessage = (role: string, content: string) => {
    const newMessage: Message = { role: role, content: content }
    setMessages((prevMessages) => [...prevMessages, newMessage])
    const updatedChats = [...chatHistory.chats]
    updatedChats[chatHistory.selectedIndex].messages.push(newMessage)
    setChatHistory({ ...chatHistory, chats: updatedChats })
  }
  const handleSendClick = (inputValue: string, override: boolean) => {
    if (inputValue != "") {
      if (!inputDisabled || override) {
        setInputDisabled(true)
        if (postWorkerRef.current) {
          addMessage("user", inputValue)
          let type: string = "local"
          let api_key: string = ""
          if (typeof localStorage !== 'undefined') {
            type = localStorage.getItem('type') || "local"
            if (type != null && type != 'local') {
              const try_key = localStorage.getItem(type)
              if (try_key) {
                api_key = try_key
              }
            }
          }
          setInputMessage("")
          const windowname = window.location.hostname
          postWorkerRef.current.postMessage({ messages: [...messages, { role: "user", content: inputValue }], ai_model: localStorage.getItem("model") || "llama3.2", model_type: type, access_token: accessToken, api_key: api_key, windowname })
          startGetWorker()
        }
      }
    }
  }
  //#region speech recognition 
  const startRecording = async (): Promise<string> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    audioChunks.current = []; // Initialize audio chunks

    // Create a promise that resolves when the onstop event is done
    const stopRecordingPromise = new Promise<string>((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/ogg" });
        audioChunks.current = [];

        const text_voice = await sendToVoiceRecognition(audioBlob);
        resolve(text_voice); // Resolve the promise with the recognized text
      };
    });

    mediaRecorder.start();
    setIsRecording(true);

    // Wait for the recording to stop and get the recognized text
    return stopRecordingPromise;
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleMicClick = async () => {
    if (!isRecording) {
      const recognizedText = await startRecording();
      setInputMessage(recognizedText); // Set the recognized text after recording
    } else {
      stopRecording();
    }
  };
  //#region chat buttons
  const handleStopClick = () => {
    endGetWorker()
    getNewToken()
    setInputDisabled(false)
  }

  const handleResendClick = () => {
    const msg = chatHistory.chats[chatHistory.selectedIndex].messages
    const lastUserMessage = msg[msg.length-2].content
    msg.splice(msg.length-2,2)
    endGetWorker()
    getNewToken()
    setInputDisabled(false)
    handleSendClick(lastUserMessage, true)
  }

  const handleEditClick = () => {
    const msg = chatHistory.chats[chatHistory.selectedIndex].messages
    const lastUserMessage = msg[msg.length-2].content
    setInputMessage(lastUserMessage)
    msg.splice(msg.length-2,2)
    endGetWorker()
    getNewToken()
    setInputDisabled(false)
  }

  const handleCopyClick = async () => {
    setCopyClicked(false)
    try {
      await navigator.clipboard.writeText(messages[messages.length - 1]['content']);
      fadeCopyText()
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const wait = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const fadeCopyText = async () => {
    setCopyClicked(true)
    await wait(1000)
    setCopyClicked(false)
  }

  //#region The "html" return
  return (
    <>
      <ConversationFrontend
        ref={conversationRef}
        messages={messages}
        onStopClick={handleStopClick}
        onResendClick={handleResendClick}
        onEditClick={handleEditClick}
        onCopyClick={handleCopyClick}
        isClicked={copyClicked}
      />
      <InputFrontend
        message={inputMessage}
        onSendClick={handleSendClick}
        onMicClick={handleMicClick}
        inputDisabled={inputDisabled}
        isRecording={isRecording}
      />
    </>
  )
}

export default InputOutputBackend