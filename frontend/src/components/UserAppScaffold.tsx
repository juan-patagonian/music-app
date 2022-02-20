import { Navbar } from "./Navbar";

export const UserAppScaffold = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
