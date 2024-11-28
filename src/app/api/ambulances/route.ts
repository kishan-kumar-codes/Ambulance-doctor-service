import fs from 'fs';
import path from 'path';

// Define the path to your ambulance data file
const filePath = path.resolve('./src/utils/ambulances.json');

// Define types for the ambulance data
interface Ambulance {
  id: number;
  name: string;
  description: string;
  location: string;
  image?: string;
}

// Helper function to read data from the JSON file
function readDataFromFile(): Ambulance[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

// Helper function to write data to the JSON file
function writeDataToFile(data: Ambulance[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET route for fetching ambulances with pagination
export async function GET(request: Request): Promise<Response> {
  try {
    // Read the data from the JSON file
    const ambulances = readDataFromFile();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10"); // Default limit is 10

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Slice the data for the current page
    const paginatedAmbulances = ambulances.slice(startIndex, endIndex);

    return Response.json({
      ambulances: paginatedAmbulances,
      total: ambulances.length,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error reading data' }), { status: 500 });
  }
}

// POST route for creating a new ambulance
export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the body of the request
    const body = await request.json();
    console.log("body:", body);

    // Create a new ambulance object with a unique ID
    const newAmbulance = { ...body, id: Date.now() };

    // Read the current list of ambulances from the file
    const ambulances = readDataFromFile();

    // Add the new ambulance to the list
    ambulances.push(newAmbulance);

    // Write the updated list back to the file
    writeDataToFile(ambulances);

    // Return the newly created ambulance
    return Response.json(newAmbulance, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating ambulance" }), { status: 500 });
  }
}

// PUT route for updating an existing ambulance
export async function PUT(request: Request): Promise<Response> {
  try {
    // Parse the request body
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    // Read the current list of ambulances from the file
    let ambulances = readDataFromFile();

    // Update the ambulance if the ID matches
    ambulances = ambulances.map((ambulance) => (ambulance.id === id ? { ...ambulance, ...body } : ambulance));

    // Write the updated list back to the file
    writeDataToFile(ambulances);

    // Return a success message
    return Response.json({ message: "Updated successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating ambulance" }), { status: 500 });
  }
}

// DELETE route for deleting an ambulance
export async function DELETE(request: Request): Promise<Response> {
  try {
    // Extract the 'id' parameter from the query string
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    // Validate the ID
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    // Read the current list of ambulances from the file
    let ambulances = readDataFromFile();

    // Filter out the ambulance with the matching ID
    ambulances = ambulances.filter((ambulance) => ambulance.id !== id);

    // Write the updated list back to the file
    writeDataToFile(ambulances);

    // Return a success message
    return Response.json({ message: "Deleted successfully" });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting ambulance" }), { status: 500 });
  }
}
