import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';

const sidebarMenu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaRegChartBar />,
    children: [
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        path: '/profile-update',
      },
    ],
  },
  {
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
];

export default sidebarMenu;
