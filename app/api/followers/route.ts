import { NextResponse } from 'next/server';
import { db } from "@/lib/firebaseConfig";
import axios from "axios";
import {
  doc,
  updateDoc, 
} from "firebase/firestore";
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
      const youtubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
    
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

    // Facebook - 
    // const response=await axios.post('/api/social_media')
    // const { follower_count, chanel_name } = response.data;
    // followersData.push({
    //   platform: 'facebook',
    //   count: follower_count,
    //   label: chanel_name,
    //   lastUpdated: new Date().toISOString(),
    // });

    const ids = {
  // facebook: "HkPBLwq97x3szY7et4yp",
  youtube: "udhdj6ujNemifJe7Cv1Q",
  tiktok: "KnGYyikOHmYRbMLRExFl",
};

// สร้าง object สำหรับ follower counts
const counts = Object.fromEntries(
  followersData.map(item => [item.platform, item.count])
);

// สร้าง object สำหรับ fetch date
const latest_date = Object.fromEntries(
  followersData.map(item => [item.platform, item.lastUpdated])
);

// อัพเดททุก doc ด้วย loop
for (const platform of [ "youtube", "tiktok"] as const) {
  const docRef = doc(db, "social_links", ids[platform]);
  await updateDoc(docRef, {
    follower_count: counts[platform],     
    fetch_date: latest_date[platform]
  });
}


    

    return NextResponse.json(followersData);
  } catch (error) {
    console.error('Error fetching followers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch followers data' },
      { status: 500 }
    );
  }
}

