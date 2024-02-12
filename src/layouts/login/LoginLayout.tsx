// @mui
import { Stack } from '@mui/material';
// components
import Image from '../../components/image';
//
import loginImage from '../../assets/images/illustrations/At the office-rafiki.png';
import { StyledContent, StyledRoot, StyledSection, StyledSectionBg } from './styles';

// ----------------------------------------------------------------------

type Props = {
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration }: Props) {
  return (
    <StyledRoot>
      <StyledSection>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || loginImage}
          sx={{ maxWidth: 720 }}
        />
        <StyledSectionBg />
      </StyledSection>
      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
