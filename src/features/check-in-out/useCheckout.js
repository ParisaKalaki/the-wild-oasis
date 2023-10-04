import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: checkout, mutate: isCheckingOut } = useMutation({
    mutationFn: updateBookingApi,
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { isCheckingOut, checkout };
}
