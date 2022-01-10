import { Card } from 'react-bootstrap';
import './Logout.css'

const Logout = () => {
    
    const handleClick = () => {
        localStorage.clear();
        window.location = '/';
    }
    const handleNoClick = () => {
        window.location = '/home';
    }
    return (
        <div className="logout">
        <Card style={{ width: '18rem', margin: '2rem'}} >
            <center>
            <Card.Body >
                <Card.Text>
                Are you sure you want to logout?
                </Card.Text>
                <button onClick={handleClick}>Yes</button>
                <button onClick={handleNoClick}>No</button>
            </Card.Body>
            </center>
        </Card>
        </div>
    );
}

export default Logout;