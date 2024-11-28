import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/utils/ambulances.json');

interface Ambulance {
  id: number;
  name: string;
  description: string;
  location: string;
  image?: string;
}

function readDataFromFile(): Ambulance[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeDataToFile(data: Ambulance[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(request: Request): Promise<Response> {
  try {
    const ambulances = readDataFromFile();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10"); 

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedAmbulances = ambulances.slice(startIndex, endIndex);

    return Response.json({
      ambulances: paginatedAmbulances,
      total: ambulances.length,
    });
  } catch (error) {
    console.log("Error in GET ambulance method:",error);
    return new Response(JSON.stringify({ error: 'Error reading data' }), { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    console.log("body:", body);

    const newAmbulance = { ...body, id: Date.now() };

    const ambulances = readDataFromFile();

    ambulances.push(newAmbulance);

    writeDataToFile(ambulances);

    return Response.json(newAmbulance, { status: 201 });
  } catch (error) {
    console.log("Error in POST ambulance method:",error);
    return new Response(JSON.stringify({ error: "Error creating ambulance" }), { status: 500 });
  }
}

export async function PUT(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    let ambulances = readDataFromFile();

    ambulances = ambulances.map((ambulance) => (ambulance.id === id ? { ...ambulance, ...body } : ambulance));

    writeDataToFile(ambulances);

    return Response.json({ message: "Updated successfully" });
  } catch (error) {
    console.log("Error in PUT ambulance method:",error);
    return new Response(JSON.stringify({ error: "Error updating ambulance" }), { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    let ambulances = readDataFromFile();

    ambulances = ambulances.filter((ambulance) => ambulance.id !== id);

    writeDataToFile(ambulances);

    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error in DELETE ambulance method:",error);
    return new Response(JSON.stringify({ error: "Error deleting ambulance" }), { status: 500 });
  }
}
