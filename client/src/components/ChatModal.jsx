import axios from 'axios';
import React, { useRef } from 'react';


export const ChatModal = ({ isOpen, onClose, code }) => {

    if (!isOpen) return null;

    const ref = useRef();

    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const value = ref.current.value;

        setMessages(prev => [...prev, { msgState: "sent", content: value }]);

        ref.current.value = "";

        try {
            const res = await axios.get(`${import.meta.env.import.meta.env.VITE_BACKEND_URL}/api/rooms/AiMsg`, {
                params: {
                    code: code,
                    query: value
                }
            });
            setMessages(prev => [...prev, { msgState: "recieved", content: res.data.responseText }]);
        } catch (err) {
        }
        setLoading(false)
    }

    return (

        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in">


            <div className="
        bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl relative
        w-11/12 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto
        transform scale-95 animate-scale-in flex flex-col h-[80vh] max-h-[600px]
      ">




                <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        AI Assistant
                    </h2>
                    <button
                        onClick={() => { onClose(false) }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Close chat"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>


                <div
                    className="flex-1 overflow-y-auto p-2 flex flex-col space-y-3"
                    id="chatDisplay"
                >
                    {Array.isArray(messages) && messages.length > 0 ? (
                        messages.map((msg, indx) => {

                            return msg.msgState === "sent" ? (
                                <div key={indx} className="self-end bg-blue-600 text-white max-w-[80%] rounded-xl rounded-br-none px-4 py-2 text-base shadow-sm">
                                    {msg.content}
                                </div>
                            ) :
                                (
                                    <div key={indx} dangerouslySetInnerHTML={{ __html: msg.content }} className="self-start bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 max-w-[80%] rounded-xl rounded-bl-none px-4 py-2 text-base shadow-sm">
                                        
                                    </div>
                                );

                        })
                    ) : (
                        <div className=" bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 w-4/5 rounded-xl px-4 py-2  shadow-sm text-center self-center">
                            Ask questions about the AI reviewed code
                        </div>
                    )}

                    {loading && (
                        <div className="self-start bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 max-w-[80%] rounded-xl rounded-bl-none px-4 py-2 text-base shadow-sm">
                            Loading...
                        </div>
                    )}


                </div>


                <div className="pt-4 mt-4 border-t dark:border-gray-700">
                    <form className="flex gap-3" onSubmit={handleSubmit}>
                        <input
                            placeholder="Type your message..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="chatInput"
                            type="text"
                            required
                            ref={ref}
                            autoComplete='off'
                        />
                        <button
                            type='submit'
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-300 ease-in-out text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="sendButton"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};