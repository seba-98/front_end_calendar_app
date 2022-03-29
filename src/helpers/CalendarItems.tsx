import moment from "moment";

export const now = moment().minutes(0).seconds(0);
export const nowPlus1 = now.clone().add(1, 'hours');

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };