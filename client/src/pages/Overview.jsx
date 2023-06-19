import React from "react";
import useUserInfo from "../hooks/useUserInfo.js";

const Overview = () => {
  const [, userInfo] = useUserInfo();
  const {
    firstName,
    lastName,
    phone,
    email,
    birthDate,
    bGroup,
    division,
    district,
    street,
    postalCode,
    donate,
    newDonor,
    lastDonate,
  } = userInfo ?? {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 w-fit mx-auto">
      <h5>
        <span className="font-semibold">First Name: </span>
        <span className="font-medium">{firstName}</span>
      </h5>
      <h5>
        <span className="font-semibold">Last Name: </span>
        <span className="font-medium">{lastName || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Phone: </span>
        <span className="font-medium">{phone || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Email: </span>
        <span className="font-medium">{email}</span>
      </h5>
      <h5>
        <span className="font-semibold">Birth Date: </span>
        <span className="font-medium">
          {new Date(birthDate).toLocaleDateString() || "N/A"}
        </span>
      </h5>
      <h5>
        <span className="font-semibold">Blood Group: </span>
        <span className="font-medium">{bGroup || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Division: </span>
        <span className="font-medium">{division || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">District: </span>
        <span className="font-medium">{district || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Street: </span>
        <span className="font-medium">{street || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Postal Code: </span>
        <span className="font-medium">{postalCode || "N/A"}</span>
      </h5>
      <h5>
        <span className="font-semibold">Donate: </span>
        <span className="font-medium">{donate || "N/A"}</span>
      </h5>
      {newDonor === "no" ? (
        <h5>
          <span className="font-semibold">Last Donate: </span>
          <span className="font-medium">{lastDonate}</span>
        </h5>
      ) : null}
    </div>
  );
};

export default Overview;
