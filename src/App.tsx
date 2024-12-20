import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ruRU } from '@mui/x-date-pickers/locales';
import { intlFormat } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Discount } from '@mui/icons-material';

const theme = createTheme({}, ruRU);

const initialDateTime = new Date();

const isValidDate = (date: Date) => {
  return date instanceof Date && !isNaN(Number(date));
};

type Discount = {
  id: number;
  shop: string;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
};

type ModalDiscount = {
  shop: string;
  discountPercent: string;
  startDate: Date | null;
  endDate: Date | null;
};

const emptyModalDiscount = {
  shop: '',
  discountPercent: '',
  startDate: null,
  endDate: null,
};

type ModalDiscountTouches = { [K in keyof ModalDiscount]: boolean };

const modalDiscountInitialTouches = {
  shop: false,
  discountPercent: false,
  startDate: false,
  endDate: false,
};

type ModalDiscountFocus = { [K in keyof ModalDiscount]: boolean };

const modalDiscountInitialFocus = {
  shop: false,
  discountPercent: false,
  startDate: false,
  endDate: false,
};

const isFieldModalDiscountValid = (v: string | number | Date | null) => {
  return v instanceof Date ? isValidDate(v) : Boolean(v);
};

const isModalDiscountValid = (discount: ModalDiscount) =>
  Object.entries(discount).every(([, v]) => isFieldModalDiscountValid(v));

