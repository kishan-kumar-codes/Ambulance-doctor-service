import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/utils/doctors.json');

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
}

function readDataFromFile(): Doctor[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeDataToFile(data: Doctor[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: Request): Promise<Response> {
  try {
    const doctors = readDataFromFile();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10"); 

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedDoctors = doctors.slice(startIndex, endIndex);

    return Response.json({
      doctors: paginatedDoctors,
      total: doctors.length,
    });
  } catch (error) {
    console.log("Error in GET doctor method:",error);
    return new Response(JSON.stringify({ error: 'Error reading data' }), { status: 500 });
  }
}



export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    const newDoctor = { ...body, id: Date.now() };

    const doctors = readDataFromFile();

    doctors.push(newDoctor);

    writeDataToFile(doctors);

    return Response.json(newDoctor, { status: 201 });
  } catch (error) {
    console.log("Error in POST doctor method:",error);
    return new Response(JSON.stringify({ error: "Error creating doctor" }), { status: 500 });
  }
}

export async function PUT(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    let doctors = readDataFromFile();
    doctors = doctors.map((doc) => (doc.id === id ? { ...doc, ...body } : doc));
   
    writeDataToFile(doctors);

    return Response.json({ message: "Updated successfully" });
  } catch (error) {
    console.log("Error in PUT doctor method:",error);
    return new Response(JSON.stringify({ error: "Error updating doctor" }), { status: 500 });
  }
}




export async function DELETE(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    let doctors = readDataFromFile();

    doctors = doctors.filter((doc) => doc.id !== id);

    writeDataToFile(doctors);

    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error in DELETE doctor method:",error);
    return new Response(JSON.stringify({ error: "Error deleting doctor" }), { status: 500 });
  }
}