import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import styles from "@/styles/History.module.css";

import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  if (!searchHistory) return null;

  return parsedHistory.length == 0 ? (
    <Card>
      <Card.Body>
        <strong>Nothing Here.</strong> Try searching for some artwork
      </Card.Body>
    </Card>
  ) : (
    <>
      <ListGroup>
        {parsedHistory.map((historyItem, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}
