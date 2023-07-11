import "./profile-page.scss";
import Header from "../components/header";
import IconButton from "@mui/material/IconButton";
import Back from "@mui/icons-material/ChevronLeft";
import ButtonComponent from "../meterial-ui-components/Button/ButtonComponent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import validator from "validator";
import { TextField } from "@mui/material";
import isEmail from "validator/lib/isEmail";

const profilePage = () => {
  const dummyData = {
    firstName: "Rachel",
    lastName: "Green",
    email: "rachel@gmail.com",
    mobile: "1234987655",
    panNumber: "HWF276890",
    aadharNumber: "1928 3847 4857",
  };

  let count = 0;
  const userDataLabels = [
    "First Name",
    "Last Name",
    "Email",
    "Mobile",
    "PAN Number",
    "Aadhar Number",
  ];

  const [newpassword, setNewPassword] = useState("");
  const [newpasswordError, setNewPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [userData, setUserData] = useState(dummyData);
  const [confirmedNewpassword, setConfirmedNewPassword] = useState("");
  const [confirmedNewpasswordError, setConfirmedNewPasswordError] =
    useState("");
  const [openModal, setOpenModal] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleUpdatePassword = () => {
    if (newpassword !== confirmedNewpassword) {
      setConfirmedNewPasswordError("Passwords do not match");
      return;
    }
    if (newpassword === currentPassword) {
      setConfirmedNewPasswordError("Old and new passwords cannot be same");
      return;
    }
    console.log(currentPassword);
    console.log(newpassword);
    console.log(confirmedNewpassword);
  };

  const handlePasswordChange = (inputPassword) => {
    if (
      !validator.isStrongPassword(inputPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setNewPasswordError(
        "Enter a password atleast 8 characters having atleast 1 number, symbol, uppercase alphabet and lowercase alphabet"
      );
    }
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSubmitUpdateModal = () => {
    console.log(userData);
    handleClose();
  };

  return (
    <div id="profile">
      <Header isUserLoggedIn={true} />

      <div className="profile-page">
        <div className="profile-header">
          <h2 clasname="page-name"> Profile </h2>
        </div>
        <div className="profile-data">
          <div className="details">
            <div className="details-header">
              <h4>User Details</h4>
              <div className="edit-btn">
                <ButtonComponent
                  className="edit-btn-comp"
                  buttonText="Edit"
                  variant="contained"
                  onClickHandler={() => {
                    handleOpen();
                  }}
                />

                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={{ ...modalBoxStyle }}>
                    <form
                      className="edit-data"
                      onSubmit={(e) => handleSubmitUpdateModal()}
                    >
                      <div className="profile-header">
                        <div className="back-btn" onClick={() => handleClose()}>
                          <IconButton
                            aria-label="delete"
                            disabled
                            color="primary"
                          >
                            <Back />
                          </IconButton>
                        </div>
                        <h3 clasname="page-name"> Edit Profile </h3>
                      </div>

                      <div className="user-data">
                        <TextField
                          className="user-data-item"
                          color="primary"
                          variant="outlined"
                          type="text"
                          name="first-name"
                          id="first-name"
                          label="First Name"
                          placeholder=""
                          size="medium"
                          margin="none"
                          value={userData.firstName}
                          fullWidth
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                        <TextField
                          className="user-data-item"
                          color="primary"
                          variant="outlined"
                          type="text"
                          name="last-name"
                          id="last-name"
                          label="Last Name"
                          placeholder=""
                          size="medium"
                          margin="none"
                          value={userData.lastName}
                          fullWidth
                          required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastName: e.target.value,
                            })
                          }
                        />
                        <TextField
                          className="user-data-item"
                          color="primary"
                          variant="outlined"
                          type="text"
                          name="email"
                          id="email"
                          label="Email"
                          placeholder=""
                          size="medium"
                          margin="none"
                          value={userData.email}
                          fullWidth
                          required
                          onChange={(e) => {
                            const val = e.target.value;
                            if (isEmail(val)) {
                              setValidEmail(true);
                            } else {
                              setValidEmail(false);
                            }

                            setUserData({ ...userData, email: e.target.value });
                          }}
                        />
                        <div className="sub-label invalid-email-modal">
                          {validEmail ? " " : "Incorrect Email"}
                        </div>
                        <TextField
                          className="user-data-item"
                          color="primary"
                          variant="outlined"
                          type="text"
                          name="mobile"
                          id="mobile"
                          label="Mobile"
                          placeholder=""
                          size="medium"
                          margin="none"
                          fullWidth
                          required
                          value={userData.mobile}
                          onChange={(e) =>
                            setUserData({ ...userData, mobile: e.target.value })
                          }
                        />
                      </div>

                      <div className="edit-modal-btns">
                        <ButtonComponent
                          className="edit-modal-btn"
                          buttonText="Cancel"
                          type="cancel"
                          style={{ color: "grey", backgroundColor: "#D8D1D1" }}
                          onClickHandler={() => {
                            handleClose();
                          }}
                        />
                        <ButtonComponent
                          className="edit-modal-btn"
                          buttonText="Update Profile"
                          type="submit"
                          style={{
                            minWidth: "311px",
                            backgroundColor: "#047857",
                          }}
                          disabled={!validEmail}
                        />
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            </div>
            <div className="details-data" id="profile-detail">
              {Object.entries(dummyData).map(([key, value]) => (
                <div className="detail-item" key={key}>
                  <div className="item-name"> {userDataLabels[count++]} </div>
                  <div className="item-value"> {value} </div>
                </div>
              ))}
            </div>
          </div>
          <div className="change-password">
            <h3 className="change-pass-header"> Change Password </h3>

            <div className="change-pass-body">
              <div className="change-pass-data">
                <div>
                  <TextField
                    className="bar4"
                    color="primary"
                    variant="outlined"
                    type="password"
                    name="current-pass"
                    id="current-pass"
                    label="Current password"
                    placeholder=""
                    size="medium"
                    margin="none"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    className="bar4"
                    color="primary"
                    variant="outlined"
                    type="password"
                    name="new-pass"
                    id="new-pass"
                    label="New Password"
                    placeholder="at least 8 characters"
                    size="medium"
                    margin="none"
                    value={newpassword}
                    onBlur={(e) => handlePasswordChange(e.target.value)}
                    onChange={(e) => {
                      setNewPasswordError("");
                      setNewPassword(e.target.value);
                    }}
                    fullWidth
                  />
                  {newpasswordError ? (
                    <div className="sub-label">{newpasswordError}</div>
                  ) : (
                    <></>
                  )}
                </div>

                <div>
                  <TextField
                    className="bar4"
                    color="primary"
                    variant="outlined"
                    type="password"
                    name="confirm-new-pass"
                    id="confirm-new-pass"
                    label="Confirm New Password"
                    placeholder=""
                    size="medium"
                    margin="none"
                    value={confirmedNewpassword}
                    onChange={(e) => {
                      setConfirmedNewPasswordError("");
                      setConfirmedNewPassword(e.target.value);
                    }}
                    fullWidth
                  />
                  {confirmedNewpasswordError ? (
                    <div className="sub-label">{confirmedNewpasswordError}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <ButtonComponent
                className="change-pass-btn"
                buttonText="Update"
                variant="contained"
                onClickHandler={() => {
                  handleUpdatePassword();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
