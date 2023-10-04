import supabase from "./supabase";

export async function getBookings() {
  let { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
    );

  if (error) {
    console.log("Bookings could not be loaded");
    throw new Error();
  }
  return data;
}
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
