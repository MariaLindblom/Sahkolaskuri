import { useParams } from "@remix-run/react";

export function loader({ params }) {
  const id = params.hinnat;
  return null;
}

export default function Hinnat() {
  const params = useParams();
  const id = params.hinnat;
  return id
}