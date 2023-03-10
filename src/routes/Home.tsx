import { Wrap } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDirectoryItems } from "../api/useDirectoryItems";
import { useUser } from "../api/useUser";
import File from "../components/File";
import Folder, { FolderSkeletonList } from "../components/Folder";
import NoUser from "../components/NoUser";

const Home = () => {
  const [isLoadingDummy, setIsLoadingDummy] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams("/");

  const { data, isLoading: isLoadingDirectoryItems } = useDirectoryItems({
    directoryPath: searchParams.get("path") || "/",
  });
  const { user, isLoadingUser } = useUser();

  const folders = data?.folders || [];
  const files = data?.files || [];

  const isLoading = isLoadingUser || isLoadingDirectoryItems || isLoadingDummy;

  useEffect(() => {
    if (!isLoadingDirectoryItems) {
      setTimeout(() => {
        setIsLoadingDummy(false);
      }, 1000);
    } else {
      setIsLoadingDummy(true);
    }
  }, [isLoadingDirectoryItems]);

  return user ? (
    <Wrap columnGap={6} rowGap={6} px={20} py={8}>
      {isLoading ? (
        <FolderSkeletonList />
      ) : (
        <>
          {folders.map((value, index) => (
            <Folder key={index} item={value} />
          ))}
          {files.map((value, index) => (
            <File key={index} item={value} />
          ))}
        </>
      )}
    </Wrap>
  ) : (
    <NoUser />
  );
};

export default Home;
