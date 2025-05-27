import { schoolSchema } from "../utils/schema.js";
import { db } from "../utils/database.js";
import { calculateDistance } from "../utils/calculateDistance.js";
import { userLocation } from "../utils/schema.js";
export const addSchool = async (req, res) => {
  try {
    const parsed = schoolSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: "Invalid input", details: parsed.error.errors });
    }

    const { name, address, latitude, longitude } = parsed.data;

    // Check for existing school with same name
    const existingSchool = await db.schools.findFirst({
      where: { name },
    });

    if (existingSchool) {
      return res.status(400).json({
        message: "Duplicate data, a school with this name already exists!",
      });
    }

    // Create the new school
    const school = await db.schools.create({
      data: {
        name,
        address,
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      message: "School data has been successfully inserted into the database",
      school,
    });
  } catch (error) {
    console.error("Error in addSchool:", error);
    return res.status(500).json({
      message: "Something went wrong - schoolController - addSchool",
    });
  }
};

export const listSchools = async (req, res) => {
  try {
    const parsed = userLocation.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.errors,
      });
    }
    const { latitude: userLat, longitude: userLon } = parsed.data; //extracting latitude and longitude directly from parsed data bacause I'm no longer using parseFloat
    const schools = await db.schools.findMany({
      select: {
        name: true,
        address: true,
        latitude: true,
        longitude: true,
      },
    });

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );
        const { latitude, longitude, ...rest } = school;
        return { ...rest, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    return res
      .status(200)
      .json({ message: "successfuly fetched schools", schools: sortedSchools });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get schools!" });
  }
};
