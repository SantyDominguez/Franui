import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { ComingSoonPage } from "./ComingSoonPage";

export function ProfilePage() {
  return <><Header title="Perfil" /><PageContainer className="pt-5"><ComingSoonPage title="Un perfil muy nuestro" description="Avatar, favoritos y preferencias se conectarán cuando exista una razón concreta para agregar usuarios y backend." phase="V0.6" /></PageContainer></>;
}
