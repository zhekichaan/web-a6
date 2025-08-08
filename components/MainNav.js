import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const token = readToken();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const logout = () => {
    setIsExpanded(false);

    removeToken();

    router.push("/login");
  };

  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(!isExpanded);

    setSearchHistory(await addToHistory(`title=true&q=${search}`));

    router.push(`/artwork?title=true&q=${search}`);
  }

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top bg-primary navbar-dark"
      >
        <Container>
          <Navbar.Brand>Yevhen Chernytskyi</Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token ? (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            ) : (
              <>
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" variant="outline-success">
                    Search
                  </Button>
                </Form>
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/favourites"}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/history"}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
