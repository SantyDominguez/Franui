import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { ComingSoonPage } from "./ComingSoonPage";

export function EventsPage() {
  return <><Header title="Eventos" /><PageContainer className="pt-5"><ComingSoonPage title="Momentos por venir" description="Los eventos forman parte de la plataforma futura, después de validar el núcleo de la aventura." phase="V1.0" /></PageContainer></>;
}
