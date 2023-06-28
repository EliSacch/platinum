import React, { useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// bootstrap
import { Button, Container, Form, Table } from 'react-bootstrap';
// custom components
import ModalAddEditAppointment from './ModalAddEditAppointment';
import { ActionsDropdown } from '../../components/ActionsDropdown';
import Asset from '../../components/Asset';
// infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
// custom style
import styles from '../../styles/AppointmentsList.module.css';


function AppointmentsList() {

    const [appointments, setAppointments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");

    // To display the add appointment modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    // set the form
    const [form, setForm] = useState('add');

    // set the appointment id to edit
    const [editId, setEditId] = useState(null);

    /* When we click on the Add new appointment button
    we set the form to 'add', so the add form will be displayed
    in the modal */
    const handleAdd = () => {
        setForm('add');
        handleShow();
    }

    // Convert the time from integer to a human friendly format
    const displayTime = time => {
        return (time - time%100) / 100 + ":" + (time) % 100 / 50 * 3 + '0'
    }

    /* When we click on the edit button
    we set the form to 'edit', so the edit form will be displayed
    in the modal */
    const handleEdit = (id) => {
        setEditId(id);
        setForm('edit');
        handleShow();
    }

    /* When use click on the delete button, we read the id and
    delete the appointment with that id */
    const handleDelete = async (id) => {
        try {
            await axiosRes.delete(`/appointments/${id}/`);
            setAppointments((prevAppsetAppointments) => ({
                ...prevAppsetAppointments,
                results: prevAppsetAppointments.results.filter((appointment) => appointment.id !== id),
              }));
        } catch (err) {
          
        }
    };

    /**
     * Every time we change the search query, we update the results
     */
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axiosReq.get(`/appointments/?search=${query}`);
                setAppointments(data);
                setHasLoaded(true);
            } catch (err) {
                setHasLoaded(true);
            }
        }
        setHasLoaded(false);
        fetchAppointments();
    }, [query, show])

    return (
        <>
            {/* Search form */}
            <Container className={styles.SearchWrapper} >
                <i className={`fas fa-search ${styles.SearchIcon}`} />

                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search appointments for a client"
                    />
                </Form>
            </Container>

            {/* Add new appointmnet button */}
            <Container>
                <Button
                    className={styles.AddNewBtn}
                    onClick={handleAdd}
                >
                    Add new appointment
                </Button>
            </Container>

            {/* Appointmnets list */}
            {hasLoaded ? (
                <Container >

                    {appointments.results.length ? (
                        <InfiniteScroll
                            children={
                                <Table className={styles.AppointmnetsList}>
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Treatment</th>
                                            <th className="d-none d-md-block">Notes</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.results.map(appointment => (
                                            <tr
                                                key={appointment.id}
                                            >
                                                <td>{appointment.client_name ? appointment.client_name : appointment.owner}</td>
                                                <td>{appointment.date ? appointment.date : ""}</td>
                                                <td>{appointment.time ? displayTime(appointment.time) : ""}</td>
                                                <td>{appointment.treatment ? appointment.treatment : ""}</td>
                                                <td className="d-none d-md-block">{appointment.notes ? appointment.notes : <span className={styles.Hidden}>none</span>}</td>
                                                <td>
                                                    <ActionsDropdown
                                                        handleEdit={handleEdit}
                                                        handleDelete={handleDelete}
                                                        data={appointment.id}
                                                    />
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </Table>
                            }
                            dataLength={appointments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!appointments.next}
                            next={() => fetchMoreData(appointments, setAppointments)}
                        />

                    ) : (
                        <p>There are no appointments yet</p>
                    )}
                    <ModalAddEditAppointment //// To edit
                        show={show}
                        setShow={setShow}
                        query={query}
                        setQuery={setQuery}
                        form={form}
                        editId={editId}
                    />

                </Container>
            ) : (
                <Asset spinner />
            )}
        </>
    )
}

export default AppointmentsList
