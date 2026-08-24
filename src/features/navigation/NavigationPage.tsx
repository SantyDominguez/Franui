import { Header } from "../../components/layout/Header";
import { PageContainer } from "../../components/layout/PageContainer";
import { ComingSoonPage } from "../../pages/ComingSoonPage";

export function NavigationPage() {
  return (
    <>
      <Header title="Navegación" />
      <PageContainer className="pt-5">
        <ComingSoonPage
          title="Navegación paso a paso"
          description="Routing, ETA, indicaciones y recálculo se conectarán en V0.4 sobre la base del mapa actual."
          phase="V0.4"
        />
      </PageContainer>
    </>
  );
}
