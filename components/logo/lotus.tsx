import { MetalSvg, type MetalProps } from "./metal-svg";
import { LOTUS_BOX, LOTUS_PATH } from "./paths";

/** Die Lotusblüte allein. Ohne title dekorativ (für Screenreader ausgeblendet). */
export function Lotus(props: MetalProps) {
  return <MetalSvg box={LOTUS_BOX} layers={[{ d: LOTUS_PATH, box: LOTUS_BOX }]} {...props} />;
}
