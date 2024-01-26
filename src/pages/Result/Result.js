import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./result.scss";
import { Badge } from "../../assets/Badge";
import logo from "../../assets/logo.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import SuggestionModal from "./suggestionModal";

const Result = ({ isOpen, handleClose, selectedRow }) => {
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const handleOpenSuggestionModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSuggestionModalOpen(true);
  };
  const user = JSON.parse(localStorage.getItem("__user_bzc_client"));
  const token = localStorage.getItem("__token_bzc_client");
  const [answer, setAnswer] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const userId = user?._id;

  const getImageBasedOnScore = (scoredPoints) => {
    if (scoredPoints >= 1 && scoredPoints <= 100) {
      return "percentage/1.png";
    } else if (scoredPoints >= 101 && scoredPoints <= 200) {
      return "percentage/2.png";
    } else if (scoredPoints >= 201 && scoredPoints <= 280) {
      return "percentage/3.png";
    } else if (scoredPoints >= 281 && scoredPoints <= 430) {
      return "percentage/4.png";
    } else if (scoredPoints >= 431 && scoredPoints <= 569) {
      return "percentage/5.png";
    } else {
      return "percentage/6.png";
    }
  };

  React.useEffect(() => {
    const getAnswer = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8000/api/answers/${userId}?last=${true}`,
          config
        );

        if (response?.data?.status === "success" && response.data?.data) {
          const data = response.data.data;

          // Check if there are answers in the array
          if (data?.answers && data.answers.length > 0) {
            // Set the answer to the last element in the array
            setAnswer(data.answers[data.answers.length - 1]);
          }

          setSubmissions(data?.suggestions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!token && !user?._id) {
      window.location.href = "http://localhost:3000/login";
    } else {
      getAnswer();
    }
  }, [user?._id, token]);

  return (
    <Fragment>
      <section className="bz-result">
        <div className="bz-result__content" style={{ padding: "2rem 0" }}>
          <Link to="/">
            <img
              src={logo}
              className="result__card--logo"
              alt="Better Biz Score Logo"
            />
          </Link>
        </div>
        <div className="bz-result__content">
          <img
            src={getImageBasedOnScore(answer?.scoredPoints)}
            alt="Better Biz Score Wheel"
            className="bz-result__cover"
            style={{ width: "100%" }} // Add this line
          />
        </div>
      </section>
      <section className="bz-result-card">
        <div className="bz-result-card__content">
          <div className="result__card">
            <div className="result__card--content">
              <h6 className="result__card--score">
                Better Biz Score: {answer.scoredPoints}
              </h6>
              <Button
                variant="contained"
                style={{
                  background: "#3498db",
                  color: "white",
                  borderRadius: "25px",
                  pointerEvents: "none",
                  fontSize: "14px",
                  marginTop: "20px",
                }}
                disabled
              >
                Things You Can Improve
              </Button>
            </div>

            <div style={{ padding: "2rem" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ textAlign: "center", fontSize: "16px" }}
                      >
                        Badge
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", fontSize: "16px" }}
                      >
                        Category
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center", fontSize: "16px" }}
                      >
                        Score
                      </TableCell>
                      {/* <TableCell style={{ fontSize: "16px" }}>Percentage</TableCell> */}
                      <TableCell
                        style={{ textAlign: "center", fontSize: "16px" }}
                      >
                        Suggestions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(submissions || []).map((ans, i) => {
                      const percentage = ans?.value?.percentage;
                      let badgeColor = "";

                      if (percentage > 80) {
                        badgeColor = "gold";
                      } else if (percentage > 70) {
                        badgeColor = "silver";
                      } else if (percentage > 60) {
                        badgeColor = "brown";
                      } else {
                        badgeColor = "gray";
                      }

                      return (
                        <TableRow key={i}>
                          <TableCell style={{ textAlign: "center" }}>
                            <Badge color={badgeColor} />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              style={{
                                background: "#3498db",
                                color: "white",
                                fontSize: "14px",
                              }}
                              disabled
                            >
                              {ans.name}
                            </Button>
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontSize: "18px" }}
                          >
                            {ans?.value?.points}
                          </TableCell>
                          {/* <TableCell>{ans?.value?.percentage} %</TableCell> */}
                          <TableCell style={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              style={{
                                background: "#3498db",
                                color: "white",
                                fontSize: "14px",
                              }}
                              onClick={() =>
                                handleOpenSuggestionModal(
                                  ans?.value?.suggestion
                                )
                              }
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </section>
      <SuggestionModal
        isOpen={suggestionModalOpen}
        handleClose={() => setSuggestionModalOpen(false)}
        suggestion={selectedSuggestion}
      />
      <center>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <Link to="http://localhost:3000" target="_blank">
            <button
              style={{
                color: "white",
                background: "#3498db",
                borderRadius: "25px",
                width: "200px", // Adjust the width value as needed
                display: "flex",
                alignItems: "center", // Center the text vertically
                justifyContent: "center", // Center the text horizontally
                fontSize: "22px",
              }}
            >
              Visit All Results
            </button>
          </Link>
        </div>
      </center>
    </Fragment>
  );
};

export default Result;
