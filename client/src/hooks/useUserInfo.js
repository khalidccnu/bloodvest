import React, { useEffect, useState } from "react";
import useAuth from "./useAuth.js";
import useAxiosIns from "./useAxiosIns.js";

const useUserInfo = () => {
  const [isUserInfoLoading, setUserInfoLoading] = useState(true);
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const axiosIns = useAxiosIns();

  useEffect(
    (_) => {
      if (user) {
        axiosIns.get(`/users/${user.uid}`).then((response) => {
          setUserInfo(response.data);
          setUserInfoLoading(false);
        });
      }
    },
    [user]
  );

  return [isUserInfoLoading, userInfo];
};

export default useUserInfo;
