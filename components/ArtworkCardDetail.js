import Error from "next/error";
import Card from "react-bootstrap/Card";
import useSWR from "swr";

import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetails({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  return error ? (
    <Error statusCode={404} />
  ) : data ? (
    <Card>
      {data?.primaryImage && (
        <Card.Img
          variant="top"
          src={data?.primaryImage || "https://placehold.co/400"}
        />
      )}
      <Card.Body>
        <Card.Title>{data?.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data?.objectDate || "N/A"} <br />
          <strong>Classification:</strong> {data?.classification || "N/A"}{" "}
          <br />
          <strong>Medium:</strong> {data?.medium || "N/A"}
          <br />
          <br />
          <strong>Artist:</strong> {data?.artistDisplayName || "N/A"}
          {data?.artistDisplayName && (
            <>
              <span> (</span>
              <a
                href={data?.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
              <span>)</span>
            </>
          )}
          <br />
          <strong>Credit:</strong> {data?.creditLine || "N/A"}
          <br />
          <strong>Dimensions:</strong> {data?.dimensions || "N/A"}
          <br />
          <br />
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={() => favouritesClicked()}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  ) : null;
}
