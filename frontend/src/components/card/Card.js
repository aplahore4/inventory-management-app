import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
  const { children, cardClass } = props;

  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;
