import { NextResponse } from 'next/server';

interface FollowerResponse {
  platform: 'youtube' | 'facebook' | 'tiktok';
  count: number;
  label: string;
  lastUpdated: string;
}

export async function GET() {
  try {
    const followersData: FollowerResponse[] = [];

    // ดึงข้อมูลจาก YouTube API
    try {
      const youtubeApiKey = process.env.YOUTUBE_API_KEY;
      const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID || 'UCXjWTLmy0D0rmZc6WXBB3fg';
    
// Tiktok API
      const tiktokResponse = await fetch(
        'https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=real_dukdik',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.RAPID_KEY!,
            'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
          }
        }
      );
      if (tiktokResponse.ok) {
        const data = await tiktokResponse.json();
const followerCount = data.userInfo.stats.followerCount;
followersData.push({
    platform: 'tiktok',
    count: followerCount,
    label: 'REAL_DUKDIK',
    lastUpdated: new Date().toISOString(),
  });
      }
      
      //Youtube API
      if (youtubeApiKey) {
        const youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeChannelId}&key=${youtubeApiKey}`
        );
        
        if (youtubeResponse.ok) {
          const youtubeData = await youtubeResponse.json();
          
          if (youtubeData.items && youtubeData.items.length > 0) {
            const subscriberCount = parseInt(
              youtubeData.items[0].statistics.subscriberCount || '0',
              10
            );
            
            followersData.push({
              platform: 'youtube',
              count: subscriberCount,
              label: 'DUKDIK_ดุ๊กดิ๊ก',
              lastUpdated: new Date().toISOString(),
            });
          }
        } else {
          console.error('YouTube API error:', await youtubeResponse.text());
        }
      } else {
        console.warn('YOUTUBE_API_KEY is not set in environment variables');
      }
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }

    // Facebook - ยังใช้ข้อมูลตัวอย่าง (สามารถเพิ่ม API จริงได้ในอนาคต)
    followersData.push({
      platform: 'facebook',
      count: 42000,
      label: 'DUKDIK_ดุ๊กดิ๊ก',
      lastUpdated: new Date().toISOString(),
    });

    // TikTok - ยังใช้ข้อมูลตัวอย่าง (สามารถเพิ่ม API จริงได้ในอนาคต)
    


    

    return NextResponse.json(followersData);
  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch followers data' },
      { status: 500 }
    );
  }
}

