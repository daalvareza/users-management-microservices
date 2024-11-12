import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
}));

export const ModalTitle = styled('h2')({
    textAlign: 'center',
    marginBottom: '20px',
})

export const SaveButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.success.dark,
    },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
    },
}));

export const ModalTextField = styled(TextField)({
    marginBottom: 16,
});
