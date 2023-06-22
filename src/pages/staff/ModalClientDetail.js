import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from '../../styles/ModalClientDetail.module.css';
import ClientNotesForm from './ClientNotesForm';
import ClientRoleForm from './ClientRoleForm';


const ModalClientDetail = (props) => {

  const {
    id, name, owner, notes,
    appointments_count, has_appointments_today,
    show, setShow } = props;

  // state variable to get the user role as client or staff member    
  const [user, setUser] = useState(null);
  const [showEditRole, setShowEditRole] = useState(false);
  const [updatedRole, setRole] = useState("");
  const [loadedRole, setLoadedRole] = useState(false);

  // state variables to display/ edit the notes
  const [showEditNotes, setShowEditNotes] = useState(false);
  const [updatedNotes, setNotes] = useState(notes);

  // To close the modal
  const handleClose = () => setShow(false);

  // Toggle the role form when the user clicks on the edit button next to the role
  const handleEditRole = () => {
    setShowEditRole(!showEditRole);
  }

  // Toggle the notes form when the user clicks on the edit button next to the notes
  const handleEditNotes = () => {
    setShowEditNotes(!showEditNotes);
  }

  // update notes 
  useEffect(() => {
    setNotes(updatedNotes);
  }, [notes, updatedNotes, showEditNotes]);

  // Fetch the user based on the id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosReq.get(`/set-staff-permission/${id}/`);
        setUser(data);
        setRole(data.is_staff);
        setLoadedRole(true);
      } catch (err) {
        console.log(err)
      }
    }
    setLoadedRole(false);
    fetchUser();

  }, [id])

  // update the role
  useEffect(() => {
    setRole(updatedRole);
  }, [id, user, showEditRole, updatedRole]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Name: {name}</li>
            <li>Username: {owner}</li>
            <li>Appointments: {appointments_count}</li>
            <li>Today: {has_appointments_today}</li>
            <li className={styles.Notes}>
              Role:

              {
                // check if the role was loaded
                loadedRole ? (
                  <>
                    {
                      // show the following if showEditRole is false, maning that the
                      // edit role form is closed
                      !showEditRole && <>
                        {updatedRole ? (" Staff") : (" Client")}
                        <span
                          onClick={handleEditRole}
                          aria-label="edit role"
                        >
                          <i className="fas fa-edit" />
                        </span>
                      </>
                    }
                    {
                      // show the following if the edit role form is open
                      showEditRole &&
                      <ClientRoleForm
                        id={id}
                        currentRole={updatedRole}
                        setRole={setRole}
                        showEditRole={showEditRole}
                        setShowEditRole={setShowEditRole}
                        updatedRole={updatedRole}
                      />
                    }
                  </>

                ) : (
                  // display this message while retrieving the role
                  " checking..."
                )
              }

            </li>
            <hr />
            <li className={styles.Notes}>
              {
                // display the following when the edit notes form is closed
                !showEditNotes && <>
                  Notes: {updatedNotes}
                  <span
                    onClick={handleEditNotes}
                    aria-label="edit notes"
                  >
                    <i className="fas fa-edit" />
                  </span>
                </>
              }
              {
                // display the following when the edit notes form is open
                showEditNotes &&
                <ClientNotesForm
                  id={id}
                  notes={notes}
                  setNotes={setNotes}
                  showEditNotes={showEditNotes}
                  setShowEditNotes={setShowEditNotes}
                />
              }
            </li>
          </ul>

        </Modal.Body>
        <Modal.Footer>
          {/* Close the modal */}
          <Button className={styles.ModalBtn} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalClientDetail