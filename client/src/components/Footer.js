import React from 'react';
import '../css/footer.css';

const Footer = (props) => {
    return (
      <footer className="text-muted bg-dark">
        <div className="container">
          <p className="float-right">
            <a href="/#">Back to top</a>
          </p>
          <p>React project created by <h6>Ibad khan</h6></p>
          <p>Fall 2020- Full stack programming</p>
        </div>
      </footer>
    );
}
 
export default Footer;