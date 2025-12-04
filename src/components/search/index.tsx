import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat, ChatMessage } from '@/types/chat';
import { generateId, createNewChat as createNewChatUtil } from '@/utils/chatUtils';
import ChatSidebar from './ChatSidebar';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useAIChat } from '@/hooks/useAIChat';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  
  const { messages, isLoading, sendMessage } = useAIChat();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  // Initialize with a sample chat on first render
  useEffect(() => {
    if (chats.length === 0) {
      const newChat = createNewChatUtil();
      setChats([newChat]);
      setActiveChat(newChat);
    }
  }, []);

  // Sync AI messages to active chat
  useEffect(() => {
    if (messages.length > 0 && activeChat) {
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        id: msg.id,
        type: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
        timestamp: msg.timestamp
      }));

      const updatedChats = chats.map(chat => {
        if (chat.id === activeChat.id) {
          // Update title from first user message
          let title = chat.title;
          const firstUserMsg = chatMessages.find(m => m.type === 'user');
          if (firstUserMsg && chat.title === 'New Chat') {
            title = firstUserMsg.content.length > 25 
              ? `${firstUserMsg.content.substring(0, 22)}...` 
              : firstUserMsg.content;
          }
          return { ...chat, messages: chatMessages, title, updatedAt: new Date() };
        }
        return chat;
      });
      
      setChats(updatedChats);
      const updated = updatedChats.find(c => c.id === activeChat.id);
      if (updated) setActiveChat(updated);
    }
  }, [messages]);

  // Create a new chat
  const createNewChat = () => {
    const newChat = createNewChatUtil();
    setChats([newChat, ...chats]);
    setActiveChat(newChat);
  };

  // Delete a chat
  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (activeChat && activeChat.id === chatId) {
      setActiveChat(updatedChats.length > 0 ? updatedChats[0] : null);
    }
    
    if (updatedChats.length === 0) {
      createNewChat();
    }
  };

  // Edit chat title
  const startEditingTitle = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setIsEditingTitle(chatId);
      setEditTitle(chat.title);
    }
  };

  const saveTitle = (chatId: string) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, title: editTitle || 'Untitled Chat' };
      }
      return chat;
    });
    setChats(updatedChats);
    setIsEditingTitle(null);
  };

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && activeChat) {
      const query = searchQuery;
      setSearchQuery('');
      await sendMessage(query);
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-120px)] flex">
      {/* Sidebar with chat history */}
      <ChatSidebar 
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        showSidebar={showSidebar}
        isEditingTitle={isEditingTitle}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        startEditingTitle={startEditingTitle}
        saveTitle={saveTitle}
      />
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header with toggle */}
        <div className="border-b py-2 px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
          >
            <SearchIcon size={18} />
          </Button>
          <h2 className="font-medium">
            {activeChat?.title || 'Universal Search'}
          </h2>
          {isLoading && (
            <span className="ml-2 text-sm text-muted-foreground animate-pulse">
              Thinking...
            </span>
          )}
        </div>
        
        {/* Chat messages area */}
        <ChatMessages activeChat={activeChat} />
        
        {/* Input area */}
        <ChatInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSubmit={handleSubmit}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      </div>
    </div>
  );
};

export default Search;
