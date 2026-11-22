import { Impressum } from "@/components/legal/impressum";
import { Modal } from "@/components/ui/modal";

// Fängt die Navigation zu /impressum ab und zeigt das Impressum als Modal über der aktuellen Seite.
export default function ImpressumModal() {
  return (
    <Modal labelledBy="impressum-title">
      <Impressum titleId="impressum-title" />
    </Modal>
  );
}
