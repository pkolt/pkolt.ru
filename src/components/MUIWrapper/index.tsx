import { CssVarsProvider } from '@mui/joy';
import { Wrapper } from './Wrapper';

interface MUIWrapperProps {
  children: React.ReactNode;
}

export const MUIWrapper = ({ children }: MUIWrapperProps): JSX.Element => {
  return (
    <CssVarsProvider disableNestedContext>
      <Wrapper>{children}</Wrapper>
    </CssVarsProvider>
  );
};
