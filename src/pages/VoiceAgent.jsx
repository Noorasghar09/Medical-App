import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  Fab
} from '@mui/material';
import {
  Mic,
  MicOff,
  Send,
  VolumeUp,
  VolumeOff,
  Refresh,
  Stop,
  PlayArrow,
  Person,
  SmartToy,
  Info,
  Event,
  Receipt
} from '@mui/icons-material';
import { useVoice } from '../contexts/VoiceContext';

const VoiceAgent = () => {
  const {
    isConnected,
    isListening,
    isSpeaking,
    currentAgent,
    conversationHistory,
    transcript,
    agentResponse,
    connectionStatus,
    initializeVoice,
    startListening,
    stopListening,
    sendTextMessage,
    transferToAgent,
    disconnectVoice
  } = useVoice();

  const [textMessage, setTextMessage] = useState('');
  const [showTranscript, setShowTranscript] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleConnect = async () => {
    await initializeVoice();
  };

  const handleDisconnect = () => {
    disconnectVoice();
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSendMessage = async () => {
    if (textMessage.trim()) {
      await sendTextMessage(textMessage);
      setTextMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentInfo = (agentType) => {
    switch (agentType) {
      case 'triage':
        return {
          name: 'Triage Agent',
          description: 'Initial patient intake and routing',
          color: 'primary',
          icon: <Person />
        };
      case 'support':
        return {
          name: 'Support Agent',
          description: 'Medical services and appointments',
          color: 'success',
          icon: <SmartToy />
        };
      case 'billing':
        return {
          name: 'Billing Agent',
          description: 'Insurance and payment inquiries',
          color: 'warning',
          icon: <Info />
        };
      default:
        return {
          name: 'Unknown Agent',
          description: 'Agent not found',
          color: 'default',
          icon: <Person />
        };
    }
  };

  const agentInfo = getAgentInfo(currentAgent);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Voice Agent Interface
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interact with our AI-powered medical voice assistant
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Voice Interface */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
              {/* Connection Status */}
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: `${agentInfo.color}.main` }}>
                      {agentInfo.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {agentInfo.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {agentInfo.description}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={connectionStatus}
                      color={isConnected ? 'success' : connectionStatus === 'connecting' ? 'warning' : 'error'}
                      size="small"
                    />
                    {connectionStatus === 'connecting' && <CircularProgress size={16} />}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {!isConnected ? (
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={handleConnect}
                      disabled={connectionStatus === 'connecting'}
                    >
                      Connect Voice Agent
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<Stop />}
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </Button>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleConnect}
                    disabled={!isConnected}
                  >
                    Reconnect
                  </Button>
                </Box>
              </Box>

              {/* Conversation Area */}
              <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Messages */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                  {conversationHistory.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                        <Mic />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        Start a Conversation
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click the microphone button or type a message to begin
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {conversationHistory.map((message, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              bgcolor: message.type === 'user' ? 'primary.main' : 
                                      message.type === 'system' ? 'warning.main' : 'success.main' 
                            }}>
                              {message.type === 'user' ? <Person /> : 
                               message.type === 'system' ? <Info /> : <SmartToy />}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1">
                                  {message.text}
                                </Typography>
                                {message.type === 'system' && (
                                  <Chip label="System" size="small" color="warning" />
                                )}
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {message.timestamp.toLocaleTimeString()}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                      <div ref={messagesEndRef} />
                    </List>
                  )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      placeholder="Type your message here..."
                      value={textMessage}
                      onChange={(e) => setTextMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={!isConnected}
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!isConnected || !textMessage.trim()}
                      sx={{ mb: 1 }}
                    >
                      <Send />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Control Panel */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Voice Controls */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Voice Controls
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Fab
                    color={isListening ? 'error' : 'primary'}
                    size="large"
                    onClick={handleMicToggle}
                    disabled={!isConnected}
                    sx={{ alignSelf: 'center', mb: 2 }}
                  >
                    {isListening ? <MicOff /> : <Mic />}
                  </Fab>
                  
                  <Typography variant="body2" textAlign="center" color="text.secondary">
                    {isListening ? 'Listening... Click to stop' : 'Click to start listening'}
                  </Typography>
                  
                  {transcript && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Transcript:</strong> {transcript}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Agent Transfer */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Transfer to Agent
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['triage', 'support', 'billing'].map((agent) => (
                    <Button
                      key={agent}
                      variant={currentAgent === agent ? 'contained' : 'outlined'}
                      startIcon={getAgentInfo(agent).icon}
                      onClick={() => transferToAgent(agent)}
                      disabled={!isConnected || currentAgent === agent}
                      fullWidth
                    >
                      {getAgentInfo(agent).name}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Event />}
                    fullWidth
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Receipt />}
                    fullWidth
                  >
                    Check Billing
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Info />}
                    fullWidth
                  >
                    Get Information
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VoiceAgent; 