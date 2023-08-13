import CalendarIcon from './icons/calendar.svg?raw';
import GitHubIcon from './icons/github.svg?raw';
import TwitterIcon from './icons/twitter.svg?raw';
import LinkedInIcon from './icons/linkedin.svg?raw';

enum IconEnum {
  Calendar = 'calendar',
  GitHub = 'github',
  Twitter = 'twitter',
  LinkedIn = 'linkedin',
}

type IconName = `${IconEnum}`

const config: Record<IconName, string> = {
  [IconEnum.Calendar]: CalendarIcon,
  [IconEnum.GitHub]: GitHubIcon,
  [IconEnum.Twitter]: TwitterIcon,
  [IconEnum.LinkedIn]: LinkedInIcon,
};

interface IconProps {
  name: IconName;
}

export const Icon = ({ name }: IconProps): JSX.Element => (
  <div dangerouslySetInnerHTML={{ __html: config[name] }} />
);
