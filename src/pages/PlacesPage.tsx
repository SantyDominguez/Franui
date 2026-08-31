import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { ComingSoonPage } from "./ComingSoonPage";

export function PlacesPage() {
  return <><Header title="Lugares" /><PageContainer className="pt-5"><ComingSoonPage title="Nuestros lugares" description="Facultad, cafeterías y otros puntos personalizados vivirán acá cuando se agreguen los datos propios." phase="V0.6" /></PageContainer></>;
}
