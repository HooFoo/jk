import { useHistory } from "react-router-dom";

export function go(url) {
  useHistory().push(url);
}
