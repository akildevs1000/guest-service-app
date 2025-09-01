import { Suspense } from "react";
import ProfilePage from "./Components/ProfilePage";
import Loader from "./Components/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ProfilePage />
    </Suspense>
  );
}
