import React, { useContext } from 'react';
import '../index.css';
import"../App.css"

import { ChatContext } from './ChatContext';



function Welcome() {

  const {
    input,
    setInput,
    scrollDown,
    handleClear,
    handleSubmit,
    loading,
    chatMessages
} = useContext(ChatContext)

  return (
    <div className="responsive px-4 pb-4 flex justify-center h-[88vh]">
      <div className="scrollable rounded-lg h-[100%] shadow-md p-6 bg-gray-600 w-full overflow-y-scroll">
          <div className="flex flex-col items-start flex-grow mb-6 min-h-[90%]">
            {chatMessages.map((message, index) => (
            <div key={index} className={`my-2 ${message.type === 'bot' ? 'text-gray-700' : 'text-gray-900'}`}>
              <p className="font-bold text-black">{message.type === 'bot' ? 'Bot' : 'You'}</p>
              <p ref={scrollDown} className='text-black'>{message.text}</p>
            </div>  
          ))}
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"/>
          )}
          </div>
        <div className="mt-4 relative bottom-0 left-0 w-full">
        <span className="absolute inset-y-0 left-0 flex items-center">
            <button
              className="cursor-pointer inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-red-500 hover:bg-gray-300"
              onClick={handleClear}
              disabled={loading}
            >
              <img className="w-5" src={""} alt="clear icon" />
            </button>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center">
            <button
              className="cursor-pointer inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
              onClick={handleSubmit}
              disabled={loading}
            >
              <img className="w-5" src={""} alt="send icon" />
            </button>
          </span>
          <input
            className="rounded-full py-2 pl-12 pr-12 block w-full appearance-none text-black leading-normal white-glassmorphism outline-none"
            type="text"
            placeholder="Write something"
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
            }}
            onKeyUp={(e) => {
              if(loading === true) return;
              if(e.key === "Enter") {
                handleSubmit()
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;