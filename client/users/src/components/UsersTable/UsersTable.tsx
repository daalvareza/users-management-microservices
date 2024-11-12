import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../models/users/userSelectors';
import { useAppDispatch } from '../../app/hooks';
import { createUser, fetchUsersData, removeUser } from '../../models/users/userActions';
import { AddUserButton, PaginationContainer, RemoveButton, StyledTableRow, TableWrapper } from './UsersTable.styles';
import IUserForm from '../../models/users/IUserForm';
import { Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import UserModal from '../UserModal/UserModal';

const UsersTable = () => {
    const dispatch = useAppDispatch();

    const users = useSelector(selectUsers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const usersPerPage = 3;

    useEffect(() => {
        dispatch(fetchUsersData());
    }, []);

    const handleDeleteUser = (userId: string) => {
        dispatch(removeUser(userId));
    };

    const handleAddUser = async (newUser: IUserForm) => {
        try {
            const resultAction = await dispatch(createUser(newUser));
            if (createUser.rejected.match(resultAction)) {
                throw new Error(resultAction.payload as string);
            }
        } catch (error: any) {
            throw error;
        }
    };

    const paginatedUsers = users.slice((page - 1) * usersPerPage, page * usersPerPage);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

    return (
        <Paper>
            <AddUserButton variant='contained' color='primary' onClick={() => setModalOpen(true)}>
                Add User
            </AddUserButton>
            <TableWrapper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '20%' }}>Full Name</TableCell>
                            <TableCell style={{ width: '20%' }}>Email</TableCell>
                            <TableCell style={{ width: '20%' }}>Gender</TableCell>
                            <TableCell style={{ width: '20%' }}>Description</TableCell>
                            <TableCell style={{ width: '20%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <StyledTableRow key={user.id} selected={false}>
                                <TableCell>{`${user.lastName}, ${user.firstName}`}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>
                                    <Tooltip title={user.description}>
                                        <span>More details</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <RemoveButton onClick={() => handleDeleteUser(user.id)}>
                                        Remove
                                    </RemoveButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
            <PaginationContainer>
                <Typography variant="body2">
                    Total Users: {users.length}
                </Typography>
                <Pagination
                    count={Math.ceil(users.length / usersPerPage)}
                    page={page}
                    onChange={(event, val) => setPage(val)}
                />
            </PaginationContainer>
            <UserModal open={isModalOpen} onClose={() => setModalOpen(false)} onSave={handleAddUser}></UserModal>
        </Paper>
    );
}

export default UsersTable;