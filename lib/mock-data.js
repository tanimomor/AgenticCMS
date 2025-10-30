// Mock data generator for CMS demonstration

export const generateMockMetrics = () => {
  return {
    totalPosts: 248,
    totalPages: 52,
    totalMedia: 1340,
    totalUsers: 18,
    publishedToday: 12,
    draftCount: 34,
    scheduledCount: 8,
    viewsThisMonth: 125780,
    engagementRate: 68.5,
    averageReadTime: '4m 32s',
  };
};

export const generateActivityFeed = () => {
  return [
    {
      id: 1,
      type: 'publish',
      user: 'Sarah Chen',
      action: 'published',
      target: 'The Future of Design Systems',
      time: '2 minutes ago',
      avatar: 'SC',
    },
    {
      id: 2,
      type: 'edit',
      user: 'Marcus Rodriguez',
      action: 'updated',
      target: 'Homepage Hero Section',
      time: '15 minutes ago',
      avatar: 'MR',
    },
    {
      id: 3,
      type: 'upload',
      user: 'Elena Volkov',
      action: 'uploaded',
      target: '12 new images',
      time: '1 hour ago',
      avatar: 'EV',
    },
    {
      id: 4,
      type: 'comment',
      user: 'James Park',
      action: 'commented on',
      target: 'Q2 Product Roadmap',
      time: '2 hours ago',
      avatar: 'JP',
    },
    {
      id: 5,
      type: 'draft',
      user: 'Ava Thompson',
      action: 'created draft',
      target: 'AI in Modern Web Development',
      time: '3 hours ago',
      avatar: 'AT',
    },
  ];
};

export const generateRecentContent = () => {
  return [
    {
      id: 1,
      title: 'The Future of Design Systems',
      type: 'Article',
      status: 'Published',
      author: 'Sarah Chen',
      date: '2025-06-10',
      views: 2840,
      thumbnail: null,
    },
    {
      id: 2,
      title: 'Homepage Hero Section',
      type: 'Page',
      status: 'Published',
      author: 'Marcus Rodriguez',
      date: '2025-06-10',
      views: 15200,
      thumbnail: null,
    },
    {
      id: 3,
      title: 'Q2 Product Roadmap',
      type: 'Document',
      status: 'Draft',
      author: 'James Park',
      date: '2025-06-09',
      views: 450,
      thumbnail: null,
    },
    {
      id: 4,
      title: 'Brand Guidelines 2025',
      type: 'Document',
      status: 'Published',
      author: 'Elena Volkov',
      date: '2025-06-08',
      views: 890,
      thumbnail: null,
    },
    {
      id: 5,
      title: 'AI in Modern Web Development',
      type: 'Article',
      status: 'Draft',
      author: 'Ava Thompson',
      date: '2025-06-07',
      views: 0,
      thumbnail: null,
    },
    {
      id: 6,
      title: 'Customer Success Stories',
      type: 'Collection',
      status: 'Published',
      author: 'Sarah Chen',
      date: '2025-06-06',
      views: 3200,
      thumbnail: null,
    },
  ];
};

export const generatePerformanceData = () => {
  return {
    daily: [
      { day: 'Mon', views: 18200, engagement: 65 },
      { day: 'Tue', views: 22400, engagement: 72 },
      { day: 'Wed', views: 19800, engagement: 68 },
      { day: 'Thu', views: 25600, engagement: 75 },
      { day: 'Fri', views: 21400, engagement: 70 },
      { day: 'Sat', views: 15200, engagement: 62 },
      { day: 'Sun', views: 13800, engagement: 58 },
    ],
    topContent: [
      { title: 'Homepage Hero Section', views: 15200, trend: 'up' },
      { title: 'Product Features Overview', views: 8900, trend: 'up' },
      { title: 'About Us Page', views: 7600, trend: 'stable' },
      { title: 'Blog Landing', views: 6400, trend: 'down' },
      { title: 'Contact Form', views: 5200, trend: 'up' },
    ],
  };
};