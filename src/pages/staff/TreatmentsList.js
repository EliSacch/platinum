import React, { useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// bootstrap
import { Button, Container, Form, Table } from 'react-bootstrap';
// custom components
import ModalAddEditTreatment from './ModalAddEditTreatment';
import { ActionsDropdown } from '../../components/ActionsDropdown';
import Asset from '../../components/Asset';
// infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
// custom style
import styles from '../../styles/Treatments.module.css';


function TreatmentsList() {

    const [treatments, setTreatments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");

    // To display the add treatment modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    // set the form
    const [form, setForm] = useState('add');

    // set the treatment id to edit
    const [editId, setEditId] = useState(null);

    /* When we click on the Add new treatment button
    we set the form to 'add', so the add form will be displayed
    in the modal */
    const handleAdd = () => {
        setForm('add');
        handleShow();
    }
    /* When we click on the edit button
    we set the form to 'edit', so the edit form will be displayed
    in the modal */
    const handleEdit = (id) => {
        setEditId(id);
        setForm('edit');
        handleShow();
    }


    const handleDelete = async (id) => {
        try {
            await axiosRes.delete(`/treatments/${id}/`);
            setTreatments((prevAppsetTreatments) => ({
                ...prevAppsetTreatments,
                results: prevAppsetTreatments.results.filter((treatment) => treatment.id !== id),
              }));
        } catch (err) {
          
        }
    };

    /**
     * Every time we change the search query, we update the results
     */
    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get(`/treatments/?search=${query}`);
                setTreatments(data);
                setHasLoaded(true);
            } catch (err) {
             
                setHasLoaded(true);
            }
        }
        setHasLoaded(false);
        fetchTreatments();
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
                        placeholder="Search treatment"
                    />
                </Form>
            </Container>

            {/* Add new treatment button */}
            <Container>
                <Button
                    className={styles.AddNewBtn}
                    onClick={handleAdd}
                >
                    Add new treatment
                </Button>
            </Container>

            {/* Treatments list */}
            {hasLoaded ? (
                <Container >

                    {treatments.results.length ? (
                        <InfiniteScroll
                            children={
                                <Table className={styles.TreatmentsList}>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {treatments.results.map(treatment => (
                                            <tr
                                                key={treatment.id}
                                                className={treatment.is_active ? (styles.Active) : (styles.Inactive)}
                                            >
                                                <td>{treatment.title}</td>
                                                <td>{treatment.description}</td>
                                                <td>{treatment.price}€</td>
                                                {treatment.is_active ? <td>Active</td> : <td>Inactive</td>}
                                                <td>
                                                    <ActionsDropdown
                                                        handleEdit={handleEdit}
                                                        handleDelete={handleDelete}
                                                        data={treatment.id}
                                                    />
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </Table>
                            }
                            dataLength={treatments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!treatments.next}
                            next={() => fetchMoreData(treatments, setTreatments)}
                        />

                    ) : (
                        <p>There are no treatments yet</p>
                    )}
                    <ModalAddEditTreatment
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

export default TreatmentsList
