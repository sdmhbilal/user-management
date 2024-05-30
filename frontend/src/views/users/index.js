import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import AddOutlineIcon from '@mui/icons-material/AddOutlined';
import EditOutlineIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Button from '../../components/button';
import LabelInput from '../../components/input/label-input';
import Modal from '../../components/modal';
import SimpleTable from '../../components/table';
import Toast from '../../components/toast';

import {
  AddUser,
  DeleteUser,
  EditUser,
  GetUser,
  GetUsers,
  SetUsersState
} from '../../redux/users';

const Users = () => {
  const dispatch = useDispatch();

  const {
    usersData,
    selectedUser,
    total,
    loading,
    message,
    errMessage,
    success,
    errorOnInput
  } = useSelector((state) => state.users);

  const [rowData, setRowData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(15);
  const [userId, setUserId] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: ''
  });

  const closeStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 4px 8px rgba(54, 50, 235, 0.23)',
    width: '30%',
    bgcolor: 'background.paper'
  };

  const data = [{
    value: 15,
    name: 15
  }, {
    value: 30,
    name: 30
  }, {
    value: 50,
    name: 50
  }, {
    value: 100,
    name: 100
  }];

  const columns = [{
    id: 'name',
    label: 'Name',
    align: 'left'
  }, {
    id: 'email',
    label: 'Email',
    align: 'left'
  }, {
    id: 'actions',
    label: 'Actions',
    align: 'left'
  }];

  function createData(
    name,
    email,
    actions
  ) {
    return {
      name,
      email,
      actions
    };
  }

  const handleOpenEditModal = (uId) => {
    setOpenEditModal(true);
    dispatch(GetUser({ userId: uId }));
    setUserId(uId);
  };

  const handleOpenDeleteModal = (uId) => {
    setOpenDeleteModal(true);
    setUserId(uId);
  };

  const createUsersData = () => {
    const rowList = [];
    for (let i = 0; i < usersData?.length; i += 1) {
      const {
        id,
        name,
        email
      } = usersData[i];

      rowList.push(createData(
        name,
        email,
        <Box display="flex">
          <Stack>
            <Tooltip title="Edit User" placement="top">
              <Box>
                <IconButton onClick={() => handleOpenEditModal(id)}>
                  <EditOutlineIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Stack>
          <Stack>
            <Tooltip title="Delete User" placement="top">
              <Box>
                <IconButton onClick={() => handleOpenDeleteModal(id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Stack>
        </Box>
      ));
    }
    return rowList;
  };

  const pageChange = (page, limit) => {
    setPageNumber(page);
    setPageLimit(limit);
  };

  const isButtonDisable = () => {
    let isError = Object.values(errorOnInput).some((field) => field.helperText !== '');
    if (!isError) isError = Object.values(newUser).some((field) => field === '');

    return isError;
  };

  const setError = (key, helperText, error) => {
    let tempObj = { ...errorOnInput };
    tempObj = {
      ...tempObj,
      [key]: {
        helperText,
        error
      }
    };
    dispatch(SetUsersState({
      field: 'errorOnInput',
      value: tempObj
    }));
  };

  const handleChangeAddUser = (key, value) => {
    if (value !== '') {
      setError(key, '', false);
    }

    if (value === '') {
      setError(key, 'Value Can\'t Be Empty', true);
    }

    if ((key === 'email') && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
      setError(key, 'Please Enter a valid email address!', true);
    }

    if ((key === 'password') && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value))) {
      setError(key, 'The Password must contain 1 Capital Character, 1 Numeric Character, 1 Special Character and 6 Characters Long!', true);
    }

    setNewUser({ ...newUser, [key]: value });
  };

  const handleAddUser = () => {
    dispatch(AddUser(newUser));
    setOpenAddModal(false);
    setNewUser({
      name: '',
      email: '',
      password: ''
    });
    dispatch(SetUsersState({
      field: 'errorOnInput',
      value: {
        name: {
          helperText: '',
          error: ''
        },
        email: {
          helperText: '',
          error: ''
        },
        password: {
          helperText: '',
          error: ''
        }
      }
    }));
  };

  const handleEditUser = (uId) => {
    dispatch(EditUser({ userId: uId, ...editedUser }));
    setOpenEditModal(false);
    setEditedUser({
      name: '',
      email: ''
    });
  };

  const handleDeleteUser = (uId) => {
    dispatch(DeleteUser({ userId: uId }));
    setOpenDeleteModal(false);
    setPageNumber(1);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };

  const handleRefreshButton = () => {
    dispatch(GetUsers({
      skip: (pageNumber - 1) * pageLimit,
      limit: pageLimit
    }));
  };

  useEffect(() => {
    if (selectedUser) {
      setEditedUser({
        name: selectedUser.name,
        email: selectedUser.email
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (success && !errMessage) {
      dispatch(GetUsers({
        skip: (pageNumber - 1) * pageLimit,
        limit: pageLimit
      }));
      dispatch(SetUsersState({ field: 'success', value: false }));
    }
  }, [success]);

  useEffect(() => {
    if (errMessage) {
      setMessage(errMessage);
      setSeverity('error');
      setToastOpen(true);
      dispatch(SetUsersState({ field: 'errMessage', value: '' }));
    }
  }, [errMessage]);

  useEffect(() => {
    if (message) {
      setMessage(message);
      setSeverity('success');
      setToastOpen(true);
    }

    dispatch(SetUsersState({ field: 'message', value: '' }));
  }, [message]);

  useEffect(() => {
    const result = createUsersData();
    setRowData(result);
  }, [usersData, loading]);

  useEffect(() => {
    dispatch(GetUsers({
      limit: pageLimit,
      skip: (pageNumber - 1) * pageLimit
    }));
  }, [pageLimit, pageNumber]);

  return (
    <>
      <Toast
        message={toastMessage}
        severity={severity}
        toastOpen={toastOpen}
        handleToastClose={handleToastClose}
      />
      <div style={{ padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            pb: 2
          }}
        >
          <h2>Users</h2>
          <Box display="flex" alignItems="center" columnGap={1}>
            <Button variant="outlined" icon={<AddOutlineIcon />} text="Add User" onClick={() => setOpenAddModal(true)} />
          </Box>
        </Box>
        <Grid conatiner="true">
          <Grid item md={12}>
            <SimpleTable
              rows={rowData}
              data={data}
              loading={loading}
              totalRows={total}
              onChange={pageChange}
              pageLimit={pageLimit}
              pageNumber={pageNumber}
              columns={columns}
              className="table-height"
              onRefresh={handleRefreshButton}
            />
          </Grid>
        </Grid>
        <Modal modalToggle={openEditModal}>
          <Box sx={closeStyle}>
            <Box p={2}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>Edit User</h4>
            </Box>
            <Divider />
            <Box p={2}>
              <LabelInput
                label="Enter Name"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ name: e.target.value })}
                loading={loading}
              />
              <LabelInput
                label="Enter Email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ email: e.target.value })}
                loading={loading}
              />
            </Box>
            <Divider />
            <Box display="flex" justifyContent="center" columnGap={3} p={2} alignItems="center">
              <Button text="Cancel" variant="outlined" onClick={() => setOpenEditModal(false)} />
              <Button text="Edit" variant="outlined" onClick={() => handleEditUser(userId)} disabled={loading} />
            </Box>
          </Box>
        </Modal>
        <Modal modalToggle={openAddModal}>
          <Box sx={closeStyle}>
            <Box p={2}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>Add User</h4>
            </Box>
            <Divider />
            <Box p={2}>
              <LabelInput
                label="Enter Name"
                value={newUser.name}
                onChange={(e) => handleChangeAddUser('name', e.target.value)}
                loading={loading}
                helperText={errorOnInput?.name?.helperText || ''}
                error={errorOnInput?.name?.error || false}
                required
              />
              <LabelInput
                label="Enter Email"
                value={newUser.email}
                onChange={(e) => handleChangeAddUser('email', e.target.value)}
                loading={loading}
                helperText={errorOnInput?.email?.helperText || ''}
                error={errorOnInput?.email?.error || false}
                required
              />
              <LabelInput
                label="Enter Password"
                type="password"
                value={newUser.password}
                onChange={(e) => handleChangeAddUser('password', e.target.value)}
                loading={loading}
                helperText={errorOnInput?.password?.helperText || ''}
                error={errorOnInput?.password?.error || false}
                required
              />
            </Box>
            <Divider />
            <Box display="flex" justifyContent="center" columnGap={3} p={2} alignItems="center">
              <Button
                text="Cancel"
                variant="outlined"
                onClick={() => {
                  setOpenAddModal(false);
                  setNewUser({
                    name: '',
                    email: '',
                    password: ''
                  });
                  dispatch(SetUsersState({
                    field: 'errorOnInput',
                    value: {
                      name: {
                        helperText: '',
                        error: ''
                      },
                      email: {
                        helperText: '',
                        error: ''
                      },
                      password: {
                        helperText: '',
                        error: ''
                      }
                    }
                  }));
                }}
              />
              <Button text="Add" variant="outlined" onClick={() => handleAddUser()} disabled={isButtonDisable()} />
            </Box>
          </Box>
        </Modal>
        <Modal modalToggle={openEditModal}>
          <Box sx={closeStyle}>
            <Box p={2}>
              <h4 style={{ margin: 0, textAlign: 'center' }}>Edit User</h4>
            </Box>
            <Divider />
            <Box p={2}>
              <LabelInput
                label="Enter Name"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ name: e.target.value })}
                loading={loading}
              />
              <LabelInput
                label="Enter Email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ email: e.target.value })}
                loading={loading}
              />
            </Box>
            <Divider />
            <Box display="flex" justifyContent="center" columnGap={3} p={2} alignItems="center">
              <Button
                text="Cancel"
                variant="outlined"
                onClick={() => {
                  setOpenEditModal(false);
                  setEditedUser({
                    name: '',
                    email: ''
                  });
                }}
              />
              <Button text="Edit" variant="outlined" onClick={() => handleEditUser(userId)} disabled={loading} />
            </Box>
          </Box>
        </Modal>
        <Modal modalToggle={openDeleteModal}>
          <Box sx={closeStyle}>
            <Box display="flex" flexDirection="column" justifyContent="center" p={2} alignItems="center">
              <h1>Are you sure?</h1>
              <p className="text-center">
                Do you really want to delete this user? This
                action will not be undone.
              </p>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="center" columnGap={3} p={2} alignItems="center">
              <Button variant="outlined" text="Cancel" onClick={() => setOpenDeleteModal(false)} />
              <Button variant="outlined" text="Delete" onClick={() => handleDeleteUser(userId)} />
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Users;
