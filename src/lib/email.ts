import { IEmail } from '@/models';

export const sendEmail = ({ to, subject, text }: IEmail) => {
  console.log('Sending email to:', to, 'Subject:', subject, 'Text:', text);
};
