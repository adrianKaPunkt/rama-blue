import { Datenschutz } from "@/components/legal/datenschutz";
import { Modal } from "@/components/ui/modal";

// Fängt die Navigation zu /datenschutz ab und zeigt die Datenschutzerklärung als Modal.
export default function DatenschutzModal() {
  return (
    <Modal labelledBy="datenschutz-title">
      <Datenschutz titleId="datenschutz-title" />
    </Modal>
  );
}
