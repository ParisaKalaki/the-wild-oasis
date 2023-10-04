import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [serachParams] = useSearchParams();
  //Filter
  const filterValue = serachParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" }; //for multiple filters pass an array of object instead of one object
  //sort
  const sortByRow = serachParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy }),
    queryKey: ["bookings", filter, sortBy], // whenever filter changes, then React Query will refetch the data
  });
  return { bookings, isLoading, error };
}
