import { MenuItem } from "@/app/models/MenuItem";
import { connectToDB } from "@/app/utils/connectto";

export async function POST(req) {
  connectToDB();

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}
export async function PUT(req) {
  connectToDB();
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id,data)
  return Response.json(true)
}
export async function GET() {
  connectToDB();
  return Response.json(await MenuItem.find());
}
export async function DELETE(req){
  connectToDB();
  const url=new URL(req.url)
  const _id=url.searchParams.get('_id')
  await MenuItem.deleteOne({_id})
   return Response.json(true);
}