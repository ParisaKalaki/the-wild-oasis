import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBooking() {
  const { bookingId } = useParams();
  // console.log(getBooking(bookingId));
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => getBooking(bookingId),
    retry: false, // React query try to fetch data three times in case that it fails in the begining. In this case not finding the data means it does not exist.
  });
  // console.log("booking1:", booking, isLoading, error);
  return { isLoading, error, booking };
}
