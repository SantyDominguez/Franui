import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";

const AdventurePage = lazy(() =>
  import("../pages/AdventurePage").then((module) => ({
    default: module.AdventurePage,
  })),
);
const MapPage = lazy(() =>
  import("../pages/MapPage").then((module) => ({ default: module.MapPage })),
);
const NavigationPage = lazy(() =>
  import("../pages/NavigationPage").then((module) => ({
    default: module.NavigationPage,
  })),
);
const MemoriesPage = lazy(() =>
  import("../pages/MemoriesPage").then((module) => ({
    default: module.MemoriesPage,
  })),
);
const PlacesPage = lazy(() =>
  import("../pages/PlacesPage").then((module) => ({
    default: module.PlacesPage,
  })),
);
const EventsPage = lazy(() =>
  import("../pages/EventsPage").then((module) => ({
    default: module.EventsPage,
  })),
);
const ProfilePage = lazy(() =>
  import("../pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  })),
);
const SettingsPage = lazy(() =>
  import("../pages/SettingsPage").then((module) => ({
    default: module.SettingsPage,
  })),
);
const AdminPage = lazy(() =>
  import("../pages/AdminPage").then((module) => ({
    default: module.AdminPage,
  })),
);
const FinalMemoryPage = lazy(() =>
  import("../pages/FinalMemoryPage").then((module) => ({
    default: module.FinalMemoryPage,
  })),
);

function PageLoader() {
  return (
    <div
      className="grid min-h-[45dvh] place-items-center text-sm font-semibold text-primary"
      role="status"
    >
      Preparando este rincón…
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AppShell />}>
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/recuerdo-final" element={<FinalMemoryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/recuerdo-final" element={<FinalMemoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
