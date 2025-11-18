import { NextResponse, NextRequest, } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import {
  doc,
  updateDoc, 
} from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "social_links"));
    const packages = snapshot.docs.map((doc, index) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        social_media: data.social_media,
        chanel_name: data.chanel_name,
        link: data.link,
        fetch_date: data.fetch_date,
        follower_count: data.follower_count
      };
    });
    return NextResponse.json(packages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    try {
        const { social_media } = await req.json();
    
        if (!Array.isArray(social_media)) {
          return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }
    
        // อัปเดตแต่ละ document
        const updatePromises = social_media.map(item => {
          const docRef = doc(db, "social_links", item.id);
          if (item.social_media == "facebook"){
            return updateDoc(docRef, {
              chanel_name: item.chanel_name,
              link: item.link,
              follower_count : item.follower_count
            });

          }
          return updateDoc(docRef, {
            chanel_name: item.chanel_name,
            link: item.link,
  
          });
        });
    
        await Promise.all(updatePromises);
    
        return NextResponse.json({ success: true });
      } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Cannot update social media" }, { status: 500 });
      }
}
