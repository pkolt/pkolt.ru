import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Typography, Chip } from '@mui/joy';
import styles from './index.module.css';
import { MUIWrapper } from '../MUIWrapper';

interface FormValues {
  batteryVoltage: number;
  ledVoltage: number;
  ledCurrent: number;
}

export const ResistorForLedForm = () => {
  const { register, formState, watch } = useForm<FormValues>({ mode: 'onChange' });
  const { errors, isValid } = formState;
  const { batteryVoltage, ledVoltage, ledCurrent } = watch();

  const resistance = useMemo<number>(() => {
    if (isValid && batteryVoltage && ledVoltage && ledCurrent) {
      return (batteryVoltage - ledVoltage) / (ledCurrent / 1000);
    }
    return 0;
  }, [batteryVoltage, isValid, ledCurrent, ledVoltage]);

  const power = useMemo<number>(() => {
    if (isValid && resistance && ledCurrent) {
      return Math.pow(ledCurrent / 1000, 2) * resistance;
    }
    return 0;
  }, [isValid, ledCurrent, resistance]);

  return (
    <MUIWrapper>
      <div className={styles.container}>
        <div className={styles.form}>
          <FormControl error={!!errors.batteryVoltage}>
            <FormLabel>Напряжение источника питания (Vcc)</FormLabel>
            <Input
              type="number"
              {...register('batteryVoltage', { required: true, valueAsNumber: true })}
              endDecorator="V"
            />
          </FormControl>

          <FormControl error={!!errors.ledVoltage}>
            <FormLabel>Падение напряжения на светодиоде (Vf)</FormLabel>
            <Input
              type="number"
              {...register('ledVoltage', { required: true, valueAsNumber: true })}
              endDecorator="V"
            />
          </FormControl>

          <FormControl error={!!errors.ledCurrent}>
            <FormLabel>Ток проходящий через светодиод (I)</FormLabel>
            <Input
              type="number"
              {...register('ledCurrent', { required: true, valueAsNumber: true })}
              endDecorator="mA"
            />
          </FormControl>
        </div>
        <div className={styles.result}>
          <div className={styles.result_value}>
            <Typography level="title-lg">Сопротивление резистора (R): </Typography>
            <Typography>R = (Vcc - Vf) / I</Typography>
            <Chip variant="solid" color="primary">
              {resistance} Ω
            </Chip>
          </div>

          <div className={styles.result_value}>
            <Typography level="title-lg">Мощность резистора (P): </Typography>
            <Typography>P = (I ^ 2) x R</Typography>
            <Chip variant="solid" color="primary">
              {power} W
            </Chip>
          </div>
        </div>
      </div>
    </MUIWrapper>
  );
};
