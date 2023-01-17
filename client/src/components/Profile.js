import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqloperations/queries";
import { CREATE_TASK } from "../gqloperations/mutations";
import { DELETE_TASK } from "../gqloperations/mutations";
import { UPDATE_TASK } from "../gqloperations/mutations";

import { useNavigate } from "react-router-dom";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { Grid } from "react-loader-spinner";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCircle } from "react-icons/bs";

export default function Profile() {
  const [showTasks, setShowTasks] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    onCompleted(data) {},
  });

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [ "getMyProfile"],
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [ "getMyProfile"],
  });
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [ "getMyProfile"],
  });

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1 style={{ color: "white" }}>Please login first!</h1>;
  }
  if (loading) return <h2></h2>;
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }

  if (error) {
    console.log(error);
  }

  const handleAddTask = async (e) => {
    await createTask({
      variables: {
        name: e,
      },
    });

    setInput("");
  };

  const handleDeleteTask = async (t_id, u_id) => {
    await deleteTask({
      variables: {
        _id: t_id,
        userId: u_id,
      },
    });

    setInput("");
  };

  const handleUpdateTask = async (t_id, u_id) => {
    await updateTask({
      variables: {
        _id: t_id,
        userId: u_id,
      },
    });

    setInput("");
  };

  console.log("THIS IS DATA ", data);
  return (
    <div className="container my-container">
      {!data?.user ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            height="150"
            width="150"
            color="#452C2D"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div
          style={{ display: "flex", width: "100%", flexDirection: "column" }}
        >
          <div className="center-align center">
            <img
              className="circle"
              src={`https://robohash.org/${data?.user.firstName}.png?size=200x200`}
              alt="pic"
            />
            <h5 className="profile-name">
              Welcome! {data?.user.firstName} {data?.user.lastName}
            </h5>
          </div>

          <div className="today-box">
            <div>
              <IoIosAddCircleOutline
                className="add-btn"
                onClick={(e) => {
                  if (input === "") {
                    setShowInputField(!showInputField);
                  } else handleAddTask(input);
                }}
                color="#634142CD"
                size="30px"
              />

              {showInputField ? (
                <input
                  style={{
                    color: "#452C2D",
                    height: "25px",
                    marginLeft: "10px",
                  }}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value !== "") {
                      e.preventDefault();
                      handleAddTask(e.target.value);
                    }
                  }}
                  placeholder="Type your task here..."
                />
              ) : (
                <div className="today-box-title">Todo Today</div>
              )}
            </div>

            {showTasks ? (
              <BiChevronRight
                className="dropdown-btn"
                onClick={() => {
                  setShowTasks(!showTasks);
                }}
                color="#7b705c"
                size="30px"
              />
            ) : (
              <BiChevronDown
                className="dropdown-btn"
                onClick={() => {
                  setShowTasks(!showTasks);
                }}
                color="#7b705c"
                size="30px"
              />
            )}
          </div>

          <div
            className="slide-bottom"
            id="a"
            style={showTasks ? { display: "none" } : {}}
          >
            {data?.user.tasks.map((quo) => {
              return (
                <div className="task-box" id="b">
                  <div>
                    {quo.completed ? (
                      <div className="tick-box">
                        <BiCheck
                          style={{ width: "100%" }}
                          color="#ffffff"
                          size="15px"
                        />
                      </div>
                    ) : (
                      <BsCircle
                        className="cursor"
                        style={{ alignSelf: "center" }}
                        onClick={() => {
                          handleUpdateTask(quo._id, quo.by);
                        }}
                        color="#908670"
                        size="20px"
                      />
                    )}

                    <div className="task-box-title">{quo.name}</div>
                  </div>

                  <AiFillDelete
                    className="cursor"
                    style={{ alignSelf: "center" }}
                    onClick={() => {
                      handleDeleteTask(quo._id, quo.by);
                    }}
                    color="#452C2D"
                    size="20px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
