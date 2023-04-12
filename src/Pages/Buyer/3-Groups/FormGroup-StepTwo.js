import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, Stack} from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import FormProvider, {RHFTextField} from "../../../third-party/components/hook-form";
import {useEffect, useState} from "react";
import RHFDatePicker from "./RHFDatePicker";
import dayjs from "dayjs";


export default function FormGroupStepTwo({onDateChange}) {

  // ---- handle the new group object ---
  const defaultValues = {
    groupName: '',
    receiverName: '',
    pickupLocation: '',
    phoneNumber: '',
    endDate: '',
  };


  // validation schema
  const NewUserSchema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    pickupLocation: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    endDate: Yup.string().required('Required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema), defaultValues,
  });


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (<>
      {/*----------------- Title & Description -----------------*/}
      <Box
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5,
        }}
      >
        <Typography
          variant="h4"
        >Enter Group Details</Typography>
        <Box
          sx={{
            width: '35%', alignItems: 'center',
          }}
        >
          <Typography
            variant="caption"
          >Please provide accurate and comprehensive information about your group
            to ensure the best possible experience for all members.</Typography>
        </Box>
      </Box>
      {/*----------------- Form -----------------*/}
      {/*<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>*/}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Stack
          component={'form'}
          spacing={2}
          sx={{
            width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <RHFTextField
            required
            name="groupName"
            fullWidth={true}
            id="outlined-required"
            label="Group Name"
            placeholder={'e.g. My Group'}
          />
          <RHFTextField
            fullWidth={true}
            required
            name="receiverName"
            id="outlined-required"
            label="Receiver's Name"
            placeholder={'e.g. Mary Smith'}
          />
          <RHFTextField
            required
            fullWidth={true}
            name="pickupLocation"
            id="outlined-required"
            label="Pickup Location"
            placeholder={'e.g. 123 Main Street, New York, NY 10001'}
          />
          <Stack
            direction={{sm: 'column', md: 'row'}}
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              '& > *': {
                flex: 1,
              },
            }}
          >
            <RHFTextField
              required
              fullWidth={true}
              name="phoneNumber"
              id="outlined-required"
              label="Phone Number"
              placeholder={'e.g. 123-456-7890'}
            />

            <LocalizationProvider
              dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                name="endDate"
                label="End Date"
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(date) => handleDateChange(date)}
                renderInput={(props) => (
                  <TextField {...props}/>
                )}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </div>

      {/*</FormProvider>*/}

    </>

  );
}