import { Suspense } from "react";
import ProfilePage from "./Components/ProfilePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
