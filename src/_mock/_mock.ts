import { sub } from 'date-fns';
//
import { model, plateNumber, manufacturer } from './assets';

// ----------------------------------------------------------------------

const _mock = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  vehicle: {
    plateNumber: (index: number) => plateNumber[index],
    manufacturer: (index: number) => manufacturer[index],
    model: (index: number) => model[index],
    registrationDate: (index: number) => sub(new Date(), { days: index, hours: index }),
  },
  image: {
    cover: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    product: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/products/product_${index + 1}.jpg`,
    avatar: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
};

export default _mock;
