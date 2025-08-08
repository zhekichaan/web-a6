import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";

import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  const previousPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const nextPage = () => {
    setPage((prev) => (prev < artworkList.length ? prev + 1 : prev));
  };

  useEffect(() => {
    if (data) {
      let results = [];

      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);

      setPage(1);
    }
  }, [data]);

  return error ? (
    <Error statusCode={404} />
  ) : artworkList ? (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1]?.map((artworkID) => {
            return (
              <Col lg={3} key={artworkID}>
                <ArtworkCard objectID={artworkID} />
              </Col>
            );
          })
        ) : (
          <h4>Nothing Here</h4>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  ) : null;
}
