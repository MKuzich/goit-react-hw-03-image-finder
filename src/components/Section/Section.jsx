import React from 'react';
import styles from './Section.module.css';
import PropTypes from 'prop-types';

export const Section = ({ title, children }) => (
  <section className={styles.section}>
    <h2 className={styles.header}>{title}</h2>
    {children}
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
