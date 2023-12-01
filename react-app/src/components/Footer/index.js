import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {


    const handleLinkedin = (e) => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/josh-goldenberg-252416a1/');
      };

    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <span className="footer-text">Meet the Architect, Joshua Goldenberg:</span>
                <span>
                    <a
                    href="https://www.linkedin.com/in/josh-goldenberg-252416a1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faLinkedin} className="footer-icon"/>
                    </a>
                </span>
                <span>
                    <a
                    href="https://github.com/jgoldenberg29"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <i className="fab fa-github footer-icon"></i>
                    </a>
                </span>
                <span>
                    <a
                    href="https://jgoldenberg29.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        {/* <i className="fa-solid fa-user footer-icon"><i> */}
                        <i class="fa-solid fa-j footer-icon-portfolio"></i><i class="fa-solid fa-g footer-icon-portfolio"></i>
                        {/* <span className="footer-icon">JG</span> */}
                    </a>
                </span>
            </div>
        </div>
    )
}
