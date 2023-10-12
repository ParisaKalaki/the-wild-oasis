/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate(); // we are only allowed to call navigate inside call back function or in a use effect
  // 1. load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. if there is no authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login"); // in the beginning while we are still loading, the user is also not authenticated yet
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. if there is a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
