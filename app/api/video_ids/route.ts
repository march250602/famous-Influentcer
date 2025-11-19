import { NextResponse, NextRequest, } from "next/server";
import { collection, getDocs,  } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import {
  doc,
  updateDoc, 
  setDoc,
  addDoc,
  deleteDoc // เพิ่ม deleteDoc
} from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "showcase"));
    const video_ids = snapshot.docs.map((doc, index) => {
      const data = doc.data() as any;
     return {data}
      ;
    });
    return NextResponse.json(video_ids);
   
  } catch (err) {
    return NextResponse.json({ error: "Failed to videos" }, { status: 500 });
  }
}





export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videos } = body;

    if (!videos || !Array.isArray(videos)) {
      return NextResponse.json({ error: "Missing or invalid videos" }, { status: 400 });
    }

    // ดึงเฉพาะ video_id
    const videoIds = videos
      .map(v => v.video_id)
      .filter(Boolean); // กัน undefined

    const ref = doc(db, "showcase", "All_ids");

    // เพิ่มทั้งหมดในครั้งเดียว
    await updateDoc(ref, {
      id_array: [...videoIds]
    });

    return NextResponse.json({ message: "Videos added successfully" });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to add videos" },
      { status: 500 }
    );
  }
}