const getDisplayDateTime = (date: Date) =>
  intlFormat(
    date,
    {
      minute: 'numeric',
      hour: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
    { locale: 'ru' }
  );

const App = () => {
  const [searchDateTime, setSearchDateTime] = useState(initialDateTime);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isModalDiscountOpen, setIsModalDiscountOpen] = useState(false);
  const [modalDiscount, setModalDiscount] =
    useState<ModalDiscount>(emptyModalDiscount);
  const [modalDiscountTouches, setModalDiscountTouches] =
    useState<ModalDiscountTouches>(modalDiscountInitialTouches);
  const [modalDiscountFocus, setModalDiscountFocus] =
    useState<ModalDiscountFocus>(modalDiscountInitialFocus);

  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const [modalDateTime, setModalDateTime] = useState<Date | null>(
    searchDateTime
  );
  let canSaveModalDateTime = false;
  if (modalDateTime !== null) {
    canSaveModalDateTime = isValidDate(modalDateTime);
  }

  const applicableDiscounts = discounts.filter(({ startDate, endDate }) => {
    return startDate < searchDateTime && endDate > searchDateTime;
  });

  let bestDiscount;
  if (applicableDiscounts.length) {
    bestDiscount = applicableDiscounts.reduce((prev, cur) => {
      return prev.discountPercent >= cur.discountPercent ? prev : cur;
    });
  }

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
              {searchDateTime === initialDateTime ? (
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
                  onClick={() => {
                    setIsModalTimeOpen(true);
                  }}
                >
                  {getDisplayDateTime(initialDateTime)}
                </Box>
              ) : (
                <Chip
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
                      <Typography variant="h6">
                        {getDisplayDateTime(searchDateTime)}
                      </Typography>
                      <EditIcon />
                    </Box>
                  }
                  onClick={() => {
                    setIsModalTimeOpen(true);
                  }}
                />
              )}
            </Tooltip>
          </Typography>
          {bestDiscount ? (
            <Typography variant="h4">
              Магазин "{bestDiscount.shop}" ({bestDiscount.discountPercent}%): c{' '}
              <Box sx={{ display: 'inline-flex', fontWeight: 'bold' }}>
                {intlFormat(
                  bestDiscount.startDate,
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
                  bestDiscount.endDate,
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
            </Typography>
          ) : (
            <Typography sx={{ textAlign: 'center' }} variant="h5">
              Нет ни одной скидки 😢
            </Typography>
          )}
          {Boolean(discounts.length) && (
            <>
              <Typography variant="h6" sx={{ mt: 4 }}>
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
                    {discounts.map((discount) => (
                      <TableRow key={discount.id}>
                        <TableCell align="center">{discount.shop}</TableCell>
                        <TableCell align="center">
                          {discount.discountPercent} %
                        </TableCell>
                        <TableCell align="center">
                          {intlFormat(
                            discount.startDate,
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
                            discount.endDate,
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
              </TableContainer>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => {
                setIsModalDiscountOpen(true);
              }}
            >
              Добавить скидку
            </Button>
          </Box>
        </Container>
        <Dialog
          open={isModalDiscountOpen}
          fullWidth
          onClose={() => {
            setModalDiscount(emptyModalDiscount);
            setIsModalDiscountOpen(false);
            setModalDiscountTouches(modalDiscountInitialTouches);
            setModalDiscountFocus(modalDiscountInitialFocus);
          }}
        >
          <DialogTitle>Добавить скидку</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <TextField
              error={
                modalDiscountTouches.shop &&
                !modalDiscountFocus.shop &&
                !isFieldModalDiscountValid(modalDiscount.shop)
              }
              required
              fullWidth
              label="Магазин"
              variant="outlined"
              value={modalDiscount.shop}
              onChange={(e) => {
                setModalDiscount({ ...modalDiscount, shop: e.target.value });
              }}
              onFocus={() => {
                setModalDiscountTouches({
                  ...modalDiscountTouches,
                  shop: true,
                });
                setModalDiscountFocus({
                  ...modalDiscountFocus,
                  shop: true,
                });
              }}
              onBlur={() => {
                setModalDiscountFocus({
                  ...modalDiscountFocus,
                  shop: false,
                });
              }}
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
                  error={
                    modalDiscountTouches.discountPercent &&
                    !modalDiscountFocus.discountPercent &&
                    !isFieldModalDiscountValid(modalDiscount.discountPercent)
                  }
                  required
                  label="Скидка в процентах"
                  variant="outlined"
                  value={modalDiscount.discountPercent}
                  onChange={(e) => {
                    const valueNumber = Number(e.target.value);
                    setModalDiscount({
                      ...modalDiscount,
                      discountPercent: isNaN(valueNumber)
                        ? modalDiscount.discountPercent
                        : e.target.value,
                    });
                  }}
                  onFocus={() => {
                    setModalDiscountTouches({
                      ...modalDiscountTouches,
                      discountPercent: true,
                    });
                    setModalDiscountFocus({
                      ...modalDiscountFocus,
                      discountPercent: true,
                    });
                  }}
                  onBlur={() => {
                    setModalDiscountFocus({
                      ...modalDiscountFocus,
                      discountPercent: false,
                    });
                  }}
                />
                <DateTimePicker
                  label="Начало действия"
                  slotProps={{
                    textField: {
                      required: true,
                      sx: { mt: 3 },
                      error:
                        modalDiscountTouches.startDate &&
                        !modalDiscountFocus.startDate &&
                        !isFieldModalDiscountValid(modalDiscount.startDate),
                      onFocus: () => {
                        setModalDiscountTouches({
                          ...modalDiscountTouches,
                          startDate: true,
                        });
                        setModalDiscountFocus({
                          ...modalDiscountFocus,
                          startDate: true,
                        });
                      },
                      onBlur: () => {
                        setModalDiscountFocus({
                          ...modalDiscountFocus,
                          startDate: false,
                        });
                      },
                    },
                  }}
                  value={modalDiscount.startDate}
                  onChange={(v) => {
                    setModalDiscount({ ...modalDiscount, startDate: v });
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
                    textField: {
                      required: true,
                      sx: { flexGrow: 1 },
                      error:
                        modalDiscountTouches.endDate &&
                        !modalDiscountFocus.endDate &&
                        !isFieldModalDiscountValid(modalDiscount.endDate),
                      onFocus: () => {
                        setModalDiscountTouches({
                          ...modalDiscountTouches,
                          endDate: true,
                        });
                        setModalDiscountFocus({
                          ...modalDiscountFocus,
                          endDate: true,
                        });
                      },
                      onBlur: () => {
                        setModalDiscountFocus({
                          ...modalDiscountFocus,
                          endDate: false,
                        });
                      },
                    },
                  }}
                  value={modalDiscount.endDate}
                  onChange={(v) => {
                    setModalDiscount({ ...modalDiscount, endDate: v });
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setModalDiscount(emptyModalDiscount);
                setIsModalDiscountOpen(false);
                setModalDiscountTouches(modalDiscountInitialTouches);
                setModalDiscountFocus(modalDiscountInitialFocus);
              }}
            >
              Закрыть
            </Button>
            <Button
              disabled={!isModalDiscountValid(modalDiscount)}
              onClick={() => {
                const newDiscount: Discount = {
                  id: discounts.length
                    ? discounts[discounts.length - 1].id + 1
                    : 1,
                  shop: modalDiscount.shop,
                  discountPercent: Number(modalDiscount.discountPercent),
                  endDate: modalDiscount.endDate!,
                  startDate: modalDiscount.startDate!,
                };
                setDiscounts([...discounts, newDiscount]);
                setModalDiscount(emptyModalDiscount);
                setIsModalDiscountOpen(false);
                setModalDiscountTouches(modalDiscountInitialTouches);
                setModalDiscountFocus(modalDiscountInitialFocus);
              }}
            >
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isModalTimeOpen}
          fullWidth
          onClose={() => {
            setIsModalTimeOpen(false);
            setModalDateTime(searchDateTime);
          }}
        >
          <DialogTitle>Установить время</DialogTitle>
          <DialogContent sx={{ overflow: 'visible' }}>
            <Box>
              <DateTimePicker
                label="Время"
                slotProps={{
                  textField: { required: true, sx: {} },
                }}
                value={modalDateTime}
                onChange={(v) => {
                  setModalDateTime(v);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsModalTimeOpen(false);
                setModalDateTime(initialDateTime);
                setSearchDateTime(initialDateTime);
              }}
            >
              Сбросить
            </Button>
            <Button
              disabled={!canSaveModalDateTime}
              onClick={() => {
                setIsModalTimeOpen(false);
                setSearchDateTime(modalDateTime!);
              }}
            >
              Установить
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
