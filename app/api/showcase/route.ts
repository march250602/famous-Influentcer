import { NextResponse, NextRequest, } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";


export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "showcase"));


const video_ids: string[] = snapshot.docs.flatMap(doc => {
  const data = doc.data() as any;
  return data?.id_array || [];
});
    const idString = video_ids.join(",");

    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
      
    const youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idString}&key=${youtubeApiKey}`
        );
     if (youtubeResponse.ok) {
         const youtubeData = await youtubeResponse.json();
         const videos = youtubeData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url,
      views: Number(item.statistics.viewCount),
      likes: Number(item.statistics.likeCount),
      url: `https://www.youtube.com/watch?v=${item.id}`,
      publishedAt: item.snippet.publishedAt,
    }));

    return NextResponse.json(videos);
         
     }
   
  } catch (err) {
    return NextResponse.json({ error: "Failed to videos" }, { status: 500 });
  }
}