// src/features/index.js
import ChatUI from './chat/ChatUI';
import TaskManagementUI from './TaskManagement/TaskManagementUI';
import VideoCallUI from './VideoCall/VideoCallUI';

export const features = [
  {
    id: 'chat',
    title: 'Chat',
    content: <ChatUI />,
  },
  {
    id: 'tasks',
    title: 'Manage',
    content: <TaskManagementUI />,
  },
  {
    id: 'video',
    title: 'Call',
    content: <VideoCallUI />,
  },
];
