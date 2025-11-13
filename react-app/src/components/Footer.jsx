import PropTypes from 'prop-types';

export const Footer = (props) => {
  const {name, times, isReal} = props;
  const buildElements = () => {
    if (isReal) {
      let html = '<div>';
      for (let i = 0; i < times; i++) {
        html += `<p>${name}</p>`;
      }
      html += '</div>';
      return html;
    }
  };
  return (
    <div>
      <p>{name} is {isReal}</p>
      <div>{buildElements()}</div>
    </div>
  );
};

//tyyppitarkastus
Footer.propTypes = {
  name: PropTypes.string.isRequired,
  times: PropTypes.number.isRequired,
  isReal: PropTypes.bool.isRequired
}

export default Footer;
