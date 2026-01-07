import Hero from "../components/Hero";
import Dashboard from "./Dashboard";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? <Dashboard /> : <Hero />}
    </>
  );
};

export default Home;
