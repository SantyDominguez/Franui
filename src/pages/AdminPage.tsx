import { Header } from "../components/layout/Header";
import { PageContainer } from "../components/layout/PageContainer";
import { ComingSoonPage } from "./ComingSoonPage";

export function AdminPage() {
  return <><Header title="Creator" /><PageContainer className="pt-5"><ComingSoonPage title="Panel privado" description="No se incluye un admin falso o inseguro en V0.1. Llegará con autenticación, backend y validaciones reales." phase="V0.7" /></PageContainer></>;
}
