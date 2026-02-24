import { useEffect, useState } from "react";

// Define the structure of a Message
interface Message {
    role: string; // The role of the message sender (e.g., system, user, assistant)
    content: string; // The content of the message
}

// Define the structure for each chat session
interface ChatMessages {
    name: string; // The name or title of the chat
    messages: Message[]; // Array of messages in the chat
    timestamp: number; // Timestamp for the chat session
}

// Define the structure for the global chat history
interface GlobalChatHistory {
    chats: ChatMessages[]; // Array of chat sessions
    selectedIndex: number; // Index of the currently selected chat
}

// Initial global chat history state
let globalChatHistory: GlobalChatHistory = {
    chats: [
        {
            name: "Welcome!",
            messages: [
                { role: "system", content: "you are a helpful assistant" },
                { role: "assistant", content: "Hello! How can I help you?" }
            ],
            timestamp: 4
        },
    ],
    selectedIndex: 0
};

// Listeners for state changes
let listeners: ((state: GlobalChatHistory) => void)[] = [];

// Function to set a new global state and notify listeners
const setGlobalState = (newState: GlobalChatHistory): void => {
    globalChatHistory = newState; // Update the global state
    listeners.forEach((listener) => listener(globalChatHistory)); // Notify all listeners
}

// Custom hook to manage chat history
export const useChatHistory = (): [
    GlobalChatHistory, // Current state
    (newState: GlobalChatHistory) => void, // Function to set global state
] => {
    const [state, setState] = useState<GlobalChatHistory>(globalChatHistory); // Local state initialized with global state

    useEffect(() => {
        // Listener to update local state when global state changes
        const listener = (newState: GlobalChatHistory) => {
            setState(newState);
        };

        listeners.push(listener); // Add the listener to the array

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    }, []);

    
    
    // Return the current state and action functions
    return [state, setGlobalState];
}
// Function to set the selected chat index
export const setSelectedIndex = (index: number) => {
    setGlobalState({ ...globalChatHistory, selectedIndex: index }); // Update the global state
}

// Function to update a specific message in the current chat
export const updateMessage = (messageIndex: number, newContent: string) => {
    const updatedChats = [...globalChatHistory.chats]; // Make a copy of the current chats
    const chatIndex = globalChatHistory.selectedIndex; // Get the currently selected chat index

    // Check if the selected chat index is valid
    if (chatIndex >= 0 && chatIndex < updatedChats.length) {
        const updatedMessages = [...updatedChats[chatIndex].messages]; // Copy messages of the selected chat

        // Check if the message index is valid
        if (messageIndex >= 0 && messageIndex < updatedMessages.length) {
            // Update the content of the specified message
            updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], content: newContent };
            updatedChats[chatIndex] = { ...updatedChats[chatIndex], messages: updatedMessages }; // Update the chat with new messages
            setGlobalState({ ...globalChatHistory, chats: updatedChats }); // Set the updated global state
        }
    }
}
