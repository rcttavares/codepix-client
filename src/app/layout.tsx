import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'CodePix',
  description: 'Codepix description',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  //console.dir(props, {depth: 10});

  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>{props.children}</ThemeRegistry>
        <ToastContainer theme='dark' position='top-right' />
      </body>
    </html>
  );
}
