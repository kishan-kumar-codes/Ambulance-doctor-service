import fs from 'fs';
import path from 'path';

// Define the path to your data file (ensure this path is correct)
const filePath = path.resolve('./src/utils/doctors.json');


// Define types for the doctor data
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
}

// Helper function to read data from the JSON file
function readDataFromFile(): Doctor[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

// Helper function to write data to the JSON file
function writeDataToFile(data: Doctor[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}




export async function GET(request: Request): Promise<Response> {
  try {
    // Read the data from the JSON file
    const doctors = readDataFromFile();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10"); // Default limit is 10

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Slice the data for the current page
    const paginatedDoctors = doctors.slice(startIndex, endIndex);

    return Response.json({
      doctors: paginatedDoctors,
      total: doctors.length,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading data' }), { status: 500 });
  }
}


export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the body of the request
    const body = await request.json();
    console.log("body:", body);

    // Create a new doctor object with a unique ID
    const newDoctor = { ...body, id: Date.now() };

    // Read the current list of doctors from the file
    const doctors = readDataFromFile();

    // Add the new doctor to the list
    doctors.push(newDoctor);

    // Write the updated list back to the file
    writeDataToFile(doctors);

    // Return the newly created doctor
    return Response.json(newDoctor, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating doctor" }), { status: 500 });
  }
}

export async function PUT(request: Request): Promise<Response> {
  try {
    // Parse the request body
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    // Read the current list of doctors from the file
    let doctors = readDataFromFile();
console.log("id:",id);
    // Update the doctor if the ID matches
    doctors = doctors.map((doc) => (doc.id === id ? { ...doc, ...body } : doc));
   
    // Write the updated list back to the file
    writeDataToFile(doctors);

    // Return a success message
    return Response.json({ message: "Updated successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating doctor" }), { status: 500 });
  }
}




export async function DELETE(request: Request): Promise<Response> {
  try {
    // Extract the 'id' parameter from the query string
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    // Validate the ID
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    // Read the current list of doctors from the file
    let doctors = readDataFromFile();

    // Filter out the doctor with the matching ID
    doctors = doctors.filter((doc) => doc.id !== id);

    // Write the updated list back to the file
    writeDataToFile(doctors);

    // Return a success message
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting doctor" }), { status: 500 });
  }
}