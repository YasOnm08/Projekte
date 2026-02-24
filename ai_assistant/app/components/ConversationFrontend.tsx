import React, { ForwardedRef, useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useChatHistory } from '../hooks/useChatHistory';

type Message = {
  role: string;
  content: string;
};

interface ConversationProps {
  messages: Message[];
  onStopClick: () => void;
  onResendClick: () => void;
  onEditClick: () => void;
  onCopyClick: () => void;
  isClicked: boolean;
}

const ConversationFrontend = React.forwardRef<HTMLDivElement, ConversationProps>(
  ({ messages, onStopClick, onResendClick, onEditClick, onCopyClick, isClicked }, ref: ForwardedRef<HTMLDivElement>) => {
    const [isScrolling, setIsScrolling] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [chatHistory] = useChatHistory()

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsScrolling(true);
          } else {
            setIsScrolling(false);
          }
        },
        {
          root: document.querySelector('.output'),
          threshold: 1.0,
        }
      );

      const endOfMessages = messagesEndRef.current;
      if (endOfMessages) {
        observer.observe(endOfMessages);
      }

      return () => {
        if (endOfMessages) {
          observer.unobserve(endOfMessages);
        }
      };
    }, [messages]);

    useEffect(() => {
      if (isScrolling) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages, isScrolling]);

    return (
      <div className="output" ref={ref}>
        <div className="conversation resize" id="conversation">
          {chatHistory.chats[chatHistory.selectedIndex].messages.map((message, index) => {
            if (index >= 1) {
              return (
                <div
                  key={index}
                  className={message.role === "user" ? 'user-message' : 'ai-message'}
                >
                  <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {message.content}
                  </Markdown>
                </div>
              );
            }
            return null; // Ensure to return null for the first message or if condition is not met
          })}
          <div ref={messagesEndRef} />
          <div className="button-container">
            <div className="tooltip">
              <button type="button" onClick={onStopClick}>
                <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512"><path d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64l0 165.5-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75l8.5 0 8 0c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5l0-176c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2l0-2c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1l0-.1 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 31.9 0 .1 0 136c0 13.3 10.7 24 24 24s24-10.7 24-24l0-136c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16l0 55.9c0 0 0 .1 0 .1l0 80c0 13.3 10.7 24 24 24s24-10.7 24-24l0-71.9c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16l0 172.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2l-4.9 0-8.5 0c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2L160 96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9L192 232c0 13.3 10.7 24 24 24s24-10.7 24-24l0-135.9z" /></svg>              </button>
              <span className="tooltiptext">Stop</span>
            </div>
            <div className="tooltip">
              <button type="button" onClick={onResendClick}>
                <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" /></svg>
              </button>
              <span className="tooltiptext">Resend</span>
            </div>
            <div className="tooltip">
              <button type="button" onClick={onEditClick}>
                <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>
              </button>
              <span className="tooltiptext">Edit</span>
            </div>
            <div className="tooltip">
              <button type="button" onClick={onCopyClick}>
                <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 512 512" preserveAspectRatio="none"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg>
              </button>
              <span className="tooltiptext">{isClicked ? "Copied!" : "Copy"}</span>
            </div>
          </div>
          <div className={"endOfMessages"} ref={messagesEndRef} style={{ height: "3px" }} />
        </div>
        <button id="scrollToBottom" disabled={isScrolling ? true : false} style={{ visibility: isScrolling ? "hidden" : "visible" }} onClick={() => setIsScrolling(true)}>
          <svg style={{ fill: "var(--text-color)" }} viewBox="0 0 384 512" height={30}><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
        </button>
      </div>
      
    );
  }
);

ConversationFrontend.displayName = "ConversationFrontend";

export default ConversationFrontend;
