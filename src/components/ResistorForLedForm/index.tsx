import { Button, Chip, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import { Decimal } from 'decimal.js';
import { useForm } from 'react-hook-form';

import { MUIWrapper } from '../MUIWrapper';
import styles from './index.module.css';
import { getPower, getResistance, validateNumber } from './utils';

interface FormValues {
  batteryVoltage: null | number;
  ledCurrent: null | number;
  ledVoltage: null | number;
}

const defaultValues: FormValues = { batteryVoltage: null, ledCurrent: null, ledVoltage: null };

export const ResistorForLedForm = () => {
  const { formState, register, reset, watch } = useForm<FormValues>({ defaultValues, mode: 'onChange' });
  const { errors, isValid } = formState;
  const formValues = watch();

  const batteryVoltage = formValues.batteryVoltage && new Decimal(formValues.batteryVoltage);
  const ledCurrent = formValues.ledCurrent && new Decimal(formValues.ledCurrent);
  const ledVoltage = formValues.ledVoltage && new Decimal(formValues.ledVoltage);

  let resistance = new Decimal(0);
  if (isValid && batteryVoltage && ledVoltage && ledCurrent) {
    resistance = getResistance(batteryVoltage, ledVoltage, ledCurrent);
  }

  let power = new Decimal(0);
  if (isValid && resistance && ledCurrent) {
    power = getPower(resistance, ledCurrent);
  }

  return (
    <MUIWrapper>
      <div className={styles.container}>
        <div className={styles.form}>
          <FormControl error={!!errors.batteryVoltage}>
            <FormLabel>Напряжение источника питания (Vcc)</FormLabel>
            <Input
              type="number"
              {...register('batteryVoltage', { required: true, validate: validateNumber, valueAsNumber: true })}
              autoFocus
              endDecorator="V"
            />
          </FormControl>

          <FormControl error={!!errors.ledVoltage}>
            <FormLabel>Падение напряжения на светодиоде (Vf)</FormLabel>
            <Input
              type="number"
              {...register('ledVoltage', { required: true, validate: validateNumber, valueAsNumber: true })}
              endDecorator="V"
            />
          </FormControl>

          <FormControl error={!!errors.ledCurrent}>
            <FormLabel>Ток проходящий через светодиод (I)</FormLabel>
            <Input
              type="number"
              {...register('ledCurrent', { required: true, validate: validateNumber, valueAsNumber: true })}
              endDecorator="mA"
            />
          </FormControl>

          <Button color="neutral" onClick={() => reset(defaultValues)}>
            Сброс
          </Button>
        </div>
        <div className={styles.result}>
          <div className={styles.result_value}>
            <Typography level="title-lg">Сопротивление резистора (R): </Typography>
            <Typography>R = (Vcc - Vf) / I</Typography>
            <Chip color={isValid ? 'primary' : 'danger'} variant="solid">
              {resistance.toDecimalPlaces(2).toString()} Ω
            </Chip>
          </div>

          <div className={styles.result_value}>
            <Typography level="title-lg">Мощность резистора (P): </Typography>
            <Typography>P = (I ^ 2) x R</Typography>
            <Chip color={isValid ? 'primary' : 'danger'} variant="solid">
              {power.toDecimalPlaces(2).toString()} W
            </Chip>
          </div>
        </div>
      </div>
    </MUIWrapper>
  );
};
