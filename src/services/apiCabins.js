import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded!");
  }
  return data;
}

export async function getCabin(id) {
  let { data, error } = await supabase.from("cabins").select("*").eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be loaded!");
  }
  console.log(data);
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabins(newCabinData, id) {
  console.log(newCabinData);
  const hasImagePath = newCabinData.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);
  const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);
  // create/edit cabin
  let query = supabase.from("cabins");
  // Create
  if (!id) {
    query = query.insert([{ ...newCabinData, image: imagePath }]);
  }
  // Edit
  if (id) {
    query = query.update([{ ...newCabinData, image: imagePath }]).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }
  //upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabinData.image);

  //delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}
