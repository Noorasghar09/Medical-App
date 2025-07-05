import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const VoiceContext = createContext();

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export const VoiceProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('triage'); // triage, support, billing
  const [conversationHistory, setConversationHistory] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const websocketRef = useRef(null);

  // Initialize voice connection
  const initializeVoice = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Mock voice initialization - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful connection
      setIsConnected(true);
      setConnectionStatus('connected');
      console.log('Voice connection established (mock)');
      
      // Add a mock system message
      setConversationHistory(prev => [...prev, { 
        type: 'system', 
        text: `Connected to ${currentAgent} agent`, 
        timestamp: new Date() 
      }]);
      
    } catch (error) {
      setConnectionStatus('error');
      console.error('Failed to initialize voice:', error);
    }
  };

  const handleVoiceMessage = (data) => {
    switch (data.type) {
      case 'transcript':
        setTranscript(data.text);
        setConversationHistory(prev => [...prev, { 
          type: 'user', 
          text: data.text, 
          timestamp: new Date() 
        }]);
        break;
        
      case 'agent_response':
        setAgentResponse(data.text);
        setConversationHistory(prev => [...prev, { 
          type: 'agent', 
          text: data.text, 
          timestamp: new Date() 
        }]);
        break;
        
      case 'agent_transfer':
        setCurrentAgent(data.newAgent);
        setConversationHistory(prev => [...prev, { 
          type: 'system', 
          text: `Transferred to ${data.newAgent} agent`, 
          timestamp: new Date() 
        }]);
        break;
        
      case 'error':
        console.error('Voice agent error:', data.message);
        break;
    }
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        sendAudioToAgent(audioBlob);
      };
      
      mediaRecorderRef.current.start();
      setIsListening(true);
      
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsListening(false);
    }
  };

  const sendAudioToAgent = async (audioBlob) => {
    // Mock audio processing - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock transcript
    const mockTranscript = "Hello, I need help with my appointment.";
    setTranscript(mockTranscript);
    setConversationHistory(prev => [...prev, { 
      type: 'user', 
      text: mockTranscript, 
      timestamp: new Date() 
    }]);
    
    // Mock agent response
    setTimeout(() => {
      const mockResponse = `Hello! I'm your ${currentAgent} assistant. How can I help you today?`;
      setAgentResponse(mockResponse);
      setConversationHistory(prev => [...prev, { 
        type: 'agent', 
        text: mockResponse, 
        timestamp: new Date() 
      }]);
    }, 1000);
  };

  const sendTextMessage = async (message) => {
    try {
      // Add user message to conversation
      setConversationHistory(prev => [...prev, { 
        type: 'user', 
        text: message, 
        timestamp: new Date() 
      }]);
      
      // Mock agent response - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse = `Thank you for your message: "${message}". I'm your ${currentAgent} assistant and I'm here to help you.`;
      setAgentResponse(mockResponse);
      setConversationHistory(prev => [...prev, { 
        type: 'agent', 
        text: mockResponse, 
        timestamp: new Date() 
      }]);
      
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const transferToAgent = async (targetAgent) => {
    try {
      // Mock agent transfer - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentAgent(targetAgent);
      setConversationHistory(prev => [...prev, { 
        type: 'system', 
        text: `Transferred to ${targetAgent} agent`, 
        timestamp: new Date() 
      }]);
      
    } catch (error) {
      console.error('Failed to transfer agent:', error);
    }
  };

  const disconnectVoice = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    setConnectionStatus('disconnected');
  };

  useEffect(() => {
    return () => {
      disconnectVoice();
    };
  }, []);

  const value = {
    // State
    isConnected,
    isListening,
    isSpeaking,
    currentAgent,
    conversationHistory,
    transcript,
    agentResponse,
    connectionStatus,
    
    // Actions
    initializeVoice,
    startListening,
    stopListening,
    sendTextMessage,
    transferToAgent,
    disconnectVoice,
    setCurrentAgent
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}; 