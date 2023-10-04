/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from "react-icons/hi2";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { useDeleteBooking } from "./useDeleteBooking";
import { formatDistanceFromNow } from "../../utils/helpers";
//import { useCheckout } from "features/check-in-out/useCheckout";
import { format, isToday } from "date-fns";
import { useCheckout } from "../check-in-out/useCheckout";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{totalPrice}</Amount>
    </Table.Row>
  );
}
export default BookingRow;