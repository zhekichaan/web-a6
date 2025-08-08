import Error from "next/error";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  return error ? (
    <Error statusCode={404} />
  ) : data ? (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          data?.primaryImageSmall || "https://placehold.co/400?text=Placeholder"
        }
      />
      <Card.Body>
        <Card.Title>{data?.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data?.objectDate || "N/A"} <br />
          <strong>Classification:</strong> {data?.classification || "N/A"}{" "}
          <br />
          <strong>Medium:</strong> {data?.medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  ) : null;
}
