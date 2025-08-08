import ArtworkCard from "@/components/ArtworkCard";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import Error from "next/error";
import { Card, Col, Pagination, Row } from "react-bootstrap";
export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList?.map((artworkID) => {
            return (
              <Col lg={3} key={artworkID}>
                <ArtworkCard objectID={artworkID} />
              </Col>
            );
          })
        ) : (
          <Card>
            <Card.Body>
              <strong>Nothing Here.</strong> Try adding some new artwork to the
              list
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
