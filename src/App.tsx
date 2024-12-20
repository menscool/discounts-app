import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  Tooltip,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // TextField,
  Typography,
  // TableContainer,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
  // Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import { intlFormat } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({}, ruRU);

// function createData(
//   id: number,
//   shop: string,
//   discountPercent: number,
//   startDate: Date,
//   endDate: Date
// ) {
//   return { id, shop, discountPercent, startDate, endDate };
// }

// const rows = [
//   createData(1, 'Лента', 5, new Date(), new Date()),
//   createData(2, 'ВкусВилл', 3, new Date(), new Date()),
//   createData(3, 'Азбука Вкуса', 2, new Date(), new Date()),
//   createData(4, 'Перекрёсток', 8, new Date(), new Date()),
// ];

const App = () => {
  const getDisplayTime = () =>
    intlFormat(
      new Date(),
      {
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      { locale: 'ru' }
    );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h5">
            Лучшая скидка на{' '}
            <Tooltip title="Установить время" placement="right">
              <Box
                sx={{
                  display: 'inline-flex',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {getDisplayTime()}
              </Box>
              {/* <Chip
                sx={{
                  height: 'auto',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 },
                }}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      paddingY: 1,
                    }}
                  >
                    <Typography variant="h6">{getDisplayTime()}</Typography>
                    <EditIcon />
                  </Box>
                }
              /> */}
            </Tooltip>
          </Typography>
          {/* <Typography variant="h4">
            Магазин "Лента" (10%): c{' '}
            <Box sx={{ display: 'inline-flex', fontWeight: 'bold' }}>
              {intlFormat(
                displayDate,
                {
                  minute: 'numeric',
                  hour: 'numeric',
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                },
                { locale: 'ru' }
              )}
            </Box>{' '}
            по{' '}
            <Box sx={{ display: 'inline-flex', fontWeight: 'bold' }}>
              {intlFormat(
                displayDate,
                {
                  minute: 'numeric',
                  hour: 'numeric',
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                },
                { locale: 'ru' }
              )}
            </Box>
          </Typography> */}
          <Typography sx={{ textAlign: 'center' }} variant="h5">
            Нет ни одной скидки 😢
          </Typography>
          {/* <Typography variant="h6" sx={{ mt: 4 }}>
            Все скидки
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Магазин</TableCell>
                  <TableCell align="center">Скидка</TableCell>
                  <TableCell align="center">Срок действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.shop}</TableCell>
                    <TableCell align="center">
                      {row.discountPercent} %
                    </TableCell>
                    <TableCell align="center">
                      {intlFormat(
                        row.startDate,
                        {
                          minute: 'numeric',
                          hour: 'numeric',
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        },
                        { locale: 'ru' }
                      )}{' '}
                      -{' '}
                      {intlFormat(
                        row.endDate,
                        {
                          minute: 'numeric',
                          hour: 'numeric',
                          day: 'numeric',
                          month: 'numeric',
                          year: 'numeric',
                        },
                        { locale: 'ru' }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" endIcon={<AddIcon />}>
              Добавить скидку
            </Button>
          </Box>
        </Container>
        {/* <Dialog open={true} fullWidth onClose={() => {}}>
          <DialogTitle>Добавить скидку</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <TextField
              autoFocus
              required
              fullWidth
              label="Магазин"
              variant="outlined"
            />
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 1,
                alignItems: 'end',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              >
                <TextField
                  required
                  label="Скидка в процентах"
                  variant="outlined"
                />
                <DateTimePicker
                  label="Начало действия"
                  slotProps={{
                    textField: { required: true, sx: { mt: 3 } },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="subtitle2">-</Typography>
                <DateTimePicker
                  label="Окончание действия"
                  slotProps={{
                    textField: { required: true, sx: { flexGrow: 1 } },
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {}}>Закрыть</Button>
            <Button onClick={() => {}}>Добавить</Button>
          </DialogActions>
        </Dialog> */}
        {/* <Dialog open={true} fullWidth onClose={() => {}}>
          <DialogTitle>Установить время</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <Box>
              <DateTimePicker
                label="Время"
                slotProps={{
                  textField: { required: true, sx: {} },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {}}>Сбросить</Button>
            <Button onClick={() => {}}>Установить</Button>
          </DialogActions>
        </Dialog> */}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
