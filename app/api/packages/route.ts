import { NextResponse, NextRequest, } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import {
  doc,
  updateDoc, 
} from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "Pakage_influencer"));
    const packages = snapshot.docs.map((doc, index) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        price: `เริ่มต้น ${data.price}.-`,
        icon: data.icon,
      };
    });
    return NextResponse.json(packages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, data } = await req.json(); 
    const docRef = doc(db, "Pakage_influencer", id);
    await updateDoc(docRef, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Cannot update package" }, { status: 500 });
  }
}
