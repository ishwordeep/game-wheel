import { useHeaderDataStore } from "@/store/headerDataStore";
import { FC, useEffect } from "react";
interface ISetHeaderProps {
  heading: string;
  description?: string;
}

const SetHeader: FC<ISetHeaderProps> = ({ heading, description }) => {
  const { setHeaderData } = useHeaderDataStore();

  useEffect(() => {
    setHeaderData({
      heading,
      description,
    });
  }, [setHeaderData]);

  return null;
};

export default SetHeader;
