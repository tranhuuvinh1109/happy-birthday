import { ContainerProps } from "../../type/common";

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`mx-auto w-[1200px] ${className}`}>{children}</div>;
};
export default Container;
