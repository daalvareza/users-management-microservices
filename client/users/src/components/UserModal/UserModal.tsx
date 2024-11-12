import React from "react";
import IUserForm from "../../models/users/IUserForm";
import { Box, FormHelperText, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { CancelButton, ModalContainer, ModalTextField, ModalTitle, SaveButton } from "./UserModal.styles";
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (user: IUserForm) => Promise<void>;
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    gender: Yup.string(),
    desciption: Yup.string().max(200, 'Description cannot exceed 200 characters'),
});

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onSave }) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            description: '',
        },
        validationSchema,
        onSubmit: async (values, {setStatus, setSubmitting }) => {
            try {
                setStatus(null);
                await onSave(values);
                formik.resetForm();
                onClose();
            } catch (error: any) {
                setStatus(error.message || 'Failed to save user. Please try again.');
                setSubmitting(false);
            }
        },
    });

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <ModalContainer>
                    <ModalTitle>Add New User</ModalTitle>
                    <InputLabel>First Name</InputLabel>
                    <ModalTextField 
                        name="firstName"
                        fullWidth
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <InputLabel>Last Name</InputLabel>
                    <ModalTextField 
                        name="lastName"
                        fullWidth
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <InputLabel>Email</InputLabel>
                    <ModalTextField 
                        name="email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <InputLabel>Gender</InputLabel>
                    <Select 
                        name="gender"
                        fullWidth
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{
                            marginBottom: '16px',
                        }}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {formik.touched.gender && formik.errors.gender && (
                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                    )}
                    <InputLabel>Description</InputLabel>
                    <ModalTextField 
                        name="description"
                        fullWidth
                        multiline
                        inputProps={{ maxLength: 200 }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    {formik.status && (
                        <Typography color="error" style={{ marginBottom: '10px' }}>
                            {formik.status}
                        </Typography>
                    )}
                    <Box textAlign='right' justifyContent='space-between' display='flex'>
                        <CancelButton variant="contained" onClick={onClose}>
                            Cancel
                        </CancelButton>
                        <SaveButton variant="contained" color="primary" type="submit">
                            Save
                        </SaveButton>
                    </Box>
                </ModalContainer>
            </form>
        </Modal>
    );
};

export default UserModal;