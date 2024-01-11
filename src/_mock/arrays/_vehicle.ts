import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _vehicleList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  plateNumber: _mock.vehicle.plateNumber(index),
  manufacturer: _mock.vehicle.manufacturer(index),
  model: _mock.vehicle.model(index),
  registrationDate: _mock.time(index),
}));
