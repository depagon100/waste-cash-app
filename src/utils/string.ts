import numeral from 'numeral';

export const capitalize = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;

export const isValidEmail = (email: string) => {
  const regexp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return regexp.test(email);
};

export const formatPrice = (price: string | number) =>
  `\u20B1 ${numeral(price).format('0,0.00')}`;

export const summarizeText = (description: string) =>
  `${description.substring(0, 50)}${description.length >= 50 ? '...' : ''}`;

export const formatNotificationTitle = (event: string) => {
  let title = '';

  switch (event) {
    case 'create-product-offer':
      title = 'Offer';
      break;

    case 'create-bidder-setup':
      title = 'Location Added';
      break;

    case 'update-bidder-setup':
      title = 'Location Updated';
      break;

    case 'accepted-product-offer':
      title = 'Offer Accepted';
      break;

    case 'rejected-product-offer':
      title = 'Offer Rejected';
      break;
  }

  return title;
};

export const getNotificationIcon = (event: string) => {
  let icon = '';

  switch (event) {
    case 'accepted-product-offer':
      icon = 'tag-heart';
      break;

    case 'create-product-offer':
      icon = 'tag';
      break;

    case 'rejected-product-offer':
      icon = 'tag-remove';
      break;

    case 'create-bidder-setup':
      icon = 'map';
      break;

    case 'update-bidder-setup':
      icon = 'map';
      break;
  }

  return icon;
};
