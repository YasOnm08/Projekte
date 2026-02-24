import React, { useState } from 'react';
import { setSelectedIndex, useChatHistory } from '../hooks/useChatHistory'; // Importing the custom hook for chat history

const History: React.FC = () => {
  // Destructuring values from the useChatHistory hook
  const [chatHistory, setChatHistory] = useChatHistory();
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [inputValue, setInputValue] = useState<string>(''); // State for input field
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // State to track hovered chat index

  // Function to activate editing mode
  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  // Function to update input value as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Function to save the new chat
  const handleSaveButtonClick = () => {
    setIsEditing(false); // Exit edit mode
    // Add a new chat entry to the history
    chatHistory.chats.push({ name: inputValue, messages: [], timestamp: 5 });
    setInputValue(''); // Reset input value
  };

  // Function to select a chat from the history
  const handleHistoryClick = (index: number) => {
    setSelectedIndex(index); // Set the selected index to the clicked chat
  };

  // Function to handle hover over a chat entry
  const handleHistoryHover = (index: number) => {
    setHoveredIndex(index); // Set hovered index
  };

  // Function to reset hovered index when not hovering
  const handleHistoryNotHover = () => {
    setHoveredIndex(null); // Reset hovered index
  };

  // Function to delete a chat entry
  const handleHistoryDeletion = (index: number) => {
    const currentIndex = chatHistory.selectedIndex; // Get the currently selected index

    // Create a new copy of the chat history
    const copyChats = { ...chatHistory };
    copyChats.chats = [...chatHistory.chats];

    // Remove the chat at the specified index
    copyChats.chats.splice(index, 1);

    // Determine the new selectedIndex
    let newSelectedIndex = currentIndex;

    // Adjust selectedIndex based on the deletion
    if (index === currentIndex) {
      // If the deleted index is currently selected, reset the selected index
      newSelectedIndex = copyChats.chats.length > 0 ? (index > 0 ? index - 1 : 0) : -1; // Set to previous or first chat or -1 if no chats left
    } else if (index < currentIndex) {
      // If the deleted chat is before the current selected index, decrement the selected index
      newSelectedIndex = currentIndex - 1;
    }

    copyChats.selectedIndex = newSelectedIndex; // Update the selected index

    // Set the updated chat history
    setChatHistory(copyChats);
  };

  return (
    <div className="history-background">
      <div className="history">
        <ul>
          {/* Render chat history items */}
          {chatHistory.chats.map((chat, index) => (
            <li key={index} onMouseOver={() => handleHistoryHover(index)} onMouseOut={handleHistoryNotHover}>
              <a
                href="#"
                onClick={() => handleHistoryClick(index)} // Handle click to select chat
                style={{
                  backgroundColor: chatHistory.selectedIndex === index ? "var(--input-button-color)" : "",
                  borderRadius: "5px",
                  width: index === hoveredIndex && chatHistory.chats.length > 1 ? "85%" : "100%"
                }}
              >
                {chat.name} {/* Display chat name */}
              </a>
              <button
                id="delete-chat-button"
                onClick={() => handleHistoryDeletion(index)} // Handle chat deletion
                disabled={!(index === hoveredIndex && chatHistory.chats.length > 1)} // Disable if not hovered
                style={{
                  width: index === hoveredIndex && chatHistory.chats.length > 1 ? "15%" : "0",
                  visibility: index === hoveredIndex && chatHistory.chats.length > 1 ? "visible" : "hidden",
                  marginLeft: index === hoveredIndex && chatHistory.chats.length > 1 ? "0.5em" : 0
                }}
              >
                <svg viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </button>
            </li>
          ))}
          <li>
            {isEditing ? (
              <div className="input-container">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange} // Update input value as user types
                  placeholder="Enter text"
                  className="chat-input"
                />
                <button onClick={handleSaveButtonClick} className="save-btn">
                  Save {/* Button to save new chat */}
                </button>
              </div>
            ) : (
              <button onClick={handleEditButtonClick} className="newChat-btn">
                New Chat {/* Button to initiate a new chat */}
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );  
}

export default History; // Exporting the History component
